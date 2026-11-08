<script setup lang="ts">
import type { Shot, ShotSource } from '~/data/types'

const props = withDefaults(defineProps<{
  shot: Shot
  /** Size hint for the browser's image choice; match the slot the figure sits in. */
  sizes?: string
  /** Load straight away. Only for an image near the top of the first screen. */
  eager?: boolean
  /** Hide the caption where the surrounding copy already says what the image shows. */
  captionless?: boolean
}>(), {
  sizes: '(width >= 64rem) 58vw, 100vw',
})

/** Every image says where it came from, so a local preview is never mistaken for the live product. */
const sourceLabel: Record<ShotSource, string> = {
  live: 'Live site',
  local: 'Local preview · sample data',
  monitoring: 'Hosted instance',
}

const widths = computed(() => props.shot.widths ?? [960, 1600])
const src = (width: number) => `/img/projects/${props.shot.file}-${width}.webp`
const srcset = computed(() => widths.value.map(width => `${src(width)} ${width}w`).join(', '))
const largest = computed(() => widths.value[widths.value.length - 1] ?? 1600)
</script>

<template>
  <figure
    class="shot"
    :class="{ phone: shot.phone }"
  >
    <div class="frame">
      <p
        v-if="!shot.phone"
        class="bar"
      >
        <span class="data host">{{ shot.host }}</span>
        <span class="label source">{{ sourceLabel[shot.source] }}</span>
      </p>
      <img
        :src="src(largest)"
        :srcset="srcset"
        :sizes="sizes"
        :alt="shot.alt"
        :width="shot.width"
        :height="shot.height"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
      >
    </div>
    <figcaption v-if="!captionless">
      <span
        v-if="shot.phone"
        class="label block"
      >{{ sourceLabel[shot.source] }}</span>
      {{ shot.caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.frame {
  border: 1px solid var(--hair);
  background: var(--paper-2);
}
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.15rem 1rem;
  padding: 0.4rem 0.7rem;
  border-bottom: 1px solid var(--hair);
}
.host {
  font-size: 0.8125rem;
}
.source {
  font-size: 0.6875rem;
}
img {
  display: block;
  width: 100%;
  height: auto;
}
.phone .frame {
  overflow: hidden;
  border-radius: 1.1rem;
}
figcaption {
  margin-top: 0.55rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--muted);
  text-wrap: pretty;
}
</style>
