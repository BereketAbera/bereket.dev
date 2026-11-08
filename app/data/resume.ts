/**
 * Résumé-only copy. Experience leads, so the summary and skills stay short.
 * What comes from my own projects says so, so a reader can tell it apart from
 * what I do at work every day.
 */
export const resume = {
  summary: 'Senior software engineer with 8+ years on the web, deepest in Vue and Nuxt. I build complex product interfaces and carry features through the API, the database and the team\'s CI/CD pipelines. On my own projects I also run the infrastructure: Kubernetes, GitOps, CI/CD and monitoring on my own server.',
  /** The PDF travels alone, so it carries its own statement about AI tools. */
  aiNote: 'I use AI coding tools, mainly Claude Code, in my development every day and answer for what ships.',
  skills: [
    { label: 'Frontend', tools: ['Vue 3', 'Nuxt', 'TypeScript', 'React', 'Next.js', 'Pinia', 'Tailwind CSS'] },
    { label: 'Backend and data', tools: ['.NET and C#', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Hatchet and FFmpeg (own projects)'] },
    { label: 'Real-time and clients', tools: ['Pusher', 'Supabase Realtime', 'Chrome extensions'] },
    { label: 'DevOps and CI/CD (own projects)', tools: ['Docker', 'Kubernetes (K3s)', 'Helm', 'Argo CD (GitOps)', 'GitHub Actions (CI/CD)', 'Terraform', 'Traefik', 'Infisical', 'Prometheus', 'Grafana', 'Loki'] },
    { label: 'Testing and tools', tools: ['Vitest', 'Playwright', 'NUnit', 'pytest', 'Claude Code', 'Codex'] },
  ],
}
