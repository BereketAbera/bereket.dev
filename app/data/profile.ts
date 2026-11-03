export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** Used in titles, JSON-LD and the footer. The current job title is in `facts`. */
  title: 'Software Engineer',
  employer: 'Acelab',
  eyebrow: 'Software engineer · frontend depth, full-stack delivery',
  headline: 'I build complex product interfaces, and the API and data behind them.',
  lede: 'Eight-plus years on the web, the last three on a large product platform for architects and manufacturers. Give me an unclear brief and I’ll pin down what it must do, then build the interface and the API and data behind it, and see it through release.',
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
  { label: 'Now', value: 'Senior Frontend Engineer, Acelab', note: 'Since 2023 · remote' },
  { label: 'Deepest in', value: 'Vue & Nuxt, in JavaScript and TypeScript' },
  { label: 'Also ship', value: 'React & Next.js, .NET, Node.js, Python, PostgreSQL', note: 'Plus Chrome extensions, and Flutter in my own product' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', note: 'Remote with a distributed team', clock: true },
  { label: 'Looking for', value: 'Senior product, full-stack or frontend engineering roles', note: 'Remote · full-time' },
] as const
