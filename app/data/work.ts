import type { EvidenceKind, Work } from './types'

/**
 * Everything the site presents as work, in home-page order: personal projects first, with
 * a weight that sets how much room each one earns, then the rest. Entries with
 * `caseStudy: true` have a page at /work/<slug>. Each entry states what is mine and what
 * came from elsewhere.
 */
export const work: Work[] = [
  {
    slug: 'rillmark',
    title: 'Rillmark',
    kicker: 'A React component library on npm, with three visual presets',
    headline: 'Rillmark: a React component library with a tested release path',
    metaTitle: 'Rillmark: a React component library on npm',
    metaDescription: 'A React 19 component library on npm: 48 components, three visual presets and release checks on the packed package.',
    summary: '48 React 19 components whose look switches between three presets with two HTML attributes. The documentation site has live previews, generated API tables and five example apps running on sample data.',
    myPart: 'I built it on Radix primitives, with its documentation site and release checks, and publish it under my npm account.',
    demonstrates: 'One token file generates all three presets in light and dark, and version 0.2.0 was tested as the packed package in a fresh app before it was published.',
    foundation: {
      name: 'Radix Primitives',
      href: 'https://www.radix-ui.com/primitives',
      license: 'MIT',
      note: 'Used directly by 26 of the 48 components, mostly for focus, keyboard and positioning. Token and part names follow shadcn conventions.',
    },
    evidence: 'project',
    status: 'Live and published on npm',
    statusNote: 'Version 0.2. Accessibility checks are automated and run in Chromium. Safari, Firefox and screen readers are not tested.',
    period: 'Nov 2026',
    years: '2026',
    built: [
      { tech: 'A single tokens file', enabled: 'Generates CSS for three presets in light and dark, with no theme provider at run time.' },
      { tech: 'TypeScript AST tooling', enabled: 'Generates API tables and agent-readable docs from the source, and CI fails if they drift.' },
      { tech: 'axe and Playwright', enabled: 'Scan all 48 component pages in six palettes and drive keyboard paths in a real browser.' },
      { tech: 'A packed-tarball test', enabled: 'Installs the built package in a fresh app and checks both stylesheet paths before release.' },
    ],
    links: [
      { label: 'Live docs', href: 'https://rillmark.bereket.dev', kind: 'live' },
      { label: 'npm package', href: 'https://www.npmjs.com/package/rillmark', kind: 'package' },
      { label: 'Source of one component', href: 'https://rillmark.bereket.dev/source/button.tsx', kind: 'repo' },
    ],
    shots: [
      { file: 'rillmark/presets', width: 1600, height: 1000, source: 'live', host: 'rillmark.bereket.dev', alt: 'Rillmark documentation page titled Same components, new character, with three preset cards named Fieldnotes, Studio and Play.', caption: 'One component set, three presets. Choosing one restyles the whole documentation site.' },
      { file: 'rillmark/dashboard', width: 1600, height: 1000, source: 'live', host: 'rillmark.bereket.dev', alt: 'A project dashboard built from Rillmark components, with metric cards and a searchable table of fictional projects.', caption: 'One of five example apps. The company and figures are fictional.' },
      { file: 'rillmark/dashboard-phone', width: 480, height: 1039, widths: [480], phone: true, source: 'live', host: 'rillmark.bereket.dev', alt: 'The Rillmark example dashboard at phone width.', caption: 'The same example at phone width.' },
    ],
    weight: 'lead',
    caseStudy: true,
  },
  {
    slug: 'frameflow',
    title: 'Frameflow',
    kicker: 'A video processing pipeline with an upload studio and a public watch site',
    headline: 'Frameflow: from an uploaded MP4 to a private adaptive stream',
    metaTitle: 'Frameflow: upload to adaptive video stream',
    metaDescription: 'A video processing pipeline: direct uploads, Hatchet workflows, FFmpeg encodes and HLS playback, deployed with K3s and Argo CD on my own server.',
    summary: 'An uploaded MP4 becomes a private adaptive stream in 360p and 720p. A background workflow checks and encodes the file, and a video is never visible half finished.',
    myPart: 'I built the upload studio, API, processing workflow and watch site, and deployed them on my own server with K3s, Argo CD and GitHub Actions.',
    demonstrates: 'That I can take a multi-service system all the way to a running server, where upload, encoding, playback and failure cases were then tested.',
    evidence: 'project',
    status: 'Running on my own server',
    statusNote: 'Read-only for visitors. No outside users are on record. The public link will follow once its landing page is updated.',
    period: 'Sep 2026 (first version), Nov 2026 (product and deployment)',
    years: '2026',
    built: [
      { tech: 'Presigned uploads', enabled: 'Keep uploads off the API. The browser sends the file straight to private object storage, and the API checks it afterwards.' },
      { tech: 'Hatchet', enabled: 'Runs the pipeline as small tasks with timeouts, retries and a queue, so one failed encode retries without redoing the rest.' },
      { tech: 'FFmpeg and HLS', enabled: 'Produce 360p and 720p renditions with fixed-length segments for adaptive playback.' },
      { tech: 'Next.js and Video.js', enabled: 'Power the upload studio, the four-stage status view and playback through a private stream proxy. The player controls are Video.js\'s own skin.' },
      { tech: 'K3s and Argo CD', enabled: 'Run the web app, API, worker, queue and storage on one server, each image pinned by digest.' },
    ],
    links: [],
    shots: [
      { file: 'frameflow/studio', width: 1340, height: 1017, widths: [960, 1340], source: 'local', host: 'Frameflow studio', alt: 'Frameflow studio with an upload card, counters for total, completed and in-progress videos, and a list of five sample records showing queued, processing, failed and completed states.', caption: 'The owner-only studio, rendered locally. The five videos are seeded sample records, and nothing was uploaded or encoded for this capture.' },
      { file: 'frameflow/pipeline', width: 1260, height: 580, widths: [960, 1260], source: 'local', host: 'Video detail', alt: 'Frameflow video detail page for a sample record in the processing state, with a four-stage timeline: upload, queue, transcode and publish.', caption: 'The status page for a sample record marked as processing, with its four-stage timeline. Local preview: no encode was running.' },
    ],
    weight: 'feature',
    caseStudy: true,
  },
  {
    slug: 'wayline',
    title: 'Wayline',
    kicker: 'A self-hosted deployment of Plane, an open-source project tracker',
    headline: 'Wayline: a self-hosted platform around an open-source app',
    metaTitle: 'Wayline: a self-hosted platform around Plane',
    metaDescription: 'A customized deployment of Plane Community Edition. I built the platform around it: Kubernetes, GitOps, CI/CD, secrets, monitoring, backups and tests.',
    summary: 'The application is Plane Community Edition, customized. The work here is everything around it: how it is built, released, secured, monitored and restored on my own server.',
    myPart: 'I built and run everything around Plane on my own server: Kubernetes (K3s), GitOps with Argo CD, CI/CD in GitHub Actions, secrets, monitoring and tested backups, plus the rebrand.',
    demonstrates: 'That I can deploy and operate a multi-service application: images pinned per release, traffic denied by default, tested restores and alerts to my phone.',
    foundation: {
      name: 'Plane Community Edition',
      href: 'https://github.com/makeplane/plane',
      license: 'AGPL-3.0',
      note: 'Made by the Plane team. Every application feature is theirs. Wayline changes the branding and some defaults, removes billing and upgrade prompts, and keeps the license notices.',
    },
    evidence: 'project',
    status: 'Running on my own server',
    statusNote: 'One node, one replica of each service, no failover. I am the only person using it, and sign-up is closed.',
    period: 'Nov 2026',
    years: '2026',
    built: [
      { tech: 'Argo CD and GitHub Actions', enabled: 'Release Plane\'s images only after a signed record shows those exact digests ran in the local dev environment. Other images pass CI checks.' },
      { tech: 'Infisical', enabled: 'Keeps secrets out of Git, with a separate project and identity for each environment.' },
      { tech: 'Kubernetes network policies', enabled: 'Deny traffic by default. A written test matrix then checks allowed and denied paths from real pods.' },
      { tech: 'Prometheus, Loki and Grafana', enabled: 'Collect metrics and logs, and send alerts to my phone.' },
      { tech: 'restic', enabled: 'Takes encrypted backups on a schedule. Restore tests read a backup back into an isolated namespace.' },
    ],
    links: [],
    shots: [
      { file: 'wayline/signin', width: 1600, height: 912, source: 'live', host: 'Sign-in page', alt: 'Wayline sign-in page with a topographic route chart on the left and an email field on the right.', caption: 'Plane\'s sign-in page with Wayline\'s identity.' },
      { file: 'wayline/grafana', width: 1430, height: 452, widths: [960, 1430], source: 'monitoring', host: 'Grafana dashboard', alt: 'Grafana dashboard showing Postgres, Valkey, RabbitMQ and object storage all up, with charts of database size, connections and memory.', caption: 'A Grafana dashboard from the hosted instance, shortly after launch. The numbers are small because I am the only person using it.' },
      { file: 'wayline/work-items', width: 1440, height: 470, widths: [960, 1440], source: 'local', host: 'Work items', alt: 'Plane work-item list under the Wayline theme, with six sample items in a project called Route Planning.', caption: 'Plane\'s work-item list under the Wayline theme, rendered locally with fictional data.' },
    ],
    weight: 'feature',
    caseStudy: true,
  },
  {
    slug: 'cloudgarden',
    title: 'Awushi Cloudgarden',
    kicker: 'A small 3D browser game that teaches DevOps',
    headline: 'Awushi Cloudgarden',
    metaTitle: 'Awushi Cloudgarden',
    metaDescription: 'A small 3D browser game that teaches DevOps through six simulated lessons.',
    summary: 'Six lessons on releases, incidents and recoveries, played in a 3D world. Wrong choices are rejected with an explanation, and finished runs replay exactly. Every infrastructure value is simulated.',
    myPart: 'I built it and run it on my own server.',
    demonstrates: 'Saves store the player\'s inputs and replay them to the same result.',
    evidence: 'project',
    status: 'Live',
    statusNote: 'A side project. Phone layouts are tested by emulation only.',
    period: 'Nov 2026',
    years: '2026',
    built: [],
    links: [
      { label: 'Play it', href: 'https://devops.bereket.dev', kind: 'live' },
    ],
    shots: [
      { file: 'cloudgarden/mission', width: 1600, height: 954, source: 'live', host: 'devops.bereket.dev', alt: 'A blue jelly character standing in a small 3D world, next to a mission panel titled Recover a Failed Pod that is labeled simulated.', caption: 'A simulated incident lesson in progress.' },
    ],
    weight: 'compact',
    caseStudy: false,
  },
  {
    slug: 'enderase',
    title: 'Enderase',
    kicker: 'My home-services marketplace for Ethiopia, with web and mobile apps on one API, in development',
    headline: 'Enderase: booking ID-verified local service providers, on web and mobile',
    metaTitle: 'Enderase: booking ID-verified service providers',
    metaDescription: 'Enderase, my home-services marketplace for Ethiopia, in development: web and mobile apps on one API, in English and Amharic.',
    summary: 'A marketplace where customers book ID-verified providers or pick among bids, confirm with a deposit, message and review, in English or Amharic.',
    myPart: 'I own the product, architecture, data model and verification, and I build it across web, mobile and API.',
    demonstrates: 'Product ownership across web, mobile and API, with write rules held in one API.',
    evidence: 'product',
    status: 'In development',
    statusNote: 'Payments run in a sandbox. The app is not in the stores yet.',
    period: 'Mar 2026 to present',
    years: '2026',
    built: [
      { tech: 'Fastify and Postgres', enabled: 'One API and one database for both clients, so business rules are written once.' },
      { tech: 'Next.js and Flutter', enabled: 'A web app and a mobile app, in English and Amharic.' },
    ],
    links: [],
    shots: [],
    weight: 'listed',
    caseStudy: true,
  },
  {
    slug: 'acelab',
    title: 'Work at Acelab',
    kicker: 'At Acelab since 2023, now Senior Frontend Engineer: complex interfaces and the server code behind them',
    headline: 'Acelab: the frontend of a request workflow and parts of a spreadsheet-style editor',
    metaTitle: 'Work at Acelab',
    metaDescription: 'My work at Acelab since 2023: parts of a spreadsheet-style editor, the frontend of a cross-company request workflow, and a public Chrome extension.',
    summary: 'Acelab\'s product, Material Hub, is a B2B platform where architects, building owners and manufacturers select and document building products. I joined in May 2023 on the frontend, in Vue and Nuxt, and in mid-2026 my role grew to include some of the server code behind my features.',
    myPart: 'Senior Frontend Engineer on a team of engineers. I owned the frontend of one cross-company workflow, built several features and contributed to others.',
    demonstrates: 'Sustained frontend work on a large product.',
    evidence: 'employer',
    status: 'Current role',
    period: 'May 2023 to present',
    years: '2023 to present',
    built: [],
    links: [
      { label: 'Bulk Vendor RFIs (public page)', href: 'https://www.acelabusa.com/solutions/project-delivery/automated-rfis', kind: 'public-page' },
      { label: 'AceClipper on the Chrome Web Store', href: 'https://chromewebstore.google.com/detail/aceclipper/kpljfojfnempmahijdcncjbopekfcjag', kind: 'store' },
    ],
    shots: [],
    weight: 'listed',
    caseStudy: true,
  },
]

export const projectsIntro = 'Personal projects I built and run. Each entry says what is mine and what came from elsewhere.'

/** The home page's selected projects, in order. */
export const projects = work.filter(item => item.evidence === 'project')
/** Listed briefly under the projects. */
export const moreWork = work.filter(item => item.weight === 'listed' && item.evidence !== 'employer')
/** Every entry with its own page, in reading order. */
export const caseStudies = work.filter(item => item.caseStudy)

export function findWork(slug: string): Work {
  const entry = work.find(w => w.slug === slug)
  if (!entry) throw new Error(`Unknown work slug: ${slug}`)
  return entry
}

export const evidenceLabel: Record<EvidenceKind, string> = {
  employer: 'Employment',
  project: 'Personal project',
  product: 'Own product, in development',
}
