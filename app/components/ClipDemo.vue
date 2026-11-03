<script setup lang="ts">
/**
 * An illustration of the public extension's flow with made-up data: a click captures
 * the page, the server turns it into products in a fixed shape, and the clip pastes
 * into a schedule as rows. Nothing here talks to a real service.
 */
defineProps<{ compact?: boolean }>()

// Starts on the finished state so the whole flow reads at a glance; the button replays it.
const step = ref(2)

const swatches = [
  { name: 'Fog', color: '#c9c6bd' },
  { name: 'Ember', color: '#b4694a' },
  { name: 'Moss', color: '#7d8a63' },
]

const products = [
  { tag: 'TZ1', name: 'Terrazzo Field Tile', size: '24 × 24 in' },
  { tag: 'TZ2', name: 'Terrazzo Bullnose Trim', size: '3 × 24 in' },
]

const clip = `{
  "version": 1,
  "source": "https://tiles.example/terrazzo",
  "products": [
    {
      "name": "Terrazzo Field Tile",
      "size": "24 × 24 in",
      "colors": ["Fog", "Ember", "Moss"],
      "images": ["…/field.jpg"]
    },
    {
      "name": "Terrazzo Bullnose Trim",
      "size": "3 × 24 in",
      "colors": ["Fog", "Ember", "Moss"],
      "images": ["…/trim.jpg"]
    }
  ]
}`

const actions = ['Clip this page', 'Paste into the schedule', 'Replay from the start']
const status = [
  'A manufacturer’s product page. Nothing is read until you click.',
  'Captured on click; the server parses it into products of a fixed shape, and the popup shows them for review before copying them as a versioned clip.',
  'Pasted into a schedule: the import creates the products and brings their images across.',
]

function advance() {
  step.value = (step.value + 1) % 3
}
</script>

