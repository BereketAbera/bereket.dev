<script setup lang="ts">
import type { EvidenceRef } from '~/data/types'

defineProps<{ id: string, items: EvidenceRef[], label?: string }>()
</script>

<template>
  <div>
    <p
      :id="id"
      class="label"
    >
      {{ label ?? 'Evidence' }}
    </p>
    <ul
      class="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] md:block md:space-y-1"
      :aria-labelledby="id"
    >
      <li
        v-for="ev in items"
        :key="ev.label"
      >
        <NuxtLink
          v-if="ev.work"
          :to="`/work/${ev.work}`"
        >{{ ev.label }}</NuxtLink>
        <ExtLink
          v-else-if="ev.href?.startsWith('http')"
          :href="ev.href"
        >{{ ev.label }}</ExtLink>
        <NuxtLink
          v-else-if="ev.href"
          :to="ev.href.startsWith('#') ? `/${ev.href}` : ev.href"
        >{{ ev.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
