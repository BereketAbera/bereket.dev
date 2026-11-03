<script setup lang="ts">
import { platform } from '~/data/platform'
</script>

<template>
  <div>
    <!-- Column heads for sighted readers on wide screens; each row carries its own labels for screen readers. -->
    <div
      class="platform-grid label hidden border-b border-ink pb-2 lg:grid"
      aria-hidden="true"
    >
      <span>Layer</span>
      <span>What the platform runs</span>
      <span>My part</span>
    </div>
    <ul class="border-t border-ink lg:border-t-0">
      <li
        v-for="row in platform.layers"
        :key="row.id"
        class="platform-grid border-b border-hair py-5 lg:grid lg:py-6"
      >
        <h3 class="text-[1.0625rem] leading-snug font-semibold">
          {{ row.layer }}
        </h3>
        <p class="text-[0.9375rem] leading-[1.55] text-muted max-lg:mt-1.5">
          <span class="label mr-2 lg:sr-only">Platform<span class="visually-hidden">: </span></span>{{ row.platform }}
        </p>
        <p class="text-[0.9875rem] leading-[1.55] max-lg:mt-2.5">
          <span class="label mr-2 !text-signal lg:sr-only">Mine<span class="visually-hidden">: </span></span>{{ row.mine }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* The layer column lines up with the section rail (.sheet: 10rem, 3rem gap). */
@media (width >= 64rem) {
  .platform-grid {
    grid-template-columns: 10rem minmax(0, 0.85fr) minmax(0, 1.15fr);
    column-gap: 3rem;
  }
}
</style>
