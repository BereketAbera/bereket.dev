<script setup lang="ts">
import { profile } from '~/data/profile'

usePageMeta({
  title: 'Résumé',
  description: `Résumé of ${profile.name}, ${profile.title.toLowerCase()} in ${profile.location} (${profile.utcOffset}): experience, skills, projects and education, also as a PDF.`,
  type: 'profile',
  canonicalPath: '/',
})
useHead({
  link: [{ rel: 'alternate', type: 'application/pdf', href: profile.resumePdf, title: 'Résumé (PDF)' }],
})
</script>

<template>
  <ResumeDocument />
</template>
