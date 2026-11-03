// Print /resume to public/bereket-abera-resume.pdf: A4, real text, at most two pages.
// The site has to be running first (pnpm dev --port 3600), or point RESUME_URL at
// another server, e.g. RESUME_URL=http://localhost:4173/resume after `pnpm preview`.
//
//   node scripts/resume-pdf.mjs
//
// The page links to its case studies with relative URLs; a PDF needs absolute ones,
// so they're rewritten against SITE_URL (default: siteUrl in app/data/site.ts). To print
// another address, start the dev server with the same one in NUXT_PUBLIC_SITE_URL.
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { siteUrl } from '../app/data/site.ts'

const url = process.env.RESUME_URL ?? 'http://localhost:3600/resume'
const site = (process.env.SITE_URL ?? siteUrl).replace(/\/$/, '')
const out = fileURLToPath(new URL('../public/bereket-abera-resume.pdf', import.meta.url))
const maxPages = 2

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ colorScheme: 'light' })
  const response = await page.goto(url, { waitUntil: 'networkidle' }).catch((error) => {
    throw new Error(`Could not open ${url}. Is the site running? (${error.message.split('\n')[0]})`)
  })
  if (!response?.ok()) throw new Error(`${url} answered ${response?.status() ?? 'nothing'}`)

  // Switch to the print styles before waiting, so fonts that only print uses are
  // fetched too. The labels and dates are set in the self-hosted mono font.
  await page.emulateMedia({ media: 'print' })
  const loaded = await page.evaluate(async () => {
    await document.fonts.load('1em "Fragment Mono"')
    await document.fonts.ready
    return [...document.fonts].filter(font => font.status === 'loaded').map(font => font.family.replaceAll('"', ''))
  })
  if (!loaded.includes('Fragment Mono')) throw new Error('Fragment Mono did not load')

  const printed = await page.evaluate((site) => {
    for (const link of document.querySelectorAll('a[href^="/"]')) link.href = site + link.getAttribute('href')
    return document.querySelector('.project-url')?.textContent?.trim() ?? ''
  }, site)
  if (!printed.startsWith(site.replace(/^https?:\/\//, ''))) {
    throw new Error(`The page prints "${printed}" but links point at ${site}. Start the dev server with NUXT_PUBLIC_SITE_URL=${site}.`)
  }

  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: false,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  })
}
finally {
  await browser.close()
}

// Page objects and embedded fonts are listed uncompressed, so the raw bytes are enough.
const pdf = await readFile(out)
const raw = pdf.toString('latin1')
const pages = raw.match(/\/Type\s*\/Page\b/g)?.length ?? 0
const fonts = [...new Set([...raw.matchAll(/\/BaseFont\s*\/(?:[A-Z]{6}\+)?([^\s/<>[\]]+)/g)].map(m => m[1]))]
const type3 = raw.match(/\/Subtype\s*\/Type3\b/g)?.length ?? 0

console.log(`${out}\n${pages} page${pages === 1 ? '' : 's'}, ${Math.round(pdf.length / 1024)} KB, fonts: ${fonts.join(', ') || 'none'}`)

const problems = []
if (pages < 1 || pages > maxPages) problems.push(`it has ${pages} pages; the résumé must fit on 1–${maxPages} A4 pages`)
// Chromium embeds variable fonts (like Literata) as Type 3, and their text does
// not copy or search cleanly, so the print styles use static system serifs.
if (type3) problems.push(`${type3} Type 3 font${type3 === 1 ? ' is' : 's are'} embedded; print text must use a static font such as Charter or Georgia`)
if (problems.length) {
  console.error(`The PDF needs work: ${problems.join('; ')}. See the print styles in app/pages/resume.vue.`)
  process.exitCode = 1
}
