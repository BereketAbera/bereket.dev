import type { Role } from './types'

/**
 * Roles, newest first. Each entry says what I was responsible for and how deep it went.
 * "Built" means I was the engineer responsible for the design, the change and whether it worked.
 */
export const experience: Role[] = [
  {
    org: 'Acelab',
    title: 'Senior Frontend Engineer',
    start: 'May 2023',
    end: null,
    location: 'Remote from Addis Ababa',
    summary: 'I build complex product interfaces in Vue and Nuxt, in TypeScript since 2026, for a B2B platform where architects and manufacturers select and document building products. Since June 2026 I also build the .NET endpoints and SQL behind my features, and since September 2026 Python workflow steps and Node.js route handlers for internal product-data tools, inside services teammates built and run.',
    highlights: [
      'Owned the frontend of a workflow that lets architects request product data from manufacturers, and built .NET endpoints for its paging, cancellation and live updates. A teammate led the backend. Acelab markets it as Bulk Vendor RFIs.',
      'Built how cell edits are saved, single-cell undo and redo, and most of the sharing of saved views for a collaborative spreadsheet-style editor. Teammates built the grid itself.',
      'Built a bulk report of missing products end to end, from the editor action through .NET endpoints to a SQL migration.',
      'Built AceClipper, a public Chrome extension that turns manufacturer web pages into product records, with a scoped sign-in token and server-side LLM parsing.',
      'Major contributor to moving a Vue app of more than 1,000 files from Nuxt 2 to Nuxt 3 while the product kept shipping (merged November 2025).',
    ],
    work: 'acelab',
  },
  {
    org: 'Mrara Enterprises',
    title: 'Frontend Developer (part-time)',
    start: '2021',
    end: '2024',
    location: 'Remote',
    summary: 'Frontend work on Vue, Nuxt and React applications.',
    highlights: [],
  },
  {
    org: 'Mereb Technologies',
    title: 'Full-Stack Web Developer',
    start: 'Late 2021',
    end: 'Late 2021',
    location: 'Addis Ababa',
    summary: 'JavaScript web projects.',
    highlights: [],
  },
  {
    org: 'Tiltek Technologies',
    title: 'Full-Stack Web Developer',
    start: 'Jan 2018',
    end: 'Aug 2021',
    location: 'Addis Ababa',
    summary: 'Web applications in Node.js, React, Vue and Angular.',
    highlights: [],
  },
  {
    org: '360 Ground',
    title: 'Front-End Web Developer',
    start: 'Jun 2017',
    end: 'Jan 2018',
    location: 'Addis Ababa',
    summary: 'Websites for local businesses in React and Vue.',
    highlights: [],
  },
]

export const education = {
  degree: 'BSc, Software Engineering',
  school: 'Addis Ababa University',
  period: '2014 to 2019',
}
