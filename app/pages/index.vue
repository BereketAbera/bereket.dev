<script setup lang="ts">
import { contactLines, mailtoWith, profile } from '~/data/profile'

usePageMeta({
  title: `${profile.name}, ${profile.title}`,
  description: 'Senior software engineer building data-heavy web applications, from Vue and React interfaces to APIs and background jobs. Open to remote roles and contracts.',
  type: 'profile',
})

const selectedWork = [
  { slug: 'acelab', title: 'Acelab', summary: 'Collaborative Vue and Nuxt workflows, with .NET APIs and SQL behind them.' },
  { slug: 'frameflow', title: 'Frameflow', summary: 'A video pipeline that turns uploads into private streams with retryable background jobs.' },
  { slug: 'rillmark', title: 'Rillmark', summary: 'A React component library on npm, with three visual presets and release checks.' },
  { slug: 'wayline', title: 'Wayline', summary: 'A self-hosted deployment of Plane, with GitOps releases, monitoring and tested restores.' },
  { slug: 'enderase', title: 'Enderase', summary: 'An in-development home-services marketplace with web and mobile apps on one API.' },
] as const

const technologies = [
  { area: 'Frontend', tools: 'Vue, Nuxt, TypeScript, React, Next.js' },
  { area: 'Backend and data', tools: '.NET, Node.js, Python, PostgreSQL' },
  { area: 'Delivery', tools: 'Kubernetes, Argo CD, GitHub Actions' },
] as const
</script>

<template>
  <div>
    <section
      id="about"
      class="wrap grid gap-5 pt-10 pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pt-16 lg:pb-16"
      aria-labelledby="intro"
    >
      <img
        src="/img/profile-480.webp"
        srcset="/img/profile-480.webp 480w, /img/profile-720.webp 720w"
        sizes="(min-width: 1024px) 10rem, 5rem"
        width="480"
        height="480"
        alt="Portrait of Bereket Abera"
        decoding="async"
        class="w-20 border border-hair lg:col-start-2 lg:row-start-1 lg:w-40"
      >
      <div class="lg:col-start-1 lg:row-start-1">
        <p class="label">
          {{ profile.name }} · {{ profile.location }}
        </p>
        <h1
          id="intro"
          class="mt-4 text-[clamp(2.25rem,1.4rem+3.2vw,4.25rem)] leading-[1.07] font-[470] tracking-[-0.022em]"
        >
          {{ profile.title }}
        </h1>
        <p class="mt-5 max-w-[37rem] text-[1.125rem] leading-[1.6]">
          I build and ship data-heavy web applications, from Vue and React interfaces to APIs and background jobs.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href="#projects"
            class="inline-flex min-h-12 items-center bg-ink px-5 text-paper no-underline"
          >Explore case studies</a>
          <NuxtLink
            to="/resume"
            class="inline-flex min-h-12 items-center border border-ink px-5 no-underline hover:bg-paper-2"
          >View résumé</NuxtLink>
        </div>
      </div>
    </section>

    <section
      id="projects"
      class="wrap scroll-mt-4"
      aria-labelledby="projects-title"
    >
      <SectionHead
        id="projects-title"
        number="01"
        title="Selected work"
      />
      <ul class="mt-6 divide-y divide-hair border-y border-hair">
        <li
          v-for="item in selectedWork"
          :id="item.slug === 'acelab' ? 'experience' : undefined"
          :key="item.slug"
          class="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <NuxtLink
            :to="`/work/${item.slug}`"
            class="font-semibold"
          >{{ item.title }}</NuxtLink>
          <p class="text-muted">
            {{ item.summary }}
          </p>
        </li>
      </ul>
      <p class="mt-5 text-[0.9375rem]">
        <NuxtLink to="/lab">
          Browse experiments and earlier work
        </NuxtLink>
      </p>
    </section>

    <section
      id="capabilities"
      class="wrap mt-12 scroll-mt-4 lg:mt-16"
      aria-labelledby="technologies-title"
    >
      <SectionHead
        id="technologies-title"
        number="02"
        title="Technologies"
      >
        <NuxtLink to="/resume#skills">All skills on my résumé</NuxtLink>
      </SectionHead>
      <dl class="mt-6 grid gap-4 text-[0.9375rem] sm:grid-cols-3">
        <div
          v-for="group in technologies"
          :key="group.area"
        >
          <dt class="font-semibold">
            {{ group.area }}
          </dt>
          <dd class="mt-1 text-muted">
            {{ group.tools }}
          </dd>
        </div>
      </dl>
    </section>

    <section
      id="contact"
      class="wrap mt-12 scroll-mt-4 lg:mt-16"
      aria-labelledby="contact-title"
    >
      <SectionHead
        id="contact-title"
        number="03"
        title="Let's talk"
      />
      <p class="mt-4 max-w-[38rem]">
        {{ profile.lookingFor }}
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <a
          v-for="line in contactLines"
          :key="line.subject"
          :href="mailtoWith(line.subject)"
          class="inline-flex min-h-12 items-center border border-ink px-4 no-underline hover:bg-paper-2"
        >{{ line.cta }}</a>
      </div>
      <ul
        class="mt-5 flex flex-wrap gap-x-6 gap-y-2"
        aria-label="Professional profiles"
      >
        <li v-if="profile.links.linkedin">
          <ExtLink :href="profile.links.linkedin">LinkedIn</ExtLink>
        </li>
        <li>
          <ExtLink :href="profile.links.github">GitHub</ExtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
