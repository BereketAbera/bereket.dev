<script setup lang="ts">
/**
 * Screens from Enderase's development build, captured locally with staged demo data
 * (fictional names). Each opens full size in a dialog, with previous and next.
 * The home page shows three phones; the case study adds a fourth and the web app.
 */
const props = defineProps<{ compact?: boolean }>()

interface Shot { src: string, large: string, width: number, height: number, alt: string, kind: 'phone' | 'web' }

const all: Shot[] = [
  { src: '/img/enderase/m1-provider-profile-en.webp', large: '/img/enderase/m1-provider-profile-en-lg.webp', width: 600, height: 1305, kind: 'phone', alt: 'Mobile app: a carpenter’s profile with rating, hourly rate, the 20% deposit explained, next open slots and a Book Now button.' },
  { src: '/img/enderase/m2-booking-detail-en.webp', large: '/img/enderase/m2-booking-detail-en-lg.webp', width: 600, height: 1305, kind: 'phone', alt: 'Mobile app: a confirmed booking with its progress from requested through deposit to completed, and the payment summary.' },
  { src: '/img/enderase/m5-task-bids-en.webp', large: '/img/enderase/m5-task-bids-en-lg.webp', width: 600, height: 1305, kind: 'phone', alt: 'Mobile app: a posted plumbing task with its budget and three bids, sorted by lowest price.' },
  { src: '/img/enderase/m4-explore-am.webp', large: '/img/enderase/m4-explore-am-lg.webp', width: 600, height: 1305, kind: 'phone', alt: 'Mobile app in Amharic: browsing providers with ratings and rates in birr.' },
  { src: '/img/enderase/w2-provider-profile-desktop.webp', large: '/img/enderase/w2-provider-profile-desktop-lg.webp', width: 1440, height: 900, kind: 'web', alt: 'Web app on a desktop: a provider’s profile with rating, rate and availability, and a form to request a booking.' },
]

// The home page skips the task screen to keep three phones side by side.
const shots = computed(() => props.compact ? all.filter(shot => shot.kind === 'phone' && !shot.src.includes('task-bids')) : all)
const phones = computed(() => shots.value.filter(shot => shot.kind === 'phone'))
const web = computed(() => shots.value.find(shot => shot.kind === 'web'))

const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const current = ref(0)
// The frame renders only while open, so the large images aren't fetched with the page.
const isOpen = ref(false)
let opener: HTMLElement | null = null
const shown = computed(() => isOpen.value ? shots.value[current.value] : undefined)

async function open(shot: Shot, event: Event) {
  opener = event.currentTarget as HTMLElement
  current.value = shots.value.indexOf(shot)
  isOpen.value = true
  // Render the frame first, so focus can land on Close rather than the dialog itself.
  await nextTick()
  dialog.value?.showModal()
  closeButton.value?.focus()
  // A modal dialog makes the page inert but doesn't stop it scrolling underneath.
  document.documentElement.style.overflow = 'hidden'
}

