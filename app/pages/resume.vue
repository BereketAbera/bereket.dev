<script setup lang="ts">
import { capabilities } from '~/data/capabilities'
import { education, experience } from '~/data/experience'
import { facts, mailto, profile } from '~/data/profile'
import { resume } from '~/data/resume'
import type { Role } from '~/data/types'
import { evidenceLabel, work } from '~/data/work'

usePageMeta({
  title: 'Résumé',
  description: `Résumé of ${profile.name}, ${profile.title.toLowerCase()} in ${profile.location} (${profile.utcOffset}): experience, skills, projects and education, also as a PDF.`,
  type: 'profile',
})
useHead({
  link: [{ rel: 'alternate', type: 'application/pdf', href: profile.resumePdf, title: 'Résumé (PDF)' }],
})

const { siteUrl } = useRuntimeConfig().public

/** "github.com/BereketAbera": a printed copy needs addresses a person can type. */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const where = `${profile.location} · ${profile.utcOffset} · remote`

function period(role: Role) {
  if (role.end === undefined) return `From ${role.start}`
  return `${role.start} – ${role.end ?? 'present'}`
}

function fact(label: (typeof facts)[number]['label']) {
  const entry = facts.find(f => f.label === label)
  if (!entry) throw new Error(`data/profile.ts has no "${label}" fact`)
  return entry
}

// Tools I ship with, by capability group. Working knowledge gets its own block
// below, so the two never blur.
const skills = [
  { label: 'Deepest in', value: fact('Deepest in').value },
  ...capabilities.map(cap => ({ label: cap.short, value: cap.tools.join(', ') })),
]

// Work that an experience entry already describes only needs a pointer to its
// case study; anything else gets its one-sentence outcome.
const described = new Set(experience.flatMap(role => role.work ?? []))
const projects = work.map(item => ({
  slug: item.slug,
  headline: item.headline,
  url: `${siteUrl}/work/${item.slug}`,
  role: item.role,
  org: item.evidence === 'employer' ? (item.org.split(' · ')[0] ?? item.org) : evidenceLabel[item.evidence],
  years: item.years,
  note: described.has(item.slug) ? null : item.outcome,
}))
</script>

