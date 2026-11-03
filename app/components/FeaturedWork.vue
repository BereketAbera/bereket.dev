<script setup lang="ts">
import type { Work } from '~/data/types'

defineProps<{ item: Work, number: number }>()
</script>

<template>
  <article
    class="feature"
    :aria-labelledby="`feature-${item.slug}`"
  >
    <div class="copy">
      <p class="label">
        <span class="!text-signal">{{ String(number).padStart(2, '0') }}</span> · {{ item.evidence === 'employer' ? item.org.split(' · ')[0] : 'Own product' }}
      </p>
      <h3
        :id="`feature-${item.slug}`"
        class="mt-2 text-[clamp(1.375rem,1.15rem+0.9vw,1.75rem)] leading-[1.15] font-[520] tracking-[-0.01em] text-balance"
      >
        <NuxtLink
          :to="`/work/${item.slug}`"
          class="no-underline hover:underline"
        >{{ item.title }}</NuxtLink>
      </h3>
      <p class="mt-1.5 text-[0.9375rem] leading-snug text-muted">
        {{ item.context }}
      </p>
      <p class="mt-4 max-w-[34rem] leading-[1.6] text-pretty">
        {{ item.outcome }}
      </p>
      <dl class="mt-4 grid gap-1.5 text-[0.9375rem] leading-snug">
        <div class="flex flex-wrap gap-x-2">
          <dt class="label pt-[0.15rem]">
            Role
          </dt>
          <dd>{{ item.role }} · <span class="data text-muted">{{ item.years }}</span></dd>
        </div>
        <div class="flex flex-wrap gap-x-2">
          <dt class="visually-hidden">
            Status
          </dt>
          <dd>
            <StatusMark :kind="item.evidence" />
          </dd>
        </div>
      </dl>
      <p class="mt-5">
        <NuxtLink
          :to="`/work/${item.slug}`"
          class="font-semibold"
        >Read the case study<span class="visually-hidden">: {{ item.title }}</span> <span aria-hidden="true">→</span></NuxtLink>
      </p>
    </div>
    <div class="visual">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.feature {
  display: grid;
  gap: 1.75rem;
  padding-block: 2.25rem;
  border-bottom: 1px solid var(--hair);
}
@media (width >= 64rem) {
  .feature {
    grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
    gap: 3.5rem;
    padding-block: 3rem;
  }
}
.visual {
  min-width: 0;
}
</style>
