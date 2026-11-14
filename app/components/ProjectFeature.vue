<script setup lang="ts">
import type { Work } from '~/data/types'

const props = defineProps<{ item: Work, number: number }>()

const compact = computed(() => props.item.weight === 'compact')
const lead = computed(() => props.item.weight === 'lead')
const screens = computed(() => props.item.shots.filter(shot => !shot.phone))
const phone = computed(() => props.item.shots.find(shot => shot.phone))
/** Full cards show a second screen; only the lead project adds a phone. */
const second = computed(() => compact.value ? undefined : screens.value[1])
const links = computed(() => props.item.links.filter(link => ['live', 'package', 'repo'].includes(link.kind)))
</script>

<template>
  <article
    class="project"
    :class="{ compact }"
    :aria-labelledby="`project-${item.slug}`"
  >
    <div class="head">
      <p class="label">
        <span class="!text-signal">{{ String(number).padStart(2, '0') }}</span> · {{ item.status }}
      </p>
      <h3
        :id="`project-${item.slug}`"
        class="mt-2 text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] leading-[1.15] font-[520] tracking-[-0.012em] text-balance"
      >
        {{ item.title }}
      </h3>
      <p class="mt-1 text-[1rem] leading-snug text-muted">
        {{ item.kicker }}
      </p>
      <p class="mt-4 leading-[1.6]">
        {{ item.summary }}
      </p>
    </div>
    <div class="visuals">
      <ShotFigure
        v-if="screens[0]"
        :shot="screens[0]"
        :sizes="compact ? '(width >= 80rem) 32rem, (width >= 64rem) 40vw, 100vw' : '(width >= 80rem) 42rem, (width >= 64rem) 55vw, 100vw'"
      />
      <div
        v-if="second || (lead && phone)"
        class="row"
      >
        <ShotFigure
          v-if="second"
          :shot="second"
          :sizes="lead && phone ? '(width >= 80rem) 30rem, (width >= 64rem) 37vw, 65vw' : '(width >= 80rem) 42rem, (width >= 64rem) 55vw, 100vw'"
        />
        <ShotFigure
          v-if="lead && phone"
          :shot="phone"
          sizes="(width >= 64rem) 16vw, 30vw"
        />
      </div>
    </div>
    <div class="details">
      <dl class="facts">
        <div>
          <dt class="label">
            My part
          </dt>
          <dd>{{ item.myPart }}</dd>
        </div>
        <div v-if="item.foundation">
          <dt class="label">
            Built on
          </dt>
          <dd>{{ item.foundation.name }} ({{ item.foundation.license }} license). {{ item.foundation.note }}</dd>
        </div>
        <div>
          <dt class="label">
            Shows
          </dt>
          <dd>{{ item.demonstrates }}</dd>
        </div>
        <div v-if="!item.caseStudy && item.statusNote">
          <dt class="label">
            Status
          </dt>
          <dd>{{ item.statusNote }}</dd>
        </div>
      </dl>
      <p class="actions">
        <NuxtLink
          v-if="item.caseStudy"
          :to="`/work/${item.slug}`"
          class="font-semibold"
        >Case study<span class="visually-hidden">: {{ item.title }}</span> <span aria-hidden="true">→</span></NuxtLink>
        <ExtLink
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="font-semibold"
        >{{ link.label }}<span class="visually-hidden">: {{ item.title }}</span></ExtLink>
      </p>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: grid;
  gap: 1.25rem;
  padding-block: 2.75rem;
  border-bottom: 1px solid var(--hair);
}
.head,
.details,
.visuals {
  min-width: 0;
}
.head,
.details {
  max-width: 44rem;
}
.facts {
  display: grid;
  gap: 0.7rem;
  font-size: 0.9875rem;
  line-height: 1.5;
}
.facts > div {
  display: grid;
  gap: 0.15rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1.4rem;
}
.row {
  display: grid;
  grid-template-columns: minmax(0, 2.6fr) minmax(0, 1fr);
  align-items: start;
  gap: 1rem;
  margin-top: 1rem;
}
.row > :only-child {
  grid-column: 1 / -1;
}
@media (width < 40rem) {
  .row {
    grid-template-columns: minmax(0, 1fr);
  }
  .row > :last-child:not(:only-child) {
    display: none;
  }
}
@media (width >= 64rem) {
  .project {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    grid-template-rows: auto 1fr;
    column-gap: 3.5rem;
    padding-block: 3.5rem;
  }
  .compact {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
    padding-block: 2.5rem;
  }
  .head {
    grid-area: 1 / 1;
  }
  .details {
    grid-area: 2 / 1;
  }
  .visuals {
    grid-area: 1 / 2 / span 2;
  }
}
</style>
