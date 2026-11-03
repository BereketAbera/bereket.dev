/**
 * Résumé-only copy. The working-knowledge list is platform technology I work beside and
 * have studied, grouped the way a change travels. It is printed apart from the tools I ship
 * with, and every item also appears on a capability group on the home page.
 */
export const resume = {
  summary: 'Software engineer with 8+ years on the web and deep frontend experience in Vue and Nuxt, plus React. I take features from an unclear request to production across every layer they touch: interface, API endpoints, SQL and migrations, background workflows, browser extensions and release. At Acelab since 2023; full-stack since mid-2026 across a .NET 10 API, Python workflows and an internal Next.js review platform.',
  workingKnowledgeNote: 'Technology my platform runs on that I’ve studied but haven’t owned, listed apart from the tools I ship with.',
  workingKnowledge: [
    {
      group: 'Ship and run',
      items: [
        'CI/CD pipeline internals (release-triggered deploys, environments, previews)',
        'Container images for production (multi-stage builds, registries)',
        'Google Cloud Run (the runtime my web and API features ship to)',
        'Kubernetes & Kustomize (the delivery path my worker changes ship through)',
        'Terraform & Gateway API (how the cluster is provisioned and exposed)',
        'Error tracking & tracing (Sentry, OpenTelemetry)',
      ],
    },
    {
      group: 'Behind the request',
      items: [
        'Workflow-engine design (orchestration topology, fan-out, concurrency limits)',
        'MongoDB (document modeling, read caches)',
        'Agentic LLM features (tool calling, MCP, RAG)',
        'Hybrid vector & keyword search (pgvector, BM25, rank fusion)',
      ],
    },
    {
      group: 'Trust and collaboration',
      items: [
        'Identity & SSO (OIDC, SAML)',
        'CRDT co-editing (Yjs, Durable Objects)',
      ],
    },
  ],
}
