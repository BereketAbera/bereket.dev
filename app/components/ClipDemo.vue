<script setup lang="ts">
/**
 * An illustration of the public extension's flow with made-up data: a click captures
 * the page, the server parses it into products, the popup shows them for review and
 * copies a clip, and pasting into a schedule creates the products with their images.
 * Nothing here talks to a real service.
 */
defineProps<{ compact?: boolean }>()

// Starts on the finished state so the result reads at a glance; the button replays it.
const step = ref(2)

const swatches = [
  { name: 'Fog', color: '#c9c6bd' },
  { name: 'Ember', color: '#b4694a' },
  { name: 'Moss', color: '#7d8a63' },
]

const products = [
  { tag: 'TZ1', name: 'Terrazzo Field Tile', size: '24 × 24 in', shape: 'square' },
  { tag: 'TZ2', name: 'Terrazzo Bullnose Trim', size: '3 × 24 in', shape: 'strip' },
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
  'Captured on click and parsed on the server into products of a fixed shape. The popup shows them for review, then copies them as a versioned clip.',
  'Pasted into a project schedule: two new products, each with its image, ready to specify.',
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
                <span
                  class="thumb"
                  :class="product.shape"
                  aria-hidden="true"
                />
                <span class="text">
                  <span class="name">{{ product.name }}</span>
                  <span class="size data">{{ product.size }}</span>
                </span>
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
          <p
            v-if="step === 0"
            class="placeholder"
          >
            The products appear here once the page is clipped.
          </p>

          <div
            v-else-if="step === 1"
            class="panel"
          >
            <p class="panel-head label">
              Extension popup · 2 products found
            </p>
            <ul class="found">
              <li
                v-for="product in products"
                :key="product.tag"
              >
                <span
                  class="thumb"
                  :class="product.shape"
                  aria-hidden="true"
                />
                <span class="text">
                  <span class="name">{{ product.name }}</span>
                  <span class="size data">{{ product.size }} · 3 colors · 1 image</span>
                </span>
              </li>
            </ul>
            <p class="panel-foot">
              Copied to the clipboard <span aria-hidden="true">✓</span>
            </p>
          </div>

          <div
            v-else
            class="panel destination"
          >
            <p class="panel-head label">
              Project schedule · 2 products added
            </p>
            <table class="sched">
              <caption class="visually-hidden">
                Schedule rows created from the clip
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span class="visually-hidden">Image</span>
                  </th>
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
                  <td>
                    <span
                      class="thumb large"
                      :class="product.shape"
                      role="img"
                      :aria-label="`Imported image of ${product.name}`"
                    />
                  </td>
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
          </div>

          <details
            v-if="step >= 1"
            class="json"
          >
            <summary>The clip behind it (simplified JSON)</summary>
            <pre
              class="data"
              role="region"
              tabindex="0"
              aria-label="The copied clip, simplified"
            >{{ clip }}</pre>
          </details>
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
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  }
}
.page {
  border: 1px solid var(--hair);
  background: var(--paper-2);
  align-self: start;
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
.items,
.found {
  list-style: none;
  padding: 0;
  margin: 0;
}
.items li,
.found li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.3rem 0.2rem;
}
.text {
  display: grid;
  min-width: 0;
}
.name {
  font-weight: 600;
  line-height: 1.25;
}
.size {
  font-size: 0.78rem;
  color: var(--muted);
}
/* Terrazzo drawn in CSS: chips of the three colors on a pale ground. */
.thumb {
  flex-shrink: 0;
  display: inline-block;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--hair);
  background:
    radial-gradient(circle at 22% 30%, #b4694a 0 9%, transparent 10%),
    radial-gradient(circle at 70% 24%, #7d8a63 0 7%, transparent 8%),
    radial-gradient(circle at 55% 68%, #b4694a 0 6%, transparent 7%),
    radial-gradient(circle at 18% 78%, #7d8a63 0 8%, transparent 9%),
    radial-gradient(circle at 84% 72%, #8f8a80 0 7%, transparent 8%),
    radial-gradient(circle at 42% 45%, #8f8a80 0 5%, transparent 6%),
    #e3ded3;
}
.thumb.strip {
  height: 0.9rem;
  background-size: 100% 250%;
}
.thumb.large {
  width: 2.75rem;
  height: 2.75rem;
  vertical-align: middle;
}
.thumb.large.strip {
  height: 1.1rem;
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
  gap: 0.6rem;
  align-content: start;
  min-width: 0;
}
.panel {
  border: 1px solid var(--hair);
}
.destination {
  border-color: var(--ink);
}
.panel-head {
  margin: 0;
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid var(--hair);
  background: var(--paper-2);
  font-size: 0.7rem;
}
.found {
  padding: 0.35rem 0.4rem;
}
.panel-foot {
  margin: 0;
  padding: 0.4rem 0.6rem;
  border-top: 1px solid var(--hair);
  font-size: 0.85rem;
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
  font-size: 0.875rem;
}
.sched th,
.sched td {
  padding: 0.45rem 0.5rem;
  border-bottom: 1px solid var(--hair);
  text-align: left;
  vertical-align: middle;
}
.sched td.data {
  white-space: nowrap;
}
.sched tr:last-child td {
  border-bottom: 0;
}
.sched th {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--muted);
}
.json summary {
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--muted);
}
.json pre {
  margin: 0.5rem 0 0;
  padding: 0.6rem;
  border: 1px solid var(--hair);
  background: var(--paper-2);
  font-size: 0.7rem;
  line-height: 1.45;
  overflow-x: auto;
  white-space: pre;
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
