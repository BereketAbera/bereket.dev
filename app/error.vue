<script setup lang="ts">
import type { NuxtError } from '#app'
import { profile } from '~/data/profile'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

// error.vue renders without app.vue, so its titleTemplate doesn't apply here.
useHead({ title: `${notFound.value ? 'Page not found' : 'Something went wrong'} · ${profile.name}` })
useSeoMeta({ robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section class="wrap pt-16 pb-24 lg:pt-24">
      <div class="sheet">
        <p class="label !text-signal max-lg:mb-3">
          {{ error.statusCode }}
        </p>
        <div>
          <h1 class="text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-[480] tracking-[-0.02em]">
            {{ notFound ? 'There’s nothing at this address.' : 'Something went wrong.' }}
          </h1>
          <p class="mt-5 max-w-[34rem] text-[1.125rem]">
            {{ notFound ? 'The link may be old, or the page may have moved.' : 'Please try again in a moment.' }}
          </p>
          <p class="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/#work">Selected work</NuxtLink>
            <NuxtLink to="/#contact">Contact</NuxtLink>
          </p>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
