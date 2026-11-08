<script setup lang="ts">
import { findWork } from '~/data/work'

const shots = findWork('wayline').shots
</script>

<template>
  <CaseStudy
    slug="wayline"
    problem="Plane is a real application: an API, workers, a scheduler, three frontends, a collaboration server, Postgres, Valkey, RabbitMQ and object storage. Running it the way a small team would takes much more than starting containers."
    part="I set the brief, which required executed tests and barred fabricated results. I chose the hosting, gave go-aheads for production steps, some in advance, own the server and its accounts, and receive its alerts. AI coding agents built the platform and the rebrand, made most of the technical choices within that brief, and ran the deployment in sessions I started."
    result="Live on my own server since November 2026, with three of my other apps beside it. I am the only person using it, so nothing here is a claim about scale."
  >
    <h2>What this project adds around Plane</h2>
    <ul>
      <li><strong>Releases.</strong> Plane's images reach the server only with a signed record that those exact digests ran in my local dev environment. Other images pass CI checks. Argo CD syncs one release branch.</li>
      <li><strong>Secrets.</strong> Infisical holds them, with a separate project and identity for each environment.</li>
      <li><strong>Network.</strong> Traffic is denied by default, and a written test matrix checks allowed and denied paths from real pods.</li>
      <li><strong>Monitoring.</strong> Prometheus, Loki and Grafana, with alerts sent to my phone.</li>
      <li><strong>Backups.</strong> Scheduled encrypted backups. Restore tests read a backup back into an isolated namespace.</li>
      <li><strong>The rebrand.</strong> A build pipeline applies an overlay, patches and a codemod to a pinned upstream commit, with Plane's license notices kept.</li>
    </ul>

    <CaseFigure caption="How a release of Plane's images reaches the server. The server has no standing connection to my laptop or to CI: it pulls one branch, and each image by digest.">
      <svg
        viewBox="0 0 560 412"
        role="img"
        aria-labelledby="fig-wayline-title"
        aria-describedby="fig-wayline-desc"
      >
        <title id="fig-wayline-title">Wayline's release path</title>
        <desc id="fig-wayline-desc">A set of image digests runs in the local dev environment, which signs a record of that run. CI checks the record and writes the release branch. Argo CD on the server syncs that branch. One K3s node runs Traefik, Plane and its data stores, Infisical, monitoring and nightly backups.</desc>
        <defs>
          <marker
            id="fig-wayline-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M0 0L10 5L0 10z"
              fill="currentColor"
            />
          </marker>
        </defs>
        <g
          stroke="currentColor"
          stroke-width="1.25"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="558"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="99"
            width="558"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="197"
            width="558"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="295"
            width="558"
            height="116"
            style="fill: var(--paper-2); stroke: var(--signal); stroke-width: 2"
          />
          <path
            d="M280 61V96"
            marker-end="url(#fig-wayline-arrow)"
          />
          <path
            d="M280 159V194"
            marker-end="url(#fig-wayline-arrow)"
          />
          <path
            d="M280 257V292"
            marker-end="url(#fig-wayline-arrow)"
          />
        </g>
        <g
          fill="currentColor"
          text-anchor="middle"
          font-size="16"
        >
          <text
            x="280"
            y="27"
          >Local dev runs a set of image digests</text>
          <text
            x="280"
            y="49"
            font-size="14"
          >and signs a record of that run</text>
          <text
            x="280"
            y="125"
          >CI checks the record</text>
          <text
            x="280"
            y="147"
            font-size="14"
          >and writes the release branch</text>
          <text
            x="280"
            y="223"
          >Argo CD on the server syncs that branch</text>
          <text
            x="280"
            y="245"
            font-size="14"
          >One Argo CD Application per component</text>
          <text
            x="280"
            y="324"
            font-weight="600"
          >One K3s node</text>
          <text
            x="280"
            y="350"
            font-size="14"
          >Traefik with Let's Encrypt certificates, then Plane and its data stores</text>
          <text
            x="280"
            y="374"
            font-size="14"
          >Infisical for secrets, Prometheus, Loki and Grafana</text>
          <text
            x="280"
            y="398"
            font-size="14"
          >Nightly encrypted backups, copied off the server by hand</text>
        </g>
      </svg>
    </CaseFigure>

    <ShotFigure
      v-if="shots[1]"
      :shot="shots[1]"
      sizes="(width >= 48rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>What was tested</h2>
    <p>
      The agents' own contract says a result counts only with a saved run, and rows that failed or were not run stay labeled that way.
    </p>
    <ul>
      <li>A full restore into a new local cluster, after deleting the old one, passed every step.</li>
      <li>Backups on the server restored into an isolated namespace.</li>
      <li>A network policy matrix passed on the server after earlier runs that were not clean.</li>
      <li>Secret rotation passed locally, including a run killed partway and finished later.</li>
      <li>A real alert and its clearance reached my phone.</li>
    </ul>
    <p>
      Not run on the server: a load test, a rollback, secret rotation, or a restore over live data. A restart check has yet to complete.
    </p>

    <h2>Two things testing caught</h2>
    <p>
      Agents did this analysis, on the local environment. A browser found what 38 passing smoke checks could not: after a release, a returning browser kept showing the old page, because nginx sent no cache headers. And two critical alerts could not fire with their pod gone, because a rule on a service's up metric has no data once the endpoint disappears. A drill written to ask that question found it.
    </p>

    <h2>The rebrand</h2>
    <p>
      Plane's interface stays Plane's. Wayline restyles it through a build step that applies an overlay, patches and a text codemod to a pinned upstream commit.
    </p>

    <ShotFigure
      v-if="shots[0]"
      :shot="shots[0]"
      sizes="(width >= 48rem) 44rem, 100vw"
      class="case-shot"
    />

    <ShotFigure
      v-if="shots[2]"
      :shot="shots[2]"
      sizes="(width >= 48rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>Limits</h2>
    <p>
      One node and one replica of each service mean a restart is an outage. Off-site backup is a manual pull. The same platform also hosts <NuxtLink to="/work/frameflow">Frameflow</NuxtLink> and two static sites.
    </p>
  </CaseStudy>
</template>

<style scoped>
.case-shot {
  max-width: 44rem;
  margin-block: 2.5rem !important;
}
</style>
