import type { Stage } from './types'

/**
 * How I take a feature from a loose request to software people use, in the order it happens.
 * Each stage: the responsibility, two proofs, and one real decision with its cost.
 * tests/unit/content.test.ts checks that every evidence link points at something that exists.
 */
export const journeyIntro = 'Six stages, in the order they happen. Each names the responsibility I take on, two places I’ve done it, and one call I made, with the tradeoff behind it.'

export const journey: Stage[] = [
  {
    id: 'shape',
    title: 'Shape the problem',
    summary: 'I turn a request or a product spec into a written plan before I build: who is involved, what each role may do, what must never happen, what done means and the order the work lands in.',
    proof: [
      'Audited a two-company workflow against its written spec before it merged, with AI-assisted reviews. Within two days I merged fixes for six of the ten missed acceptance criteria in paired UI and API changes and wrote up the rest.',
      'Moved a review team’s question-and-answer process out of a generic task tool into a built-in workflow, with clear roles and states, notifications that never ping the person who acted, and a catch-up view for late answers.',
    ],
    decision: 'I started an internal product-file collector on a written plan that ruled out a backend and AI. The cost: coverage grows one page pattern at a time, each backed by a rule and a test.',
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'The platform', href: '#platform' },
    ],
  },
  {
    id: 'design',
    title: 'Design the interface and the system',
    summary: 'I design the screen and the system under it together: which layer owns each rule, where state lives, how a page loads when the data is large, and what every open screen sees when something changes.',
    proof: [
      'Built a manufacturer response grid that behaves like the spreadsheet it writes into: an editor for each data type, arrow-key movement between cells, and autosave that ignores responses arriving out of order.',
      'Proposed replacing the five real-time event types of a teammate’s notification engine with one event that tells the client what to do, then built it on the .NET server and the Vue client.',
    ],
    decision: 'I rejected rebuilding that response grid on a virtual-scroller library. It pages from the server and windows the existing table, so sticky headers, column resizing and keyboard movement still work on real rows. The cost: every row shares one fixed height.',
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Real-time sync', work: 'realtime-sync' },
    ],
  },
  {
    id: 'build',
    title: 'Build across the stack',
    summary: 'I build the whole slice a feature needs (interface, endpoints, SQL, background work and integrations) in whatever language that part of the platform runs, and keep the pieces in step through explicit contracts.',
    proof: [
      'In 2026 I merged production code into a .NET 10 API, Python workflow workers, Next.js route handlers on Node.js and a Cloudflare Worker, beside the Vue and Nuxt app I’ve worked in day to day since 2023.',
      'Built a public Chrome extension and the pieces around it: the React Manifest V3 client, a connect page that trades the web app’s session for a one-hour scoped token, and a .NET endpoint that parses pages with an LLM.',
    ],
    decision: 'The cancel I shipped claimed the row in one transaction and sent notifications, email and live updates only after commit, so a rolled-back write announced nothing. The price: every other writer had to refuse a vanished row.',
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'The platform', href: '#platform' },
    ],
  },
  {
    id: 'verify',
    title: 'Prove it works and keep it safe',
    summary: 'Tests ship with the feature, and security is decided on the server: who may act, what a page or a model returned, and where a user-supplied URL is allowed to go.',
    proof: [
      'Wrote about a fifth of a large Vue app’s unit-test files, and built a Playwright harness that scores an extraction tool against frozen ground truth.',
      'Found and closed an authentication gap in an internal tool’s API routes, guarded server-side URL fetching against SSRF in .NET and Node.js, and switched off an image optimizer that worked as an open proxy.',
    ],
    decision: 'I hand-wrote a same-origin analytics relay with allow-listed headers, methods and paths, because the framework’s one-line proxy would have forwarded users’ session cookies to a third party. The cost: a route to maintain.',
    evidence: [
      { label: 'Browser extensions', work: 'browser-extensions' },
      { label: 'Capabilities', href: '#capabilities' },
    ],
  },
  {
    id: 'ship',
    title: 'Ship it',
    summary: 'I release through the team’s pipelines and plan risky rollouts with the change: the deploy order between services, a flag or an off switch, and migrations that are safe to re-run. Urgent fixes take the hotfix path.',
    proof: [
      'Cut versioned production releases on a release-triggered Cloud Run pipeline teammates built, wrote the notes for a web and API release versioned in lockstep, and ran hotfixes with back-ports to staging.',
      'Shipped the frontend of a cross-company workflow dark behind a flag that gated every entry point, background request and live-update handler; it reached internal users first, and I removed another feature’s flag at general release.',
    ],
    decision: 'I added a page scan to an edge service and designed it with its Python callers and review app so each piece could deploy in either order, dark until switched on per site and off again without a deploy. The cost: each caller has to opt in explicitly.',
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Real-time sync', work: 'realtime-sync' },
      { label: 'Browser extensions', work: 'browser-extensions' },
    ],
  },
  {
    id: 'improve',
    title: 'Run and improve it',
    summary: 'After release I stay with the work: I take production errors to root cause, fix the long tail a feature turns up, and measure changes on real data before calling them better.',
    proof: [
      'Traced bugs to root cause: unread flags that never cleared (a non-deterministic SQL query), a support button that intermittently died (a start-up race), an empty AI extraction (the model ran out of output budget).',
      'Stayed with a cancel feature’s long tail: paging that skipped a row once rows could vanish, readers stranded on a deleted thread, and a resend that created nothing until its idempotency key rotated on cancel.',
    ],
    decision: 'I traded a little precision for coverage in category assignment: on an offline replay of about 26,000 reviewed products, the share with a real category rose from about 19% to 72% while correctness moved from 81–85% to 79%.',
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'The platform', href: '#platform' },
    ],
  },
]
