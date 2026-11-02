import { profile } from '~/data/profile'

interface PageMeta {
  title: string
  description: string
  /** Path relative to the site root, e.g. "/og/home.png". */
  image?: string
  /** Text alternative for the social card. */
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
}

/** Title, description, canonical URL and social cards for one page. */
export function usePageMeta(meta: PageMeta) {
  const { siteUrl } = useRuntimeConfig().public
  const route = useRoute()
  const url = `${siteUrl}${route.path === '/' ? '' : route.path}`
  const image = `${siteUrl}${meta.image ?? '/og/home.png'}`
  // titleTemplate adds the name to <title> only; link previews get it here.
  const fullTitle = meta.title.includes(profile.name) ? meta.title : `${meta.title} · ${profile.name}`
  const imageAlt = meta.imageAlt ?? `${profile.name}: ${profile.headline}`

  useSeoMeta({
    title: meta.title,
    description: meta.description,
    ogTitle: fullTitle,
    ogDescription: meta.description,
    ogType: meta.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: imageAlt,
    ogSiteName: 'Bereket Abera',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: meta.description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
