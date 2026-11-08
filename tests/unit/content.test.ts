import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { capabilities } from '../../app/data/capabilities'
import { experience } from '../../app/data/experience'
import { lab } from '../../app/data/lab'
import { mailto, profile } from '../../app/data/profile'
import { projects, work } from '../../app/data/work'

// The wiring between what the site claims and the evidence behind it. These
// tests read the data files and page sources, never the prose, so they keep
// holding while the case studies are rewritten.

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = (file: string) => readFileSync(join(root, file), 'utf8')
const slugs = new Set(work.filter(item => item.caseStudy).map(item => item.slug))
const allSlugs = work.map(item => item.slug)

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
    expect(duplicates(allSlugs), 'work slugs').toEqual([])
    expect(duplicates(capabilities.map(cap => cap.id)), 'capability ids').toEqual([])
    expect(duplicates(experience.map(role => role.org)), 'experience orgs').toEqual([])
    expect(duplicates(lab.map(entry => entry.title)), 'lab titles').toEqual([])
    for (const cap of capabilities) {
      expect(duplicates(cap.evidence.map(item => item.label)), `evidence labels in ${cap.id}`).toEqual([])
    }
    for (const item of work) {
      expect(duplicates(item.links.map(link => link.href)), `links in ${item.slug}`).toEqual([])
      expect(duplicates(item.built.map(note => note.tech)), `tech notes in ${item.slug}`).toEqual([])
      expect(duplicates(item.shots.map(shot => shot.file)), `shots in ${item.slug}`).toEqual([])
    }
  })
})

describe('capability evidence', () => {
  const evidence = capabilities.flatMap(cap => cap.evidence.map(item => ({ ...item, where: `${cap.id} → ${item.label}` })))

  it('backs every capability with at least one link', () => {
    expect(capabilities.filter(cap => cap.evidence.length === 0).map(cap => cap.id)).toEqual([])
  })

  it('states how deep every capability goes', () => {
    expect(capabilities.filter(cap => !cap.depth.trim()).map(cap => cap.id)).toEqual([])
  })

  it('gives every item exactly one of `work` or `href`', () => {
    expect(evidence.filter(item => (item.work === undefined) === (item.href === undefined)).map(item => item.where)).toEqual([])
  })

  it('points `work` at case studies that exist', () => {
    const missing = evidence.filter(item => item.work !== undefined && !slugs.has(item.work))
    expect(missing.map(item => `${item.where}: ${item.work}`)).toEqual([])
  })

  it('points `href` at an https URL or at a page (and section) of this site', () => {
    /** "/resume#skills": the page file exists and has that id; "#projects": a section of the home page. */
    const resolves = (href: string) => {
      if (!href.startsWith('/') && !href.startsWith('#')) return isHttps(href)
      const [path = '', id] = href.split('#')
      const file = `app/pages/${path === '' || path === '/' ? 'index' : path.slice(1)}.vue`
      if (!existsSync(join(root, file))) return false
      return id === undefined || new RegExp(`\\sid="${id}"`).test(read(file))
    }
    const bad = evidence.filter(({ href }) => href !== undefined && !resolves(href))
    expect(bad.map(item => `${item.where}: ${item.href}`)).toEqual([])
  })
})

describe('project entries', () => {
  it('says what is mine on every entry', () => {
    expect(work.filter(item => !item.myPart.trim()).map(item => item.slug)).toEqual([])
  })

  it('credits the upstream project wherever one is the foundation', () => {
    const uncredited = work.filter(item => item.foundation && (!isHttps(item.foundation.href) || !item.foundation.license || !item.foundation.note))
    expect(uncredited.map(item => item.slug)).toEqual([])
    expect(work.find(item => item.slug === 'wayline')?.foundation?.name, 'the Plane deployment must credit Plane').toMatch(/Plane/)
  })

  it('leads with one project and gives the projects unequal space on purpose', () => {
    expect(projects.filter(item => item.weight === 'lead')).toHaveLength(1)
    expect(projects[0]?.weight, 'the lead project comes first').toBe('lead')
    expect(projects.filter(item => item.weight === 'compact').length).toBeGreaterThanOrEqual(1)
  })

  it('explains technology through what it enabled', () => {
    expect(work.flatMap(item => item.built.filter(note => !note.enabled.trim()).map(note => `${item.slug}: ${note.tech}`))).toEqual([])
  })
})

