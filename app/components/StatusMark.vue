<script setup lang="ts">
import type { EvidenceKind } from '~/data/types'
import { evidenceLabel } from '~/data/work'

const props = defineProps<{ kind: EvidenceKind }>()
/** Filled square: running in production. Hollow: still being built. */
const shipped = computed(() => props.kind !== 'product')
</script>

<template>
  <span class="inline-flex items-baseline gap-2">
    <span
      aria-hidden="true"
      class="inline-block size-[0.55rem] shrink-0 border border-ink"
      :class="shipped && 'bg-ink'"
    />
    <span>{{ evidenceLabel[kind] }}</span>
  </span>
</template>
