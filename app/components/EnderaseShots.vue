<script setup lang="ts">
/**
 * Screens from Enderase's development build, captured locally with staged demo data
 * (fictional names). Phones first; the full case study adds the web app.
 */
defineProps<{ compact?: boolean }>()

const phones = [
  { src: '/img/enderase/m1-provider-profile-en.webp', alt: 'Enderase mobile app: a carpenter’s profile with rating, hourly rate, the 20% deposit explained, next open slots and a Book Now button.' },
  { src: '/img/enderase/m2-booking-detail-en.webp', alt: 'Enderase mobile app: a confirmed booking with its progress from requested through deposit to completed, and the payment summary.' },
  { src: '/img/enderase/m4-explore-am.webp', alt: 'Enderase mobile app in Amharic: browsing providers with ratings and rates in birr.' },
]
const web = { src: '/img/enderase/w1-browse-desktop.webp', alt: 'Enderase web app on a desktop: browsing verified providers by category, with rates and ratings.' }
</script>

<template>
  <figure
    class="shots"
    :class="{ compact }"
  >
    <div class="phones">
      <img
        v-for="shot in phones"
        :key="shot.src"
        :src="shot.src"
        :alt="shot.alt"
        width="600"
        height="1305"
        loading="lazy"
        decoding="async"
      >
    </div>
    <img
      v-if="!compact"
      class="web"
      :src="web.src"
      :alt="web.alt"
      width="1440"
      height="900"
      loading="lazy"
      decoding="async"
    >
    <figcaption>
      Development build with staged demo data and fictional names: a provider profile, a confirmed booking and the Amharic interface{{ compact ? '' : ', then the web app' }}. Payments run in the gateway’s sandbox; the app isn’t in the stores yet.
    </figcaption>
  </figure>
</template>

<style scoped>
.shots {
  margin-block: 2.75rem;
  max-width: 44rem;
}
.shots.compact {
  margin-block: 0;
  max-width: none;
}
.phones {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--hair);
  background: var(--paper-2);
}
.phones img {
  border-radius: 0.9rem;
}
.web {
  margin-top: 0.75rem;
}
figcaption {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--muted);
  text-wrap: pretty;
}
</style>
