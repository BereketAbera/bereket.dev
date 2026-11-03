<script setup lang="ts">
import { capabilities } from '~/data/capabilities'
import { education, experience } from '~/data/experience'
import { facts, mailto, profile } from '~/data/profile'
import { work } from '~/data/work'
import type { Role } from '~/data/types'

usePageMeta({
  title: `${profile.name} — ${profile.title}`,
  description: profile.description,
  type: 'profile',
})

function period(role: Role) {
  if (role.end === undefined) return `From ${role.start}`
  return `${role.start} – ${role.end ?? 'present'}`
}

const featured = work.filter(item => item.featured)
const more = work.filter(item => !item.featured)
const [current, ...earlier] = experience
const workTitle = (slug: string) => work.find(w => w.slug === slug)?.title ?? slug
</script>

<template>
  <div>
    <!-- Intro: who I am, what I build and the facts a recruiter checks first. Short on purpose, so the work starts on the first screen. -->
    <section
      class="wrap pt-9 pb-12 lg:pt-14 lg:pb-14"
      aria-labelledby="intro"
    >
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)] lg:gap-14 xl:gap-20">
        <div>
          <!-- On phones each part of the eyebrow gets its own line instead of a ragged wrap. -->
          <p class="label">
            <template
              v-for="(part, i) in profile.eyebrow.split(' · ')"
              :key="part"
            >
              <span
                v-if="i"
                class="max-sm:hidden"
              > · </span><span class="max-sm:block">{{ part }}</span>
            </template>
          </p>
          <h1
            id="intro"
            class="mt-4 max-w-[46rem] text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-[1.07] font-[470] tracking-[-0.022em] lg:mt-5"
          >
            {{ profile.headline }}
          </h1>
          <p class="mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.62] sm:text-[1.125rem]">
            {{ profile.lede }}
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <div class="flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                class="group inline-flex min-h-12 items-center justify-between gap-6 bg-ink px-5 text-paper no-underline sm:justify-start"
              >
                <span>See selected work</span>
                <span
                  aria-hidden="true"
                  class="transition-transform group-hover:translate-y-0.5"
                >↓</span>
              </a>
              <a
                :href="mailto"
                class="inline-flex min-h-12 items-center border border-ink px-5 no-underline hover:bg-paper-2"
              >Email me</a>
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-2">
              <a :href="profile.resumePdf">Résumé (PDF)</a>
              <ExtLink :href="profile.links.github">GitHub</ExtLink>
              <ExtLink
                v-if="profile.links.linkedin"
                :href="profile.links.linkedin"
              >LinkedIn</ExtLink>
            </div>
          </div>
        </div>

        <dl class="self-start border-t border-ink text-[0.9875rem] leading-snug lg:mt-9">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="grid gap-1 border-b border-hair py-3 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:gap-4"
          >
            <dt class="label sm:pt-[0.2rem]">
              {{ fact.label }}
            </dt>
            <dd>
              {{ fact.value }}
              <span
                v-if="'note' in fact"
                class="block text-muted"
              >{{ fact.note }}</span>
              <span
                v-if="'clock' in fact"
                class="block text-muted"
              ><span class="data">{{ profile.utcOffset }}</span> · <LocalTime :time-zone="profile.timeZone" /></span>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      id="work"
      class="wrap scroll-mt-4"
      aria-labelledby="work-title"
    >
      <SectionHead
        id="work-title"
        number="01"
        title="Selected work"
      >
        <p class="text-[0.9375rem] text-muted">
          Three projects in depth, then the rest.
        </p>
      </SectionHead>

      <div class="mt-2">
        <FeaturedWork
          v-for="(item, i) in featured"
          :key="item.slug"
          :item="item"
          :number="i + 1"
        >
          <SaveGridDemo
            v-if="item.slug === 'workflow-engineering'"
            compact
          >
            A rebuild with made-up data of the response grid’s autosave: arrow keys move, typing edits, Enter saves. Edit one cell twice quickly and watch the late save get ignored. Not Acelab’s code or design.
          </SaveGridDemo>
          <ClipDemo
            v-else-if="item.slug === 'browser-extensions'"
            compact
          >
            The public extension’s hand-off, redrawn with made-up products and a simplified clip.
          </ClipDemo>
          <EnderaseShots
            v-else-if="item.slug === 'enderase'"
            compact
          />
        </FeaturedWork>
      </div>

      <h3 class="label mt-12">
        More case studies
      </h3>
      <ol class="mt-3 border-t border-ink">
        <li
          v-for="(item, i) in more"
          :key="item.slug"
          class="grid gap-x-10 gap-y-1 border-b border-hair py-4 lg:grid-cols-[3rem_minmax(0,1fr)_16rem]"
        >
          <span
            class="data text-muted max-lg:hidden"
            aria-hidden="true"
          >{{ String(featured.length + i + 1).padStart(2, '0') }}</span>
          <div>
            <p class="text-[1.0625rem] leading-snug font-semibold">
              <NuxtLink :to="`/work/${item.slug}`">{{ item.title }}</NuxtLink>
            </p>
            <p class="mt-0.5 text-[0.9375rem] leading-snug text-muted">
              {{ item.context }}
            </p>
          </div>
          <p class="text-[0.9375rem] leading-snug">
            {{ item.role }} · <span class="data text-muted">{{ item.years }}</span>
          </p>
        </li>
      </ol>
      <p class="mt-5 max-w-[44rem] text-[0.9375rem] text-muted">
        Acelab’s code is private, so its case studies describe my part and the decisions behind it, without proprietary detail. Older public code and experiments are in the <NuxtLink to="/lab">lab</NuxtLink>.
      </p>
    </section>

    <section
      id="capabilities"
      class="wrap mt-24 scroll-mt-4 lg:mt-28"
      aria-labelledby="capabilities-title"
    >
      <SectionHead
        id="capabilities-title"
        number="02"
        title="What you can hand me"
      />
      <ul class="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
        <li
          v-for="cap in capabilities"
          :key="cap.id"
          class="border-t border-hair pt-4"
        >
          <p class="label">
            {{ cap.short }}
          </p>
          <h3 class="mt-1.5 text-[1.125rem] leading-snug font-semibold">
            {{ cap.title }}
          </h3>
          <p class="mt-2 text-[0.9375rem] leading-[1.5] text-muted">
            {{ cap.tools.slice(0, 5).join(' · ') }}
          </p>
        </li>
      </ul>
      <p class="mt-8 max-w-[44rem]">
        <NuxtLink
          to="/how-i-work"
          class="font-semibold"
        >How I work</NuxtLink>: the six stages from brief to production, each capability with examples, the platform I work in, and the technology I know beyond what I’ve shipped.
      </p>
    </section>

    <section
      id="experience"
      class="wrap mt-24 scroll-mt-4 lg:mt-28"
      aria-labelledby="experience-title"
    >
      <SectionHead
        id="experience-title"
        number="03"
        title="Experience"
      >
        <NuxtLink
          to="/resume"
          class="text-[0.9375rem]"
        >Full résumé</NuxtLink>
      </SectionHead>
      <ol class="mt-8 border-t border-ink">
        <li
          v-if="current"
          class="sheet border-b border-hair py-6"
        >
          <p class="data text-muted max-lg:mb-1.5 lg:whitespace-nowrap">
            {{ period(current) }}
          </p>
          <div>
            <h3 class="text-[1.1875rem] leading-snug">
              <span class="font-semibold">{{ current.org }}</span><span class="text-muted">&nbsp;— </span><span class="inline-block">{{ current.title }}</span>
            </h3>
            <p class="text-[0.9375rem] text-muted">
              {{ current.location }}
            </p>
            <p class="mt-2.5 max-w-[40rem]">
              {{ current.summary }}
            </p>
            <p
              v-if="current.work?.length"
              class="mt-3 text-[0.9375rem]"
            >
              <span class="label mr-2">Case studies<span class="visually-hidden">: </span></span>
              <template
                v-for="(slug, i) in current.work"
                :key="slug"
              >
                <NuxtLink :to="`/work/${slug}`">{{ workTitle(slug) }}</NuxtLink><span
                  v-if="i < current.work.length - 1"
                  class="text-muted"
                > · </span>
              </template>
            </p>
          </div>
        </li>
        <li
          v-for="role in earlier"
          :key="role.org"
          class="sheet border-b border-hair py-4"
        >
          <p class="data text-muted max-lg:mb-1 lg:whitespace-nowrap">
            {{ period(role) }}
          </p>
          <div>
            <h3 class="text-[1.0625rem] leading-snug">
              <span class="font-semibold">{{ role.org }}</span><span class="text-muted">&nbsp;— </span><span class="inline-block">{{ role.title }}</span>
            </h3>
            <p class="mt-0.5 max-w-[40rem] text-[0.9375rem] text-muted">
              {{ role.summary }}
            </p>
          </div>
        </li>
        <li class="sheet py-4">
          <p class="data text-muted max-lg:mb-1 lg:whitespace-nowrap">
            {{ education.period }}
          </p>
          <h3 class="text-[1.0625rem] leading-snug">
            <span class="font-semibold">{{ education.school }}</span><span class="text-muted"> — </span>{{ education.degree }}
          </h3>
        </li>
      </ol>
    </section>

    <section
      id="about"
      class="wrap mt-24 scroll-mt-4 lg:mt-28"
      aria-labelledby="about-title"
    >
      <SectionHead
        id="about-title"
        number="04"
        title="About"
      />
      <div class="sheet mt-8 gap-y-8">
        <img
          src="/img/portrait-480.webp"
          srcset="/img/portrait-480.webp 480w, /img/portrait-720.webp 720w"
          sizes="(width >= 64rem) 10rem, 9rem"
          width="480"
          height="684"
          alt="Bereket Abera"
          loading="lazy"
          decoding="async"
          class="w-36 border border-hair lg:w-40"
        >
        <div class="prose">
          <p>
            I’m a software engineer in Addis Ababa with a software engineering degree from Addis Ababa University. Before Acelab I built full-stack web apps in React, Vue, Angular and Node.js. Since 2023 I’ve worked inside one large Vue and Nuxt product, and in 2026 I followed my features into its API, data pipeline and browser extensions.
          </p>
          <p>
            The work I like best is a feature nobody has fully specified yet, where the interface carries the value and the data has to stay right underneath it. I use AI coding agents every day and treat what they produce as a draft I verify.
          </p>
        </div>
      </div>
    </section>

    <section
      id="contact"
      class="wrap mt-24 scroll-mt-4 lg:mt-28"
      aria-labelledby="contact-title"
    >
      <SectionHead
        id="contact-title"
        number="05"
        title="Contact"
      />
      <div class="sheet mt-8">
        <div />
        <div>
          <p class="max-w-[36rem] text-[1.0625rem]">
            I’m looking for a senior product, full-stack or frontend engineering role, remote and full-time. If you have a product that needs someone to carry features from an unclear brief to production, email me.
          </p>
          <p class="mt-6 text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] leading-tight font-[470] tracking-[-0.015em] break-words">
            <a :href="mailto">{{ profile.email }}</a>
          </p>
          <p class="mt-6 text-[0.9875rem] text-muted">
            {{ profile.location }} · <span class="data">{{ profile.utcOffset }}</span> · <LocalTime
              :time-zone="profile.timeZone"
              relative
            />
          </p>
          <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <li><a :href="profile.resumePdf">Résumé (PDF)</a></li>
            <li>
              <NuxtLink to="/resume">Résumé (web)</NuxtLink>
            </li>
            <li>
              <ExtLink :href="profile.links.github">GitHub</ExtLink>
            </li>
            <li v-if="profile.links.linkedin">
              <ExtLink :href="profile.links.linkedin">LinkedIn</ExtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
