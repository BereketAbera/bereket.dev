<script setup lang="ts">
import { profile } from '~/data/profile'

const nav = [
  { label: 'Work', to: '/#work' },
  { label: 'How I work', to: '/how-i-work' },
  { label: 'Experience', to: '/#experience' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const toggle = useTemplateRef<HTMLButtonElement>('toggle')

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !open.value) return
  open.value = false
  toggle.value?.focus()
}

// The open menu covers the page, so close it once focus moves to something outside the header.
function onFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (open.value && next && !(event.currentTarget as HTMLElement).contains(next)) open.value = false
}
</script>

<template>
  <header
    class="no-print relative border-b border-hair"
    @keydown="onKeydown"
    @focusout="onFocusout"
  >
    <div class="wrap flex items-center justify-between gap-x-8 py-3.5 lg:py-4">
      <NuxtLink
        to="/"
        class="shrink-0 leading-tight no-underline"
      >
        <span class="block text-[1.0625rem] font-semibold tracking-[-0.005em]">{{ profile.name }}<span class="visually-hidden">, home</span></span>
        <span
          lang="am"
          aria-hidden="true"
          class="block font-ethiopic text-[0.8125rem] text-muted"
        >{{ profile.nameGeez }}</span>
      </NuxtLink>

      <button
        ref="toggle"
        type="button"
        class="label -mr-2 min-h-11 px-2 text-ink lg:hidden"
        aria-controls="site-nav"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>

      <nav
        id="site-nav"
        aria-label="Main"
        class="max-lg:absolute max-lg:inset-x-0 max-lg:top-[calc(100%+1px)] max-lg:z-40 max-lg:border-b max-lg:border-hair max-lg:bg-paper lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-8"
        :class="{ 'max-lg:hidden': !open }"
      >
        <ul class="wrap flex flex-col py-2 text-[1.0625rem] lg:w-auto lg:flex-row lg:gap-7 lg:p-0 lg:text-[0.9375rem]">
          <li
            v-for="item in nav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="block py-2.5 no-underline hover:underline lg:py-0"
            >{{ item.label }}</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/resume"
              class="block py-2.5 no-underline hover:underline lg:py-0"
            >Résumé</NuxtLink>
          </li>
        </ul>
        <p class="label hidden xl:block">
          <span
            class="mr-2 inline-block size-[0.45rem] -translate-y-px rounded-full bg-signal align-middle"
            aria-hidden="true"
          />{{ profile.availability }}
        </p>
      </nav>
    </div>
  </header>
</template>
