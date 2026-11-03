import tailwindcss from '@tailwindcss/vite'
import { siteUrl } from './app/data/site'


export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  typescript: { strict: true },
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  nitro: {
    // Plain static output in .output/public, which vercel.json serves. Without
    // this, Nuxt picks the vercel-static preset on Vercel and writes .vercel/output.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
      failOnError: true,
    },
  },
})
