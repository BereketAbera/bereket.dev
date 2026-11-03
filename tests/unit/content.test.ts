import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { capabilities } from '../../app/data/capabilities'
import { experience } from '../../app/data/experience'
import { journey } from '../../app/data/journey'
import { lab } from '../../app/data/lab'
import { platform } from '../../app/data/platform'
import { mailto, profile } from '../../app/data/profile'
import { work } from '../../app/data/work'

// The wiring between what the site claims and the evidence behind it. These
// tests read the data files and page sources, never the prose, so they keep
// holding while the case studies are rewritten.

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = (file: string) => readFileSync(join(root, file), 'utf8')
const slugs = new Set(work.map(item => item.slug))

const TEXT_EXTENSIONS = new Set(['.vue', '.ts', '.mts', '.js', '.mjs', '.cjs', '.css', '.html', '.md', '.json', '.txt', '.xml', '.svg', '.yml', '.yaml', '.webmanifest'])
/** Dependencies, build output and local tooling: never published. */
const UNPUBLISHED = new Set(['node_modules', '.git', '.nuxt', '.output', '.data', '.nitro', '.cache', '.vercel', '.claude', 'dist', 'test-results', 'playwright-report', 'pnpm-lock.yaml'])

/** Repo-relative paths of the text files under `dir`. */
function textFiles(dir: string): string[] {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    if (UNPUBLISHED.has(entry.name)) return []
    const path = dir ? `${dir}/${entry.name}` : entry.name
    if (entry.isDirectory()) return textFiles(path)
    return entry.isFile() && TEXT_EXTENSIONS.has(extname(entry.name)) ? [path] : []
  })
}

/**
 * "file:line" for every line in `files` that matches `pattern`. The line itself is
 * left out when `quote` is false, so a leaked value isn't repeated in CI logs.
 */
function findLines(files: string[], pattern: RegExp, quote = true): string[] {
  return files.flatMap(file => read(file).split('\n').flatMap((line, index) =>
    line.search(pattern) === -1 ? [] : [`${file}:${index + 1}${quote ? `  ${line.trim().slice(0, 120)}` : ''}`],
  ))
}

function isHttps(href: string): boolean {
  try {
    return new URL(href).protocol === 'https:'
  }
  catch {
    return false
  }
}

function duplicates(values: readonly string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index)
}

