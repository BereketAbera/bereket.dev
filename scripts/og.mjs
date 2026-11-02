// Social preview cards (1200×630) for the home page and every case study, plus the
// raster icons. Renders HTML with the site's own fonts in Playwright Chromium.
//
//   node scripts/og.mjs
//
// Writes public/og/home.png, public/og/<slug>.png, public/apple-touch-icon.png and
// public/favicon.ico. public/favicon.svg is drawn by hand and checked in.
import { chromium } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { profile } from '../app/data/profile.ts'
import { work } from '../app/data/work.ts'

const root = new URL('../', import.meta.url)
const file = path => fileURLToPath(new URL(path, root))
// Pages opened with setContent can't load file:// URLs, so the fonts go in as data URLs.
const fontData = async name => `data:font/woff2;base64,${(await readFile(file(`public/fonts/${name}`))).toString('base64')}`
const fonts = {
  roman: await fontData('literata-roman.woff2'),
  mono: await fontData('fragment-mono.woff2'),
  geez: await fontData('noto-serif-ethiopic-signature.woff2'),
}

const colors = { paper: '#f5f3ee', ink: '#1a1a18', muted: '#5f5b53', hair: '#d6d0c4', signal: '#b23a1b' }

const escape = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const fontFaces = `
  @font-face { font-family: Literata; src: url("${fonts.roman}") format("woff2"); font-weight: 300 700; }
  @font-face { font-family: "Fragment Mono"; src: url("${fonts.mono}") format("woff2"); }
  @font-face { font-family: Signature; src: url("${fonts.geez}") format("woff2"); font-weight: 500; }
`

/** One card: a ruled sheet with a mono label, the headline and a signature row. */
function card({ label, marker, headline, meta }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontFaces}
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; background: ${colors.paper}; color: ${colors.ink}; }
  body { padding: 64px 72px 56px; display: flex; flex-direction: column; font-family: Literata, Georgia, serif; font-optical-sizing: auto; }
  .top { border-top: 3px solid ${colors.ink}; padding-top: 22px; display: flex; justify-content: space-between; gap: 32px; }
  .label { font-family: "Fragment Mono", monospace; font-size: 21px; letter-spacing: 0.06em; text-transform: uppercase; color: ${colors.muted}; }
  .marker { color: ${colors.signal}; }
  .headline { flex: 1; display: flex; align-items: center; }
  h1 { font-weight: 470; letter-spacing: -0.022em; line-height: 1.08; font-size: 68px; max-width: 1000px; text-wrap: balance; }
  .bottom { border-top: 1px solid ${colors.hair}; padding-top: 22px; display: flex; justify-content: space-between; align-items: baseline; gap: 32px; }
  .name { font-size: 30px; font-weight: 600; letter-spacing: -0.005em; }
  .geez { font-family: Signature, serif; font-size: 24px; color: ${colors.muted}; margin-left: 14px; font-weight: 500; }
  .handle { display: inline-block; width: 12px; height: 12px; background: ${colors.signal}; margin-right: 14px; transform: translateY(-2px); }
  </style></head><body>
    <div class="top"><p class="label">${marker ? `<span class="marker">${escape(marker)}</span>&nbsp;&nbsp;` : ''}${escape(label)}</p><p class="label">${escape(meta ?? '')}</p></div>
    <div class="headline"><h1 id="h">${escape(headline)}</h1></div>
    <div class="bottom"><p><span class="name">${escape(profile.name)}</span><span class="geez" lang="am">${escape(profile.nameGeez)}</span></p><p class="label"><span class="handle"></span>bereket.dev</p></div>
  </body></html>`
}

/** The favicon design at any size: a serif B on paper with a red fill-handle square. */
function icon(size) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontFaces}
  * { margin: 0; }
  html, body { width: ${size}px; height: ${size}px; background: ${colors.paper}; overflow: hidden; }
  body { position: relative; }
  .b { position: absolute; inset: 0; display: grid; place-items: center; font-family: Literata, serif; font-weight: 620; color: ${colors.ink};
       font-size: ${Math.round(size * 0.8)}px; line-height: 1; padding: 0 ${Math.round(size * 0.12)}px ${Math.round(size * 0.04)}px 0; }
  .h { position: absolute; right: ${Math.round(size * 0.1)}px; bottom: ${Math.round(size * 0.1)}px; width: ${Math.round(size * 0.2)}px; height: ${Math.round(size * 0.2)}px; background: ${colors.signal}; }
  </style></head><body><div class="b">B</div><div class="h"></div></body></html>`
}

/** Wraps PNG bytes in a single-image ICO container (PNG-compressed entries are valid ICO). */
function ico(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // one image
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size >= 256 ? 0 : size, 0)
  entry.writeUInt8(size >= 256 ? 0 : size, 1)
  entry.writeUInt8(0, 2) // no palette
  entry.writeUInt8(0, 3) // reserved
  entry.writeUInt16LE(1, 4) // colour planes
  entry.writeUInt16LE(32, 6) // bits per pixel
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(6 + 16, 12) // image data offset
  return Buffer.concat([header, entry, png])
}

/** Waits for the web fonts and throws if any failed, so a card never ships in a fallback face. */
async function fontsLoaded(page) {
  const failed = await page.evaluate(async () => {
    await Promise.all([...document.fonts].map(font => font.load().catch(() => {})))
    return [...document.fonts].filter(font => font.status !== 'loaded').map(font => font.family)
  })
  if (failed.length) throw new Error(`Fonts failed to load: ${failed.join(', ')}`)
}

const pad = n => String(n).padStart(2, '0')
const cards = [
  { out: 'public/og/home.png', label: profile.eyebrow, headline: profile.headline, meta: `Addis Ababa · ${profile.utcOffset}` },
  ...work.map((item, i) => ({
    out: `public/og/${item.slug}.png`,
    marker: `§ ${pad(i + 1)}`,
    label: 'Case study',
    headline: item.headline,
    meta: `${item.role} · ${item.years}`,
  })),
]

await mkdir(file('public/og'), { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  for (const c of cards) {
    await page.setContent(card(c), { waitUntil: 'load' })
    await fontsLoaded(page)
    // Shrink the headline until it fits its band with room to spare.
    await page.evaluate(() => {
      const h = document.getElementById('h')
      const band = h.parentElement
      let size = 68
      while (size > 40 && (h.scrollHeight > band.clientHeight - 24 || h.scrollWidth > band.clientWidth)) {
        size -= 2
        h.style.fontSize = `${size}px`
      }
    })
    await page.screenshot({ path: file(c.out) })
    console.log(c.out)
  }

  const iconPage = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 })
  await iconPage.setContent(icon(180), { waitUntil: 'load' })
  await fontsLoaded(iconPage)
  await iconPage.screenshot({ path: file('public/apple-touch-icon.png') })
  console.log('public/apple-touch-icon.png')

  await iconPage.setViewportSize({ width: 32, height: 32 })
  await iconPage.setContent(icon(32), { waitUntil: 'load' })
  await fontsLoaded(iconPage)
  const png32 = await iconPage.screenshot()
  await writeFile(file('public/favicon.ico'), ico(png32, 32))
  console.log('public/favicon.ico')
}
finally {
  await browser.close()
}

// Sanity check: every card is a 1200×630 PNG.
for (const c of cards) {
  const bytes = await readFile(file(c.out))
  const width = bytes.readUInt32BE(16)
  const height = bytes.readUInt32BE(20)
  if (width !== 1200 || height !== 630) throw new Error(`${c.out} is ${width}×${height}`)
}
