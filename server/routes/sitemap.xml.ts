import { work } from '../../app/data/work'

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  // The standalone /resume route remains available, but the homepage is canonical.
  const paths = ['/', ...work.filter(w => w.caseStudy).map(w => `/work/${w.slug}`), '/lab']
  const urls = paths.map(path => `  <url><loc>${siteUrl}${path === '/' ? '' : path}</loc></url>`).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
