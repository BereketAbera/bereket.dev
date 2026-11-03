<script setup lang="ts">
import { capabilitiesIntro } from '~/data/capabilities'
import { education, experience } from '~/data/experience'
import { journeyIntro } from '~/data/journey'
import { lab } from '~/data/lab'
import { platform } from '~/data/platform'
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

const workTitle = (slug: string) => work.find(w => w.slug === slug)?.title ?? slug
</script>

<template>
  <div>
    <!-- Intro: what I do, the facts a recruiter checks first, and how to reach me. -->
    <section
      class="wrap pt-9 pb-16 lg:pt-16 lg:pb-24"
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
          <p class="label mt-1.5 xl:hidden">
            Addis Ababa · {{ profile.utcOffset }} · open to remote roles
          </p>
          <h1
            id="intro"
            class="mt-4 max-w-[48rem] text-[clamp(2rem,1.2rem+3.1vw,3.625rem)] leading-[1.07] font-[470] tracking-[-0.022em] lg:mt-5"
          >
            {{ profile.headline }}
          </h1>
          <p class="mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.62] sm:text-[1.1875rem]">
            {{ profile.lede }}
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <a
              :href="mailto"
              class="group inline-flex min-h-12 items-center justify-between gap-6 bg-ink px-5 text-paper no-underline sm:justify-start"
            >
              <span>Email me</span>
              <span
                aria-hidden="true"
                class="transition-transform group-hover:translate-x-0.5"
              >→</span>
            </a>
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
      id="journey"
      class="wrap scroll-mt-4"
      aria-labelledby="journey-title"
    >
      <SectionHead
        id="journey-title"
        number="01"
        title="From brief to production"
      />
      <div class="sheet mt-4">
        <div />
        <p class="max-w-[42rem] text-[1.0625rem] leading-[1.6]">
          {{ journeyIntro }}
        </p>
      </div>
      <div class="sheet mt-8">
        <div />
        <JourneyList />
      </div>
    </section>

    <section
      id="work"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="work-title"
    >
      <SectionHead
        id="work-title"
        number="02"
        title="Selected work"
      >
        <p class="text-[0.9375rem] text-muted">
          Engineering problems I have worked on. Each row opens a case study.
        </p>
      </SectionHead>
      <div class="mt-8">
        <WorkTable :items="work" />
      </div>
      <p class="mt-5 max-w-[44rem] text-[0.9375rem] text-muted lg:ml-[13rem]">
        Acelab’s code is private, so its case studies describe my part and the decisions behind it, without proprietary detail.
      </p>
    </section>

    <section
      id="platform"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="platform-title"
    >
      <SectionHead
        id="platform-title"
        number="03"
        :title="platform.title"
      />
      <div class="sheet mt-4">
        <div />
        <p class="max-w-[42rem] text-[1.0625rem] leading-[1.6]">
          {{ platform.intro }}
        </p>
      </div>
      <div class="mt-8">
        <PlatformMap />
      </div>
      <div class="sheet mt-6">
        <div />
        <p class="max-w-[42rem] text-[1.0625rem] leading-[1.6]">
          {{ platform.closing }}
        </p>
      </div>
    </section>

    <section
      id="capabilities"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="capabilities-title"
    >
      <SectionHead
        id="capabilities-title"
        number="04"
        title="Capabilities"
      />
      <div class="sheet mt-4">
        <div />
        <p class="max-w-[42rem] text-[1.0625rem] leading-[1.6]">
          {{ capabilitiesIntro }}
        </p>
      </div>
      <div class="sheet mt-8">
        <div />
        <CapabilityList />
      </div>
    </section>

    <section
      id="experience"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="experience-title"
    >
      <SectionHead
        id="experience-title"
        number="05"
        title="Experience"
      >
        <a
          :href="profile.resumePdf"
          class="text-[0.9375rem]"
        >Résumé (PDF)</a>
      </SectionHead>
      <ol class="mt-8 border-t border-ink">
        <li
          v-for="role in experience"
          :key="role.org"
          class="sheet border-b border-hair py-6"
        >
          <p class="data text-muted max-lg:mb-1.5 lg:whitespace-nowrap">
            {{ period(role) }}
          </p>
          <div>
            <h3 class="text-[1.1875rem] leading-snug">
              <span class="font-semibold">{{ role.org }}</span><span class="text-muted">&nbsp;— </span><span class="inline-block">{{ role.title }}</span>
            </h3>
            <p class="text-[0.9375rem] text-muted">
              {{ role.location }}
            </p>
            <p class="mt-2.5 max-w-[40rem]">
              {{ role.summary }}
            </p>
            <!-- Roles with case studies link to them instead; the résumé keeps every bullet. -->
            <div
              v-if="role.highlights.length && !role.work?.length"
              class="prose mt-4 !text-[1rem]"
            >
              <ul>
                <li
                  v-for="item in role.highlights"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <p
              v-if="role.work?.length"
              class="mt-4 text-[0.9375rem]"
            >
              <span class="label mr-2">Case studies<span class="visually-hidden">: </span></span>
              <template
                v-for="(slug, i) in role.work"
                :key="slug"
              >
                <NuxtLink :to="`/work/${slug}`">{{ workTitle(slug) }}</NuxtLink><span
                  v-if="i < role.work.length - 1"
                  class="text-muted"
                > · </span>
              </template>
            </p>
          </div>
        </li>
        <li class="sheet py-6">
          <p class="data text-muted max-lg:mb-1.5 lg:whitespace-nowrap">
            {{ education.period }}
          </p>
          <div>
            <h3 class="text-[1.1875rem] leading-snug">
              <span class="font-semibold">{{ education.school }}</span><span class="text-muted"> — </span>{{ education.degree }}
            </h3>
          </div>
        </li>
      </ol>
    </section>

    <section
      id="about"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="about-title"
    >
      <SectionHead
        id="about-title"
        number="06"
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
        <div class="grid gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-14">
          <div class="prose">
            <p>
              I’m a software engineer in Addis Ababa with more than eight years on the web and a software engineering degree from Addis Ababa University. I started out building web applications in React, Vue and Angular, with Node.js back ends where they needed one, and have spent the last three-plus years inside one large Vue and Nuxt product. In 2026 that work spread into its API, data pipeline and browser extensions, and I followed it there.
            </p>
            <p>
              The work I like best is a feature nobody has fully specified yet, where the interface carries the value and the data has to stay right underneath it. The interesting part is the call in the middle: whether a shortcut costs more than it saves, whether a rule or a model should decide, what happens when two writes race.
            </p>
            <p>
              Frameworks change; the habits underneath them don’t. Clear contracts between pieces, data with one owner, permissions enforced on the server and changes small enough to roll back carry from Vue to React, from .NET to Node.js and Python, and from the web to mobile.
            </p>
          </div>
          <div>
            <h3 class="label">
              How I work
            </h3>
            <ul class="mt-3 space-y-3 text-[0.9875rem] leading-[1.55]">
              <li class="border-t border-hair pt-3">
                <span class="font-semibold">Own the whole feature.</span> A bulk “report missing products” action, built across the web app, the .NET API and a migration, with a preview step so the confirmation says exactly what will happen. Along the way I fixed the weekly report it feeds.
              </li>
              <li class="border-t border-hair pt-3">
                <span class="font-semibold">Tests that can fail.</span> When a test guards a fix, I break the code it covers to prove it catches the bug, then put the code back.
              </li>
              <li class="border-t border-hair pt-3">
                <span class="font-semibold">AI output is a draft.</span> I use coding agents every day. I cross-check their review findings against a second model and the code itself, and I say plainly what I didn’t verify.
              </li>
              <li class="border-t border-hair pt-3">
                <span class="font-semibold">Decisions in writing.</span> Most of my pull requests state the root cause, what changed and how it was tested, often with before-and-after evidence.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section
      id="lab"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="lab-title"
    >
      <SectionHead
        id="lab-title"
        number="07"
        title="Lab and earlier work"
      >
        <p class="text-[0.9375rem] text-muted">
          Experiments and older public code, kept apart from the case studies.
        </p>
      </SectionHead>
      <ul class="mt-8 border-t border-ink">
        <li
          v-for="entry in lab"
          :key="entry.title"
          class="sheet border-b border-hair py-5"
        >
          <p class="data text-muted max-lg:mb-1">
            {{ entry.year }}
          </p>
          <div class="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_15rem]">
            <div>
              <h3 class="text-[1.0625rem] leading-snug">
                <span class="font-semibold">{{ entry.title }}</span><span class="visually-hidden">, </span>
                <span class="label ml-2">{{ entry.context }}</span>
              </h3>
              <p class="mt-1 max-w-[38rem] text-[0.9875rem] leading-[1.55]">
                {{ entry.note }}
              </p>
            </div>
            <div class="text-[0.9375rem]">
              <p class="text-muted">
                {{ entry.stack }}
              </p>
              <ExtLink :href="entry.link.href">{{ entry.link.label }}<span class="visually-hidden">: {{ entry.title }}</span></ExtLink>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section
      id="contact"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="contact-title"
    >
      <SectionHead
        id="contact-title"
        number="08"
        title="Contact"
      />
      <div class="sheet mt-8">
        <div />
        <div>
          <p class="max-w-[36rem] text-[1.0625rem]">
            Have a product or a feature that needs someone to carry it from an unclear brief to production? Email me. I’m in Addis Ababa (UTC+3) and have worked remotely with a distributed team since 2023.
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
