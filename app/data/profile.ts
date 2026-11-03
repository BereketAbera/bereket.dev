export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** Used in titles, JSON-LD and the footer. The current job title is in `facts`. */
  title: 'Software Engineer',
  employer: 'Acelab',
  eyebrow: 'Software engineer · frontend depth, full-stack delivery',
  headline: 'I build complex product interfaces, and the API and data behind them.',
  lede: 'Eight-plus years on the web, the last three on Material Hub at Acelab, where architects and manufacturers specify building products: spreadsheet-style schedules, a request workflow between companies, two browser extensions. I’m deepest in TypeScript, Vue and Nuxt and also ship React and Next.js. In mid-2026 my role grew from frontend to full-stack, so I now write the .NET, Node.js and Python behind my features too.',
  description: 'Software engineer in Addis Ababa, open to remote roles: 8+ years on the web, deepest in frontend, shipping whole features across API, data and release.',
  email: 'bereket5042@gmail.com',
  emailSubject: 'Hello from bereket.dev',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  availability: 'Open to senior roles · remote',
  lookingFor: 'Senior product, full-stack or frontend engineering roles · remote · full-time',
  links: {
    github: 'https://github.com/BereketAbera',
    linkedin: 'https://www.linkedin.com/in/bereket-abera-629380180/' as string | null,
    source: 'https://github.com/BereketAbera/bereket.dev',
  },
  resumePdf: '/bereket-abera-resume.pdf',
} as const

export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`

/** The résumé reads "Deepest in" by label. */
export const facts = [
  { label: 'Now', value: 'Senior Frontend Engineer, Acelab', note: 'Since May 2023 · remote · full-stack since mid-2026' },
  { label: 'Deepest in', value: 'TypeScript, Vue & Nuxt', note: 'Vue & Nuxt day to day since 2023; TypeScript there since 2026' },
  { label: 'Also ship', value: 'React & Next.js, .NET, Node.js, Python, PostgreSQL, Chrome extensions', note: 'Plus Flutter in my own product, in development' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', note: 'Remote with a distributed team since 2023', clock: true },
  { label: 'Looking for', value: 'Senior product, full-stack or frontend engineering roles', note: 'Remote · full-time' },
] as const
