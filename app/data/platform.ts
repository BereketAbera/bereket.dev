import type { PlatformLayer } from './types'

/**
 * The platform I work in, layer by layer. `platform` is company-wide context that
 * teammates built; `mine` is my part, and its verbs carry the ownership.
 * No internal names: this file is public.
 */
export const platform: { title: string, intro: string, layers: PlatformLayer[], closing: string } = {
  title: 'The platform I work in',
  intro: 'Material Hub runs on far more than a web app, and teammates built most of it. Each row pairs what the platform runs with my part in it. The verbs carry the difference: what I built, what I added to, what I ship through, and what I know well enough to work with.',
  layers: [
    {
      id: 'clients',
      layer: 'Clients',
      platform: 'A large server-rendered Vue and Nuxt web app, a public and an internal Chrome extension, and an internal Next.js review platform for the data team.',
      mine: 'I’ve built in the web app since 2023 and led the frontend of its cross-company request workflow. I built both Chrome extensions and features across the review platform. My mobile work is my own Flutter app on a shared API.',
    },
    {
      id: 'services',
      layer: 'Services & APIs',
      platform: 'A .NET 10 REST API with thin controllers, a business-logic layer and attribute-based permissions; Python FastAPI services for search and matching; a small server layer inside the web app; Node.js route handlers in the review platform.',
      mine: 'Since mid-2026 I’ve merged about 27 changes into the .NET API, from paged and summary endpoints to fail-closed authorization, inside a layering I didn’t design. In the review platform I added 13 Node.js route handlers, including a threaded Q&A API.',
    },
    {
      id: 'data',
      layer: 'Data & storage',
      platform: 'PostgreSQL as the system of record, evolved by numbered migrations; a MongoDB read cache; a Supabase Postgres shared by the data pipeline and its review platform; a headless catalog CMS; S3-compatible object storage on Cloudflare R2.',
      mine: 'I write the production SQL behind my features and ship re-runnable migrations to both databases with three migration tools. I built safe import paths into object storage for the review platform.',
    },
    {
      id: 'realtime',
      layer: 'Real-time & integrations',
      platform: 'Pusher private and presence channels authorized by the API, Supabase Realtime in the review platform, templated email with reply-by-email, product analytics and feature flags, a support messenger, enterprise SSO and partner webhooks.',
      mine: 'With my team I built presence and live cells, and I built the first notification center’s interface and live updates. I added channel rules and publishers for a cross-company workflow, built the original support-messenger integration and gave the review platform renewing live-update tokens.',
    },
    {
      id: 'pipelines',
      layer: 'Background jobs & AI pipelines',
      platform: 'Hangfire jobs inside the API; Python workflows on Hatchet that crawl supplier sites, classify pages and extract products with language models for human review; a hybrid search service on pgvector; an AI matching workflow; an in-app assistant.',
      mine: 'Inside teammates’ Hatchet workflows I added time budgets, jittered retries and writes that keep reviewers’ edits, plus a retry-safe Hangfire job. I consume the search service from the workers, can trace how a query reaches it from the web app, and co-built the assistant’s first chat UI.',
    },
    {
      id: 'delivery',
      layer: 'Delivery',
      platform: 'GitHub Actions gates pull requests to the web app, API and workers, with preview environments per branch and a shared staging. A published release deploys the web app and API to Google Cloud Run; Python workers roll out to Kubernetes through Kustomize overlays; the review platform deploys on Vercel and edge workers on Cloudflare.',
      mine: 'Teammates built these pipelines, and my changes ship through all of them: versioned releases for my web and API work, hotfixes with back-ports, worker and review-platform deploys. The one pipeline I wrote is pull-request CI for an internal extension.',
    },
    {
      id: 'operations',
      layer: 'Operations & security',
      platform: 'Sentry error tracking with release tags and sampled OpenTelemetry traces on the API, alerts routed into the issue tracker and team chat, health probes that gate Kubernetes rollouts, Terraform-managed cluster networking with managed TLS, and an audit trail.',
      mine: 'Teammates run monitoring and alerting; I take what it surfaces to root cause, and built the data team an operations view of pipeline runs. On security I work inside the platform’s existing sign-in and permission systems and add checks where my features cross a boundary.',
    },
  ],
  closing: 'Most product companies run this same shape: a web app, an API, a relational database, background workers, a handful of vendors and a release pipeline. I’ve shipped features through every one of those layers on one platform, so I can pick up a feature in yours and follow it all the way through.',
}