function step(by: number) {
  const count = shots.value.length
  current.value = (current.value + by + count) % count
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

function onClose() {
  isOpen.value = false
  document.documentElement.style.overflow = ''
  opener?.focus()
}

// A click on the backdrop (the dialog element itself, outside the frame) closes it.
function onDialogClick(event: MouseEvent) {
  if (event.target === dialog.value) dialog.value?.close()
}
</script>

<template>
  <figure
    class="shots"
    :class="{ compact }"
  >
    <div
      class="phones"
      :class="{ quad: phones.length === 4 }"
      :style="{ '--count': phones.length }"
    >
      <button
        v-for="shot in phones"
        :key="shot.src"
        type="button"
        class="shot phone"
        :aria-label="`Enlarge: ${shot.alt}`"
        @click="open(shot, $event)"
      >
        <img
          :src="shot.src"
          :alt="shot.alt"
          :width="shot.width"
          :height="shot.height"
          loading="lazy"
          decoding="async"
        >
      </button>
    </div>
    <button
      v-if="web"
      type="button"
      class="shot web"
      :aria-label="`Enlarge: ${web.alt}`"
      @click="open(web, $event)"
    >
      <img
        :src="web.src"
        :alt="web.alt"
        :width="web.width"
        :height="web.height"
        loading="lazy"
        decoding="async"
      >
    </button>
    <figcaption>
      Development build with staged demo data and fictional names: a provider profile, a confirmed booking{{ compact ? '' : ', a task with bids' }} and the Amharic interface{{ compact ? '' : ', then the web app' }}. Select a screen to see it full size. Payments run in the gateway’s sandbox; the app isn’t in the stores yet.
    </figcaption>

    <dialog
      ref="dialog"
      class="viewer"
      aria-label="Enderase screens, full size"
      @keydown="onKeydown"
      @close="onClose"
      @click="onDialogClick"
    >
      <div
        v-if="shown"
        class="viewer-frame"
      >
        <div class="viewer-bar">
          <p
            class="viewer-count data"
            aria-live="polite"
          >
            {{ current + 1 }} / {{ shots.length }}<span class="visually-hidden">: {{ shown.alt }}</span>
          </p>
          <div class="viewer-tools">
            <button
              type="button"
              aria-label="Previous screen"
              @click="step(-1)"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next screen"
              @click="step(1)"
            >
              →
            </button>
            <button
              ref="closeButton"
              type="button"
              @click="dialog?.close()"
            >
              Close
            </button>
          </div>
        </div>
        <img
          :key="shown.large"
          :src="shown.large"
          :alt="shown.alt"
          :class="shown.kind"
        >
        <p
          class="viewer-caption"
          aria-hidden="true"
        >
          {{ shown.alt }}
        </p>
      </div>
    </dialog>
  </figure>
</template>

<style scoped>
.shots {
  margin-block: 2.75rem;
  max-width: 44rem;
}
.shots.compact {
  margin-block: 0;
  max-width: none;
}
.phones {
  display: grid;
  grid-template-columns: repeat(var(--count, 3), minmax(0, 1fr));
  gap: 0.75rem;
}
@media (width < 30rem) {
  .phones.quad {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.shot {
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--hair);
  background: var(--paper-2);
  cursor: zoom-in;
  transition: border-color 120ms ease, transform 120ms ease;
}
.shot:hover {
  border-color: var(--ink);
}
.phone {
  border-radius: 0.9rem;
  overflow: hidden;
}
.web {
  margin-top: 0.75rem;
}
.shot img {
  display: block;
  width: 100%;
  height: auto;
}
figcaption {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--muted);
  text-wrap: pretty;
}
.viewer {
  /* The global reset zeroes margins, which would pin the dialog to the top left. */
  margin: auto;
  max-width: min(96vw, 80rem);
  max-height: 96dvh;
  padding: 0;
  border: 1px solid var(--hair);
  background: var(--paper);
  color: var(--ink);
}
.viewer::backdrop {
  background: rgb(0 0 0 / 0.72);
}
.viewer-frame {
  display: grid;
  gap: 0;
}
.viewer img {
  display: block;
  margin-inline: auto;
  max-width: 100%;
  /* The controls sit above the image on one short row, so the image can take the rest. */
  max-height: calc(96dvh - 3.75rem);
  width: auto;
  height: auto;
  object-fit: contain;
}
.viewer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--hair);
}
.viewer-count {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}
.viewer-caption {
  /* Wraps to the image's width instead of widening the dialog. */
  box-sizing: border-box;
  width: 0;
  min-width: 100%;
  margin: 0;
  padding: 0.6rem 0.75rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--muted);
}
.viewer-tools {
  display: flex;
  gap: 0.5rem;
}
.viewer-tools button {
  min-width: 2.75rem;
  min-height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid var(--ink);
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
</style>
