export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** Used in titles, JSON-LD and the footer. The current job title is in `facts`. */
  title: 'Software Engineer',
  employer: 'Acelab',
  eyebrow: 'Software engineer · frontend-first, full-stack',
  headline: 'I take web products from unclear requirements to tested, shipped software.',
  lede: 'I’m a software engineer with 8+ years of building web products and deep frontend expertise. I work out what needs to be built, design the interface and the architecture behind it, build the APIs and integrations it depends on, and stay with it through testing, release and the fixes that follow. Today that’s at Acelab, across a Nuxt application, a .NET API, browser extensions and data pipelines.',
  description: 'Software engineer in Addis Ababa, open to remote roles: 8+ years of web products, deepest in frontend (TypeScript, Vue, Nuxt, React), plus Node.js and .NET.',
  email: 'bereket5042@gmail.com',
  emailSubject: 'Hello from bereket.dev',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  availability: 'Open to senior roles · remote',
  lookingFor: 'Senior software, frontend or product engineering roles · remote · full-time',
  links: {
    github: 'https://github.com/BereketAbera',
    linkedin: 'https://www.linkedin.com/in/bereket-abera-629380180/' as string | null,
    source: 'https://github.com/BereketAbera/bereket.dev',
  },
  resumePdf: '/bereket-abera-resume.pdf',
} as const

export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`

export const facts = [
  { label: 'Now', value: 'Senior Frontend Engineer, Acelab', note: 'Since May 2023 · remote' },
  { label: 'Deepest in', value: 'TypeScript, Vue & Nuxt' },
  { label: 'Also build', value: 'React & Next.js, Node.js and .NET APIs, PostgreSQL, Python workers, browser extensions, Flutter (own product)' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', clock: true },
  { label: 'Looking for', value: 'Senior software, frontend or product engineering roles · remote · full-time' },
] as const
