<script setup lang="ts">
import { findWork } from '~/data/work'

const shots = findWork('frameflow').shots
</script>

<template>
  <CaseStudy
    slug="frameflow"
    problem="A video upload is not finished when the bytes arrive. Transcoding takes minutes, any step can fail, and a viewer should never see a half-published stream."
    part="I built the upload studio, API, processing workflow and watch site, and deployed them on my own server with K3s, Argo CD and GitHub Actions."
    result="It runs on my own server. A 6-second test clip went from upload to playable stream in about 7 seconds of processing, and cancelling a run stopped FFmpeg within 9 seconds. No outside users are on record."
  >
    <h2>How a video moves through it</h2>
    <p>
      The browser asks the API for a short-lived upload URL and sends the file straight to private object storage, so the upload never passes through the API. The API then checks the stored object against what was declared and hands the job to a Hatchet workflow.
    </p>

    <CaseFigure caption="The workflow. Each task has its own timeout. The probe, encode and publish tasks retry on failure without redoing the ones before them. The code can run both encodes at once; the live server runs one at a time because the machine is shared.">
      <svg
        viewBox="0 0 560 438"
        role="img"
        aria-labelledby="fig-frameflow-title"
        aria-describedby="fig-frameflow-desc"
      >
        <title id="fig-frameflow-title">Frameflow's processing workflow</title>
        <desc id="fig-frameflow-desc">The uploaded file in private storage is validated and probed, encoded into 360p and 720p HLS renditions, then published with the renditions copied first and the master playlist written last. The result is a private stream served through the API.</desc>
        <defs>
          <marker
            id="fig-frameflow-arrow"
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
            height="48"
            style="fill: var(--paper-2)"
          />
          <rect
            x="1"
            y="87"
            width="558"
            height="48"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="173"
            width="270"
            height="62"
            style="fill: var(--paper)"
          />
          <rect
            x="289"
            y="173"
            width="270"
            height="62"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="273"
            width="558"
            height="62"
            style="fill: var(--paper); stroke: var(--signal); stroke-width: 2"
          />
          <rect
            x="1"
            y="373"
            width="558"
            height="62"
            style="fill: var(--paper-2)"
          />
          <path
            d="M280 49V84"
            marker-end="url(#fig-frameflow-arrow)"
          />
          <path
            d="M136 135V170"
            marker-end="url(#fig-frameflow-arrow)"
          />
          <path
            d="M424 135V170"
            marker-end="url(#fig-frameflow-arrow)"
          />
          <path
            d="M136 235V270"
            marker-end="url(#fig-frameflow-arrow)"
          />
          <path
            d="M424 235V270"
            marker-end="url(#fig-frameflow-arrow)"
          />
          <path
            d="M280 335V370"
            marker-end="url(#fig-frameflow-arrow)"
          />
        </g>
        <g
          fill="currentColor"
          text-anchor="middle"
          font-size="16"
        >
          <text
            x="280"
            y="30"
          >Uploaded MP4 in private object storage</text>
          <text
            x="280"
            y="116"
          >Validate the object, then probe it with ffprobe</text>
          <text
            x="136"
            y="200"
          >Encode 360p</text>
          <text
            x="136"
            y="222"
            font-size="13"
          >HLS, fixed segments</text>
          <text
            x="424"
            y="200"
          >Encode 720p</text>
          <text
            x="424"
            y="222"
            font-size="13"
          >HLS, fixed segments</text>
          <text
            x="280"
            y="300"
            font-weight="600"
          >Publish</text>
          <text
            x="280"
            y="322"
            font-size="14"
          >Copy the renditions first, write the master playlist last</text>
          <text
            x="280"
            y="400"
          >Private stream</text>
          <text
            x="280"
            y="422"
            font-size="14"
          >Served through the API, which allows only known playlists and segments</text>
        </g>
      </svg>
    </CaseFigure>

    <ShotFigure
      v-if="shots[1]"
      :shot="shots[1]"
      sizes="(width >= 64rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>What the design trades off</h2>

    <CaseDecision title="Publish the master playlist last.">
      <template #why>
        Renditions upload to a staging area for that run, then copy into the published location. The master playlist is written only after all of them exist, so a viewer can never start a stream that is missing a rendition.
      </template>
      <template #cost>
        An extra copy step, and publication has to tolerate retries after a partial copy.
      </template>
    </CaseDecision>

    <CaseDecision title="Let the workflow engine own execution, and keep the database as a view of it.">
      <template #why>
        Hatchet holds retries and run history. SQLite holds what the product needs to show, updated by callbacks from the worker.
      </template>
      <template #cost>
        The two can drift. A scheduled reconcile job repairs that: when a cancelled run left a record stuck in processing, the job corrected it about 38 minutes later.
      </template>
    </CaseDecision>

    <CaseDecision title="Keep the public site read-only.">
      <template #why>
        One access key unlocks the studio. Visitors can watch but not upload, which stops abuse and storage costs on a personal server.
      </template>
      <template #cost>
        Visitors cannot try the core feature, so the studio and status screens here are local previews built from sample records.
      </template>
    </CaseDecision>

    <ShotFigure
      v-if="shots[0]"
      :shot="shots[0]"
      sizes="(width >= 64rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>What was tested on the live server</h2>
    <ul>
      <li>Upload, scheduling, encoding, HLS output and browser playback, end to end.</li>
      <li>A source below the 1280 by 720 minimum fails after probing, and no encode runs.</li>
      <li>A second video waits in the queue while the first one encodes.</li>
      <li>Cancelling mid-encode stops FFmpeg and removes its scratch files.</li>
      <li>Records and run history survive restarts of the API, the queue's database and storage.</li>
      <li>A manual backup, an isolated restore test, and an off-server copy that restored and matched.</li>
    </ul>

    <h2>What is thin or not done</h2>
    <p>
      It runs on one shared server, and SQLite means one API replica. The likes, comments and playlists are partly wired. There is no CDN or resumable upload. Supabase sign-in is implemented, but no run against a real project is recorded, and no phone testing is recorded. The five small UI primitives follow shadcn/ui's open code, with changes.
    </p>
  </CaseStudy>
</template>

<style scoped>
.case-shot {
  max-width: 44rem;
  margin-block: 2.5rem !important;
}
</style>
