// Screenshot individual elements: node scripts/shoot-sections.mjs <url> <outDir> <selector...>
import { chromium } from '@playwright/test'

const [url, outDir, ...selectors] = process.argv.slice(2)
const sizes = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
]

const browser = await chromium.launch()
for (const size of sizes) {
  const page = await browser.newPage(size)
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  for (const selector of selectors) {
    const el = page.locator(selector).first()
    await el.scrollIntoViewIfNeeded()
    const path = `${outDir}/${selector.replace(/\W+/g, '')}-${size.name}.png`
    await el.screenshot({ path })
    console.log(path)
  }
  await page.close()
}
await browser.close()