<template>
  <figure
    class="clip-demo"
    :class="{ compact }"
  >
    <div class="frame">
      <div class="bar">
        <p class="label">
          Illustration · made-up data
        </p>
        <ol
          class="steps label"
          aria-label="Steps"
        >
          <li
            v-for="(name, i) in ['Capture', 'Review', 'Paste']"
            :key="name"
            :class="{ on: step >= i }"
            :aria-current="step === i ? 'step' : undefined"
          >
            {{ i + 1 }} {{ name }}
          </li>
        </ol>
      </div>

      <div class="stage">
        <div
          class="page"
          :class="{ captured: step >= 1 }"
        >
          <p class="url data">
            tiles.example/terrazzo
          </p>
          <div class="page-body">
            <p class="eyebrow label">
              Terrazzo collection
            </p>
            <ul
              class="items"
              aria-label="Products on the page"
            >
              <li
                v-for="product in products"
                :key="product.tag"
                class="field"
              >
                <span class="name">{{ product.name }}</span>
                <span class="size data">{{ product.size }}</span>
              </li>
            </ul>
            <ul
              class="field swatches"
              aria-label="Colors"
            >
              <li
                v-for="swatch in swatches"
                :key="swatch.name"
              >
                <span
                  class="chip"
                  :style="{ background: swatch.color }"
                  aria-hidden="true"
                />{{ swatch.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="out">
          <pre
            v-if="step >= 1"
            class="clip data"
            role="region"
            tabindex="0"
            aria-label="The copied clip, simplified"
          >{{ clip }}</pre>
          <p
            v-else
            class="placeholder"
          >
            The clip appears here.
          </p>

          <table
            v-if="step >= 2"
            class="sched"
          >
            <caption class="visually-hidden">
              Schedule rows created from the clip
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  Tag
                </th>
                <th scope="col">
                  Product
                </th>
                <th scope="col">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.tag"
              >
                <td class="data">
                  {{ product.tag }}
                </td>
                <td>{{ product.name }}</td>
                <td class="data">
                  {{ product.size }}
                </td>
              </tr>
            </tbody>
          </table>
          <p
            v-else
            class="placeholder"
          >
            Schedule rows appear here.
          </p>
        </div>
      </div>

      <div class="foot">
        <p
          class="status"
          aria-live="polite"
        >
          {{ status[step] }}
        </p>
        <button
          type="button"
          @click="advance"
        >
          {{ actions[step] }}
        </button>
      </div>
    </div>
    <figcaption>
      <slot>
        How the public extension’s hand-off works, redrawn with made-up products and a simplified clip, not the extension’s real format or interface. Both extensions read a page only after a click and hand over a versioned clip; neither writes into the application, and the schedule decides what to create when you paste.
      </slot>
    </figcaption>
  </figure>
</template>

<style scoped>
.clip-demo {
  margin-block: 2.75rem;
  max-width: 44rem;
}
.clip-demo.compact {
  margin-block: 0;
  max-width: none;
}
.frame {
  border: 1px solid var(--hair);
  background: var(--paper);
  font-size: 0.9375rem;
  line-height: 1.4;
}
.bar,
.foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding: 0.6rem 0.75rem;
}
.bar {
  border-bottom: 1px solid var(--hair);
}
.foot {
  border-top: 1px solid var(--hair);
  flex-wrap: nowrap;
  align-items: flex-start;
}
.steps {
  display: flex;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.steps li.on {
  color: var(--ink);
}
.steps li[aria-current="step"] {
  color: var(--signal);
}
.stage {
  display: grid;
  gap: 0.75rem;
  padding: 0.75rem;
}
@media (width >= 36rem) {
  .stage {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  }
}
.page {
  border: 1px solid var(--hair);
  background: var(--paper-2);
}
.url {
  margin: 0;
  padding: 0.35rem 0.6rem;
  font-size: 0.72rem;
  color: var(--muted);
  border-bottom: 1px solid var(--hair);
}
.page-body {
  padding: 0.75rem 0.6rem 0.9rem;
}
.page-body p,
.page-body ul {
  margin: 0;
}
.eyebrow {
  font-size: 0.68rem;
}
.field {
  margin-top: 0.4rem !important;
  border-radius: 1px;
  transition: box-shadow 200ms ease, background 200ms ease;
}
.captured .field {
  box-shadow: 0 0 0 2px var(--signal);
  background: var(--signal-soft);
}
.items {
  list-style: none;
  padding: 0;
}
.items li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 0.75rem;
  padding: 0.3rem 0.2rem;
}
.name {
  font-weight: 600;
  line-height: 1.25;
}
.size {
  font-size: 0.8rem;
  color: var(--muted);
}
.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  padding: 0.15rem 0;
  list-style: none;
  font-size: 0.85rem;
}
.chip {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.3rem;
  vertical-align: -0.1rem;
  border: 1px solid var(--hair);
}
.out {
  display: grid;
  gap: 0.75rem;
  align-content: start;
  min-width: 0;
}
.clip {
  margin: 0;
  padding: 0.6rem;
  border: 1px solid var(--hair);
  background: var(--paper-2);
  font-size: 0.7rem;
  line-height: 1.45;
  overflow-x: auto;
  white-space: pre;
}
.placeholder {
  margin: 0;
  padding: 1rem 0.6rem;
  border: 1px dashed var(--hair);
  color: var(--muted);
  font-size: 0.85rem;
}
.sched {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.sched th,
.sched td {
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid var(--hair);
  text-align: left;
}
.sched th {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--muted);
  background: var(--paper-2);
}
.status {
  margin: 0;
  color: var(--muted);
  font-size: 0.875rem;
  min-height: 2.5em;
}
button {
  flex-shrink: 0;
  min-height: 2.5rem;
  padding: 0 0.9rem;
  border: 0;
  background: var(--ink);
  color: var(--paper);
  font: inherit;
  cursor: pointer;
}
figcaption {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--muted);
  text-wrap: pretty;
}
</style>
