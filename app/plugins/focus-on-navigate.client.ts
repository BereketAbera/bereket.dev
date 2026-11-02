// Move keyboard focus with the view. The router scrolls to a #section or to the top
// of a new page but leaves focus on the (now off-screen or hidden) link or on <body>.
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let pending: string | null = null

  function focus(target: string) {
    const el = target === 'h1'
      ? document.querySelector<HTMLElement>('main h1') ?? document.getElementById('main')
      : document.getElementById(decodeURIComponent(target.slice(1)))
    if (!el) return
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }

  router.afterEach((to, from, failure) => {
    if (!from.matched.length) return // first load: leave focus alone
    if (to.path === from.path) {
      // Same page. This also covers following the same #link again: Vue Router reports
      // that as a "duplicated" failure but still scrolls.
      if (to.hash) focus(to.hash)
      return
    }
    if (!failure) pending = to.hash || 'h1'
  })

  nuxtApp.hook('page:finish', () => {
    if (!pending) return
    const target = pending
    pending = null
    requestAnimationFrame(() => focus(target))
  })
})
