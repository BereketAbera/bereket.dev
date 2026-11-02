<script setup lang="ts">
import { capabilities } from '~/data/capabilities'
</script>

<template>
  <!-- Most prominent group first; the first one gets the most room on purpose. -->
  <ul class="border-t border-ink">
    <li
      v-for="(cap, i) in capabilities"
      :key="cap.id"
      class="grid gap-x-10 gap-y-4 border-b border-hair py-6 md:grid-cols-[minmax(0,1fr)_15rem] lg:py-7"
    >
      <div>
        <h3
          class="leading-snug font-semibold"
          :class="i === 0 ? 'text-[1.375rem] lg:text-[1.5rem]' : 'text-[1.1875rem]'"
        >
          {{ cap.title }}
        </h3>
        <p
          class="mt-1.5 max-w-[38rem] leading-[1.55]"
          :class="i === 0 ? 'text-[1.0625rem]' : 'text-[0.9875rem]'"
        >
          {{ cap.summary }}
        </p>
        <div class="prose mt-3 !text-[0.9875rem] !leading-[1.55]">
          <ul>
            <li
              v-for="point in cap.points"
              :key="point"
            >
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <p class="label">
            Tools
          </p>
          <p class="mt-1.5 text-[0.9375rem] leading-[1.5] text-muted">
            {{ cap.tools.join(', ') }}
          </p>
        </div>
        <EvidenceLinks
          :id="`evidence-${cap.id}`"
          :items="cap.evidence"
        />
      </div>
    </li>
  </ul>
</template>
