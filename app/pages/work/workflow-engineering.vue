<template>
  <CaseStudy
    slug="workflow-engineering"
    problem="Architects ask manufacturers for product details across a company boundary, so the workflow has to handle drafts, deadlines, permissions on both sides, autosaving answers and status that stays live in every open view."
    part="I led the frontend, built the architect’s send wizard and the manufacturer’s inbox and response grid, and was the second contributor to the workflow’s .NET backend, which a teammate led."
    result="Merged behind a feature flag in 2026, then extended through October with cancellation, deadline extensions and multi-cell sending; Acelab markets it as Bulk Vendor RFIs."
  >
    <h2>The problem</h2>
    <p>
      In Acelab’s Material Hub, architects build product schedules: spreadsheet-style lists of the products, materials and finishes in a drawing set. When a schedule needs details only a manufacturer has, the architect sends a request for information, an RFI.
    </p>
    <p>
      That request crosses a company boundary. One company asks, another owes an answer by a deadline, and Acelab staff pick up whatever reaches no one. Drafts outlive a session, colleagues share the answering, deadlines pass and requests get withdrawn. The answer has to land in the architect’s schedule, and every open screen has to agree on where things stand.
    </p>

    <h2>What I built</h2>
    <p>
      On the architect’s side, I built the send wizard. The architect selects rows in the schedule or, later, a range of cells that also pre-selects the fields it covers, then moves through a five-step wizard: products, fields, recipients and deadline, message, review. Reopening it on the same selection resumes the saved draft. The API creates one numbered RFI per manufacturer; any that reach no manufacturer contact fall back to Acelab staff, who route them on a board a teammate built.
    </p>

    <CaseFigure caption="One RFI’s round trip from the architect’s schedule to the manufacturer and back, with the live badge update highlighted.">
      <svg
        viewBox="0 0 560 644"
        role="img"
        aria-labelledby="fig-workflow-engineering-title"
        aria-describedby="fig-workflow-engineering-desc"
      >
        <title id="fig-workflow-engineering-title">How one RFI travels between architect and manufacturer</title>
        <desc id="fig-workflow-engineering-desc">The architect selects rows or cells in the schedule and sends them through a five-step wizard. The API creates one numbered RFI per manufacturer; a request that reaches no manufacturer contact falls back to Acelab staff, who route it. The manufacturer sees the RFI in an inbox paged on the server and answers in a response grid that autosaves each cell. On submit, the API writes the answers into the schedule’s cells and sends a real-time event on the project channel, which flips the cell badges to responded in the architect’s open schedule.</desc>
        <defs>
          <marker
            id="fig-workflow-engineering-arrow"
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
            id="fig-workflow-engineering-arrow-signal"
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

        <!-- Lanes: architect on the left, manufacturer on the right. -->
        <path
          d="M280 26V468"
          style="stroke: var(--hair)"
          stroke-width="1"
        />
        <text
          x="1"
          y="14"
          class="font-mono"
          font-size="16"
          letter-spacing="0.08em"
          fill="currentColor"
        >ARCHITECT</text>
        <text
          x="559"
          y="14"
          class="font-mono"
          font-size="16"
          letter-spacing="0.08em"
          text-anchor="end"
          fill="currentColor"
        >MANUFACTURER</text>

        <g
          stroke="currentColor"
          stroke-width="1.25"
        >
          <!-- Architect: schedule and send wizard. -->
          <rect
            x="1"
            y="28"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="1"
            y="116"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- API: send. -->
          <rect
            x="1"
            y="204"
            width="558"
            height="60"
            style="fill: var(--paper-2)"
          />
          <!-- Acelab staff fallback (dashed) and the manufacturer inbox. -->
          <rect
            x="1"
            y="292"
            width="260"
            height="60"
            stroke-dasharray="5 4"
            style="fill: var(--paper)"
          />
          <rect
            x="299"
            y="292"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- Manufacturer: response grid. -->
          <rect
            x="299"
            y="380"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- API: submit. -->
          <rect
            x="1"
            y="468"
            width="558"
            height="60"
            style="fill: var(--paper-2)"
          />
          <!-- Architect: schedule cells. -->
          <rect
            x="1"
            y="576"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />

          <!-- Arrows. -->
          <path
            d="M131 88V113"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M131 176V201"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M429 264V289"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M131 264V289"
            stroke-dasharray="5 4"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M261 322H296"
            stroke-dasharray="5 4"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M429 352V377"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
          <path
            d="M429 440V465"
            marker-end="url(#fig-workflow-engineering-arrow)"
          />
        </g>

        <!-- The highlighted path: the real-time update back to the schedule. -->
        <path
          d="M131 528V573"
          style="stroke: var(--signal)"
          stroke-width="2"
          marker-end="url(#fig-workflow-engineering-arrow-signal)"
        />
        <rect
          x="1"
          y="576"
          width="5"
          height="60"
          style="fill: var(--signal)"
        />

        <g fill="currentColor">
          <text
            x="17"
            y="54"
            font-size="20"
            font-weight="600"
          >Schedule</text>
          <text
            x="17"
            y="76"
            class="font-mono"
            font-size="16"
          >select rows or cells</text>

          <text
            x="17"
            y="142"
            font-size="20"
            font-weight="600"
          >Send wizard</text>
          <text
            x="17"
            y="164"
            class="font-mono"
            font-size="16"
          >five steps · saved draft</text>

          <text
            x="143"
            y="195"
            class="font-mono"
            font-size="16"
          >send</text>

          <text
            x="17"
            y="230"
            font-size="20"
            font-weight="600"
          >API</text>
          <text
            x="17"
            y="252"
            class="font-mono"
            font-size="16"
          >one numbered RFI per manufacturer</text>

          <text
            x="17"
            y="318"
            font-size="20"
            font-weight="600"
          >Acelab staff</text>
          <text
            x="17"
            y="340"
            class="font-mono"
            font-size="16"
          >fallback routing</text>

          <text
            x="315"
            y="318"
            font-size="20"
            font-weight="600"
          >Inbox</text>
          <text
            x="315"
            y="340"
            class="font-mono"
            font-size="16"
          >paged on the server</text>

          <text
            x="315"
            y="406"
            font-size="20"
            font-weight="600"
          >Response grid</text>
          <text
            x="315"
            y="428"
            class="font-mono"
            font-size="16"
          >autosaves each cell</text>

          <text
            x="441"
            y="459"
            class="font-mono"
            font-size="16"
          >submit</text>

          <text
            x="17"
            y="494"
            font-size="20"
            font-weight="600"
          >API</text>
          <text
            x="17"
            y="516"
            class="font-mono"
            font-size="16"
          >writes answers into schedule cells</text>

          <text
            x="17"
            y="602"
            font-size="20"
            font-weight="600"
          >Schedule cells</text>
          <text
            x="17"
            y="624"
            class="font-mono"
            font-size="16"
          >badge flips to responded</text>
        </g>

        <g
          class="font-mono"
          font-size="16"
          style="fill: var(--signal)"
        >
          <text
            x="145"
            y="549"
          >real-time event</text>
          <text
            x="145"
            y="568"
          >project channel</text>
        </g>
      </svg>
    </CaseFigure>

    <p>
      Each manufacturer sees the request in an inbox scoped to their brand and answers in a grid built to behave like the schedule: a real HTML table with a sticky header and product column, the schedule’s own read-only cells, an editor for each data type, arrow-key movement and type-to-edit. Answers autosave. Colleagues can be assigned to share the work, viewers can only read, and submitting locks the response. Try a rebuild of it below.
    </p>

    <SaveGridDemo />

    <p>
      On submit, the server writes the answers into the architect’s schedule and broadcasts on the project’s real-time channel, so an open schedule updates without a reload. A marker on each requested cell shows when it is out for an RFI, then whether the manufacturer supplied the value or left it as it was; if the architect later types over an answer, the server withdraws the credit and the marker updates live. Each marker is a labeled, keyboard-operable button that opens the RFI in a drawer.
    </p>
    <p>
      A response locks once its deadline passes. A due-soon chip appears in the three days before, and the manufacturer can ask for more time without first missing the deadline. The server decides what counts as due soon, on US Eastern dates, and the client counts days in the same zone, so the chip and the flag can’t disagree.
    </p>
    <p>
      On the .NET side, I wrote multi-colleague assignment, reopen requests, server-side paging, per-cell RFI state with its real-time broadcasts, the cancel and a dashboard summary. I limited Send RFI to members of the project’s company: the button hides on a definite mismatch, and the API enforces the rule on its own, failing closed when ownership can’t be resolved. Before the first version merged, I traced each spec requirement to the code and found ten acceptance criteria the build had missed; six shipped within two days, and the rest were deferred or descoped.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Autosave every answer, and never let a late save overwrite a newer edit.">
      <template #why>
        A manufacturer’s draft had to survive a reload, so each cell saves on its own shortly after an edit. Saves can return out of order, so a returning save marks only the cells whose value still matches what it sent.
      </template>
      <template #cost>
        Each cell has three values to keep straight: on screen, in flight and saved. An empty cell is ambiguous (never answered, or answered then cleared), so cells carry an explicit saved-on-the-server flag. Review still caught a cleared cell bringing back the architect’s faded reference value; that was fixed before merge.
      </template>
    </CaseDecision>

    <CaseDecision title="Filter, sort, count and page on the server.">
      <template #instead>
        Loading every product and every cell when a response opened.
      </template>
      <template #why>
        So a large RFI opens fast. The response view loads the project details, attachments and the first page of products; the rest arrive as you scroll, into virtualized rows.
      </template>
      <template #cost>
        Sorting is limited to what the API supports, so when I later added a manufacturer column to the staff board, I left it unsortable rather than ship a client-side sort that would behave differently on each page. Once RFIs could be canceled, paging from the local row count also skipped one, so I switched “load more” to offset by what the server still held.
      </template>
    </CaseDecision>

    <CaseDecision title="Cancel in one transaction, and announce it only after the commit.">
      <template #why>
        As I first built it, an architect could withdraw an RFI until the manufacturer or Acelab staff opened it. The cancel claimed the row, snapshotted what hung off it and deleted it in one transaction. Only after the commit did it notify the manufacturer and clear the RFI from every open board, inbox, schedule cell and conversation, over real-time channels authorized per persona.
      </template>
      <template #cost>
        Every writer had to expect a row to vanish: opening, submitting and assigning were changed to refuse a canceled RFI rather than report success. I also stopped skipping real-time events the current user had triggered, since their other tabs kept showing an RFI they had just canceled.
      </template>
    </CaseDecision>

    <h2>What I’d change</h2>
    <p>
      <strong>List every reader before deleting.</strong> Canceling removed the RFI and the conversation that existed only to host it, which stranded a manufacturer reading that thread on a dead page and made resending the same selection create nothing, until each was fixed. Next time I would list every reader of a row before shipping its delete. In October 2026 a teammate reworked cancel to keep the RFI with a Canceled status.
    </p>
    <p>
      <strong>Hold UI fixes for a browser pass.</strong> One bug survived a fully passing suite because the grid’s tests injected a value the store had stopped producing. I check new tests by breaking the code they cover, but a few later fixes still merged on unit tests alone.
    </p>

    <h2>Outcome</h2>
    <p>
      The workflow takes an RFI from the architect’s schedule to the manufacturer and writes the answers back into the schedule, live. The first version merged behind a feature flag; cancellation, deadline extensions and multi-cell sending followed through October 2026, and Acelab markets it as <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/automated-rfis">Bulk Vendor RFIs</ExtLink>. What transfers: the server decides who may act and what a deadline means, and a late save never overwrites a newer edit.
    </p>
  </CaseStudy>
</template>
