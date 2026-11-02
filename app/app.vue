<script setup lang="ts">
import { profile } from '~/data/profile'

const { siteUrl } = useRuntimeConfig().public

useHead({
  titleTemplate: title => (!title ? `${profile.name} — ${profile.title}` : title.includes(profile.name) ? title : `${title} · ${profile.name}`),
  link: [
    { rel: 'preload', href: '/fonts/literata-roman.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
    { rel: 'preload', href: '/fonts/fragment-mono.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
  ],
  meta: [
    { name: 'theme-color', content: '#f5f3ee', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#151412', media: '(prefers-color-scheme: dark)' },
    { name: 'author', content: profile.name },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': profile.name,
        'alternateName': profile.nameGeez,
        'url': siteUrl,
        'image': `${siteUrl}/img/portrait-480.webp`,
        'email': `mailto:${profile.email}`,
        'jobTitle': profile.title,
        'worksFor': { '@type': 'Organization', 'name': 'Acelab', 'url': 'https://www.acelabusa.com' },
        'address': { '@type': 'PostalAddress', 'addressLocality': 'Addis Ababa', 'addressCountry': 'ET' },
        'alumniOf': { '@type': 'CollegeOrUniversity', 'name': 'Addis Ababa University' },
        'knowsAbout': ['Software engineering', 'Frontend engineering', 'TypeScript', 'Vue.js', 'Nuxt', 'React', 'Next.js', 'Node.js', '.NET', 'PostgreSQL', 'Real-time applications', 'Browser extensions', 'Accessibility'],
        'sameAs': [profile.links.github, profile.links.linkedin].filter(Boolean),
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
