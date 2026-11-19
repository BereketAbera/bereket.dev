<script setup lang="ts">
import { profile } from '~/data/profile'

usePageMeta({
  title: `${profile.name}, ${profile.title}`,
  description: 'Résumé of Bereket Abera, Senior Software Engineer. Experience across Vue and Nuxt, .NET and Node.js APIs, SQL, and production delivery.',
  type: 'profile',
})
useHead({
  link: [{ rel: 'alternate', type: 'application/pdf', href: profile.resumePdf, title: 'Résumé (PDF)' }],
})
</script>

<template>
  <ResumeDocument landing />
</template>
