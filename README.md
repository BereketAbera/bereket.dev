# bereket.dev

Source of [bereket.dev](https://bereket.dev), the portfolio of Bereket Abera, a software engineer in Addis Ababa who takes features from an unclear brief to production: deepest in frontend (TypeScript, Vue, Nuxt), also building in React, and shipping the API, data and release work behind them in .NET, Node.js and Python.

The site is written to be read at three depths. In ten seconds the first screen says what I build, where and with what. Within thirty seconds the three featured projects show the work itself: an interactive rebuild of a response grid (made-up data), an illustration of a browser-extension hand-off, and screens from my own product. Over five minutes the case studies and [`/how-i-work`](app/pages/how-i-work.vue) cover the stages from brief to production, each capability with examples, and the platform I work in with my exact part in each layer.

## Stack

- **Nuxt 4** (Vue 3.5, TypeScript, strict), prerendered with `nuxt generate`. Every page is static HTML, so crawlers and link previews get the full content.
- **Tailwind CSS 4**, with design tokens as CSS variables in [`app/assets/css/main.css`](app/assets/css/main.css). Light and dark themes come from those variables.
- **Self-hosted fonts:** Literata, a variable font with optical sizes, for reading; Fragment Mono for labels and numbers; and a 10-glyph Noto Serif Ethiopic subset for the Ge'ez signature.
- **Tests:** Vitest for content wiring and color contrast, and Playwright with axe-core for pages, links, keyboard paths and accessibility at desktop and phone sizes.

## Content model

Claims and the evidence behind them live in typed data files, not scattered through templates:

| File | Holds |
|---|---|
| [`app/data/profile.ts`](app/data/profile.ts) | Positioning, facts, contact |
| [`app/data/journey.ts`](app/data/journey.ts) | Six stages from brief to production, each with proof, one real decision and links to where to check it |
| [`app/data/platform.ts`](app/data/platform.ts) | The platform I work in, layer by layer: what it runs, and my part in each layer |
| [`app/data/work.ts`](app/data/work.ts) | Case-study index: role, period, stack, evidence type, public links; the first three are featured with a visual |
| [`app/data/capabilities.ts`](app/data/capabilities.ts) | Capability groups: tools I ship with, platform technology I have working knowledge of (kept separate), and evidence links |
| [`app/data/experience.ts`](app/data/experience.ts) | Roles and education |
| [`app/data/resume.ts`](app/data/resume.ts) | Résumé summary and the grouped working-knowledge list |
| [`app/data/lab.ts`](app/data/lab.ts) | Experiments and older public code, kept apart from the case studies (shown at `/lab`) |

`tests/unit/content.test.ts` fails if a capability points at a case study that doesn't exist, if a technology is listed both as shipped and as working knowledge, if any page still holds placeholder text, or if a ticket ID, PR number, staging URL or phone number slips into the source. Internal names are checked against a private denylist passed in at test time (`CONTENT_DENYLIST=<file>`).

Every piece of work is labeled by evidence type:

- **Shipped at work** (■): in production at an employer; the code is private.
- **Own product · in development** (□): my own product, not yet launched.
- **Open source · live demo**: reserved for projects built in public, with the code and a working demo linked.

Employer case studies describe my part and the decisions behind it. They contain no code, internal names or customer names; figures from internal benchmarks, evaluations or offline replays are labeled as such.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm build` | Prerender the site to `.output/public` |
| `pnpm preview` | Serve the built site on port 4173 |
| `pnpm lint` | ESLint (`@nuxt/eslint`) |
| `pnpm typecheck` | `vue-tsc` through `nuxt typecheck` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright against the built site (desktop and Pixel 7) |
| `pnpm check` | Lint, typecheck, unit tests, build, then e2e |
| `pnpm resume:pdf` | Regenerate `public/bereket-abera-resume.pdf` from `/resume` (needs the site running: `pnpm dev --port 3600`, or set `RESUME_URL`) |
| `pnpm og` | Regenerate the 1200×630 social cards in `public/og/` |

## Deploy

Vercel serves `.output/public` as a static site (see [`vercel.json`](vercel.json)). Hashed assets and fonts are cached for a year. Security headers are set on every route, and a Content Security Policy on every page except the résumé PDF.

## License

The code is MIT-licensed. The writing, the case studies and the photo are mine and not licensed for reuse.
