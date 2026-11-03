<script setup lang="ts">
import { capabilitiesIntro } from '~/data/capabilities'
import { journeyIntro } from '~/data/journey'
import { platform } from '~/data/platform'
import { mailto } from '~/data/profile'

usePageMeta({
  title: 'How I work',
  description: 'How Bereket Abera takes a feature from an unclear brief to production: six stages, the capabilities behind them and the platform he works in.',
})

const habits = [
  { title: 'Own the whole feature.', text: 'A bulk “report missing products” action, built across the web app, the .NET API and a migration, with a preview step so the confirmation says exactly what will happen. Along the way I fixed the weekly report it feeds.' },
  { title: 'Tests that can fail.', text: 'When a test guards a fix, I break the code it covers to prove it catches the bug, then put the code back.' },
  { title: 'AI output is a draft.', text: 'I use coding agents every day. I cross-check their review findings against a second model and the code itself, and I say plainly what I didn’t verify.' },
  { title: 'Decisions in writing.', text: 'Most of my pull requests state the root cause, what changed and how it was tested, often with before-and-after evidence.' },
]
</script>

<template>
  <div>
    <header class="wrap pt-9 pb-4 lg:pt-14">
      <p class="label">
        How I work
      </p>
      <h1 class="mt-4 max-w-[44rem] text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-[480] tracking-[-0.02em]">
        From an unclear brief to software people use
      </h1>
      <p class="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.6] sm:text-[1.1875rem]">
        The detail behind the home page: the stages a feature goes through with me, what each capability looks like in practice, and the platform my work runs on. The <NuxtLink to="/#work">case studies</NuxtLink> show the same habits on real projects.
      </p>
    </header>

    <section
      id="journey"
      class="wrap mt-14 scroll-mt-4"
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
      id="capabilities"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="capabilities-title"
    >
      <SectionHead
        id="capabilities-title"
        number="02"
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
      id="habits"
      class="wrap mt-24 scroll-mt-4 lg:mt-32"
      aria-labelledby="habits-title"
    >
      <SectionHead
        id="habits-title"
        number="04"
        title="Habits"
      />
      <div class="sheet mt-8">
        <div />
        <ul class="grid max-w-[60rem] gap-x-10 gap-y-5 md:grid-cols-2">
          <li
            v-for="habit in habits"
            :key="habit.title"
            class="border-t border-hair pt-3 leading-[1.55]"
          >
            <span class="font-semibold">{{ habit.title }}</span> {{ habit.text }}
          </li>
        </ul>
      </div>
      <div class="sheet mt-14">
        <div />
        <p class="max-w-[40rem]">
          Want to talk it through? <a :href="mailto">Email me</a>, or read the <NuxtLink to="/resume">résumé</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
