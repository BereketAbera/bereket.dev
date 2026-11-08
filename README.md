# bereket.dev

Source of [bereket.dev](https://bereket.dev), the portfolio of Bereket Abera, a senior software engineer in Addis Ababa, frontend first and full-stack when the feature needs it.

The site is written to be read at three depths. In ten seconds the first screen says what I do and what I am looking for. In thirty seconds the capability list and the project cards show what I bring and how far each thing goes. Over five minutes the case studies cover the architecture, the tradeoffs and what was and was not tested.

AI coding agents built this site and drafted its copy under my direction.

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
| [`app/data/capabilities.ts`](app/data/capabilities.ts) | What I bring, how deep each thing goes, and where to check it |
| [`app/data/work.ts`](app/data/work.ts) | Projects and case studies: what each is, what is mine, what came from elsewhere, what each technology enabled, links and screenshots |
| [`app/data/experience.ts`](app/data/experience.ts) | Roles and education |
| [`app/data/resume.ts`](app/data/resume.ts) | Résumé summary and compact skills |
| [`app/data/lab.ts`](app/data/lab.ts) | Experiments and older public code, kept apart from the case studies (shown at `/lab`) |

`tests/unit/content.test.ts` fails if a capability points at a case study that does not exist, if a project is missing its statement of what is mine, if an upstream project is uncredited, if a screenshot is missing, unlabeled or heavier than its budget, if published text uses curly quotes or em dashes, or if a ticket ID, PR number, staging URL or phone number slips into the source. Internal names are checked against a private denylist passed in at test time (`CONTENT_DENYLIST=<file>`).

Every piece of work is labeled by evidence type, and every screenshot says where it came from: the live site, a local preview with sample data, or the hosted instance's monitoring.

Employer work describes my part and the decisions behind it. It contains no code, internal names or customer names; figures from internal benchmarks or offline replays are labeled as such. Personal projects say plainly that AI coding agents did the implementation under my direction.

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

The code is MIT-licensed. The text, the case studies and the photo are not licensed for reuse.
