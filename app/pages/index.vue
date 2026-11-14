<script setup lang="ts">
import { mailto, profile } from '~/data/profile'

usePageMeta({
  title: `${profile.name}, ${profile.title}`,
  description: profile.description,
  type: 'profile',
})

const selectedWork = [
  { slug: 'acelab', title: 'Acelab', summary: 'Collaborative Vue and Nuxt workflows, with .NET APIs and SQL behind them.' },
  { slug: 'frameflow', title: 'Frameflow', summary: 'A video pipeline that turns uploads into private streams with retryable background jobs.' },
  { slug: 'rillmark', title: 'Rillmark', summary: 'A React component library on npm, with three visual presets and release checks.' },
  { slug: 'wayline', title: 'Wayline', summary: 'A self-hosted deployment of Plane, with GitOps releases, monitoring and tested restores.' },
  { slug: 'enderase', title: 'Enderase', summary: 'An in-development home-services marketplace with web and mobile apps on one API.' },
] as const
</script>

<template>
  <div>
    <section
      id="about"
      class="wrap pt-10 pb-12 lg:pt-16 lg:pb-16"
      aria-labelledby="intro"
    >
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
        I build product interfaces, APIs and background jobs, and take them from development to deployment.
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
      id="contact"
      class="wrap mt-12 scroll-mt-4 lg:mt-16"
      aria-labelledby="contact-title"
    >
      <SectionHead
        id="contact-title"
        number="02"
        title="Let's talk"
      />
      <p class="mt-4 max-w-[38rem]">
        {{ profile.lookingFor }}
      </p>
      <a
        :href="mailto"
        class="mt-4 inline-flex min-h-12 items-center border border-ink px-5 no-underline hover:bg-paper-2"
      >Email me</a>
    </section>
  </div>
</template>
