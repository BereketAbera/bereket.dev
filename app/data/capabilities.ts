import type { Capability } from './types'

/**
 * What I bring, strongest first. `depth` says plainly where each capability comes from
 * and how far it goes, so work at my job and work I direct on my own projects are never blurred.
 * tests/unit/content.test.ts fails if a capability has no depth or no inspectable evidence.
 */
export const capabilities: Capability[] = [
  {
    id: 'frontend',
    title: 'Complex product interfaces',
    summary: 'Data-heavy screens, multi-step workflows and spreadsheet-style editors, with autosave that stays correct when responses arrive out of order, live updates and keyboard navigation.',
    depth: 'My deepest skill. Eight-plus years of professional work, most recently on a large Vue and Nuxt product. React in earlier roles, and React and Next.js on internal tools at Acelab. My own React and Next.js projects were directed with AI agents.',
    evidence: [
      { label: 'Work at Acelab', work: 'acelab' },
      { label: 'Bulk Vendor RFIs', href: 'https://www.acelabusa.com/solutions/project-delivery/automated-rfis' },
    ],
  },
  {
    id: 'design-systems',
    title: 'Design systems and accessible UI',
    summary: 'Reusable components and design tokens, with automated checks for keyboard use, focus, contrast and reduced motion.',
    depth: 'Components for a shared design system at Acelab, and Rillmark, a published React library directed with AI agents. Automated accessibility checks only, not screen-reader testing.',
    evidence: [
      { label: 'Rillmark', work: 'rillmark' },
      { label: 'Work at Acelab', work: 'acelab' },
    ],
  },
  {
    id: 'backend',
    title: 'APIs, data and background jobs',
    summary: 'Paginated APIs with server-side permission checks, SQL migrations, long-running jobs that can retry a failed step, and checks on what third-party services and LLMs return.',
    depth: 'Hands-on at Acelab since 2026, inside services teammates built and run. Earlier full-stack roles in Node.js. Frameflow, directed with AI agents, adds video processing.',
    evidence: [
      { label: 'Frameflow', work: 'frameflow' },
      { label: 'Work at Acelab', work: 'acelab' },
    ],
  },
  {
    id: 'delivery',
    title: 'Deployment and infrastructure',
    summary: 'Releases locked to exact image versions, network traffic denied by default, secrets kept out of Git, phone alerts and tested restores.',
    depth: 'Limited, and from my own projects: I set the brief for a single-server Kubernetes deployment that AI agents built, and I own the server and receive its alerts. At work I ship through pipelines my teammates own.',
    evidence: [
      { label: 'Wayline', work: 'wayline' },
    ],
  },
  {
    id: 'ai',
    title: 'Directing AI coding agents',
    summary: 'Turning a goal into a brief an agent can carry out, and requiring results backed by tests that actually ran.',
    depth: 'Daily. The projects on this page were built this way, and each entry says how far my part went. At Acelab I use agents for part of my work, check what they produce and answer for what ships.',
    evidence: [
      { label: 'Wayline', work: 'wayline' },
      { label: 'Frameflow', work: 'frameflow' },
    ],
  },
]
