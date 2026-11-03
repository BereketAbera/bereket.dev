import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { profile } from '../../app/data/profile'
import { siteUrl as SITE } from '../../app/data/site'
import { work } from '../../app/data/work'

// End-to-end checks against the static build: `pnpm build && pnpm test:e2e`
// (playwright.config.ts serves .output/public on port 4173). Page lists and
// expected text come from app/data, so these tests follow the data contract,
// not the case-study prose.

const caseStudies = work.map(item => ({ ...item, path: `/work/${item.slug}` }))
/** Every page: home, how I work, the case studies, the résumé and the lab. */
const pages = ['/', '/how-i-work', ...caseStudies.map(item => item.path), '/resume', '/lab']

interface LdNode {
  '@type'?: unknown
  '@graph'?: LdNode[]
  [key: string]: unknown
}

/** "/resume/" and "/resume" are the same page. */
function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/**
 * The local path behind `href` when it points at this build or at the production
 * site (social images and the résumé's project links use absolute URLs), else null.
 */
function localPath(href: string, origin: string): string | null {
  const url = new URL(href, origin)
  return url.origin === origin || url.origin === SITE ? normalize(url.pathname) : null
}

/** Opens `path` and stops the test straight away if it isn't served with a 200. */
async function visit(page: Page, path: string): Promise<void> {
  const response = await page.goto(path)
  expect(response?.status(), `GET ${path}`).toBe(200)
}

/** Resolves once Nuxt has hydrated the page, so Vue's event handlers are attached. */
async function hydrated(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    try {
      const { useNuxtApp } = window as unknown as { useNuxtApp?: () => { isHydrating: boolean } }
      return useNuxtApp?.().isHydrating === false
    }
    catch {
      return false // Nuxt has started, but its app instance isn't available yet.
    }
  })
}

/** Collects console errors and uncaught exceptions from this point on. */
function trackErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', error => errors.push(error.message))
  return errors
}

test.describe('home page', () => {
  test('has one h1 with the headline, a title, a description and a canonical URL', async ({ page }) => {
    await visit(page, '/')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(profile.headline)
    await expect.poll(() => page.title()).toContain(profile.name)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', profile.description)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`^${SITE}/?$`))
  })

  test('has an og:image with an absolute https URL', async ({ page }) => {
    await visit(page, '/')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`^${SITE}/\\S+$`))
  })

  test('describes Bereket as a schema.org Person in JSON-LD', async ({ page }) => {
    await visit(page, '/')
    const blocks = page.locator('script[type="application/ld+json"]')
    await expect(blocks).not.toHaveCount(0)
    const nodes = (await blocks.allTextContents()).flatMap((text) => {
      const data = JSON.parse(text) as LdNode | LdNode[] // a block that isn't valid JSON fails the test here
      return (Array.isArray(data) ? data : [data]).flatMap(node => node['@graph'] ?? [node])
    })
    const people = nodes.filter(node => node['@type'] === 'Person')
    expect(people).toHaveLength(1)
    expect(people[0]).toMatchObject({
      name: profile.name,
      jobTitle: expect.stringMatching(/\S/),
      address: { addressLocality: expect.stringMatching(/\S/), addressCountry: expect.stringMatching(/\S/) },
    })
  })

  test('loads without console errors', async ({ page }) => {
    const errors = trackErrors(page)
    await visit(page, '/')
    await hydrated(page)
    expect(errors, 'console errors').toEqual([])
  })
})

test.describe('navigation', () => {
  test('every in-page link in the header has a target on the home page', async ({ page }) => {
    await visit(page, '/')
    const hrefs = await page.getByRole('banner').locator('a[href*="#"]').evaluateAll(links =>
      links.map(link => link.getAttribute('href') ?? ''))
    const ids = hrefs.map(href => href.slice(href.indexOf('#') + 1))
    expect(ids).toEqual(expect.arrayContaining(['work', 'experience', 'about', 'contact']))
    for (const id of ids) {
      await expect(page.locator(`[id="${id}"]`), `#${id}`).toHaveCount(1)
    }
  })
})

