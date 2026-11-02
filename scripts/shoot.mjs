// Screenshot a page at desktop and mobile sizes: node scripts/shoot.mjs <url|file> <outPrefix> [--viewport-only]
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const [target, outPrefix, flag] = process.argv.slice(2)
if (!target || !outPrefix) {
  console.error('usage: node scripts/shoot.mjs <url|file> <outPrefix> [--viewport-only]')
  process.exit(1)
}
const url = /^https?:/.test(target) ? target : pathToFileURL(resolve(target)).href
const fullPage = flag !== '--viewport-only'

const sizes = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
]

const browser = await chromium.launch()
for (const size of sizes) {
  const page = await browser.newPage(size)
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const path = `${outPrefix}-${size.name}.png`
  await page.screenshot({ path, fullPage })
  console.log(path)
  await page.close()
}
await browser.close()
