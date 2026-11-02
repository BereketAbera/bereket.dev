<template>
  <CaseStudy
    slug="workflow-engineering"
    problem="A request-and-answer workflow crosses a company boundary, so it has to handle three audiences, saved drafts, deadlines, permissions on both sides, autosaving answers and status that stays live in every open view."
    part="I led the frontend and built the architect’s send wizard and the manufacturer’s inbox and response grid. I was also the second contributor to the workflow’s .NET backend, which a teammate led."
    result="The first version merged behind a feature flag with 81 new unit-test files; cancellation, deadline extensions and sending from a multi-cell selection followed through October 2026, and Acelab now markets the workflow as Bulk Vendor RFIs (requests for information)."
  >
    <h2>The problem</h2>
    <p>
      This workflow crosses a company boundary. One company sends a structured request, another owes an answer by a deadline, and the platform’s own staff pick up whatever reaches no one. Each side has its own roles and permissions.
    </p>
    <p>
      Drafts outlive a session, colleagues share the answering, deadlines pass and requests get withdrawn. The answer has to land in the requester’s own data, and every open screen on both sides has to agree on where things stand.
    </p>
    <p>
      At Acelab, the platform is Material Hub, where architects build product schedules: spreadsheet-style lists of the products, materials and finishes that go into a drawing set. When a schedule needs details only a manufacturer has, the architect sends a request for information, an RFI.
    </p>
    <p>
      Acelab markets the workflow as <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/automated-rfis">Bulk Vendor RFIs</ExtLink>: one numbered request per manufacturer, answers written back into the schedule, and a conversation thread for each exchange.
    </p>

    <h2>What I owned</h2>
    <p>
      I led the frontend and created about 101 of its roughly 180 files, tests excluded.
    </p>
    <ul>
      <li>
        <strong>Frontend, first version.</strong> The send wizard with saved drafts, the manufacturer’s inbox and response grid, and live RFI badges on schedule cells. A teammate built the board Acelab staff use to route requests; I later added a manufacturer column to it.
      </li>
      <li>
        <strong>Frontend, added later.</strong> Canceling an RFI, a drawer opened from the schedule, due-soon and deadline-extension flows, an RFI section on the manufacturer’s home dashboard, and sending from a multi-cell selection.
      </li>
      <li>
        <strong>Backend.</strong> A teammate led the backend. As its second contributor, I wrote the .NET side of multi-colleague assignment, reopen requests, server-side pagination, per-cell RFI state with real-time broadcasts, the transactional cancel and the dashboard summary.
      </li>
      <li>
        <strong>Access.</strong> Limiting Send RFI to members of the project’s company, in the interface and the API, and documenting RFI roles and permissions for both sides.
      </li>
      <li>
        <strong>Spec audit.</strong> Before the first version merged, I audited the features already built against the written product spec, with AI-assisted reviews, and traced each requirement to the code. Within two days, six of the ten missed acceptance criteria shipped in paired frontend and API changes; three were deferred with written recommendations and one was descoped.
      </li>
    </ul>

    <h2>How it works</h2>
    <p>
      A request starts where the requester already works. The architect selects rows in the schedule, or later a range of cells that also pre-selects the requestable fields it covers, and the wizard walks through five steps: confirm products, choose fields, pick recipients and a deadline, write the message, review. Reopening the wizard on the same selection resumes the saved draft; a new selection starts fresh. The send is one multipart request, attachments included.
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
      Each manufacturer sees the request in an inbox scoped to their brand and answers in a grid built to behave like the schedule: a real HTML table with a sticky header and product column, the schedule’s own read-only cells, an editor for each data type, arrow-key movement and type-to-edit. Answers autosave. Colleagues can be assigned to share the work, viewer roles can only read, and submitting locks the response.
    </p>
    <p>
      On submit, the server writes the answers into the architect’s schedule and broadcasts on the project’s real-time channel, so an open schedule updates without a reload. A marker on each requested cell shows when it is out for an RFI, then whether the manufacturer supplied the value (answered) or left it as it was (reviewed). If the architect later types over an answered value, the server withdraws the credit and the marker updates live. The marker is also a real button, keyboard-operable and labeled, that opens the RFI in a drawer with the conversation in a second tab.
    </p>
    <p>
      Deadlines shape the rest. A response locks once its deadline passes. A due-soon chip appears in the three days before it, and the manufacturer can ask for more time without first missing the deadline. The server decides what counts as due soon, on US Eastern dates; the client renders the day count in the same zone, so the chip and the flag can’t disagree.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Autosave every answer, and never let a late save overwrite a newer edit.">
      <template #why>
        A manufacturer’s draft had to survive a reload, so each cell saves on its own shortly after an edit. Saves can return out of order, so stale responses are ignored: a returning save marks only the cells whose value still matches what it sent, and a cell edited in the meantime waits for its own save.
      </template>
      <template #cost>
        Each cell has three values to keep straight: on screen, in flight and saved. An empty cell is ambiguous (never answered, or answered then cleared), so cells carry an explicit saved-on-the-server flag. Review still caught a cleared cell bringing back the architect’s faded reference value, right after the clear and again after its row scrolled away and back. Both were fixed before merge.
      </template>
    </CaseDecision>

    <CaseDecision title="Filter, sort, count and page on the server.">
      <template #instead>
        Loading every product and every cell when a response opened.
      </template>
      <template #why>
        So a large RFI opens fast. The response view loads the project details, attachments and the first page of products; the rest arrive as you scroll, into virtualized rows. The inbox gets its rows, status counts and filter options in one response, and each board column pages on its own, with a guard against stale and duplicate requests.
      </template>
      <template #cost>
        Sorting is limited to what the API supports. When I later added a manufacturer column to the staff board, I left it unsortable rather than ship a client-side sort that would behave differently on each page. And deleted rows shift offsets: once RFIs could be canceled, paging from the local row count skipped one, so I switched “load more” to offset by what the server still held.
      </template>
    </CaseDecision>

    <CaseDecision title="Cancel in one transaction, and announce it only after the commit.">
      <template #why>
        As I first built it, an architect could withdraw an RFI until the manufacturer or Acelab staff opened it. The cancel claimed the row, snapshotted what hung off it and deleted it in one transaction. Only after the commit did it notify the manufacturer and fan the removal out over real-time channels, so the architect’s board, the manufacturer’s inbox, the schedule cells and the conversation card all dropped it without a reload. Channels were authorized per persona, and I checked that an architect was refused the brand channel and a manufacturer the project channel.
      </template>
      <template #cost>
        Every writer had to expect a row to vanish. Opening, submitting and assigning were changed to refuse an RFI that a concurrent cancel had deleted, instead of reporting success, which meant telling “someone else changed it” apart from “it no longer exists.”
      </template>
    </CaseDecision>

    <CaseDecision title="Hide Send RFI in the interface, and enforce the rule on the server.">
      <template #why>
        Only members of the company that owns a project may send RFIs from it, even when a collaborator from another company can edit the schedule. The button hides on a definite mismatch. The API checks on its own: it falls back to the project creator’s company when a project has none, and fails closed when ownership can’t be resolved. Acelab admins are exempt on both sides.
      </template>
      <template #cost>
        The rule lives in two places that have to agree. Where the client can’t tell, on projects with no owning company, it shows the button and leaves the decision to the server: those are personal projects that are never shared, so hiding the button there would only hide it from its owner.
      </template>
    </CaseDecision>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>A rule I reversed.</strong> The real-time handlers for the RFI board and for conversations used to ignore events the current user had triggered. But an optimistic update happens in one tab, while “triggered by” names a person, so that person’s other tabs kept showing an RFI they had just canceled. Those events now reach every tab; a claim step already made duplicate deliveries harmless, and only the toast about your own action is skipped.
    </p>
    <p>
      <strong>Deleting outright has a long tail.</strong> Canceling removed the RFI and the conversation that existed only to host it. Beyond the paging fix, a manufacturer reading that thread was left on a page that no longer existed until I routed them back to their conversations. Resending the same selection after a cancel created nothing, because the client reused its idempotency key and the server still held that key’s record; the key now rotates on cancel. Next time I would list every reader of a row before shipping its delete. In October 2026 a teammate reworked cancel to keep the RFI with a Canceled status instead of deleting it.
    </p>
    <p>
      <strong>Reads shouldn’t change state.</strong> Reading a response used to mark the RFI as opened, and the conversation card reads it too, so merely opening the conversation ended the architect’s cancel window. Opening is now its own explicit call. Fetching a thread marks its messages read, so the drawer waits until its conversation tab is first shown.
    </p>
    <p>
      <strong>A server-side flag check, removed a day later.</strong> I moved the workflow’s feature-flag check into server rendering, then took it out the next day: it put a blocking upstream call in front of every signed-in server render, and measured on the running app, the gain was close to nothing.
    </p>
    <p>
      <strong>Green tests aren’t proof.</strong> One bug survived a fully passing suite because the grid’s tests injected a value the store had stopped producing. I check new tests by breaking the code they cover and confirming they fail. A few later fixes still merged on unit tests alone, with the visual check left to reviewers; I would hold those for a browser pass.
    </p>

    <h2>What transfers</h2>
    <p>
      Take away the architects and manufacturers and the same shape turns up in approval flows, purchase orders waiting on a supplier, support cases escalated to a vendor, and any two-party process with state, deadlines and permissions.
    </p>
    <p>
      What I’d bring to any of them is a handful of rules. The server decides who may act and what a deadline means; the interface only hides what the server would refuse. Work saves in small pieces, and a late response never overwrites a newer edit. Changes are announced after they commit, to every audience that can see them.
    </p>

    <h2>Outcome</h2>
    <p>
      The first version merged behind a feature flag as one integration branch: 273 files, 227 commits and 81 new unit-test files. Later additions followed through October 2026, and Acelab now markets the workflow as Bulk Vendor RFIs.
    </p>
  </CaseStudy>
</template>
