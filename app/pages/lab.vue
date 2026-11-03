<script setup lang="ts">
import { lab } from '~/data/lab'

usePageMeta({
  title: 'Lab and earlier work',
  description: 'Experiments and older public code by Bereket Abera, kept apart from the case studies.',
})
</script>

<template>
  <div class="wrap pt-9 lg:pt-14">
    <p class="label">
      Lab
    </p>
    <h1 class="mt-4 max-w-[44rem] text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-[480] tracking-[-0.02em]">
      Lab and earlier work
    </h1>
    <p class="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.6]">
      Experiments and older public code, kept apart from the <NuxtLink to="/#work">case studies</NuxtLink>.
    </p>
    <ul class="mt-10 border-t border-ink">
      <li
        v-for="entry in lab"
        :key="entry.title"
        class="sheet border-b border-hair py-5"
      >
        <p class="data text-muted max-lg:mb-1">
          {{ entry.year }}
        </p>
        <div class="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_15rem]">
          <div>
            <h2 class="text-[1.0625rem] leading-snug">
              <span class="font-semibold">{{ entry.title }}</span><span class="visually-hidden">, </span>
              <span class="label ml-2">{{ entry.context }}</span>
            </h2>
            <p class="mt-1 max-w-[38rem] text-[0.9875rem] leading-[1.55]">
              {{ entry.note }}
            </p>
          </div>
          <div class="text-[0.9375rem]">
            <p class="text-muted">
              {{ entry.stack }}
            </p>
            <ExtLink :href="entry.link.href">{{ entry.link.label }}<span class="visually-hidden">: {{ entry.title }}</span></ExtLink>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