<template>
  <article
    class="resume wrap pt-8 lg:pt-12"
    aria-labelledby="resume-name"
  >
    <header class="sheet">
      <div class="rail">
        <p class="label kicker">
          Résumé
        </p>
        <a
          :href="profile.resumePdf"
          download
          class="no-print download"
        >Download PDF</a>
      </div>
      <div class="main">
        <h1
          id="resume-name"
          class="name"
        >
          {{ profile.name }}
        </h1>
        <p class="title">
          {{ profile.eyebrow }}
        </p>
        <p class="label where">
          {{ where }}
        </p>
        <ul class="contact">
          <li><a :href="mailto">{{ profile.email }}</a></li>
          <li><a :href="siteUrl">{{ bare(siteUrl) }}</a></li>
          <li>
            <ExtLink :href="profile.links.github">{{ bare(profile.links.github) }}</ExtLink>
          </li>
          <li v-if="profile.links.linkedin">
            <ExtLink :href="profile.links.linkedin">{{ bare(profile.links.linkedin) }}</ExtLink>
          </li>
        </ul>
      </div>
    </header>

    <section
      class="part sheet"
      aria-labelledby="summary"
    >
      <h2
        id="summary"
        class="label heading"
      >
        Summary
      </h2>
      <div class="main">
        <p class="lede">
          {{ resume.summary }}
        </p>
        <p class="seeking">
          <span class="label">Looking for</span>
          {{ profile.lookingFor }}
        </p>
      </div>
    </section>

    <section
      class="part sheet"
      aria-labelledby="skills"
    >
      <h2
        id="skills"
        class="label heading"
      >
        Skills
      </h2>
      <dl class="main skills">
        <div
          v-for="row in skills"
          :key="row.label"
          class="skill"
        >
          <dt class="label">
            {{ row.label }}
          </dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>
    </section>

    <section
      class="part sheet"
      aria-labelledby="knowledge"
    >
      <h2
        id="knowledge"
        class="label heading"
      >
        Working knowledge
      </h2>
      <div class="main">
        <p class="note">
          {{ resume.workingKnowledgeNote }}
        </p>
        <dl class="skills">
          <div
            v-for="row in resume.workingKnowledge"
            :key="row.group"
            class="skill"
          >
            <dt class="label">
              {{ row.group }}
            </dt>
            <dd>{{ row.items.join(' · ') }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      class="part sheet"
      aria-labelledby="experience"
    >
      <h2
        id="experience"
        class="label heading"
      >
        Experience
      </h2>
      <ol class="main">
        <li
          v-for="role in experience"
          :key="role.org"
          class="entry"
          :class="{ brief: !role.highlights.length }"
        >
          <div class="entry-head">
            <div>
              <h3 class="entry-title">
                <span class="org">{{ role.org }}</span><span class="text-muted"> — </span>{{ role.title }}
              </h3><span class="entry-where">&nbsp;·&nbsp;{{ role.location }}</span>
            </div>
            <p class="data when">
              {{ period(role) }}
            </p>
          </div>
          <p class="entry-summary">
            {{ role.summary }}
          </p>
          <ul
            v-if="role.highlights.length"
            class="bullets"
          >
            <li
              v-for="item in role.highlights"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ol>
    </section>

    <section
      class="part sheet"
      aria-labelledby="projects"
    >
      <h2
        id="projects"
        class="label heading"
      >
        Selected projects
      </h2>
      <ul class="main">
        <li
          v-for="item in projects"
          :key="item.slug"
          class="project"
        >
          <h3 class="project-title">
            <a :href="item.url">{{ item.headline }}</a>
          </h3>
          <p class="project-meta">
            {{ item.role }} · {{ item.org }} · <span class="data">{{ item.years }}</span>
          </p>
          <p class="data project-url">
            {{ bare(item.url) }}
          </p>
          <p
            v-if="item.note"
            class="project-note"
          >
            {{ item.note }}
          </p>
        </li>
      </ul>
    </section>

    <section
      class="part sheet"
      aria-labelledby="education"
    >
      <h2
        id="education"
        class="label heading"
      >
        Education
      </h2>
      <div class="main">
        <div class="entry-head">
          <h3 class="entry-title">
            <span class="org">{{ education.school }}</span><span class="text-muted"> — </span>{{ education.degree }}
          </h3>
          <p class="data when">
            {{ education.period }}
          </p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
/* ---------- Screen ---------- */

.main {
  min-width: 0;
  max-width: 48rem;
}

.rail {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
@media (width >= 64rem) {
  .rail {
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.6rem;
    margin-bottom: 0;
    padding-top: 1rem;
  }
}
.download {
  font-size: 0.9375rem;
}

.name {
  font-size: clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem);
  line-height: 1.05;
  font-weight: 480;
  letter-spacing: -0.022em;
}
.title {
  margin-top: 0.5rem;
  font-size: clamp(1.125rem, 1rem + 0.4vw, 1.3125rem);
  line-height: 1.35;
}
.where {
  margin-top: 1.1rem;
}
.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1.5rem;
  margin-top: 0.6rem;
  font-size: 0.9875rem;
}

/* Each part is a ruled section: its heading in the rail, its content beside it. */
.part {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ink);
}
@media (width >= 64rem) {
  .part {
    margin-top: 3.5rem;
  }
}
.heading {
  color: var(--ink);
  margin-bottom: 0.9rem;
}
@media (width >= 64rem) {
  .heading {
    margin-bottom: 0;
    padding-top: 0.3rem;
  }
}

.lede {
  max-width: 42rem;
  font-size: 1.0625rem;
  line-height: 1.6;
}
.seeking {
  margin-top: 0.75rem;
  font-size: 0.9875rem;
}
.seeking .label {
  margin-right: 0.5rem;
}

