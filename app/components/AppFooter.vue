<script setup lang="ts">
import { mailto, profile } from '~/data/profile'
</script>

<template>
  <footer class="no-print mt-24 border-t border-ink">
    <div class="wrap grid gap-8 py-10 text-[0.9375rem] md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="font-semibold">
          {{ profile.name }}
          <span
            lang="am"
            aria-hidden="true"
            class="ml-2 font-ethiopic font-normal text-muted"
          >{{ profile.nameGeez }}</span>
        </p>
        <p class="mt-1 text-muted">
          {{ profile.title }} · {{ profile.location }}&nbsp;·&nbsp;{{ profile.utcOffset }}
        </p>
        <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <li><a :href="mailto">{{ profile.email }}</a></li>
          <li>
            <ExtLink :href="profile.links.github">GitHub</ExtLink>
          </li>
          <li v-if="profile.links.linkedin">
            <ExtLink :href="profile.links.linkedin">LinkedIn</ExtLink>
          </li>
          <li>
            <NuxtLink to="/resume">Résumé</NuxtLink>
          </li>
        </ul>
      </div>
      <p class="label leading-relaxed md:text-right">
        Nuxt 4 · Vue 3 · Tailwind 4 · prerendered<br>
        <ExtLink
          :href="profile.links.source"
          class="text-muted"
        >Source on GitHub</ExtLink>
        <span
          class="ml-3 font-ethiopic text-[1rem] text-ink normal-case"
          aria-hidden="true"
        >፨</span>
      </p>
    </div>
  </footer>
</template>
