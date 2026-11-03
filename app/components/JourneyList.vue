<script setup lang="ts">
import { journey } from '~/data/journey'
</script>

<template>
  <!-- The stages are a real sequence, so the numbers carry meaning. -->
  <ol class="border-t border-ink">
    <li
      v-for="(stage, i) in journey"
      :key="stage.id"
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
          >{{ i + 1 }}</span>{{ stage.title }}
        </h3>
        <p class="mt-1.5 max-w-[38rem] text-[1rem] leading-[1.55]">
          {{ stage.summary }}
        </p>
        <div class="prose mt-3 !text-[0.9875rem] !leading-[1.55] text-muted">
          <ul>
            <li
              v-for="item in stage.proof"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <p
          v-if="stage.decision"
          class="mt-3 max-w-[38rem] border-l-2 border-signal pl-3 text-[0.9375rem] leading-[1.55]"
        >
          <span class="label mr-2">Decision<span class="visually-hidden">: </span></span>{{ stage.decision }}
        </p>
      </div>
      <EvidenceLinks
        :id="`journey-evidence-${stage.id}`"
        :items="stage.evidence"
        label="Where to see it"
      />
    </li>
  </ol>
</template>
