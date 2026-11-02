<script setup lang="ts">
defineProps<{ caption: string }>()
</script>

<template>
  <figure class="case-figure">
    <div class="border border-hair bg-paper p-4 text-ink sm:p-6">
      <slot />
    </div>
    <figcaption class="mt-2.5 text-[0.875rem] leading-[1.5] text-pretty text-muted">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.case-figure {
  max-width: 44rem;
  margin-block: 2.75rem !important;
}
/* On phones the frame bleeds to the screen edges so the diagram text stays legible. */
@media (width < 40rem) {
  .case-figure > div {
    /* same expression as .wrap's padding-inline in main.css; keep in sync */
    margin-inline: calc(-1 * clamp(1.25rem, 4vw, 3.5rem));
    border-inline-width: 0;
    padding-inline: 0.5rem;
  }
}
.case-figure :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
  max-width: 36rem;
  margin-inline: auto;
}
</style>
