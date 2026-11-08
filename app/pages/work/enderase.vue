<template>
  <CaseStudy
    slug="enderase"
    problem="A web app, a mobile app and an API share one database, and the rules for customers, providers and admins have to hold whichever client sends the request."
    part="My own product: I own the product definition, architecture, data model, security model and verification, and I build it across web, mobile and API."
    result="A marketplace where customers book ID-verified providers or pick among bids, confirm with a deposit, message and review, in English or Amharic; in development, with web flows re-verified end to end and payments in Chapa’s sandbox."
  >
    <h2>What it does</h2>
    <p>
      Enderase is a two-sided marketplace for home services in Ethiopia, set up for Addis Ababa’s sub-cities. A customer finds a provider whose identity has been verified, books an open time slot or posts a task and picks among bids, confirms with a 20% deposit, messages the provider, and reviews the job. Each step is an acceptance criterion. When a customer pays a deposit, for example, the payment is recorded as paid, the booking turns confirmed, the provider gets a “Deposit received” notification and a push, and each person’s “View booking” opens the confirmed booking.
    </p>

    <EnderaseShots />

    <p>
      Providers verify their identity with an ID document and a selfie, set weekly hours and bid on tasks. Admins verify providers and handle disputes, bug reports and a bilingual catalog of services and locations. Payments go through the Chapa gateway, in its sandbox for now: the balance is settled in cash or through Chapa, and when several providers share a job, the platform keeps a 10% fee and splits the rest. Jobs can be tracked live, and reviews are scored on several factors. Both apps are in English and Amharic.
    </p>

    <h2>How it works</h2>
    <p>
      A Next.js web app, a Flutter app and a Fastify API share one Supabase project: Postgres, authentication, file storage and real-time subscriptions. One question runs through every feature: where does each rule live? A rule kept in the apps has to be written twice and kept identical, so the line that matters runs between writes and everything else.
    </p>
    <p>
      Apart from file uploads, both apps send their data writes to the API. It validates input with Zod and runs the business rules as SQL, inside transactions where requests can race. In Postgres, triggers keep related records in step.
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
      Everything else goes straight to the database: the web app renders some pages from direct reads, and both apps subscribe to live updates and upload files directly. Messaging in the web app uses those live updates: a thread loads from the server, then listens for new messages, and a presence channel shows when the other person is typing.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Send data writes through one API.">
      <template #instead>
        Letting each app write to the database itself, as the web app did at first; moving it meant auditing each of its direct database calls.
      </template>
      <template #why>
        Both apps get the same rules: a booking rule, a validation message or a permission check lives in the API once instead of being copied into each app.
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
        Every string costs two entries and a translation. A script checks the pair: the same keys, the same placeholders, no empty Amharic strings and no English copied across unchanged.
      </template>
    </CaseDecision>

    <h2>How I verify it</h2>
    <p>
      Each major feature is written up in the repository, and its document has to change whenever the feature does. But a write-up saying something works is only a claim, so in late October 2026 I ran a campaign to test those claims, with one rule: nothing counts as done until a separate check has seen it work at runtime.
    </p>
    <ol>
      <li>
        <strong>List the acceptance criteria.</strong> Independent passes listed what customers, providers and admins can do across web, mobile and API; deduplicated, those flows became the acceptance criteria.
      </li>
      <li>
        <strong>Run them.</strong> Web flows ran in Playwright with API and database assertions, mobile flows in Maestro on an iOS simulator and Android emulators.
      </li>
      <li>
        <strong>Audit the passes.</strong> A second review checked that each passing test proved the screen, the stored data and the side effects, strengthening weak assertions and never weakening one.
      </li>
      <li>
        <strong>Confirm the failures.</strong> Failures were grouped by root cause, and each was challenged by another method, such as replaying API calls and querying the database instead of driving the browser.
      </li>
      <li>
        <strong>Verify each fix independently.</strong> Fixes ran in waves; within a wave each file belonged to exactly one fix package, so parallel work couldn’t collide. Each fix was then verified independently at runtime.
      </li>
    </ol>
    <p>
      The campaign confirmed failing flows, traced them to their defects and fixed them, and each fix was verified at runtime on a working branch. The web flows have since been re-verified end to end; the mobile flows still need their device runs.
    </p>

    <h2>What I’d change</h2>
    <p>
      Code ran ahead of verification: the flow-by-flow campaign came months after the first versions of all three parts. The slow part is defining the product precisely enough to build and test against, so next time I’d write the flow list with the first feature and test each feature against it as it lands.
    </p>

    <h2>Outcome</h2>
    <p>
      Enderase is a web app and a Flutter app that share one API for their business rules, in English and Amharic. Its web flows have been re-verified end to end. It’s in development, so there’s no usage to report: payments run only in Chapa’s sandbox, the mobile app isn’t in the app stores, and its flows still need their device runs. What transfers: give each rule one owner, and have a separate check prove each result.
    </p>
  </CaseStudy>
</template>
