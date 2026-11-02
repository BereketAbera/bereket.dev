<script setup lang="ts">
import { approach } from '~/data/approach'
</script>

<template>
  <ol class="border-t border-ink">
    <li
      v-for="(item, i) in approach"
      :key="item.id"
      class="grid gap-x-10 gap-y-3 border-b border-hair py-6 md:grid-cols-[2.5rem_minmax(0,1fr)_15rem] lg:py-7"
    >
      <span
        class="data pt-1 !text-signal max-md:hidden"
        aria-hidden="true"
      >{{ i + 1 }}</span>
      <div>
        <h3 class="text-[1.1875rem] leading-snug font-semibold lg:text-[1.25rem]">
          <span
            class="data mr-3 font-normal !text-signal md:hidden"
            aria-hidden="true"
          >{{ i + 1 }}</span>{{ item.title }}
        </h3>
        <p class="mt-1.5 max-w-[38rem] text-[1rem] leading-[1.55]">
          {{ item.summary }}
        </p>
        <div class="prose mt-3 !text-[0.9875rem] !leading-[1.55] text-muted">
          <ul>
            <li
              v-for="example in item.examples"
              :key="example"
            >
              {{ example }}
            </li>
          </ul>
        </div>
      </div>
      <EvidenceLinks
        :id="`approach-evidence-${item.id}`"
        :items="item.evidence"
        label="Where to see it"
      />
    </li>
  </ol>
</template>
