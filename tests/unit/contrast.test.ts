import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Reads the colour tokens straight from the stylesheet so the test fails if a
// token is edited into an inaccessible combination.
const css = readFileSync(new URL('../../app/assets/css/main.css', import.meta.url), 'utf8')

function tokens(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/gi)].map(m => [m[1]!, m[2]!]))
}

const light = tokens(css.slice(css.indexOf(':root {'), css.indexOf('@media (prefers-color-scheme: dark)')))
const dark = { ...light, ...tokens(css.slice(css.indexOf('@media (prefers-color-scheme: dark)'), css.indexOf('@theme inline'))) }

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme', (_, t) => {
  it('keeps body and secondary text at WCAG AA on both surfaces', () => {
    for (const surface of [t.paper!, t['paper-2']!]) {
      expect(contrast(t.ink!, surface)).toBeGreaterThanOrEqual(7)
      expect(contrast(t.muted!, surface)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(t.signal!, surface)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('keeps hairlines visible but quiet', () => {
    expect(contrast(t.hair!, t.paper!)).toBeGreaterThan(1.2)
    expect(contrast(t.hair!, t.paper!)).toBeLessThan(3)
  })
})
