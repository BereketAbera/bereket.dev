/**
 * Résumé-only copy. Experience leads, so the summary and skills stay short.
 * The last skills row names what comes from my own AI-directed projects, so a reader
 * can tell it apart from what I do at work every day.
 */
export const resume = {
  summary: 'Senior software engineer with 8+ years on the web, deepest in Vue and Nuxt. I build complex product interfaces and carry features through the API, the database and the team\'s release process.',
  /** The PDF travels alone, so it carries its own statement about AI tools. */
  aiNote: 'I use AI coding agents, mainly Claude Code, for part of this work and answer for what ships.',
  skills: [
    { label: 'Frontend', tools: ['Vue 3', 'Nuxt', 'TypeScript', 'React', 'Next.js', 'Pinia', 'Tailwind CSS'] },
    { label: 'Backend and data', tools: ['.NET and C#', 'Node.js', 'Python', 'PostgreSQL', 'Supabase'] },
    { label: 'Real-time and clients', tools: ['Pusher', 'Supabase Realtime', 'Chrome extensions'] },
    { label: 'Testing and tools', tools: ['Vitest', 'Playwright', 'NUnit', 'pytest', 'Claude Code', 'Codex'] },
    { label: 'Own projects, AI-directed', tools: ['Hatchet', 'FFmpeg', 'Docker', 'K3s', 'Argo CD', 'Terraform', 'Grafana'] },
  ],
}
