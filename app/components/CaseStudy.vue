<script setup lang="ts">
import { profile } from '~/data/profile'
import { caseStudies, evidenceLabel, findWork } from '~/data/work'

const props = defineProps<{
  slug: string
  /** The three-line summary at the top: the problem, my part, and the result. */
  problem: string
  part: string
  result: string
}>()

const item = findWork(props.slug)
const index = caseStudies.findIndex(w => w.slug === props.slug)
const prev = index > 0 ? caseStudies[index - 1] : undefined
const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined

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

const liveLinks = computed(() => item.links.filter(link => link.kind !== 'repo'))
const repo = computed(() => item.links.find(link => link.kind === 'repo'))
</script>

<template>
  <article class="wrap pt-8 lg:pt-12">
    <nav
      aria-label="Breadcrumb"
      class="label"
    >
      <ol class="flex gap-2">
        <li>
          <NuxtLink :to="item.evidence === 'employer' ? '/#experience' : '/#projects'">{{ item.evidence === 'employer' ? 'Experience' : 'Projects' }}</NuxtLink>
        </li>
        <li aria-hidden="true">
          /
        </li>
        <li aria-current="page">
          {{ item.title }}
        </li>
      </ol>
    </nav>

    <header class="sheet mt-6 lg:mt-10">
      <p class="label max-lg:mb-3 lg:pt-3">
        {{ evidenceLabel[item.evidence] }}
      </p>
      <div>
        <h1 class="max-w-[46rem] text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-[480] tracking-[-0.02em]">
          {{ item.headline }}
        </h1>
        <p class="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.6] sm:text-[1.1875rem]">
          {{ item.summary }}
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
              Status
            </dt>
            <dd>
              <StatusMark :kind="item.evidence" />
              <span class="mt-1 block">{{ item.status }}</span>
              <span
                v-if="item.statusNote"
                class="mt-1 block text-muted"
              >{{ item.statusNote }}</span>
            </dd>
          </div>
          <div class="fact">
            <dt class="label">
              When
            </dt>
            <dd class="tabular-nums">
              {{ item.period }}
            </dd>
          </div>
          <div
            v-if="item.foundation"
            class="fact"
          >
            <dt class="label">
              Built on
            </dt>
            <dd>
              <ExtLink :href="item.foundation.href">{{ item.foundation.name }}</ExtLink>
              <span class="mt-1 block text-muted">{{ item.foundation.license }} license. {{ item.foundation.note }}</span>
            </dd>
          </div>
          <div
            v-if="liveLinks.length"
            class="fact"
          >
            <dt class="label">
              See it
            </dt>
            <dd>
              <ul class="space-y-1">
                <li
                  v-for="link in liveLinks"
                  :key="link.href"
                >
                  <ExtLink :href="link.href">{{ link.label }}</ExtLink>
                </li>
              </ul>
            </dd>
          </div>
          <div class="fact">
            <dt class="label">
              Code
            </dt>
            <dd>
              <ExtLink
                v-if="repo"
                :href="repo.href"
              >{{ repo.label }}</ExtLink>
              <template v-else>
                {{ item.evidence === 'employer' ? 'Private (employer)' : item.evidence === 'product' ? 'Private repository' : 'Not linked from this site' }}
              </template>
            </dd>
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
          v-if="item.built.length"
          class="mt-14 max-w-[44rem]"
          aria-labelledby="built-title"
        >
          <h2
            id="built-title"
            class="text-[1.375rem] leading-tight font-[560] tracking-[-0.012em]"
          >
            What each technology did
          </h2>
          <dl class="mt-4 border-t border-ink">
            <div
              v-for="note in item.built"
              :key="note.tech"
              class="grid gap-1 border-b border-hair py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5"
            >
              <dt class="font-semibold">
                {{ note.tech }}
              </dt>
              <dd class="leading-[1.55]">
                {{ note.enabled }}
              </dd>
            </div>
          </dl>
        </section>

        <section
          v-if="item.evidence === 'employer'"
          class="mt-14 max-w-[38rem] border-t border-hair pt-5 text-[0.9375rem] leading-[1.6] text-muted"
          aria-labelledby="left-out"
        >
          <h2
            id="left-out"
            class="label"
          >
            What is left out
          </h2>
          <p class="mt-2">
            Acelab's code and data are private, so this page covers my part and what shipped. Colleague, customer and internal tool names are left out on purpose. I am glad to go deeper in an interview.
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
            to="/#projects"
            class="group no-underline sm:text-right"
          >
            <span class="label block">Back to</span>
            <span class="mt-1 block text-balance text-[1.0625rem] font-semibold underline decoration-hair underline-offset-[0.22em] group-hover:decoration-signal">All projects</span>
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
