export interface LabEntry {
  year: string
  title: string
  note: string
  context: string
  stack: string
  link: { label: string, href: string }
}

/** Experiments and earlier public work — kept apart from the case studies on purpose. */
export const lab: LabEntry[] = [
  {
    year: '2026',
    title: 'Understory',
    note: 'A concept site for a fictional country-house brokerage: filters kept in the URL, a schematic map, saved homes and side-by-side compare. AI agents built it from my research brief and art direction.',
    context: 'Design experiment',
    stack: 'Vue 3, Pinia, Tailwind',
    link: { label: 'Live demo', href: 'https://understory-drab.vercel.app' },
  },
  {
    year: '2022',
    title: 'React + D3 charts',
    note: 'Bar, line, scatter and stacked-bar charts as React components with D3, plus a React port of a well-known edge-bundling example.',
    context: 'Personal',
    stack: 'React, D3',
    link: { label: 'Repository', href: 'https://github.com/BereketAbera/d3-react-implementation' },
  },
  {
    year: '2021',
    title: 'Talguu',
    note: 'Core front-end contributor to a video-streaming web client: Redux Toolkit with Redux-Saga, an adaptive-bitrate video player with quality selection, and responsive layouts.',
    context: 'Team product',
    stack: 'React, Redux Toolkit, Redux-Saga, video.js',
    link: { label: 'Repository', href: 'https://github.com/kwong-hub/talguu-client' },
  },
  {
    year: '2020–21',
    title: 'Jimla',
    note: 'A B2B wholesale marketplace with separate admin, merchant and retailer portals.',
    context: 'Team product',
    stack: 'Angular',
    link: { label: 'Repository', href: 'https://github.com/BereketAbera/jimla-client' },
  },
]
