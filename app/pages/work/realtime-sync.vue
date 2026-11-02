<template>
  <CaseStudy
    slug="realtime-sync"
    problem="When many people have the same data open, every screen has to show their changes as they happen and recover the ones it missed."
    part="I built presence, live cell updates and the first notification center, and took over schedule comments from a teammate to release them. On a teammate’s new notification engine, I proposed and built its single real-time event and took its frontend through review to release."
    result="Shipped from 2024 to 2026: live cells and presence in the schedule, comments for all users, and one notification center on the new engine, with the old one removed."
  >
    <h2>The problem</h2>
    <p>
      When several people work on the same data, every open screen has to keep up: a value someone else just typed, who is looking at what, a reply, a request that needs an answer. Each change has to reach every open tab without a reload and apply correctly even if it arrives twice. And each client needs to catch up on what it missed while a laptop slept or a connection dropped.
    </p>
    <p>
      At Acelab the shared data is the product schedule in Material Hub, a materials platform for architects, owners and manufacturers. A schedule is a spreadsheet-style list of the products, materials and finishes that go into a drawing set, not a calendar; Acelab markets one kind as <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/finish-schedule">Finish Schedules</ExtLink>. Several people can have one open at once, discuss its cells in comment threads and get notified when someone mentions them or needs their answer.
    </p>

    <h2>What I owned</h2>
    <ul>
      <li>
        <strong>Presence and live cells, 2024.</strong> I built live updates for text, number, list and file cells, and presence: who else has the schedule open and which cell each person has selected. I created the real-time store and the presence composable underneath. A teammate introduced the real-time service, Pusher, and its client wrapper; another built the row, column and category events; a backend teammate published the cell and selection events from the server.
      </li>
      <li>
        <strong>Notification center, 2025.</strong> Between April and July 2025 I built the first in-app notification center: the bell and panel, groups for requests, updates and announcements, read states, filters, actions taken from the notification, a settings panel and real-time updates.
      </li>
      <li>
        <strong>Schedule comments, 2026.</strong> A teammate started threaded cell comments in April and May, including the TipTap composer with mentions, product-link previews and live thread updates. I took it over in late May and carried it to general release: fixes to editing, replies and mentions in the TipTap editor, a reworked product-link preview, several bug-fix bundles, .NET changes that place threads in the right views and route notifications to them, and removing the feature flag. In September I turned URLs in comments into links, live as you type.
      </li>
      <li>
        <strong>Notification engine, 2026.</strong> A teammate built a new event-driven notification engine and the first version of its frontend, behind a flag. In review I proposed replacing its five real-time event types with one; the proposal was approved as the direction, and I built it on server and client. I also added server support for actions that ask for input, markdown messages and links into comment threads, and fixed flows I verified end to end. I opened and merged the pull request that took its frontend to release and wrote the fixes from its review, including the catch-up fixes below, as well as a settings page redesign and the manufacturer paths. The teammate moved settings onto the engine’s recursive tree and deleted the flag and the old interface.
      </li>
    </ul>

    <h2>How it works</h2>
    <p>
      All four features share one transport: an event goes out on a channel per schedule (cells, presence), per project (comment threads), or per user and per company (notifications). What differs is how a client applies it.
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
      <strong>Apply it.</strong> A cell event carries the new value in the server’s typed format. The client finds the row through an id-to-index map and the column by id, converts the value to the cell’s own shape and patches that one cell, with no refetch. Selections travel the same way, sent after a half-second pause so moving quickly across a row sends one message, not one per cell. Each client keeps one selection per collaborator, indexed by row and column, so a cell can tell whether someone else is on it and outline itself in that person’s color. A presence channel supplies the avatars; when someone leaves, their selection goes too.
    </p>
    <p>
      <strong>Refetch.</strong> Whether a comment thread shows depends on which rows and columns the open view contains, which the server works out. So a thread event tells every other open schedule in the project to refetch its view’s threads.
    </p>
    <p>
      <strong>Merge by id.</strong> Notifications are a list the client has already loaded, so events insert, update or remove entries by id, and a duplicate changes nothing. Since events can still be missed, the client resyncs after a reconnect or when a tab hidden for over five minutes returns.
    </p>
    <p>
      A comment notification must open its thread. The schedule loads rows in pages and renders only those on screen, so the thread’s row may not be in the browser yet. The client asks the server where the row sits in the current view, search included, loads that page, scrolls to the row, waits for the cell to render and opens the thread.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="When someone joins, have one existing member re-send everyone’s selections.">
      <template #instead>
        Re-sending each selection as a separate request, which my first version did.
      </template>
      <template #why>
        Selections go out only when they change, so a newcomer would see nobody’s selected cell until each person moved. When someone joins, the client first in the channel’s member list sends every current selection, tagged with its owner, in one request that the server broadcasts; a backend teammate added that endpoint.
      </template>
      <template #cost>
        A newcomer depends on another open client: if that request fails, they see each selection only when its owner next moves. Every client also has to agree on who is first.
      </template>
    </CaseDecision>

    <CaseDecision title="Attach a comment thread to its cell, not to the view it was written in.">
      <template #instead>
        Scoping each thread to the view it was created in, which I had shipped the week before.
      </template>
      <template #why>
        A schedule can have several views, each showing its own rows and columns, so a thread scoped to its creation view was missing from other views of the same cell. Now it shows in any view containing its row and column, and its notifications carry the view to open.
      </template>
      <template #cost>
        The server resolves visibility for each view, and an open schedule applies a thread event by refetching its view’s threads rather than patching one.
      </template>
    </CaseDecision>

    <CaseDecision title="Send one notification event that says what to do with it.">
      <template #instead>
        Five event types, with the unread count in an event of its own, as the engine’s first version had.
      </template>
      <template #why>
        With the count sent separately, the badge could show the old number until the count event arrived, and only a new notification could raise a toast. Now one event carries the notification, the current counts and delivery instructions (toast, remove or resync), so the badge changes in the same update as the notification it counts, and the server decides behavior in data, not by event name.
      </template>
      <template #cost>
        Every write path on the server must assemble the full event, counts included, before publishing. Company-wide broadcasts share a channel that can’t carry anyone’s own counts, so they only tell clients to resync.
      </template>
    </CaseDecision>

    <CaseDecision title="After any gap, replace local notification state with the server’s.">
      <template #instead>
        Merging in what changed since the last sync, timed by the client’s clock, as the new frontend’s first version did.
      </template>
      <template #why>
        A merge never removes anything, so a notification dismissed or canceled while a client was offline stayed on screen, and a cursor taken from the client’s clock could drift from the server’s timestamps. A resync now fetches the current window and replaces the store. Counts follow the same rule: marking a notification read applies the counts in the server’s response, not waiting for a count event that never arrives if the socket is down.
      </template>
      <template #cost>
        Each resync downloads the whole recent window, not a delta. A first load also used to resync twice, on mount and on the first connection; now only a real reconnect triggers another.
      </template>
    </CaseDecision>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>The cutover.</strong> I first gated the new center by role, keeping admins, manufacturers and internal staff on the old one until notifications they relied on existed in the engine. The next day a teammate found that every old type already had an engine equivalent and switched everyone over; the flag and the old interface were deleted in the pull request that shipped the new center. I kept manufacturers on their old email-only preferences page, since the new settings tree is empty for them. Next time I’d compare the catalogs before building a gate.
    </p>
    <p>
      <strong>My first notification center trusted the stream.</strong> It loaded its list once and let events keep it current, merged by id. Nothing caught up after a dropped connection, and the badge was kept by adding and subtracting one per event, so a missed event left both wrong until a reload. The engine’s client fixes both.
    </p>
    <p>
      <strong>The 2024 store.</strong> Presence state outlived the page until an October hotfix cleared it on unmount and before each new subscription. The store also rebuilt its map of who is on which cell whenever rows or selections changed, scanning each selected row; in 2026 a teammate removed those scans with other performance fixes. I’d now tie such state to the subscription and build such maps from lookups.
    </p>

    <h2>What transfers</h2>
    <p>
      Decide, per kind of event, whether it carries data the client can apply or only says something changed. Apply the first kind by id, so duplicates are harmless, and refetch for the second. Then give every client a catch-up path where the server’s answer replaces local state, because reconnects, sleeping laptops and background tabs are routine. None of this depends on Pusher or Vue.
    </p>

    <h2>Outcome</h2>
    <p>
      Live cells and presence merged in August 2024 and the notification center in July 2025. Schedule comments reached general release when I removed their feature flag in June 2026, and URL linking followed in September. In July 2026 the engine-backed notification center merged as the only one, with the old interface removed.
    </p>
  </CaseStudy>
</template>
