export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** How I describe myself: titles and the footer. The title I actually hold is `jobTitle`. */
  title: 'Senior Software Engineer',
  /** The job title I hold today. Structured data states this one, not the positioning. */
  jobTitle: 'Senior Frontend Engineer',
  employer: 'Acelab',
  eyebrow: 'Senior software engineer · frontend first, full-stack when the feature needs it',
  headline: 'I build complex product interfaces and carry them through to production.',
  lede: 'Eight-plus years on the web. At Acelab I build data-heavy Vue and Nuxt features for architects and manufacturers, and since June 2026 the .NET endpoints and SQL behind them. On my own projects I work across the stack, from a React component library on npm to a Kubernetes deployment with CI/CD and monitoring on my own server.',
  description: 'Senior software engineer in Addis Ababa, frontend first and full-stack when the feature needs it. Open to senior roles and contract work, remote.',
  about: [
    'I have a software engineering degree from Addis Ababa University. I started on websites and full-stack apps in React, Vue, Angular and Node.js, and since 2023 I have worked on one large Vue and Nuxt product, following my features into its API and data layer in 2026.',
    'The work I like best is a feature nobody has fully specified yet, where the screen has to be easy to use and the data behind it has to stay correct. I use AI coding tools in my development every day. I review what they produce and answer for what ships.',
  ],
  email: 'bereket5042@gmail.com',
  emailSubject: 'Hello from bereket.dev',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  availability: 'Open to senior roles and contract work',
  lookingFor: 'Senior frontend, full-stack or product engineering roles, and contract work. Remote.',
  links: {
    github: 'https://github.com/BereketAbera',
    linkedin: 'https://www.linkedin.com/in/bereket-abera-629380180/' as string | null,
    source: 'https://github.com/BereketAbera/bereket.dev',
  },
  resumePdf: '/bereket-abera-resume.pdf',
} as const

export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`

export function mailtoWith(subject: string): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`
}

/** The résumé reads "Deepest in" by label. */
export const facts = [
  { label: 'Now', value: 'Senior Frontend Engineer, Acelab', note: 'At Acelab since 2023 · remote' },
  { label: 'Deepest in', value: 'Vue and Nuxt, in JavaScript and TypeScript' },
  { label: 'Also work in', value: 'React, Next.js, .NET, Node.js, Python, PostgreSQL' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', note: 'Remote with a distributed team', clock: true },
  { label: 'Open to', value: 'Senior roles and contract work', note: 'Remote' },
] as const

/** The contact section's two audiences, spelled out so neither has to guess. */
export const contactLines = [
  {
    label: 'Full-time roles',
    text: 'I am looking for a senior frontend, full-stack or product engineering role, remote.',
    cta: 'Email me about a role',
    subject: 'Full-time role',
  },
  {
    label: 'Contract work',
    text: 'I take on Vue, Nuxt and React work, remotely: product interfaces, design systems and whole features, from a rough brief to release. If you have a project in mind, tell me what it is and when you need it.',
    cta: 'Email me about a project',
    subject: 'Contract project',
  },
] as const
