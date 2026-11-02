<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="decision">
    <p class="label !text-signal">
      Decision
    </p>
    <h3 class="decision-title">
      {{ title }}
    </h3>
    <dl>
      <div
        v-if="$slots.instead"
        class="decision-row"
      >
        <dt class="label">
          Instead of
        </dt>
        <dd><slot name="instead" /></dd>
      </div>
      <div class="decision-row">
        <dt class="label">
          Why
        </dt>
        <dd><slot name="why" /></dd>
      </div>
      <div class="decision-row">
        <dt class="label">
          Cost
        </dt>
        <dd><slot name="cost" /></dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.decision {
  max-width: 44rem;
  border-top: 2px solid var(--ink);
  padding-top: 0.75rem;
  margin-block: 2.75rem !important;
}
.decision-title {
  margin-top: 0.3rem !important;
  font-size: 1.25rem;
  line-height: 1.3;
  font-weight: 600;
}
.decision dl {
  margin-top: 0.85rem;
  font-size: 1rem;
  line-height: 1.55;
}
.decision-row {
  display: grid;
  gap: 0.2rem;
  padding-block: 0.7rem;
  border-top: 1px solid var(--hair);
}
@media (width >= 40rem) {
  .decision-row {
    grid-template-columns: 6.5rem minmax(0, 1fr);
    gap: 1.25rem;
  }
}
.decision-row dt {
  padding-top: 0.2rem;
}
</style>
