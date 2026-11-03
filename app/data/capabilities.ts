import type { Capability } from './types'

/**
 * Capability groups, deepest first. The home page shows each group's first five tools,
 * so order them most important first. Frontend is the deepest, so it gets the most room.
 * `tools` lists only what I have shipped with, at work or in my own product.
 * `workingKnowledge` is platform technology I work beside and have studied but not owned;
 * tests/unit/content.test.ts fails if a technology appears in both, or if evidence points at a missing page.
 */
export const capabilitiesIntro = 'Six responsibilities you can hand me, deepest first. “Shipped with” lists tools from production work or my own product. “Working knowledge” is platform technology I work beside and have studied, listed apart because I haven’t owned it.'

export const capabilities: Capability[] = [
  {
    id: 'frontend',
    title: 'Own the frontend of a complex product',
    short: 'Frontend',
    summary: 'My deepest area: a large Vue and Nuxt application, plus React and Next.js. I build the screens where a product’s complexity lives (dense data, multi-step workflows, state that changes under the user) and keep them fast by design, with server paging and only the visible rows rendered.',
    points: [
      'Core parts of a spreadsheet-style product schedule: the cell save path, cell types, undo and redo, most of view sharing, and a catalog search that began by moving shared logic into one composable.',
      'Keyboard support and screen-reader semantics in complex workflows: an accessible step indicator, dialogs that focus the safe action, errors announced through live regions, and an app-wide contrast regression traced and fixed.',
      'Server rendering in Nuxt, with hydration fixes and major contributions to the app’s Nuxt 2 to 3 migration; the rich-text editor I introduced; components for the shared design system; React 19 in two extensions and a Next.js tool.',
    ],
    tools: ['TypeScript', 'Vue 3', 'Nuxt', 'React', 'Next.js', 'Pinia', 'Tailwind CSS', 'TipTap'],
    evidence: [
      { label: 'Data interfaces', work: 'data-interfaces' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Modernization', work: 'modernization' },
      { label: 'Source of this site', href: 'https://github.com/BereketAbera/bereket.dev' },
    ],
  },
  {
    id: 'backend',
    title: 'Build the server half',
    short: 'Backend & data',
    summary: 'I build the endpoints, SQL, migrations and jobs behind the features I ship, inside the architecture a team already has, and keep additions as simple as the problem allows. In 2026 that meant .NET, Python and Node.js.',
    points: [
      'Paginated, filterable .NET endpoints and a dashboard summary that share one access-scope rule, so the summary can never show an item the list would hide.',
      'Concurrency-safe PostgreSQL writes (row-locked claims, compare-and-swap status changes) and re-runnable migrations, including a tested reversal of a product-wide rename.',
      'Python workflow steps on Hatchet with dry runs, time budgets, jittered retries and writes that never overwrite a reviewer’s later edits; Node.js route handlers with validated filters and streamed CSV export.',
    ],
    tools: ['.NET / C#', 'PostgreSQL', 'Node.js', 'Python', 'Supabase', 'Fastify', 'Cloudflare Workers', 'Hatchet', 'Hangfire'],
    workingKnowledge: [
      'Workflow-engine design (orchestration topology, fan-out, concurrency limits)',
      'MongoDB (document modeling, read caches)',
    ],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Data interfaces', work: 'data-interfaces' },
      { label: 'Enderase', work: 'enderase' },
      { label: 'The platform', href: '/how-i-work#platform' },
    ],
  },
  {
    id: 'connected',
    title: 'Keep connected clients correct',
    short: 'Real-time & extensions',
    summary: 'I keep interfaces correct while data changes underneath them: live presence and cells, notifications that catch up after reconnects, extensions that hand data to web apps, and web and mobile clients on one backend.',
    points: [
      'Schedule presence and live cells with my team, the first notification center’s interface and live updates, and .NET event publishers that fire after the commit on channels whose rules mirror the HTTP API’s.',
      'An internal side-panel extension that hands collected product media to the review platform through a versioned clipboard format, golden-tested on both sides with no backend in between.',
      'In my own product, a Flutter app and a Next.js web app on one API and database, with push notifications, live tracking and real-time chat, built with AI coding agents under my direction.',
    ],
    tools: ['Pusher', 'Supabase Realtime', 'Chrome Manifest V3', 'Flutter', 'Riverpod', 'Firebase Cloud Messaging'],
    workingKnowledge: [
      'CRDT co-editing (Yjs, Durable Objects)',
    ],
    evidence: [
      { label: 'Real-time sync', work: 'realtime-sync' },
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Enderase', work: 'enderase' },
    ],
  },
  {
    id: 'quality',
    title: 'Test and secure what I ship',
    short: 'Testing & security',
    summary: 'I test in every stack I ship in and treat each boundary I touch as a place to check: tokens carry only the scopes they need, access rules fail closed on the server, and untrusted content is checked before it’s stored or rendered.',
    points: [
      'Tests in Vitest, NUnit, pytest and Testing Library, a test-runner change that makes client-only code testable in a server-rendered app, and a fix for a load-dependent test that blocked the team’s pushes.',
      'A narrowly scoped token scheme for a browser extension, with an API that refuses to start without its signing key, and production builds of the public extension that ship no source maps.',
      'Read-only row-level security with server-only write functions, tested by querying the database as each role, and file serving that renders only known image types and forces a download for the rest.',
    ],
    tools: ['Playwright', 'Vitest', 'Vue Test Utils', 'NUnit', 'pytest', 'Testing Library', 'JWT', 'Postgres row-level security'],
    workingKnowledge: [
      'Identity & SSO (OIDC, SAML)',
      'Error tracking & tracing (Sentry, OpenTelemetry)',
    ],
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'The platform', href: '/how-i-work#platform' },
    ],
  },
  {
    id: 'delivery',
    title: 'Release safely across runtimes',
    short: 'Delivery',
    summary: 'My 2026 changes run on several runtimes and ship through pipelines teammates built. My part is making each release safe to take: checks that catch problems before merge, settings ready in every environment, and a known deploy order.',
    points: [
      'Pull-request CI for an internal extension (type-check, unit tests, a production build and a guard that fails if extraction code hard-codes any test site), plus release checklists that confirm dependent server changes are live.',
      'A cross-service feature configured for every environment through the existing pipelines, with secrets kept apart from plain settings, and cross-service changes verified on paired frontend and backend previews.',
      'Migrations with a documented order against the code that needs them and a lock timeout where a backfill touches a live table, checked first against the platform’s data stores running locally in Docker Compose.',
    ],
    tools: ['GitHub Actions (PR checks)', 'GitHub Releases', 'Feature flags', 'Docker Compose', 'Vite', 'Vercel'],
    workingKnowledge: [
      'CI/CD pipeline internals (release-triggered deploys, environments, previews)',
      'Container images for production (multi-stage builds, registries)',
      'Serverless containers (Google Cloud Run)',
      'Kubernetes (deployments, health probes, Kustomize overlays)',
      'Infrastructure as code (Terraform, Gateway API)',
    ],
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'The platform', href: '/how-i-work#platform' },
    ],
  },
  {
    id: 'ai',
    title: 'Use AI with judgment',
    short: 'AI',
    summary: 'I use coding agents daily and verify what they produce. In products I add a model where it earns its place, treat its output as untrusted input, and use deterministic code where rules do the job.',
    points: [
      'LLM product parsing introduced to a production .NET API, with model output validated and normalized, unsafe links stripped and a per-user rate limit on the endpoint.',
      'An offline language guardrail in a teammate-built LLM pipeline that skips non-English pages before any model spend and swaps in a page’s English version when one exists.',
      'An agent-run QA campaign I directed on my own product: every user flow listed by role, run on web and mobile, failures confirmed a second way, and each fix re-verified at runtime by an agent that didn’t write it.',
    ],
    tools: ['OpenAI API', 'Claude Code', 'Codex'],
    workingKnowledge: [
      'Agentic LLM features (tool calling, MCP, RAG)',
      'Hybrid vector & keyword search (pgvector, BM25, rank fusion)',
    ],
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Enderase', work: 'enderase' },
      { label: 'Understory (lab)', href: '/lab' },
    ],
  },
]
