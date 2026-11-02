<script setup lang="ts">
defineProps<{ id: string, number: string, title: string }>()
</script>

<template>
  <div class="sheet items-baseline border-t border-ink pt-5">
    <p
      class="label mb-2 !text-signal lg:mb-0"
      aria-hidden="true"
    >
      § {{ number }}
    </p>
    <div class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
      <h2
        :id="id"
        class="text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)] leading-[1.15] font-[520] tracking-[-0.015em]"
      >
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>