test.describe('case studies', () => {
  for (const item of caseStudies) {
    test(`${item.path} renders its entry from app/data/work.ts`, async ({ page }) => {
      const errors = trackErrors(page)
      await visit(page, item.path)

      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toHaveText(item.headline)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${item.path}`)

      const facts = page.getByRole('complementary', { name: 'Project facts' })
      await expect(facts).toBeVisible()
      for (const fact of [item.roleDetail, item.period]) {
        await expect(facts).toContainText(fact)
      }

      if (item.evidence === 'employer') {
        await expect(page.getByText('What’s left out').first()).toBeVisible()
      }

      await hydrated(page)
      expect(errors, 'console errors').toEqual([])
    })
  }
})

test.describe('demos', () => {
  test.skip(({ isMobile }) => isMobile, 'Keyboard-driven demos; the markup is the same at every size, so these run once, on desktop')

  test('the grid demo saves by keyboard and ignores a save that returns after a newer edit', async ({ page }) => {
    await visit(page, '/')
    await hydrated(page)
    const grid = page.getByRole('grid', { name: /response grid/ })
    const cell = grid.locator('[data-cell="0-0"]')
    await cell.click()
    // Type-to-edit: the first key replaces the value.
    await page.keyboard.press('s')
    await page.keyboard.type('atin')
    await page.keyboard.press('Enter')
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('g')
    await page.keyboard.type('loss')
    await page.keyboard.press('Enter')
    const log = page.getByRole('log', { name: 'Save activity' })
    await expect(log).toContainText('Save 2 confirmed')
    await expect(log).toContainText('Save 1 came back after a newer edit, so it was ignored')
    await expect(cell).toContainText('gloss')
    await expect(cell).toHaveAttribute('data-state', 'saved')
  })

  test('the clip demo replays from the start', async ({ page }) => {
    await visit(page, '/')
    await hydrated(page)
    const demo = page.locator('.clip-demo').first()
    await expect(demo.locator('table')).toBeVisible()
    await demo.getByRole('button', { name: 'Replay from the start' }).click()
    await expect(demo.locator('table')).toHaveCount(0)
    await demo.getByRole('button', { name: 'Clip this page' }).click()
    await demo.getByRole('button', { name: 'Paste into the schedule' }).click()
    await expect(demo.locator('table')).toBeVisible()
  })
})

test.describe('résumé', () => {
  test('/resume renders and links the PDF', async ({ page }) => {
    const errors = trackErrors(page)
    await visit(page, '/resume')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator(`a[href="${profile.resumePdf}"]:visible`).first()).toBeVisible()
    await hydrated(page)
    expect(errors, 'console errors').toEqual([])
  })

  test(`${profile.resumePdf} is served as a PDF`, async ({ request }) => {
    const response = await request.get(profile.resumePdf)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/pdf')
    expect((await response.body()).subarray(0, 5).toString('latin1'), 'PDF signature').toBe('%PDF-')
  })
})

test.describe('not-found page', () => {
  test('an unknown route renders the not-found page with a link home', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page).toHaveTitle(/not found/i)
    await expect(page.getByRole('main').locator('a[href="/"]').first()).toBeVisible()
  })
})

test.describe('keyboard', () => {
  test('the first Tab reaches the skip link, and Enter moves focus to #main', async ({ page }) => {
    await visit(page, '/')
    await hydrated(page)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: /skip/i })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })
})

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'The menu button only shows below the lg breakpoint')

  test('the Menu button toggles the nav, and Escape closes it', async ({ page }) => {
    await visit(page, '/')
    await hydrated(page)
    const controls = await page.getByRole('button', { name: 'Menu' }).getAttribute('aria-controls')
    expect(controls, 'the Menu button names the element it controls').toBeTruthy()
    // Located by what it controls, because its label changes while the menu is open.
    const button = page.locator(`button[aria-controls="${controls}"]`)
    const nav = page.locator(`[id="${controls}"]`)

    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(nav).toBeHidden()

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(nav).toBeVisible()

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(nav).toBeHidden()

    await button.click()
    await expect(nav).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(nav).toBeHidden()
  })
})

test.describe('layout', () => {
  for (const path of pages) {
    test(`${path} does not scroll sideways`, async ({ page }) => {
      await visit(page, path)
      await page.evaluate(async () => {
        await document.fonts.ready
      })
      const { scrollWidth, innerWidth, overflowing } = await page.evaluate(() => {
        const width = window.innerWidth
        const overflowing = Array.from(document.body.querySelectorAll('*'))
          .filter(element => element.getBoundingClientRect().right > width + 1)
          .slice(0, 5)
          .map(element => [element.tagName.toLowerCase(), ...Array.from(element.classList)].join('.'))
        return { scrollWidth: document.documentElement.scrollWidth, innerWidth: width, overflowing }
      })
      expect(scrollWidth, `wider than the ${innerWidth}px viewport: ${overflowing.join(', ')}`).toBeLessThanOrEqual(innerWidth)
    })
  }
})

test.describe('links and files', () => {
  test.skip(({ isMobile }) => isMobile, 'The HTML is the same at every size, so these run once, on desktop')

  test('every internal link resolves', async ({ page, request }) => {
    test.slow()
    const linkedFrom = new Map<string, string>()
    for (const path of pages) {
      await page.goto(path)
      const origin = new URL(page.url()).origin
      const hrefs = await page.locator('a[href]').evaluateAll(links =>
        links.map(link => new URL(link.getAttribute('href') ?? '', document.baseURI).href))
      for (const href of hrefs) {
        const target = localPath(href, origin)
        if (target && !linkedFrom.has(target)) linkedFrom.set(target, path)
      }
    }
    const broken: string[] = []
    for (const [target, source] of linkedFrom) {
      const status = (await request.get(target)).status()
      if (status !== 200) broken.push(`${target} → ${status} (linked from ${source})`)
    }
    expect(broken).toEqual([])
  })

  test('every file the <head> points at is in the build', async ({ page, request }) => {
    test.slow()
    const referencedFrom = new Map<string, string>()
    for (const path of pages) {
      await page.goto(path)
      const origin = new URL(page.url()).origin
      const hrefs = await page.evaluate(() => [
        ...Array.from(document.head.querySelectorAll('link[href]'), link => new URL(link.getAttribute('href') ?? '', document.baseURI).href),
        ...Array.from(document.head.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]'), meta => meta.getAttribute('content') ?? ''),
      ])
      for (const href of hrefs) {
        const target = localPath(href, origin)
        if (target && !referencedFrom.has(target)) referencedFrom.set(target, path)
      }
    }
    const missing: string[] = []
    for (const [target, source] of referencedFrom) {
      const status = (await request.get(target)).status()
      if (status !== 200) missing.push(`${target} → ${status} (in the <head> of ${source})`)
    }
    expect(missing).toEqual([])
  })

  test('sitemap.xml lists every page on the site address', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    const locs = Array.from((await response.text()).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g), match => match[1] ?? '')
    expect(locs.filter(loc => loc !== SITE && !loc.startsWith(`${SITE}/`)), `URLs outside ${SITE}`).toEqual([])
    const paths = locs.map(loc => normalize(new URL(loc).pathname))
    expect(paths).toEqual(expect.arrayContaining(pages))
    for (const path of paths) {
      expect((await request.get(path)).status(), `${path} is in the sitemap but not in the build`).toBe(200)
    }
  })
})

test.describe('accessibility', () => {
  for (const path of pages) {
    for (const colorScheme of ['light', 'dark'] as const) {
      test(`${path} has no serious or critical axe violations (${colorScheme})`, async ({ page }, testInfo) => {
        await page.emulateMedia({ colorScheme })
        await visit(page, path)
        await hydrated(page)
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
        await testInfo.attach(`axe-${colorScheme}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' })
        const blocking = results.violations
          .filter(violation => violation.impact === 'serious' || violation.impact === 'critical')
          .map(violation => `${violation.id} (${violation.impact}): ${violation.help} → ${violation.nodes.map(node => node.target.join(' ')).join(', ')}`)
        expect(blocking, 'the full axe results are attached to this test').toEqual([])
      })
    }
  }
})
