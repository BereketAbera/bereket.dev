<script setup lang="ts">
import type { Work } from '~/data/types'

defineProps<{ items: Work[], start?: number }>()

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div>
    <!-- Column heads for sighted readers; each row repeats its own labels for screen readers. -->
    <div
      class="work-grid label hidden border-b border-ink pb-2 lg:grid"
      aria-hidden="true"
    >
      <span>No.</span>
      <span>Work</span>
      <span>Role · years</span>
      <span>Evidence</span>
    </div>
    <ol class="border-t border-ink lg:border-t-0">
      <li
        v-for="(item, i) in items"
        :key="item.slug"
        class="work-row work-grid relative py-5 lg:py-6"
      >
        <span
          class="hidden text-[2rem] leading-none font-light text-muted tabular-nums lg:block"
          aria-hidden="true"
        >{{ pad((start ?? 1) + i) }}</span>
        <div>
          <h3 class="text-[1.1875rem] leading-snug font-semibold lg:text-[1.25rem]">
            <span
              class="data mr-3 font-normal text-muted lg:hidden"
              aria-hidden="true"
            >{{ pad((start ?? 1) + i) }}</span>
            <NuxtLink
              :to="`/work/${item.slug}`"
              class="row-link"
            >{{ item.title }}</NuxtLink>
          </h3>
          <p class="mt-1 text-[0.9375rem] leading-snug text-muted">
            {{ item.context }}
          </p>
          <p class="mt-2 max-w-[36rem] text-[0.9875rem] leading-[1.55] text-pretty">
            {{ item.outcome }}
          </p>
        </div>
        <dl class="contents text-[0.9375rem] leading-snug">
          <div class="max-lg:mt-3">
            <dt class="visually-hidden">
              Role
            </dt>
            <dd class="max-lg:inline">
              {{ item.role }}<span
                v-if="item.evidence === 'employer'"
                class="text-muted"
              > · {{ item.org.split(' · ')[0] }}</span>
            </dd>
            <dt class="visually-hidden">
              Years
            </dt>
            <dd class="data text-muted max-lg:inline max-lg:before:content-['_·_'] lg:mt-1">
              {{ item.years }}
            </dd>
          </div>
          <div class="max-lg:mt-1.5">
            <dt class="visually-hidden">
              Evidence
            </dt>
            <dd>
              <StatusMark :kind="item.evidence" />
            </dd>
          </div>
        </dl>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.work-grid {
  column-gap: 1.5rem;
}
@media (width >= 64rem) {
  .work-grid {
    display: grid;
    grid-template-columns: 11.5rem minmax(0, 1fr) 12rem 9rem;
    align-items: baseline;
  }
}
@media (width >= 80rem) {
  .work-grid {
    grid-template-columns: 11.5rem minmax(0, 1fr) 13rem 11.5rem;
  }
}

/* Rows bleed into the gutter so hover and focus have room, while the rules stay on the page's rails. */
.work-row {
  margin-inline: -0.75rem;
  padding-inline: 0.75rem;
}
.work-row::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0;
  border-bottom: 1px solid var(--hair);
  pointer-events: none;
}

/* The whole row is the link target; focus looks like an active spreadsheet cell. */
.row-link {
  text-decoration-color: var(--hair);
}
.row-link::after {
  content: "";
  position: absolute;
  inset: 0;
}
.work-row:hover {
  background: var(--paper-2);
}
.work-row:hover .row-link {
  text-decoration-color: var(--signal);
}
@supports selector(:has(*)) {
  .row-link:focus-visible {
    outline: none;
  }
  .work-row:has(.row-link:focus-visible) {
    outline: 2px solid var(--signal);
    outline-offset: -2px;
  }
  .work-row:has(.row-link:focus-visible)::before {
    content: "";
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    background: var(--signal);
    border: 2px solid var(--paper);
  }
}
</style>
