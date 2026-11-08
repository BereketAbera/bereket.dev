<script setup lang="ts">
import { capabilities } from '~/data/capabilities'
import { education, experience } from '~/data/experience'
import { contactLines, facts, mailto, mailtoWith, profile } from '~/data/profile'
import { projectsIntro, projects, moreWork } from '~/data/work'
import type { Role } from '~/data/types'

usePageMeta({
  title: `${profile.name}, ${profile.title}`,
  description: profile.description,
  type: 'profile',
})

function period(role: Role) {
  if (role.end === undefined) return `From ${role.start}`
  if (role.end === role.start) return role.start
  return `${role.start} to ${role.end ?? 'present'}`
}

const [current, ...earlier] = experience
</script>

<template>
  <div>
    <!-- Intro: what I do, the value I bring, and the facts a recruiter checks first. -->
    <section
      class="wrap pt-9 pb-12 lg:pt-14 lg:pb-16"
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
                href="#projects"
                class="group inline-flex min-h-12 items-center justify-between gap-6 bg-ink px-5 text-paper no-underline sm:justify-start"
              >
                <span>See projects</span>
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
      id="capabilities"
      class="wrap scroll-mt-4"
      aria-labelledby="capabilities-title"
    >
      <SectionHead
        id="capabilities-title"
        number="01"
        title="What I bring"
      />
      <ol class="sheet-list mt-8 border-t border-hair">
        <li
          v-for="cap in capabilities"
          :key="cap.id"
          class="grid gap-x-12 gap-y-2 border-b border-hair py-5 lg:grid-cols-[minmax(0,1fr)_21rem]"
        >
          <div>
            <h3 class="text-[1.1875rem] leading-snug font-semibold">
              {{ cap.title }}
            </h3>
            <p class="mt-1.5 max-w-[42rem] leading-[1.6]">
              {{ cap.summary }}
            </p>
          </div>
          <div class="max-w-[42rem] text-[0.9375rem] leading-[1.5]">
            <p class="text-muted">
              {{ cap.depth }}
            </p>
            <p class="mt-1.5">
              <span class="label mr-2">See<span class="visually-hidden">: </span></span>
              <template
                v-for="(ref, i) in cap.evidence"
                :key="ref.label"
              >
                <span
                  v-if="i"
                  class="text-muted"
                > · </span>
                <NuxtLink
                  v-if="ref.work"
                  :to="`/work/${ref.work}`"
                >{{ ref.label }}</NuxtLink>
                <NuxtLink
                  v-else-if="ref.href?.startsWith('/')"
                  :to="ref.href"
                >{{ ref.label }}</NuxtLink>
                <ExtLink
                  v-else-if="ref.href"
                  :href="ref.href"
                >{{ ref.label }}</ExtLink>
              </template>
            </p>
          </div>
        </li>
      </ol>
    </section>

    <section
      id="projects"
      class="wrap mt-24 scroll-mt-4 lg:mt-28"
      aria-labelledby="projects-title"
    >
      <SectionHead
        id="projects-title"
        number="02"
        title="Selected projects"
      />
      <div class="sheet mt-4">
        <div />
        <p class="max-w-[44rem] text-[1.0625rem] leading-[1.6]">
          {{ projectsIntro }}
        </p>
      </div>

      <div class="mt-3">
        <ProjectFeature
          v-for="(item, i) in projects"
          :key="item.slug"
          :item="item"
          :number="i + 1"
        />
      </div>

      <ul
        v-if="moreWork.length"
        class="mt-8 max-w-[44rem] space-y-2"
      >
        <li
          v-for="item in moreWork"
          :key="item.slug"
        >
          <NuxtLink
            :to="`/work/${item.slug}`"
            class="font-semibold"
          >{{ item.title }}</NuxtLink><span class="text-muted"> · </span>{{ item.kicker }}
        </li>
      </ul>
      <p class="mt-4 max-w-[44rem] text-[0.9375rem] text-muted">
        Older public code and experiments are in the <NuxtLink to="/lab">lab</NuxtLink>.
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
              <span class="font-semibold max-sm:block">{{ current.org }}</span><span class="text-muted max-sm:hidden"> · </span><span class="inline-block">{{ current.title }}</span>
            </h3>
            <p class="text-[0.9375rem] text-muted">
              {{ current.location }}
            </p>
            <p class="mt-2.5 max-w-[42rem]">
              {{ current.summary }}
            </p>
            <ul
              v-if="current.highlights.length"
              class="mt-3 max-w-[42rem] space-y-1.5"
            >
              <li
                v-for="line in current.highlights"
                :key="line"
                class="relative pl-4 leading-[1.5] before:absolute before:top-[0.72em] before:left-0 before:h-px before:w-2 before:bg-ink"
              >
                {{ line }}
              </li>
            </ul>
            <p
              v-if="current.work"
              class="mt-3"
            >
              <NuxtLink
                :to="`/work/${current.work}`"
                class="font-semibold"
              >My work at Acelab, in detail</NuxtLink>
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
              <span class="font-semibold max-sm:block">{{ role.org }}</span><span class="text-muted max-sm:hidden"> · </span><span class="inline-block">{{ role.title }}</span>
            </h3>
            <p class="mt-0.5 max-w-[42rem] text-[0.9375rem] text-muted">
              {{ role.summary }}
            </p>
          </div>
        </li>
        <li class="sheet py-4">
          <p class="data text-muted max-lg:mb-1 lg:whitespace-nowrap">
            {{ education.period }}
          </p>
          <h3 class="text-[1.0625rem] leading-snug">
            <span class="font-semibold max-sm:block">{{ education.school }}</span><span class="text-muted max-sm:hidden"> · </span>{{ education.degree }}
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
          src="/img/profile-480.webp"
          srcset="/img/profile-480.webp 480w, /img/profile-720.webp 720w"
          sizes="(width >= 64rem) 10rem, 9rem"
          width="480"
          height="480"
          alt="Bereket Abera"
          loading="lazy"
          decoding="async"
          class="w-36 border border-hair lg:w-40"
        >
        <div class="prose">
          <p
            v-for="paragraph in profile.about"
            :key="paragraph"
          >
            {{ paragraph }}
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
          <ul class="max-w-[36rem] space-y-3 text-[1.0625rem] leading-[1.55]">
            <li
              v-for="line in contactLines"
              :key="line.label"
            >
              <span class="label block">{{ line.label }}</span>
              {{ line.text }}
              <a
                :href="mailtoWith(line.subject)"
                class="mt-1 block font-semibold"
              >{{ line.cta }}</a>
            </li>
          </ul>
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
