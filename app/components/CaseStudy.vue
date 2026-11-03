<script setup lang="ts">
import { profile } from '~/data/profile'
import { findWork, work } from '~/data/work'

const props = defineProps<{
  slug: string
  /** The three-line summary at the top: the pain, my part, and what shipped. */
  problem: string
  part: string
  result: string
}>()

const item = findWork(props.slug)
const index = work.findIndex(w => w.slug === props.slug)
const number = String(index + 1).padStart(2, '0')
const prev = index > 0 ? work[index - 1] : undefined
const next = index < work.length - 1 ? work[index + 1] : undefined

usePageMeta({
  title: item.metaTitle,
  description: item.metaDescription,
  image: `/og/${item.slug}.png`,
  imageAlt: `Case study: ${item.headline}. ${profile.name}, bereket.dev`,
  type: 'article',
})

const summary = computed(() => [
  { label: 'Problem', text: props.problem },
  { label: 'My part', text: props.part },
  { label: 'Result', text: props.result },
])
</script>

<template>
  <article class="wrap pt-8 lg:pt-12">
    <nav
      aria-label="Breadcrumb"
      class="label"
    >
      <ol class="flex gap-2">
        <li>
          <NuxtLink to="/#work">Work</NuxtLink>
        </li>
        <li aria-hidden="true">
          /
        </li>
        <li aria-current="page">
          {{ number }} · {{ item.title }}
        </li>
      </ol>
    </nav>

    <header class="sheet mt-6 lg:mt-10">
      <!-- On desktop each part of "Acelab · Material Hub" gets its own line in the narrow rail. -->
      <p class="label max-lg:mb-3 lg:pt-3">
        <template
          v-for="(segment, i) in item.org.split(' · ')"
          :key="segment"
        >
          <span
            v-if="i"
            class="lg:hidden"
          > · </span><span class="lg:block">{{ segment }}</span>
        </template>
      </p>
      <div>
        <h1 class="max-w-[46rem] text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-[480] tracking-[-0.02em]">
          {{ item.headline }}
        </h1>
        <p class="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.6] sm:text-[1.1875rem]">
          {{ item.outcome }}
        </p>
      </div>
    </header>

    <div class="sheet mt-10 gap-y-10 lg:mt-14">
      <aside
        aria-label="Project facts"
        class="case-facts self-start"
      >
        <dl class="border-t border-ink text-[0.9375rem] leading-snug">
          <div class="fact">
            <dt class="label">
              Role
            </dt>
            <dd>{{ item.roleDetail }}</dd>
          </div>
          <div class="fact">
            <dt class="label">
              When
            </dt>
            <dd class="tabular-nums">
              {{ item.period }}
            </dd>
          </div>
          <div class="fact">
            <dt class="label">
              Stack
            </dt>
            <dd>{{ item.stack.join(', ') }}</dd>
          </div>
          <div class="fact">
            <dt class="label">
              Spans
            </dt>
            <dd>{{ item.spans.join(' · ') }}</dd>
          </div>
          <div class="fact">
            <dt class="label">
              Evidence
            </dt>
            <dd>
              <StatusMark :kind="item.evidence" />
              <ul
                v-if="item.links.length"
                class="mt-1.5 space-y-1"
              >
                <li
                  v-for="link in item.links"
                  :key="link.href"
                >
                  <ExtLink :href="link.href">{{ link.label }}</ExtLink>
                </li>
              </ul>
            </dd>
          </div>
          <div
            v-if="item.evidence === 'employer' || item.evidence === 'product'"
            class="fact"
          >
            <dt class="label">
              Code
            </dt>
            <dd>{{ item.evidence === 'employer' ? 'Private (employer)' : 'Private repository' }}</dd>
          </div>
        </dl>
      </aside>

      <div class="min-w-0">
        <dl class="max-w-[44rem] border-t border-ink">
          <div
            v-for="row in summary"
            :key="row.label"
            class="grid gap-1 border-b border-hair py-3.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-5"
          >
            <dt class="label sm:pt-[0.3rem]">
              {{ row.label }}
            </dt>
            <dd class="text-[1.0625rem] leading-[1.55]">
              {{ row.text }}
            </dd>
          </div>
        </dl>

        <div class="prose mt-12">
          <slot />
        </div>

        <section
          v-if="item.evidence === 'employer'"
          class="mt-16 max-w-[38rem] border-t border-hair pt-5 text-[0.9375rem] leading-[1.6] text-muted"
          aria-labelledby="left-out"
        >
          <h2
            id="left-out"
            class="label"
          >
            What’s left out
          </h2>
          <p class="mt-2">
            Acelab’s code and data are private, so the diagrams are redrawn and any interactive demo is a rebuild with made-up data. Names of colleagues, customers and internal tools are left out on purpose. I’m glad to go deeper on any of it in an interview.
          </p>
        </section>

        <nav
          aria-label="More case studies"
          class="mt-16 grid gap-6 border-t border-ink pt-5 sm:grid-cols-2"
        >
          <NuxtLink
            v-if="prev"
            :to="`/work/${prev.slug}`"
            class="group no-underline"
          >
            <span class="label block"><span aria-hidden="true">← </span>Previous</span>
            <span class="mt-1 block text-balance text-[1.0625rem] font-semibold underline decoration-hair underline-offset-[0.22em] group-hover:decoration-signal">{{ prev.title }}</span>
          </NuxtLink>
          <span v-else />
          <NuxtLink
            v-if="next"
            :to="`/work/${next.slug}`"
            class="group no-underline sm:text-right"
          >
            <span class="label block">Next<span aria-hidden="true"> →</span></span>
            <span class="mt-1 block text-balance text-[1.0625rem] font-semibold underline decoration-hair underline-offset-[0.22em] group-hover:decoration-signal">{{ next.title }}</span>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/#work"
            class="group no-underline sm:text-right"
          >
            <span class="label block">Back to</span>
            <span class="mt-1 block text-balance text-[1.0625rem] font-semibold underline decoration-hair underline-offset-[0.22em] group-hover:decoration-signal">All work</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Sticky only where the whole facts rail fits on screen; on shorter windows it scrolls with the page. */
@media (width >= 64rem) and (height >= 58rem) {
  .case-facts {
    position: sticky;
    top: 1.5rem;
  }
}
.fact {
  display: grid;
  gap: 0.25rem;
  padding-block: 0.7rem;
  border-bottom: 1px solid var(--hair);
}
@media (width >= 40rem) and (width < 64rem) {
  .fact {
    grid-template-columns: 6.5rem minmax(0, 1fr);
    gap: 1.25rem;
  }
}
.fact dt {
  padding-top: 0.2rem;
}
</style>
