/**
 * Résumé-only copy. Experience leads, so the summary and skills stay short.
 * `skills` lists only tools from capabilities.ts (tests/unit/content.test.ts checks it),
 * grouped more tightly than on the site. `studied` is one line of platform technology
 * I've learned but not shipped; the fuller list with context lives on /how-i-work.
 */
export const resume = {
  summary: 'Software engineer with 8+ years on the web, deepest in Vue and Nuxt (JavaScript and TypeScript). I build complex product interfaces and carry them through the API, data and release, most recently on Acelab’s materials platform for architects and manufacturers.',
  skills: [
    { label: 'Frontend', tools: ['Vue 3', 'Nuxt', 'TypeScript', 'React', 'Next.js', 'Pinia', 'Tailwind CSS', 'TipTap'] },
    { label: 'Backend & data', tools: ['.NET / C#', 'PostgreSQL', 'Node.js', 'Python', 'Supabase', 'Fastify', 'Cloudflare Workers', 'Hatchet'] },
    { label: 'Clients & real-time', tools: ['Chrome Manifest V3', 'Flutter', 'Pusher', 'Supabase Realtime', 'Firebase Cloud Messaging'] },
    { label: 'Testing & delivery', tools: ['Playwright', 'Vitest', 'NUnit', 'pytest', 'GitHub Actions (PR checks)', 'Feature flags', 'Vercel'] },
    { label: 'AI', tools: ['OpenAI API', 'Claude Code', 'Codex'] },
  ],
  studiedNote: 'Worked alongside or studied, not owned',
  studied: ['Kubernetes', 'Terraform', 'Google Cloud Run', 'Sentry & OpenTelemetry', 'MongoDB', 'vector search', 'SSO (OIDC, SAML)', 'CRDTs (Yjs)'],
}
