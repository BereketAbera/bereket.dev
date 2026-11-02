import type { Role } from './types'

export const experience: Role[] = [
  {
    org: 'Acelab',
    title: 'Senior Frontend Engineer',
    start: 'May 2023',
    end: null,
    location: 'Remote from Addis Ababa',
    summary: 'Material Hub, a materials platform for architects, owners and manufacturers. Frontend in Vue and Nuxt from the start; since mid-2026 also the .NET API, an internal Next.js data-quality platform and Python data workers.',
    highlights: [
      'Led the frontend of a request-for-information workflow between architects and manufacturers, and wrote .NET endpoints for its paging, cancellation and real-time updates.',
      'Built core parts of the spreadsheet-style product schedule, including undo and redo, most of view sharing, collaborator presence and live cell updates.',
      'Built the product’s first in-app notification center, then took the frontend of a teammate’s new event-driven notification engine through review to release; finished and released threaded comments.',
      'Built two Manifest V3 browser extensions end to end, one public on the Chrome Web Store, with scoped token handoff and server-side LLM parsing.',
      'A major contributor to the Nuxt 2 to Nuxt 3 migration (projects, account, schedules, comments and notifications), then part of the move to TypeScript, composables and Pinia.',
    ],
    work: ['workflow-engineering', 'data-interfaces', 'realtime-sync', 'browser-extensions', 'modernization'],
  },
  {
    org: 'Mrara Enterprises',
    title: 'Senior Frontend Developer (part-time)',
    start: '2021',
    end: '2024',
    location: 'Remote',
    summary: 'Vue and Nuxt applications with Vuex and Vue Router, reusable component code, and React front ends with Redux and Tailwind.',
    highlights: [],
  },
  {
    org: 'Mereb Technologies',
    title: 'Full-Stack Web Developer',
    start: 'Sep 2021',
    end: 'Dec 2021',
    location: 'Addis Ababa',
    summary: 'JavaScript web projects and browser automation tests with Puppeteer.',
    highlights: [],
  },
  {
    org: 'Tiltek Technologies',
    title: 'Full-Stack Web Developer',
    start: 'Jan 2018',
    end: 'Aug 2021',
    location: 'Addis Ababa',
    summary: 'Web applications in Node.js, React, Vue and Angular, built in an agile team.',
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
  period: '2014 – 2019',
}