/** Attributes of every <CaseStudy> opening tag in a single-file component. */
function caseStudyTags(source: string): Array<Record<string, string>> {
  const tag = /<CaseStudy((?:\s+[^\s"'=<>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*)\s*\/?>/g
  const attribute = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g
  return [...source.replace(/<!--[\s\S]*?-->/g, '').matchAll(tag)].map(([, attributes = '']) =>
    Object.fromEntries([...attributes.matchAll(attribute)].map(([, name = '', double, single]) => [name, double ?? single ?? ''])),
  )
}

/** First four-digit year in a date such as "May 2023" or "2021". */
function year(date: string): number {
  const match = /\b(?:19|20)\d{2}\b/.exec(date)
  return match ? Number(match[0]) : Number.NaN
}

const appFiles = textFiles('app')
/** The repository is public (the footer links to its source), so everything in it is published. */
const repoFiles = textFiles('')
/** Tests hold fake data and the very patterns they look for, so the pattern scans skip them. */
const contentFiles = repoFiles.filter(file => !file.startsWith('tests/'))

describe('case-study pages', () => {
  it.each([...slugs])('/work/%s has a page that passes its slug to <CaseStudy>', (slug) => {
    const file = `app/pages/work/${slug}.vue`
    expect(existsSync(join(root, file)), `${file} is missing`).toBe(true)
    const tags = caseStudyTags(read(file))
    expect(tags, `${file} should render exactly one <CaseStudy>`).toHaveLength(1)
    expect(tags[0]?.slug, `${file} should pass slug="${slug}" as a plain attribute`).toBe(slug)
  })

  it('has no page under app/pages/work without an entry in app/data/work.ts', () => {
    const orphans = readdirSync(join(root, 'app/pages/work'))
      .filter(file => file.endsWith('.vue') && file !== 'index.vue' && !file.startsWith('['))
      .map(file => file.slice(0, -'.vue'.length))
      .filter(slug => !slugs.has(slug))
    expect(orphans).toEqual([])
  })

  it('uses URL-safe slugs', () => {
    expect([...slugs].filter(slug => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toEqual([])
  })
})

describe('list keys', () => {
  // Each of these is a v-for :key; a duplicate makes Vue reuse the wrong row.
  it('are unique', () => {
    expect(duplicates(work.map(item => item.slug)), 'work slugs').toEqual([])
    expect(duplicates(capabilities.map(cap => cap.id)), 'capability ids').toEqual([])
    expect(duplicates(journey.map(stage => stage.id)), 'journey stage ids').toEqual([])
    for (const stage of journey) {
      expect(duplicates(stage.evidence.map(ev => ev.label)), `evidence labels in stage ${stage.id}`).toEqual([])
      expect(duplicates(stage.proof), `proof in stage ${stage.id}`).toEqual([])
    }
    expect(duplicates(platform.layers.map(layer => layer.id)), 'platform layer ids').toEqual([])
    expect(duplicates(experience.map(role => role.org)), 'experience orgs').toEqual([])
    expect(duplicates(lab.map(entry => entry.title)), 'lab titles').toEqual([])
    for (const cap of capabilities) {
      expect(duplicates(cap.evidence.map(item => item.label)), `evidence labels in ${cap.id}`).toEqual([])
      expect(duplicates(cap.points), `points in ${cap.id}`).toEqual([])
      expect(duplicates(cap.tools), `tools in ${cap.id}`).toEqual([])
      expect(duplicates(cap.workingKnowledge ?? []), `working knowledge in ${cap.id}`).toEqual([])
    }
    for (const item of work) {
      expect(duplicates(item.links.map(link => link.href)), `links in ${item.slug}`).toEqual([])
    }
  })
})

describe('capability and journey evidence', () => {
  const evidence = [
    ...capabilities.flatMap(cap => cap.evidence.map(item => ({ ...item, where: `${cap.id} → ${item.label}` }))),
    ...journey.flatMap(stage => stage.evidence.map(item => ({ ...item, where: `stage ${stage.id} → ${item.label}` }))),
  ]

  it('backs every capability and journey stage with at least one link', () => {
    expect(capabilities.filter(cap => cap.evidence.length === 0).map(cap => cap.id)).toEqual([])
    expect(journey.filter(stage => stage.evidence.length === 0).map(stage => stage.id)).toEqual([])
  })

  it('gives every item exactly one of `work` or `href`', () => {
    expect(evidence.filter(item => (item.work === undefined) === (item.href === undefined)).map(item => item.where)).toEqual([])
  })

  it('points `work` at case studies that exist', () => {
    const missing = evidence.filter(item => item.work !== undefined && !slugs.has(item.work))
    expect(missing.map(item => `${item.where}: ${item.work}`)).toEqual([])
  })

  it('points `href` at an https URL or at a section of the home page', () => {
    const homeIds = new Set(Array.from(read('app/pages/index.vue').matchAll(/\sid="([^"]+)"/g), match => match[1]))
    const bad = evidence.filter(({ href }) => href !== undefined && !(href.startsWith('#') ? homeIds.has(href.slice(1)) : isHttps(href)))
    expect(bad.map(item => `${item.where}: ${item.href}`)).toEqual([])
  })
})

describe('ownership tiers', () => {
  // Working knowledge is what I know but haven't shipped with. A technology
  // listed in both places would claim more than the site means to.
  it('never lists the same technology as shipped and as working knowledge', () => {
    const shipped = new Set(capabilities.flatMap(cap => cap.tools.map(tool => tool.toLowerCase())))
    const both = capabilities.flatMap(cap => (cap.workingKnowledge ?? []).filter(item => shipped.has(item.toLowerCase())).map(item => `${cap.id}: ${item}`))
    expect(both).toEqual([])
  })

  it('says what every case study touched', () => {
    expect(work.filter(item => item.spans.length === 0).map(item => item.slug)).toEqual([])
  })

  it('describes my part in every platform layer', () => {
    expect(platform.layers.filter(layer => !layer.platform.trim() || !layer.mine.trim()).map(layer => layer.id)).toEqual([])
  })
})

describe('experience', () => {
  it('links only to case studies that exist', () => {
    const missing = experience.flatMap(role => (role.work ?? []).filter(slug => !slugs.has(slug)).map(slug => `${role.org} → ${slug}`))
    expect(missing).toEqual([])
  })

  it('lists roles newest first by start year', () => {
    const starts = experience.map(role => ({ label: `${role.start} ${role.org}`, year: year(role.start) }))
    expect(starts.filter(start => Number.isNaN(start.year)).map(start => start.label), 'start dates need a four-digit year').toEqual([])
    const newestFirst = [...starts].sort((a, b) => b.year - a.year)
    expect(starts.map(start => start.label)).toEqual(newestFirst.map(start => start.label))
  })

  it('never ends a role before it starts', () => {
    const backwards = experience.filter(role => typeof role.end === 'string' && !(year(role.end) >= year(role.start)))
    expect(backwards.map(role => `${role.org}: ${role.start} – ${role.end}`)).toEqual([])
  })
})

describe('page metadata', () => {
  it('keeps meta descriptions within 160 characters', () => {
    expect(profile.description.length, 'profile.description').toBeLessThanOrEqual(160)
    for (const item of work) expect(item.metaDescription.length, item.slug).toBeLessThanOrEqual(160)
  })

  it('keeps case-study titles short enough for search results', () => {
    for (const item of work) expect(`${item.metaTitle} · ${profile.name}`.length, item.slug).toBeLessThanOrEqual(65)
  })
})

describe('links and contact', () => {
  it('has a valid email address', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/)
    expect(profile.email, 'the old site linked a mistyped @mail.com address').not.toMatch(/@mail\.com$/i)
  })

  it('builds a mailto link with the subject percent-encoded', () => {
    const url = new URL(mailto)
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe(profile.email)
    expect(url.searchParams.get('subject')).toBe(profile.emailSubject)
    expect(url.search, 'spaces must be %20; mail clients show a "+" as is').not.toMatch(/[\s+]/)
  })

  it('uses https for every external link in the data', () => {
    const hrefs = [
      ...Object.values(profile.links).filter((href): href is string => typeof href === 'string'),
      ...work.flatMap(item => item.links.map(link => link.href)),
      ...lab.map(entry => entry.link.href),
    ]
    expect(hrefs.filter(href => !isHttps(href))).toEqual([])
  })
})

describe('published text', () => {
  const placeholders = [/\(placeholder\)/i, /\[placeholder/i, /\bTODO\b/, /\blorem\b/i, /case study in progress/i]

  // Publishing rules for employer work and personal details: no ticket IDs, PR
  // numbers, staging or preview URLs, or phone number anywhere in the repository.
  const sensitive: Record<string, RegExp> = {
    // Any tracker-style key such as ABC-42. Specific project keys stay in the private denylist.
    'ticket ID': /\b(?!UTC-|UTF-)[A-Z][A-Z0-9]{1,9}-\d+\b/,
    'PR number': /\bPR\s?#?\d+\b/,
    'staging or preview URL': /https?:\/\/[^\s/"'`<>)]*(?:staging|preview|-git-)|\bstaging\.[a-z0-9-]+\.[a-z]{2,}/i,
    'phone number': /(?:\+|\b00)251[\s.-]*(?:\(0\))?(?:[\s.()-]*\d){9}(?!\d)/,
  }

  // Names that must stay private can't be listed in a public repository, so a
  // local list can be passed in, one term per line (# starts a comment):
  //   CONTENT_DENYLIST=/path/outside/the/repo.txt pnpm test
  const denylistFile = process.env.CONTENT_DENYLIST
  const denylist = denylistFile
    ? readFileSync(denylistFile, 'utf8').split('\n').map(term => term.trim()).filter(term => term && !term.startsWith('#'))
    : []

  // EXPECTED TO FAIL while any case-study page still holds its scaffold text.
  // That is fine until the pages are written; it must pass before launch.
  it('leaves no placeholder text in app/', () => {
    const hits = [...new Set(placeholders.flatMap(pattern => findLines(appFiles, pattern)))]
    expect(hits, 'Placeholder text in app/. Expected to fail until the case-study pages are written; must pass before launch').toEqual([])
  })

  it('contains no ticket IDs, PR numbers, staging or preview URLs, or phone numbers', () => {
    const hits = Object.entries(sensitive).flatMap(([what, pattern]) => findLines(contentFiles, pattern, false).map(at => `${at} (${what})`))
    expect(hits).toEqual([])
  })

  it.skipIf(denylist.length === 0)('contains none of the terms in CONTENT_DENYLIST', () => {
    const hits = denylist.flatMap((term, index) => {
      // Letter boundaries, so a short term doesn't match inside an ordinary word.
      const pattern = new RegExp(`(?<![A-Za-z])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z])`, 'i')
      return findLines(repoFiles, pattern, false).map(at => `${at} (term ${index + 1})`)
    })
    expect(hits).toEqual([])
  })
})

describe('static files', () => {
  // Root-relative paths such as "/og/home.png" are served from public/; a missing
  // file is a broken image, icon or download that the prerender doesn't catch.
  it('has every file that app/ and nuxt.config.ts point at in public/', () => {
    const asset = /(?<=["'`(\s,])\/(?!\/)[\w./-]+\.(?:pdf|png|jpe?g|webp|avif|gif|svg|ico|woff2?|webmanifest)\b/g
    const missing = [...appFiles, 'nuxt.config.ts'].flatMap(file => Array.from(read(file).matchAll(asset), ([path]) => path)
      .filter(path => !existsSync(join(root, 'public', path)))
      .map(path => `${path} (referenced in ${file})`))
    expect([...new Set(missing)], 'Referenced but missing from public/').toEqual([])
  })
})
