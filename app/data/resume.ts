/**
 * Résumé-only copy. The working-knowledge list is platform technology I work beside and
 * have studied, grouped the way a change travels. It is printed apart from the tools I ship
 * with, and every item also appears on a capability group on /how-i-work.
 */
export const resume = {
  summary: 'Software engineer with 8+ years on the web, deepest in frontend (TypeScript, Vue, Nuxt) and also shipping React, Next.js, .NET, Node.js and Python. I build complex product interfaces and the API, data and release work behind them. At Acelab since 2023, where my role grew from frontend to full-stack in mid-2026; before that, full-stack web roles in Node.js, React, Vue and Angular.',
  workingKnowledgeNote: 'Technology I’ve studied and work alongside but haven’t owned, listed apart from the tools I ship with.',
  workingKnowledge: [
    {
      group: 'Ship and run',
      items: [
        'CI/CD pipeline internals (release-triggered deploys, environments, previews)',
        'Container images for production (multi-stage builds, registries)',
        'Serverless containers (Google Cloud Run)',
        'Kubernetes (deployments, health probes, Kustomize overlays)',
        'Infrastructure as code (Terraform, Gateway API)',
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
