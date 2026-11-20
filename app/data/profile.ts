export const profile = {
  name: 'Bereket Abera',
  /** Ge'ez spelling, used once as a signature. */
  nameGeez: 'በረከት አበራ',
  /** Professional positioning used in titles, structured data and the footer. */
  title: 'Senior Software Engineer',
  eyebrow: 'Senior Software Engineer',
  headline: 'I build data-heavy interfaces, APIs, and background jobs.',
  lede: 'I take features from development to deployment. At Acelab I built Vue and Nuxt workflows and the .NET endpoints and SQL behind them. On my own projects I build Node.js APIs and background workflows and run them with CI/CD and monitoring.',
  description: 'Senior software engineer in Addis Ababa building product interfaces, APIs and background jobs. Open to remote frontend, backend and full-stack roles.',
  about: [
    'I have a software engineering degree from Addis Ababa University. I started on websites and full-stack apps in React, Vue, Angular and Node.js, and from 2023 to 2026 I worked on Acelab\'s Vue and Nuxt product, following my features into its API and data layer.',
    'The work I like best is a feature nobody has fully specified yet, where the screen has to be easy to use and the data behind it has to stay correct.',
  ],
  email: 'bereket5042@gmail.com',
  emailSubject: 'Hello from bereket.dev',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  availability: 'Open to senior roles and contract work',
  lookingFor: 'Remote senior frontend, backend and full-stack roles, including contracts.',
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
  { label: 'Now', value: 'Building independent software projects' },
  { label: 'Deepest in', value: 'React and Next.js, Vue and Nuxt, in JavaScript and TypeScript' },
  { label: 'Also work in', value: 'React, Next.js, .NET, Node.js, Python, PostgreSQL' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia', clock: true },
  { label: 'Open to', value: 'Senior frontend, backend and full-stack roles', note: 'Remote · full-time or contract' },
] as const

/** The contact section's two audiences, spelled out so neither has to guess. */
export const contactLines = [
  {
    label: 'Full-time roles',
    text: 'I am open to remote senior frontend, backend and full-stack roles.',
    cta: 'Email me about a role',
    subject: 'Full-time role',
  },
  {
    label: 'Contract work',
    text: 'I take on remote contracts for product interfaces, APIs and background jobs. If you have a project in mind, tell me what you need and when.',
    cta: 'Email me about a project',
    subject: 'Contract project',
  },
] as const
