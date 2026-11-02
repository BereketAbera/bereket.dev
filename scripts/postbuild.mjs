// Nuxt's static output includes 200.html, an SPA shell that hosts such as Vercel
// serve for every unknown URL with a 200 status, so crawlers see soft 404s. Without
// it, unknown URLs get 404.html and a real 404 status; the client still renders the
// not-found page from it.
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

rmSync(fileURLToPath(new URL('../.output/public/200.html', import.meta.url)), { force: true })
