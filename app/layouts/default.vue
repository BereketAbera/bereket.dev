<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="no-print sr-only bg-ink text-paper no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    ><span class="block px-4 py-2">Skip to content</span></a>
    <AppHeader />
    <main
      id="main"
      tabindex="-1"
      class="flex-1 focus:outline-none"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
