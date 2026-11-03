/**
 * The address the site is published at: canonical URLs, social cards, the sitemap and
 * the résumé PDF's links all use it. bereket.dev still points at the previous site, so
 * this stays on the Vercel address until the domain moves; then change it to
 * https://bereket.dev, rebuild, and run `pnpm resume:pdf` again.
 */
export const siteUrl = 'https://bereket-dev.vercel.app'