describe('screenshots', () => {
  const shots = work.flatMap(item => item.shots.map(shot => ({ ...shot, slug: item.slug })))

  /** Width and height from a WebP file's header (VP8, VP8L and VP8X encodings). */
  function webpSize(file: string): { width: number, height: number } {
    const bytes = readFileSync(join(root, 'public', file))
    expect(bytes.subarray(0, 4).toString('latin1'), `${file} is not a WebP`).toBe('RIFF')
    const format = bytes.subarray(12, 16).toString('latin1')
    if (format === 'VP8X') return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) }
    if (format === 'VP8L') {
      const bits = bytes.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff }
  }

  it('has every width of every screenshot in public/img/projects', () => {
    const missing = shots.flatMap(shot => (shot.widths ?? [960, 1600]).map(width => `/img/projects/${shot.file}-${width}.webp`).filter(path => !existsSync(join(root, 'public', path))))
    expect(missing).toEqual([])
  })

  it('declares the real size of the largest file, so the layout does not jump', () => {
    const wrong = shots.flatMap((shot) => {
      const widths = shot.widths ?? [960, 1600]
      const size = webpSize(`/img/projects/${shot.file}-${widths[widths.length - 1]}.webp`)
      return size.width === shot.width && size.height === shot.height ? [] : [`${shot.file}: declared ${shot.width}x${shot.height}, file is ${size.width}x${size.height}`]
    })
    expect(wrong).toEqual([])
  })

  it('describes every screenshot and says where it came from', () => {
    expect(shots.filter(shot => shot.alt.trim().length < 20 || !shot.caption.trim() || !shot.host.trim()).map(shot => shot.file)).toEqual([])
  })

  it('keeps each image small enough for a fast page', () => {
    const heavy = shots.flatMap(shot => (shot.widths ?? [960, 1600]).flatMap((width) => {
      const path = `/img/projects/${shot.file}-${width}.webp`
      const kb = readFileSync(join(root, 'public', path)).length / 1024
      return kb > 160 ? [`${path}: ${Math.round(kb)} KB`] : []
    }))
    expect(heavy).toEqual([])
  })
})

describe('experience', () => {
  it('links only to case studies that exist', () => {
    const missing = experience.flatMap(role => (role.work && !slugs.has(role.work) ? [`${role.org} → ${role.work}`] : []))
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
    expect(backwards.map(role => `${role.org}: ${role.start} to ${role.end}`)).toEqual([])
  })
})

describe('page metadata', () => {
  it('keeps meta descriptions within 160 characters', () => {
    expect(profile.description.length, 'profile.description').toBeLessThanOrEqual(160)
    for (const item of work.filter(entry => entry.caseStudy)) expect(item.metaDescription.length, item.slug).toBeLessThanOrEqual(160)
  })

  it('keeps case-study titles short enough for search results', () => {
    for (const item of work.filter(entry => entry.caseStudy)) expect(`${item.metaTitle} · ${profile.name}`.length, item.slug).toBeLessThanOrEqual(65)
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
    'ticket ID': /\b(?!UTC-|UTF-|AGPL-|GPL-|MPL-|CVE-|ISO-|HTTP-|TLS-|K3S-)[A-Z][A-Z0-9]{1,9}-\d+\b/,
    'PR number': /\bPR\s?#?\d+\b/,
    'staging or preview URL': /https?:\/\/[^\s/"'`<>)]*(?:staging|preview|-git-)|\bstaging\.[a-z0-9-]+\.[a-z]{2,}/i,
    'phone number': /(?:\+|\b00)251[\s.-]*(?:\(0\))?(?:[\s.()-]*\d){9}(?!\d)/,
    'IP address': /\b(?!127\.0\.0\.1\b)(?:\d{1,3}\.){3}\d{1,3}\b/,
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

  // The owner's house style: straight quotes and apostrophes, no em or en dashes.
  it('uses straight quotes and no em or en dashes in published text', () => {
    const typography = /[\u2018\u2019\u201C\u201D\u2013\u2014]/
    // The licence is verbatim third-party text.
    expect(findLines(contentFiles.filter(file => file !== 'LICENSE'), typography)).toEqual([])
  })

  it('avoids inflated language in the visible copy', () => {
    const inflated = /\b(?:world[- ]class|cutting[- ]edge|best[- ]in[- ]class|blazing|seamless(?:ly)?|game[- ]chang|production[- ]grade|rockstar|ninja|synerg)/i
    expect(findLines([...appFiles.filter(file => file.startsWith('app/data/') || file.startsWith('app/pages/')), ...repoFiles.filter(file => file.startsWith('drafts/'))], inflated)).toEqual([])
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

describe('retired URLs', () => {
  // Case studies merged into /work/acelab: old links, the previous PDF and copies already
  // sent must keep working.
  const redirects = (JSON.parse(read('vercel.json')) as { redirects?: Array<{ source: string, destination: string, permanent: boolean }> }).redirects ?? []

  it('redirects every retired page permanently to a page that exists', () => {
    const retired = ['/work/workflow-engineering', '/work/browser-extensions', '/work/data-interfaces', '/work/realtime-sync', '/work/modernization', '/how-i-work']
    for (const source of retired) {
      const redirect = redirects.find(item => item.source === source)
      expect(redirect, source).toBeDefined()
      expect(redirect?.permanent, source).toBe(true)
      const destination = (redirect?.destination ?? '').split('#')[0] || '/'
      const file = destination === '/' ? 'app/pages/index.vue' : `app/pages${destination}.vue`
      expect(existsSync(join(root, file)), `${source} redirects to ${destination}, which has no page`).toBe(true)
    }
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