.note {
  margin-bottom: 0.6rem;
  font-size: 0.9375rem;
  color: var(--muted);
}

.skill {
  display: grid;
  gap: 0.2rem;
  padding-block: 0.6rem;
}
.skill:first-child {
  padding-top: 0;
}
.skill + .skill {
  border-top: 1px solid var(--hair);
}
@media (width >= 40rem) {
  .skill {
    grid-template-columns: 9.5rem minmax(0, 1fr);
    gap: 1.25rem;
  }
}
.skill dt {
  padding-top: 0.25rem;
}
.skill dd {
  font-size: 1rem;
  line-height: 1.5;
}

.entry {
  padding-block: 1.1rem;
}
.entry:first-child {
  padding-top: 0;
}
.entry + .entry {
  border-top: 1px solid var(--hair);
}
.entry-head {
  display: grid;
  gap: 0.15rem;
  align-items: baseline;
}
@media (width >= 40rem) {
  .entry-head {
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 1.5rem;
  }
}
.entry-title {
  display: inline;
  font-size: 1.1875rem;
  line-height: 1.35;
  font-weight: 400;
}
.org {
  font-weight: 600;
}
.entry-where {
  color: var(--muted);
  font-size: 0.9375rem;
}
.when {
  color: var(--muted);
  white-space: nowrap;
}
.entry-summary {
  margin-top: 0.45rem;
  max-width: 42rem;
}
.brief .entry-summary {
  margin-top: 0.25rem;
  font-size: 0.9375rem;
  line-height: 1.55;
}
.bullets {
  margin-top: 0.7rem;
}
.bullets li {
  position: relative;
  max-width: 42rem;
  padding-left: 1.25em;
  font-size: 1rem;
  line-height: 1.55;
}
.bullets li + li {
  margin-top: 0.4rem;
}
/* A border, not a background, so the dash survives printing without backgrounds. */
.bullets li::before {
  content: "";
  position: absolute;
  left: 0.15em;
  top: 0.78em;
  width: 0.45em;
  border-top: 1px solid currentColor;
}

.project {
  padding-block: 0.75rem;
}
.project:first-child {
  padding-top: 0;
}
.project + .project {
  border-top: 1px solid var(--hair);
}
.project-title {
  font-size: 1.0625rem;
  line-height: 1.4;
  font-weight: 600;
}
.project-meta {
  margin-top: 0.15rem;
  color: var(--muted);
  font-size: 0.9375rem;
}
.project-note {
  max-width: 42rem;
  margin-top: 0.35rem;
  font-size: 0.9375rem;
  line-height: 1.55;
}
/* On screen the headline is the link; on paper the address has to be visible. */
.project-url {
  display: none;
}

/* ---------- Print: A4, black on white, at most two pages ---------- */

