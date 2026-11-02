# bereket.dev

Source of [bereket.dev](https://bereket.dev), the portfolio of Bereket Abera, a software engineer in Addis Ababa: frontend-first (TypeScript, Vue, Nuxt, React), with Node.js and .NET APIs behind it.

The site is written to be read two ways. A recruiter can get role, stack, location and contact details from the first screen. An engineering manager can open any row of the work table for a case study covering the problem, my part, the decisions, the tradeoffs and what shipped.

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
| [`app/data/approach.ts`](app/data/approach.ts) | The five ways I work, each with examples and links to where to check them |
| [`app/data/work.ts`](app/data/work.ts) | Case-study index: role, period, team, stack, evidence type, public links |
| [`app/data/capabilities.ts`](app/data/capabilities.ts) | Capability groups with the tools used for each, every group pointing at case studies or public links |
| [`app/data/experience.ts`](app/data/experience.ts) | Roles and education |
| [`app/data/lab.ts`](app/data/lab.ts) | Experiments and older public code, kept apart from the case studies |

`tests/unit/content.test.ts` fails if a capability points at a case study that doesn't exist, if any page still holds placeholder text, or if an internal identifier from employer work slips into the source.

Every piece of work is labeled by evidence type:

- **Shipped at work** (■): in production at an employer; the code is private.
- **Own product · in development** (□): my own product, not yet launched.
- **Open source · live demo**: built in public; the code and a working demo are linked.

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
| `pnpm check` | All of the above, in order |
| `pnpm resume:pdf` | Regenerate `public/bereket-abera-resume.pdf` from `/resume` (needs the dev server) |
| `pnpm og` | Regenerate the 1200×630 social cards in `public/og/` |

## Deploy

Vercel serves `.output/public` as a static site (see [`vercel.json`](vercel.json)). Hashed assets and fonts are cached for a year, and security headers, including a Content Security Policy, are set on every route.

## License

The code is MIT-licensed. The writing, the case studies and the photo are mine and not licensed for reuse.
