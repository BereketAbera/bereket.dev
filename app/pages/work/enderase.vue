<template>
  <CaseStudy
    slug="enderase"
    problem="A web app, a mobile app and an API share one database, and the rules for three kinds of users have to hold whichever client sends the request."
    part="It’s my own product: I own the product definition, architecture, data model, security model and verification, and the code was written with AI coding agents (Claude Code and Codex) under my direction."
    result="A web app, a Flutter app and an API on one Postgres database, in English and Amharic and still in development; a QA campaign I directed mapped 640 user flows, traced 205 confirmed failures to 143 defects and verified every fix at runtime on a working branch."
  >
    <h2>The problem</h2>
    <p>
      When a web app, a mobile app and an API share one database, one question runs through every feature: where does each rule live? Rules kept in the clients have to be written twice and kept identical.
    </p>
    <p>
      Enderase is my own product: a two-sided marketplace for home services in Ethiopia, set up for Addis Ababa’s sub-cities. Customers book a verified provider’s time slot, or post a task and choose among bids. Providers verify their identity with an ID document and a selfie, set weekly hours and bid. Admins verify providers and manage disputes, bug reports and a bilingual catalog of services and locations.
    </p>
    <p>
      Around that sit a booking lifecycle from request through deposit to review, messaging, reviews scored on several factors, live tracking during a job, and payments through the Chapa gateway, in its sandbox for now. A 20% deposit confirms a booking, the balance is settled in cash or through Chapa, and when several providers share a job, the platform keeps a 10% fee and splits the rest.
    </p>

    <h2>What I owned</h2>
    <p>
      I’m the only person on the project. The code was written with AI coding agents, Claude Code and Codex, under my direction; my part is deciding what they build, how it fits together and when it’s done:
    </p>
    <ul>
      <li>
        <strong>Product.</strong> Three roles, what each can do and what must never happen. Each major feature is written up in the repository, and since the second week the project’s agent instructions have required updating its document whenever the feature changes: 18 feature documents plus an architecture overview.
      </li>
      <li>
        <strong>Architecture and data model.</strong> Which layer owns which rule. The first commit already had a 13-table schema, and the schema has grown migration by migration since.
      </li>
      <li>
        <strong>Verification.</strong> I directed the QA campaign below and set its rule: nothing counts as done until someone other than whoever built or fixed it has seen it work at runtime.
      </li>
    </ul>
    <p>
      All 229 commits, from March 16 to November 1, 2026, are under my name; 45% carry a Claude co-author trailer. The web app is about 40,000 lines of code, the API 13,000 and the mobile app 61,000.
    </p>

    <h2>How it works</h2>
    <p>
      A Next.js web app, a Flutter app and a Fastify API share one Supabase project: Postgres, authentication, file storage and real-time subscriptions. The line that matters runs between writes and everything else.
    </p>
    <p>
      Apart from file uploads, the apps send their data writes to the API, which validates input with Zod; the business rules run as SQL, inside transactions where requests can race.
    </p>
    <p>
      The web app also renders some pages from direct database reads, and both apps subscribe to live updates and upload files directly.
    </p>

    <CaseFigure caption="Data writes go through the API (highlighted); reads, live updates and uploads go to the database directly.">
      <svg
        viewBox="0 0 560 368"
        role="img"
        aria-labelledby="fig-enderase-title"
        aria-describedby="fig-enderase-desc"
      >
        <title id="fig-enderase-title">Where the rules live in Enderase</title>
        <desc id="fig-enderase-desc">Both apps, the Next.js web app and the Flutter app, send their data writes to the Fastify API, which validates input with Zod and runs the business rules in a transaction before writing to Postgres. The web app’s page reads, live updates and file uploads go to the database directly through the Supabase client. In Postgres, triggers keep related records in step.</desc>
        <defs>
          <marker
            id="fig-enderase-arrow"
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
          <marker
            id="fig-enderase-arrow-signal"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M0 0L10 5L0 10z"
              style="fill: var(--signal)"
            />
          </marker>
        </defs>

        <g
          stroke="currentColor"
          stroke-width="1.25"
        >
          <!-- Both apps. -->
          <rect
            x="1"
            y="1"
            width="558"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- The API (left) and the direct path through the Supabase client (right). -->
          <rect
            x="1"
            y="133"
            width="260"
            height="104"
            style="fill: var(--paper)"
          />
          <rect
            x="299"
            y="133"
            width="260"
            height="104"
            style="fill: var(--paper)"
          />
          <!-- Postgres. -->
          <rect
            x="1"
            y="285"
            width="558"
            height="82"
            style="fill: var(--paper-2)"
          />

          <!-- Direct access. -->
          <path
            d="M429 61V130"
            marker-end="url(#fig-enderase-arrow)"
          />
          <path
            d="M429 237V282"
            marker-end="url(#fig-enderase-arrow)"
          />
        </g>

        <!-- The highlighted path: data writes go through the API. -->
        <g
          style="stroke: var(--signal)"
          stroke-width="2"
        >
          <path
            d="M131 61V130"
            marker-end="url(#fig-enderase-arrow-signal)"
          />
          <path
            d="M131 237V282"
            marker-end="url(#fig-enderase-arrow-signal)"
          />
        </g>
        <rect
          x="1"
          y="133"
          width="5"
          height="104"
          style="fill: var(--signal)"
        />

        <g fill="currentColor">
          <text
            x="17"
            y="27"
            font-size="20"
            font-weight="600"
          >Web app and mobile app</text>
          <text
            x="17"
            y="49"
            class="font-mono"
            font-size="16"
          >Next.js · React · Flutter · Riverpod</text>

          <text
            x="441"
            y="93"
            class="font-mono"
            font-size="16"
          >direct</text>
          <text
            x="441"
            y="111"
            class="font-mono"
            font-size="16"
          >access</text>

          <text
            x="17"
            y="159"
            font-size="20"
            font-weight="600"
          >API</text>
          <text
            x="17"
            y="183"
            class="font-mono"
            font-size="16"
          >Fastify · Zod</text>
          <text
            x="17"
            y="205"
            class="font-mono"
            font-size="16"
          >shared business rules</text>
          <text
            x="17"
            y="227"
            class="font-mono"
            font-size="16"
          >rules in a transaction</text>

          <text
            x="315"
            y="159"
            font-size="20"
            font-weight="600"
          >Supabase client</text>
          <text
            x="315"
            y="183"
            class="font-mono"
            font-size="16"
          >reads, live updates,</text>
          <text
            x="315"
            y="205"
            class="font-mono"
            font-size="16"
          >file uploads</text>
          <text
            x="315"
            y="227"
            class="font-mono"
            font-size="16"
          >straight to Postgres</text>

          <text
            x="17"
            y="311"
            font-size="20"
            font-weight="600"
          >Postgres on Supabase</text>
          <text
            x="17"
            y="335"
            class="font-mono"
            font-size="16"
          >bookings, bids, messages</text>
          <text
            x="17"
            y="357"
            class="font-mono"
            font-size="16"
          >triggers keep records in step</text>
        </g>

        <text
          x="143"
          y="102"
          class="font-mono"
          font-size="16"
          style="fill: var(--signal)"
        >data writes</text>
      </svg>
    </CaseFigure>

    <p>
      Messaging in the web app runs on Supabase Realtime: a thread loads from the server, then listens for new messages, and a presence channel shows when the other person is typing.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Send data writes through one API.">
      <template #instead>
        Letting each app write to the database itself, as the web app did for its first eleven days; moving it meant auditing 67 direct database calls.
      </template>
      <template #why>
        Both apps then get the same rules: a booking rule, a validation message or a permission check lives in the API instead of being copied into each app.
      </template>
      <template #cost>
        Both apps depend on the API to change anything, and where the API lists rows that clients can also read directly, the two paths have to agree on who sees what.
      </template>
    </CaseDecision>

    <CaseDecision title="Build Amharic into the foundation, and check both languages by script.">
      <template #why>
        The Amharic foundation went in during the first week, before the mobile app existed: one set of translation files, later shared by both apps, with locale-aware formatting and prices in birr. Names that admins manage, like service categories and sub-cities, are data in both languages, not translation keys, so they change without a release.
      </template>
      <template #cost>
        Every string costs two entries and a translation. A script checks the pair: the same keys, the same placeholders, no empty Amharic strings and no English copied across unchanged. The two files hold the same 2,241 keys.
      </template>
    </CaseDecision>

    <h2>How I verified it</h2>
    <p>
      An agent’s report that something works is a claim, so from late October 2026 I directed a campaign, run by agents, to test the claims:
    </p>
    <ol>
      <li>
        <strong>List the flows.</strong> Eight agents independently listed what users can do: 812 flows, or 640 once deduplicated, across web, mobile and API.
      </li>
      <li>
        <strong>Run them.</strong> Web flows ran in Playwright with API and database assertions; mobile flows in Maestro on an iOS simulator and Android emulators.
      </li>
      <li>
        <strong>Audit the passes.</strong> A second agent checked that each passing test proved the screen, the stored data and the side effects, strengthening weak assertions and never weakening one.
      </li>
      <li>
        <strong>Try to refute the failures.</strong> Failures were grouped by root cause, and a skeptical verifier tried to disprove each by another method, such as replaying API calls and querying the database instead of driving the browser.
      </li>
      <li>
        <strong>Fix in waves, verify independently.</strong> Fixes ran as 22 packages in three waves. Within a wave each file belonged to exactly one package, so parallel agents couldn’t collide. An agent that hadn’t written a fix verified it at runtime.
      </li>
    </ol>
    <p>
      The investigation ran 477 of the 640 flows; most of the 163 it didn’t reach were mobile. It confirmed 205 failing flows, which traced back to 143 distinct defects. The fixes, split into 203 parts, were each verified at runtime on a working branch. Each wave closed with the database rebuilt from its migrations and the full flow suites run. The web flows have since been re-verified end to end; the mobile flows still need their device runs.
    </p>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>Code ran ahead of verification.</strong> Eight days after the first commit, the repository held a web app, an API and a Flutter app on one database. The flow-by-flow campaign came seven months later and confirmed 205 failing flows.
    </p>
    <p>
      <strong>Agents need operating rules.</strong> One 24 GB host could handle at most four browser-testing agents and five Flutter builds at once, so those became caps. And one agent’s broad process-kill command took down Docker; agents now kill exact process IDs only.
    </p>

    <h2>What transfers</h2>
    <p>
      Give each rule one owner: one API for the business rules both apps share, and the clients for the experience. With coding agents, typing stops being the slow part. What remains is defining the product precisely enough to build and test against, splitting work so parallel changes can’t collide, and having someone other than the author prove each result.
    </p>

    <h2>Outcome</h2>
    <p>
      Enderase is a web app, a Flutter app and an API on one Postgres database, in English and Amharic. It’s in development, so there’s no usage to report: payments run only in Chapa’s sandbox, and the mobile app isn’t in the app stores.
    </p>
  </CaseStudy>
</template>
