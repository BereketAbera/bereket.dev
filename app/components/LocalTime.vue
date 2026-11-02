<script setup lang="ts">
import { describeOffset, formatClock } from '~/utils/time'

const props = withDefaults(defineProps<{ timeZone: string, relative?: boolean }>(), { relative: false })

// Rendered on the client only: a prerendered page would freeze the build time.
const now = ref<Date | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = new Date()
  timer = setInterval(() => (now.value = new Date()), 15_000)
})
onBeforeUnmount(() => clearInterval(timer))

const clock = computed(() => (now.value ? formatClock(props.timeZone, now.value) : null))
const gap = computed(() => {
  if (!props.relative || !now.value) return null
  const visitor = Intl.DateTimeFormat().resolvedOptions().timeZone
  return visitor ? describeOffset(props.timeZone, visitor, now.value) : null
})
</script>

<template>
  <span>
    <time
      v-if="clock"
      class="data"
      :datetime="now!.toISOString()"
    >{{ clock }}</time>
    <span
      v-else
      class="data"
      aria-hidden="true"
    >--:--</span>
    here<template v-if="gap">, {{ gap }}</template>
  </span>
</template>
