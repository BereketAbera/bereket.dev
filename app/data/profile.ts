export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** Used in titles, JSON-LD and the footer. The current job title is in `facts`. */
  title: 'Software Engineer',
  employer: 'Acelab',
  eyebrow: 'Software engineer · frontend depth, full-stack delivery',
  headline: 'Hand me an unclear brief. I’ll ship it whole: interface, API, data, tests and release.',
  lede: 'I’m a software engineer with 8+ years on the web and deep frontend roots in Vue and Nuxt, plus React. Give me a loose request and I’ll pin down what it must do, shape the interface and the API and data changes behind it, and build every layer it touches: web app, API, SQL, background jobs, browser extension. Then I test it, release it and stay for the fixes. At Acelab that spans a Nuxt app, a .NET API, Python workflows and an internal Next.js review platform.',
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

export const facts = [
  { label: 'Now', value: 'Senior Frontend Engineer, Acelab', note: 'Since May 2023 · remote · full-stack since mid-2026' },
  { label: 'Deepest in', value: 'TypeScript, Vue & Nuxt', note: 'Vue & Nuxt day to day since 2023, in one large server-rendered app; TypeScript there since 2026' },
  { label: 'Also ship', value: '.NET API endpoints, Node.js route handlers, PostgreSQL, Python workflows, React & Next.js, Chrome extensions', note: 'Plus Flutter in my own product, in development' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', note: 'Remote with a distributed team since 2023', clock: true },
  { label: 'Looking for', value: 'Senior product, full-stack or frontend engineering roles', note: 'Remote · full-time' },
] as const
