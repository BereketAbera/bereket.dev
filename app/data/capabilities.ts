import type { Capability } from './types'

/**
 * Capability groups, most prominent first. Frontend is the deepest, so it gets the most room.
 * `tools` lists only what I have used in shipped work or in my own products.
 * tests/unit/content.test.ts fails if any evidence points at a missing page.
 */
export const capabilities: Capability[] = [
  {
    id: 'frontend',
    title: 'Frontend engineering',
    summary: 'More than eight years of building web applications in JavaScript and TypeScript, most deeply in Vue and Nuxt, and also in React and Next.js. The patterns carry across frameworks: components with clear contracts, state in one place, and interfaces that stay fast when the data gets large.',
    points: [
      'Component architecture for a large Vue application: typed components, composables, Pinia stores, and core components in its shared design system.',
      'Complex data interfaces: undo and redo for a spreadsheet-style schedule, and a response grid with keyboard editing, autosave, virtualized rows and server-side paging.',
      'Multi-step forms and wizards with saved drafts and validation.',
      'Server rendering in Nuxt, including hydration fixes, and the Next.js App Router with server components in my own product.',
      'Accessible, responsive interfaces: real buttons and tables, keyboard support, labels, and an app-wide contrast fix.',
      'Rich text with TipTap, charts with D3, and bilingual interfaces in English and Amharic.',
    ],
    tools: ['TypeScript', 'Vue 3', 'Nuxt 2–4', 'Pinia', 'Vuex', 'Tailwind', 'React', 'Next.js', 'TipTap', 'shadcn/Radix', 'next-intl', 'D3', 'Angular'],
    evidence: [
      { label: 'Data interfaces', work: 'data-interfaces' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Modernization', work: 'modernization' },
      { label: 'Source of this site', href: 'https://github.com/BereketAbera/bereket.dev' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend, APIs & data',
    summary: 'I build the endpoints, jobs and data models a feature depends on, and keep the architecture as simple as the problem allows: a modular monolith first, workers for slow jobs, and no services added for their own sake.',
    points: [
      'Nearly 30 pull requests to a .NET API in 2026, often the backend half of a feature I was also building in the web app: paginated, filterable endpoints, a dashboard summary that shares the list’s access rule, and concurrency-safe writes in PostgreSQL.',
      'Node.js route handlers in a Next.js internal tool, and Python background workers with retries, time budgets and dry runs.',
      'In my own product, built with AI coding agents under my direction: a Node.js API in Fastify with about 120 versioned REST routes, schema-validated input and parameterized SQL.',
      'Earlier in my career: Node.js and Express APIs with MySQL for client marketplace products.',
    ],
    tools: ['Node.js', 'Fastify', 'Express', '.NET / C#', 'PostgreSQL', 'Supabase', 'Python', 'zod'],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Enderase', work: 'enderase' },
      { label: 'Browser extensions', work: 'browser-extensions' },
    ],
  },
  {
    id: 'connected',
    title: 'Connected & real-time applications',
    summary: 'Interfaces that stay correct while data changes underneath them, across tabs, devices and unreliable networks.',
    points: [
      'Presence, live cell updates, comments and notifications over websockets.',
      'Autosave and search that ignore stale responses, and live updates that resubscribe through token expiry and dropped connections.',
      'Manifest V3 browser extensions with side panels and a secure token handoff from the web app.',
      'A Flutter app with push notifications that shares one backend with the web app, in my own product.',
    ],
    tools: ['Pusher', 'Supabase Realtime', 'Manifest V3', 'Flutter', 'Riverpod', 'FCM'],
    evidence: [
      { label: 'Real-time sync', work: 'realtime-sync' },
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Enderase', work: 'enderase' },
    ],
  },
  {
    id: 'product',
    title: 'Product & UX',
    summary: 'I work from product specs and design handoffs, clarify the workflow before building it, and design for every party it touches.',
    points: [
      'Journeys that pass between two companies, each side with its own roles and permissions; I wrote the internal role-by-role documentation and fixed a journey where suppliers had to miss a deadline before they could ask for more time.',
      'Moved a review team’s question-and-answer process out of a generic task tool into a built-in workflow, with clear roles and states and a catch-up view for answers that arrive hours later.',
      'Designs implemented from Figma through the shared design system, with deviations and scope cuts written into the pull request so reviewers and testers know what changed and why.',
    ],
    tools: ['Figma', 'Product specs', 'Prototyping in code'],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Browser extensions', work: 'browser-extensions' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality, security & delivery',
    summary: 'Tests that ship with the feature, security rules enforced on the server, and releases that can be staged and rolled back.',
    points: [
      'Unit tests alongside features in Vue, .NET, Python and React codebases, and a Playwright harness scored against frozen ground truth.',
      'Directed an AI-agent QA campaign on my own product: 640 user flows mapped, 205 failing flows traced to 143 distinct defects, and every fix re-verified at runtime by an agent other than the one that made it.',
      'Security handled inside the feature: an authentication gap closed in an internal tool’s API routes, server-side URL fetching guarded against SSRF, and untrusted links from web pages and model output sanitized before they render.',
      'Stacked pull requests, features shipped dark behind flags, production releases and hotfixes, CI for a browser extension, and rollout plans with a safe deploy order and an off switch.',
    ],
    tools: ['Vitest', 'Playwright', 'NUnit', 'pytest', 'GitHub Actions', 'Docker Compose', 'Vercel'],
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Enderase', work: 'enderase' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
    ],
  },
  {
    id: 'ai',
    title: 'AI-enabled engineering',
    summary: 'I use coding agents every day and treat their output as a draft: I cross-check AI review findings against a second model and the code itself, and prove new tests fail without the fix. In products, I add a model where it earns its place and use deterministic code where that does the job.',
    points: [
      'Built my own product with coding agents under written operating rules, keeping product decisions, architecture and verification as my job.',
      'LLM-based product parsing in a production API, with model output treated as untrusted and validated before use.',
      'Diagnosed why an AI extraction returned nothing on variant-heavy product pages (the model listed every color variant and ran out of output budget) and fixed the prompt, the budget and the error reporting.',
    ],
    tools: ['Claude Code', 'Codex', 'OpenAI API'],
    evidence: [
      { label: 'Enderase', work: 'enderase' },
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Understory (lab)', href: '#lab' },
    ],
  },
]
