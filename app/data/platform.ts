import type { PlatformLayer } from './types'

/**
 * The platform I work in, layer by layer. `platform` is company-wide context that
 * teammates built; `mine` is my part, and its verbs carry the ownership.
 * This file is public: no internal names, no security posture, no deployment or
 * operational detail beyond what any product team runs.
 */
export const platform: { title: string, intro: string, layers: PlatformLayer[], closing: string } = {
  title: 'The platform I work in',
  intro: 'Material Hub runs on far more than a web app, and teammates built most of it. Each row pairs what the platform runs with my part in it: what I built, what I added to, and what I ship through.',
  layers: [
    {
      id: 'clients',
      layer: 'Clients',
      platform: 'A large server-rendered Vue and Nuxt web app, a public and an internal Chrome extension, and an internal Next.js review platform for the data team.',
      mine: 'I’ve built in the web app since 2023 and led the frontend of its cross-company request workflow. I built both Chrome extensions and features across the review platform.',
    },
    {
      id: 'services',
      layer: 'Services & APIs',
      platform: 'A .NET REST API, Python services for search and matching, a small server layer inside the web app, and Node.js route handlers in the review platform.',
      mine: 'Since mid-2026 I’ve added .NET endpoints, from paged lists and dashboard summaries to server-side permission checks, inside a layering teammates designed. In the review platform I built Node.js route handlers, including a threaded Q&A API.',
    },
    {
      id: 'data',
      layer: 'Data & storage',
      platform: 'PostgreSQL as the system of record, evolved by migrations, plus caching, a database for the data pipeline and object storage.',
      mine: 'I write the production SQL behind my features, ship re-runnable migrations, and built safe import paths into object storage for the review platform.',
    },
    {
      id: 'realtime',
      layer: 'Real-time & integrations',
      platform: 'Real-time channels authorized by the API, transactional email, product analytics and feature flags, and third-party integrations.',
      mine: 'With my team I built presence and live cells, and I built the first notification center’s interface and live updates. I added channel rules and publishers for a cross-company workflow and built the original support-messenger integration.',
    },
    {
      id: 'pipelines',
      layer: 'Background jobs & AI pipelines',
      platform: 'Background jobs inside the API, Python workflows that extract product data with language models for human review, a search service and an in-app assistant.',
      mine: 'Inside teammates’ Python workflows I added time budgets, jittered retries and writes that keep reviewers’ edits, plus a retry-safe background job in the API. I co-built the assistant’s first chat interface.',
    },
    {
      id: 'delivery',
      layer: 'Delivery & operations',
      platform: 'Checks on every pull request, preview environments, a shared staging environment, release-triggered production deploys, and error tracking with alerts.',
      mine: 'Teammates built the pipelines and run monitoring; my changes ship through them, from versioned releases to hotfixes with back-ports. I take what monitoring surfaces to root cause, and wrote the pull-request CI for an internal extension.',
    },
  ],
  closing: 'Most product companies run this same shape: a web app, an API, a relational database, background workers, a handful of vendors and a release pipeline. I’ve shipped features through every one of those layers, so I can pick up a feature in yours and follow it all the way through.',
}
