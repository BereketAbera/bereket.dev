<template>
  <CaseStudy
    slug="realtime-sync"
    problem="When many people have the same data open, every screen has to show their changes as they happen and recover the ones it missed."
    part="With my team I built presence and live cells; I built the first notification center, finished a teammate’s threaded comments, and built the real-time event for a teammate’s notification engine, taking its frontend to release."
    result="Collaborators on a schedule see each other’s edits and selected cells live, discuss cells in threaded comments, and get notifications in one center; all shipped between 2024 and 2026, with the old center removed."
  >
    <h2>The problem</h2>
    <p>
      When several people share data, every screen has to keep up: a value someone just typed, who is looking where, a reply, a request awaiting an answer. Each change must reach every tab without a reload, survive arriving twice, and be recovered after a laptop sleeps or a connection drops.
    </p>
    <p>
      At Acelab that data is the product schedule in Material Hub, a materials platform for architects, owners and manufacturers. A schedule is a spreadsheet-style list of the products and finishes in a drawing set; Acelab markets one kind as <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/finish-schedule">Finish Schedules</ExtLink>. Collaborators comment on its cells and get notified when someone needs them.
    </p>

    <h2>How it works</h2>
    <p>
      All four features share one transport: the server publishes each change on a channel per schedule, project, user or company. What differs is how an open client applies it.
    </p>

    <CaseFigure caption="Four kinds of events and how an open client applies each, with the notification catch-up path highlighted.">
      <svg
        viewBox="0 0 560 600"
        role="img"
        aria-labelledby="realtime-sync-fig-title"
        aria-describedby="realtime-sync-fig-desc"
      >
        <title id="realtime-sync-fig-title">How events reach an open client, and how it catches up</title>
        <desc id="realtime-sync-fig-desc">The server publishes an event for each change on a channel: per schedule, per project, per user or per company. The client applies each kind differently. Cell edits patch one cell and selections update one collaborator’s entry, both found by row and column id. Presence events track who joins and leaves, and newcomers receive the current selections. A comment thread event makes the client refetch the threads for the view it shows. Notification events insert, update or remove items by id and carry the server’s counts. Highlighted: after a reconnect, or when a long-hidden tab comes back, the client resyncs and replaces its notification list and counts with the server’s.</desc>
        <defs>
          <marker
            id="realtime-sync-arrow"
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
            id="realtime-sync-arrow-signal"
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
          <!-- Server and channels. -->
          <rect
            x="1"
            y="1"
            width="558"
            height="60"
            style="fill: var(--paper-2)"
          />
          <rect
            x="1"
            y="89"
            width="558"
            height="60"
            style="fill: var(--paper-2)"
          />
          <!-- One row per kind of event, as the client applies it. -->
          <rect
            x="48"
            y="177"
            width="511"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="48"
            y="261"
            width="511"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="48"
            y="345"
            width="511"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="48"
            y="429"
            width="511"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- The catch-up trigger (a condition, so dashed). -->
          <rect
            x="48"
            y="537"
            width="511"
            height="60"
            stroke-dasharray="5 4"
            style="fill: var(--paper)"
          />

          <!-- Arrows: server to channels, then a bus to each kind of event. -->
          <path
            d="M280 61V86"
            marker-end="url(#realtime-sync-arrow)"
          />
          <path
            d="M21 149V459"
            fill="none"
          />
          <path
            d="M21 207H45"
            marker-end="url(#realtime-sync-arrow)"
          />
          <path
            d="M21 291H45"
            marker-end="url(#realtime-sync-arrow)"
          />
          <path
            d="M21 375H45"
            marker-end="url(#realtime-sync-arrow)"
          />
          <path
            d="M21 459H45"
            marker-end="url(#realtime-sync-arrow)"
          />
        </g>

        <!-- The highlighted path: resync replaces the notification list and counts. -->
        <path
          d="M200 537V492"
          style="stroke: var(--signal)"
          stroke-width="2"
          marker-end="url(#realtime-sync-arrow-signal)"
        />
        <rect
          x="48"
          y="429"
          width="5"
          height="60"
          style="fill: var(--signal)"
        />

        <g fill="currentColor">
          <text
            x="17"
            y="27"
            font-size="20"
            font-weight="600"
          >Server</text>
          <text
            x="17"
            y="49"
            class="font-mono"
            font-size="16"
          >publishes an event for each change</text>

          <text
            x="17"
            y="115"
            font-size="20"
            font-weight="600"
          >Channels</text>
          <text
            x="17"
            y="137"
            class="font-mono"
            font-size="16"
          >per schedule, project, user or company</text>

          <text
            x="64"
            y="203"
            font-size="20"
            font-weight="600"
          >Cells and selections</text>
          <text
            x="64"
            y="225"
            class="font-mono"
            font-size="16"
          >patch one cell or selection by row and column id</text>

          <text
            x="64"
            y="287"
            font-size="20"
            font-weight="600"
          >Presence</text>
          <text
            x="64"
            y="309"
            class="font-mono"
            font-size="16"
          >join and leave; newcomers get selections</text>

          <text
            x="64"
            y="371"
            font-size="20"
            font-weight="600"
          >Comment threads</text>
          <text
            x="64"
            y="393"
            class="font-mono"
            font-size="16"
          >refetch the threads for the open view</text>

          <text
            x="64"
            y="455"
            font-size="20"
            font-weight="600"
          >Notifications</text>
          <text
            x="64"
            y="477"
            class="font-mono"
            font-size="16"
          >upsert or remove by id; server counts</text>

          <text
            x="64"
            y="563"
            font-size="20"
            font-weight="600"
          >Reconnect</text>
          <text
            x="64"
            y="585"
            class="font-mono"
            font-size="16"
          >or a long-hidden tab comes back</text>
        </g>

        <!-- Which channel each kind of event arrives on. -->
        <g
          class="font-mono"
          font-size="14"
          letter-spacing="0.08em"
          text-anchor="end"
          fill="currentColor"
        >
          <text
            x="543"
            y="203"
          >SCHEDULE</text>
          <text
            x="543"
            y="287"
          >SCHEDULE</text>
          <text
            x="543"
            y="371"
          >PROJECT</text>
          <text
            x="543"
            y="455"
          >USER, COMPANY</text>
        </g>

        <g
          class="font-mono"
          font-size="16"
          style="fill: var(--signal)"
        >
          <text
            x="214"
            y="510"
          >resync: replace the list</text>
          <text
            x="214"
            y="529"
          >and counts from the server</text>
        </g>
      </svg>
    </CaseFigure>

    <p>
      <strong>Patch in place.</strong> With my team I built live cell updates and presence: who else has the schedule open and which cell each person has selected. I created the real-time store and presence composable underneath. A cell event carries the new value, and the client patches that one cell, found by row and column id, with no refetch. Selections go out after a half-second pause, so moving quickly across a row sends one message, not one per cell, and a cell outlines itself in the color of whoever is on it.
    </p>
    <p>
      <strong>Refetch.</strong> I took threaded cell comments over from a teammate and carried them to general release, with fixes to editing, replies and mentions, a reworked product-link preview, and .NET changes that route notifications to the right thread. I attached each thread to its cell rather than the view it was written in, so it shows in any view containing its row and column. The server works out which threads a view shows, so a thread event tells other open schedules in the project to refetch theirs.
    </p>
    <p>
      <strong>Merge by id, then resync.</strong> In 2025 I built the first in-app notification center: the bell and panel, grouping, read states, filters, actions taken from a notification, and real-time updates. Events insert, update or remove entries by id, so a duplicate changes nothing. On a teammate’s new notification engine, I proposed and built its single real-time event on server and client, added server support for actions that ask for input, markdown messages and links into comment threads, and took its frontend through review to release. Its client, which the teammate started, resyncs after a reconnect or when a tab hidden for over five minutes returns.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Send one notification event that says what to do with it.">
      <template #instead>
        Five event types, with the unread count in its own event, as the engine’s first version had.
      </template>
      <template #why>
        With the count sent separately, the badge could lag the notification it counted, and only a new notification could raise a toast. I proposed one event carrying the notification, the current counts and a delivery instruction (toast, remove or resync), so the badge changes with the notification it counts and the server decides behavior in data, not by event name.
      </template>
      <template #cost>
        Every write path on the server must assemble the full event, counts included, before publishing. Company-wide broadcasts can’t carry anyone’s own counts, so they only tell clients to resync.
      </template>
    </CaseDecision>

    <CaseDecision title="After any gap, replace local notification state with the server’s.">
      <template #instead>
        Merging in what changed since the last sync, timed by the client’s clock, as the new frontend’s first version did.
      </template>
      <template #why>
        A merge never removes anything, so a notification dismissed or canceled while a client was offline stayed on screen, and the client’s clock could drift from the server’s timestamps. I made each resync fetch the current window and replace the store. Marking a notification read applies the counts in the server’s response instead of waiting on the socket.
      </template>
      <template #cost>
        Each resync downloads the whole recent window, not a delta. A first load also used to resync twice; now only a real reconnect triggers another.
      </template>
    </CaseDecision>

    <h2>What I’d change</h2>
    <p>
      My first notification center trusted the stream. It loaded its list once and let events keep it current, and the badge added or subtracted one per event, so a dropped connection or a missed event left both wrong until a reload. The engine’s client fixes both; next time I’d build the catch-up path first.
    </p>
    <p>
      In the 2024 presence store, state outlived the page until a hotfix cleared it, and the store rebuilt its map of who is on which cell, scanning each selected row, whenever rows or selections changed. I’d now tie such state to the subscription and build those maps from lookups.
    </p>

    <h2>Outcome</h2>
    <p>
      Collaborators now see each other’s edits and selections live, discuss cells in threaded comments, and get notifications in one center that catches up after a gap. Live cells and presence merged in August 2024 and the first notification center in July 2025; comments reached general release in June 2026, and since July 2026 the engine-backed center is the only one. What transfers: apply data events by id, and after any gap let the server’s answer replace local state.
    </p>
  </CaseStudy>
</template>
