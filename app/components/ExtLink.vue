<script setup lang="ts">
defineProps<{ href: string }>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
  ><slot /><svg
    class="ml-[0.2em] inline-block size-[0.62em] -translate-y-[0.08em] align-baseline"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    aria-hidden="true"
  ><path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" /></svg><span class="visually-hidden"> (opens in a new tab)</span></a>
</template>