@media print {
  /* A named page, so the size and margins apply only while the résumé is printed.
     It names the body rather than the article: naming the article alone forces a
     page break before whatever follows it (Nuxt's empty #teleports), which printed
     as a blank last page. */
  @page resume {
    size: A4;
    margin: 14mm;
  }
  :global(body:has(.resume)) {
    page: resume;
  }

  /* Static serifs on paper. Literata is a variable font, and Chromium embeds
     variable fonts in a PDF as Type 3, which breaks copying and searching
     (the email address came out as "bereket5 0 42@gmail.com"). Charter ships
     with macOS, Georgia with Windows; ligatures stay off so every letter
     extracts as itself. */
  .resume {
    --paper: #fff;
    --paper-2: #fff;
    --ink: #000;
    --muted: #333;
    --hair: #b8b8b8;
    --signal: #000;
    --print-serif: Charter, "Bitstream Charter", Georgia, var(--font-serif);
    max-width: none;
    padding: 0;
    color: #000;
    background: #fff;
    font-family: var(--print-serif);
    font-size: 9.6pt;
    line-height: 1.38;
    font-variant-ligatures: none;
  }
  .resume .sheet {
    display: block;
  }
  .main {
    max-width: none;
  }

  .rail {
    display: none;
  }
  .name {
    font-size: 21pt;
    line-height: 1.1;
    letter-spacing: -0.015em;
  }
  .title {
    margin-top: 1pt;
    font-size: 11.5pt;
  }
  .where {
    margin-top: 6pt;
    font-size: 7.5pt;
    color: #000;
  }
  .contact {
    gap: 0 14pt;
    margin-top: 3pt;
    font-size: 9.6pt;
  }
  .contact :deep(svg),
  .contact :deep(.visually-hidden) {
    display: none;
  }

  .part {
    margin-top: 12pt;
    padding-top: 5pt;
    border-top-width: 0.75pt;
  }
  .heading {
    margin: 0 0 6pt;
    padding: 0;
    font-size: 7.5pt;
    break-after: avoid;
  }

  .lede {
    max-width: none;
    font-size: 9.8pt;
    line-height: 1.42;
  }
  .seeking {
    margin-top: 4pt;
    font-size: 9.6pt;
  }
  .seeking .label {
    font-size: 7pt;
  }

  /* One reading order for parsers: no side columns on paper. Labels run in
     before their values, and dates and roles follow their titles on the same
     line instead of sitting in a right-hand column. */
  .skill {
    display: block;
    padding-block: 2.5pt;
    break-inside: avoid;
  }
  .skill:first-child {
    padding-top: 0;
  }
  .skill + .skill {
    border-top-width: 0.5pt;
  }
  .skill dt {
    display: inline;
    margin-right: 6pt;
    padding: 0;
    font-size: 7pt;
  }
  .skill dd {
    display: inline;
    font-size: 9.4pt;
    line-height: 1.38;
  }
  .note {
    margin-bottom: 2.5pt;
    font-size: 8.6pt;
  }

  .entry {
    padding-block: 6pt;
    break-inside: avoid;
  }
  /* A long entry may continue on the next page, but only between bullets,
     and never leaving its heading and summary alone at the bottom. */
  .entry:not(.brief) {
    break-inside: auto;
  }
  .entry-head,
  .entry-summary {
    break-after: avoid;
  }
  .entry:first-child {
    padding-top: 0;
  }
  .entry + .entry {
    border-top-width: 0.5pt;
  }
  .entry-head,
  .entry-head > div {
    display: inline;
  }
  .entry-title {
    font-size: 10.6pt;
  }
  .entry-where {
    font-size: 9.2pt;
  }
  .when {
    display: inline;
    font-size: 8pt;
  }
  .when::before,
  .project-url::before {
    content: " · ";
    font-family: var(--print-serif);
  }
  .entry-summary {
    max-width: none;
    margin-top: 2pt;
    font-size: 9.6pt;
  }
  .brief .entry-summary {
    margin-top: 1pt;
    font-size: 9.2pt;
    line-height: 1.38;
  }
  .bullets {
    margin-top: 4pt;
  }
  .bullets li {
    break-inside: avoid;
    max-width: none;
    font-size: 9.4pt;
    line-height: 1.38;
  }
  .bullets li + li {
    margin-top: 2pt;
  }

  .project {
    padding-block: 4pt;
    break-inside: avoid;
  }
  .project:first-child {
    padding-top: 0;
  }
  .project + .project {
    border-top-width: 0.5pt;
  }
  .project-title {
    font-size: 9.8pt;
    line-height: 1.35;
  }
  .project-meta,
  .project-url {
    display: inline;
    font-size: 8.8pt;
    color: var(--muted);
  }
  .project-meta .data,
  .project-url {
    font-size: 7.5pt;
  }
  .project-note {
    max-width: none;
    margin-top: 1pt;
    font-size: 9.2pt;
    line-height: 1.38;
  }
}
</style>
