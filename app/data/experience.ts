import type { Role } from './types'

export const experience: Role[] = [
  {
    org: 'Acelab',
    title: 'Senior Frontend Engineer',
    start: 'May 2023',
    end: null,
    location: 'Remote from Addis Ababa',
    summary: 'Material Hub, a materials platform for architects, owners and manufacturers. I joined on the frontend in Vue and Nuxt; in mid-2026 the role grew to full-stack, and I now also write the .NET endpoints, Python workflow steps and Node.js route handlers my features need.',
    highlights: [
      'Led the frontend of a two-sided request-for-information workflow (send wizard, autosaving response grid, live status) and wrote .NET endpoints for its paging, cancellation and live updates.',
      'Built core parts of the spreadsheet-style product schedule (the save path, cell types, undo and redo, and most of view sharing), built its presence and live cells with teammates, and was a major contributor to the app’s Nuxt 3 migration.',
      'Built the first in-app notification center’s interface and live updates; on a teammate’s new engine, proposed and built its single real-time event and took its frontend through review to release. Finished and released threaded comments.',
      'Built two Manifest V3 extensions end to end, one public on the Chrome Web Store, with a scoped token hand-off, server-side LLM parsing and a ground-truth evaluation harness.',
      'Since mid-2026, carry my features through the server side, inside services teammates built: .NET endpoints with server-side permission checks, Python workflow steps that keep reviewers’ edits through a rescrape, Node.js route handlers for an internal review platform, and the migrations behind them.',
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
