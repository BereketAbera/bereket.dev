# Evidence map

What the site and the profile drafts claim, and what backs each claim. Internal evidence (private code and pull requests at Acelab, the working notes for the personal projects) stays private, so the last column names the kind of evidence and where a reader can check it publicly.

Levels:

- **Substantial**: sustained professional work.
- **Working project**: real and working in a personal project that I built and run, at smaller scale than sustained professional work.
- **Limited**: some real exposure. Worth saying, but not a headline skill.

## Capabilities

| Capability | Level | Where it comes from | How to check it |
|---|---|---|---|
| Complex product interfaces | Substantial | Eight-plus years of professional work. At Acelab: how edits are saved and undone in a spreadsheet-style editor, the frontend of a cross-company request workflow | Bulk Vendor RFIs public page; AceClipper store listing; grid demo on /work/acelab (a rebuild with made-up data) |
| Design systems and accessible UI | Working project (Rillmark); some at work | Rillmark: 48 components, three presets, automated accessibility checks. Acelab: contributions to a shared component library | rillmark.bereket.dev; npm package rillmark; /work/rillmark |
| APIs, data and background jobs | Substantial for Vue and frontend API use; growing for backend | Acelab since 2026: .NET endpoints and SQL since June, Python and Node.js for internal tools since September. Frameflow pipeline | /work/acelab; /work/frameflow |
| Real-time updates | Substantial with teammates | Live cell updates built with my team. The interface and live updates of the first notification center built by me | /work/acelab |
| DevOps, CI/CD and infrastructure | Working project, single-server scale | Wayline and Frameflow: K3s, Helm, Argo CD, GitHub Actions, Terraform, Infisical, Prometheus, Loki, Grafana and restic. I own the server and receive its alerts. At work I ship through teammates' pipelines | /work/wayline; /work/frameflow |
| AI-assisted development | Daily use | At work and on my own projects, mainly with Claude Code | Stated on the home page and résumé; no public check |

## Personal projects

| Project | What it demonstrates | My contribution | Credit and limits | How to check it |
|---|---|---|---|---|
| Rillmark | Design tokens, presets, accessible components and a tested package release | Built it; the package is published under my npm account | 26 of 48 components import Radix directly; began as a shadcn-style registry, token and part names follow those conventions. Automated accessibility checks in Chromium only | rillmark.bereket.dev; npm package rillmark |
| Frameflow | Direct uploads, a workflow with retries, FFmpeg to HLS, private playback, and a tested deployment | Built and deployed it; own the server | UI primitives adapted from shadcn/ui. No outside users. Local preview screenshots are labeled | /work/frameflow |
| Wayline | Releases by digest, default-deny networking, tested restores, alerts | Built and run the platform around Plane, chose the hosting, own the server and accounts, and receive its alerts | Plane Community Edition is the Plane team's product (AGPL-3.0). One node, no failover, no load test on the server | /work/wayline |
| Awushi Cloudgarden | Deterministic state and replay in a small 3D game | Built it; run it on my own server | Infrastructure values are simulated | devops.bereket.dev |
| Enderase | One API and data model behind web and mobile apps, in English and Amharic | Own the product, architecture, data model and verification | In development: sandbox payments, not in the stores, mobile flows still need device runs | /work/enderase |

## Employment

| Claim | Evidence kind | Public check |
|---|---|---|
| At Acelab since May 2023; Senior title as stated by me | Owner statement | None public |
| Owned the frontend of a request workflow, with .NET endpoints for its paging, cancellation and live updates | Private code and pull requests | Bulk Vendor RFIs public page describes the feature |
| Built how cell edits are saved, single-cell undo and redo, and most of the sharing of saved views for a spreadsheet-style editor | Private code | Finish Schedule public page describes the product |
| Built a bulk report of missing products end to end | Private code | None public |
| Built AceClipper | Private code, public store listing | Chrome Web Store listing |
| Major contributor to the Nuxt 2 to 3 migration | Private code | None public; a teammate led it |
| 71% recall on an offline replay of 23 products | Private offline evaluation | Labeled on the page as a replay, not a held-out test or production measure |
| Earlier roles, degree and 8+ years | CV and my own statement | None public |

## Numbers on the site

| Number | Source | Public check |
|---|---|---|
| Rillmark: 45 unit tests, 42 browser tests, 72 contrast assertions, 48 components, 26 importing Radix | Project test records and source counts | Component count on rillmark.bereket.dev |
| Frameflow: about 7 seconds to process a 6-second test clip, FFmpeg stopped within 9 seconds of a cancel, about 38 minutes for the reconcile job to repair a stuck record | Recorded server runs | None public |
| Wayline: 38 smoke checks passed before a browser found a stale-page bug | Local test records | None public |

## Not claimed

No adoption, revenue, user counts, uptime, or web performance numbers such as Core Web Vitals. The only timings come from single test runs and are labeled. No claim of Kubernetes experience beyond single-server K3s on my own projects, or of WCAG conformance or screen-reader testing. Dates from the four personal project repositories, commit counts and contribution graphs are not used as evidence. Acelab dates come from commit records in the employer's repositories.
