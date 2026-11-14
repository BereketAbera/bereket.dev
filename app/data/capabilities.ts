import type { Capability } from './types'

/**
 * What I bring, strongest first. `depth` says plainly where each capability comes from
 * and how far it goes, so work at my job and work on my own projects are never blurred.
 * tests/unit/content.test.ts fails if a capability has no depth or no inspectable evidence.
 */
export const capabilities: Capability[] = [
  {
    id: 'frontend',
    title: 'Complex product interfaces',
    summary: 'Data-heavy screens, multi-step workflows and spreadsheet-style editors, with autosave that stays correct when responses arrive out of order, live updates and keyboard navigation.',
    depth: 'My deepest skill. Eight-plus years of professional work, most recently on a large Vue and Nuxt product. React in earlier roles, and React and Next.js on internal tools at Acelab and on my own projects.',
    evidence: [
      { label: 'Work at Acelab', work: 'acelab' },
      { label: 'Bulk Vendor RFIs', href: 'https://www.acelabusa.com/solutions/project-delivery/automated-rfis' },
    ],
  },
  {
    id: 'design-systems',
    title: 'Design systems and accessible UI',
    summary: 'Reusable components and design tokens, with automated checks for keyboard use, focus, contrast and reduced motion.',
    depth: 'Components for a shared design system at Acelab, and Rillmark, a React library I published on npm. Automated accessibility checks only, not screen-reader testing.',
    evidence: [
      { label: 'Rillmark', work: 'rillmark' },
      { label: 'Work at Acelab', work: 'acelab' },
    ],
  },
  {
    id: 'backend',
    title: 'APIs, data and background jobs',
    summary: 'Paginated APIs with server-side permission checks, SQL migrations, long-running jobs that can retry a failed step, and checks on what third-party services and LLMs return.',
    depth: 'Hands-on at Acelab in 2026, inside services teammates built and run. Earlier full-stack roles in Node.js. Frameflow, my own project, adds video processing.',
    evidence: [
      { label: 'Frameflow', work: 'frameflow' },
      { label: 'Work at Acelab', work: 'acelab' },
    ],
  },
  {
    id: 'delivery',
    title: 'DevOps, CI/CD and infrastructure',
    summary: 'Kubernetes releases through GitOps and CI/CD, with images pinned to exact versions, traffic denied by default, secrets kept out of Git, phone alerts and tested restores.',
    depth: 'From my own projects, at single-server scale: I set up and run a K3s cluster with Argo CD and GitHub Actions, and I receive its alerts. At Acelab I shipped through pipelines my teammates owned.',
    evidence: [
      { label: 'Wayline', work: 'wayline' },
    ],
  },
  {
    id: 'ai',
    title: 'AI-assisted development',
    summary: 'I review AI-assisted changes and run tests before relying on them.',
    depth: 'Used at Acelab and on my own projects.',
    evidence: [
      { label: 'Work at Acelab', work: 'acelab' },
    ],
  },
]
