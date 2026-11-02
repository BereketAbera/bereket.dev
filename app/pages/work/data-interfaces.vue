<template>
  <CaseStudy
    slug="data-interfaces"
    problem="A spreadsheet-style grid where every cell is editable needs typed values, saves people can trust, undo, search, sharing and bulk actions, and it has to stay easy to change as each one arrives."
    part="I built the save path behind typed cells, undo and redo, most of view sharing, catalog search and product replacement inside the schedule, and a bulk report that spans the web app and the .NET API; teammates built the grid’s rendering, keyboard movement, copy and paste, and row selection."
    result="Everything here is merged into the main branches of Acelab’s web app and API; the save path and undo from 2024 are still in use, and the bulk report shipped with 48 new unit tests across the two."
  >
    <h2>The problem</h2>
    <p>
      A data grid where every cell is editable is unlike most screens: every change is a save, and new column types, views, search, sharing and bulk actions keep arriving. The hard part isn’t any one feature. It’s keeping edits predictable and the code easy to change while the grid grows.
    </p>
    <p>
      At Acelab, the grid I worked on is the product schedule. In Material Hub, a schedule is a spreadsheet-style list of the products, materials and finishes on a project, the kind of finish schedule that ends up in a drawing set, not a calendar. Each row holds a product; the columns hold its data: text, numbers, lists, files, its MasterFormat section (the North American standard for organizing construction specifications) and fields a firm defines for itself. Acelab’s <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/finish-schedule">finish schedule page</ExtLink> describes views by project phase and building area, shared with other stakeholders.
    </p>

    <h2>What I owned</h2>
    <p>
      I was one of the schedule’s main contributors from 2024 on, not its only author. Teammates built its foundations: rendering the grid (later with virtual scrolling), keyboard movement between cells, copy and paste, and the row selection that bulk actions use. Presence and live cell updates in this grid are in the <NuxtLink to="/work/realtime-sync">real-time case study</NuxtLink>.
    </p>
    <ul>
      <li>
        <strong>Cells and rows, 2024.</strong> The save path behind text, number, list and file cells, the composables that manage rows and cells, and cell types for a product’s MasterFormat section, the projects it is used in, and Acelab’s catalog fields. Also placeholder products for items not in the catalog, replace, duplicate, batch delete, creating and editing custom fields, and PDF previews in file cells.
      </li>
      <li>
        <strong>Views and sharing, 2024.</strong> Connecting saved views to the API, and sharing them: a bundle groups views behind one link, each shared to view and comment or to edit data, and for edit data the sharer picks which custom fields recipients may change. Recipients get their own schedule page, which I built.
      </li>
      <li>
        <strong>Undo and redo, 2024.</strong> I wrote it; a teammate later moved it to TypeScript.
      </li>
      <li>
        <strong>2025.</strong> Moving products between schedules, changing a product’s MasterFormat section, and company-wide fields.
      </li>
      <li>
        <strong>2026.</strong> Bringing catalog search into the schedule, with a mode for replacing a product; search within a schedule; an export menu that brings the existing CSV download back beside the PDF export (both built by teammates); and a bulk “report missing products” action, frontend and .NET API.
      </li>
    </ul>

    <h2>How it works</h2>
    <p>
      Every cell is drawn by a component chosen by its column type, behind one contract: the component receives the cell, its column and its editing state, and reports back a new value or a change in editing state. A shared wrapper handles selection, keyboard and saving. Teammates set up that contract; I built cell types on it and wrote what happens when a value comes back.
    </p>
    <p>
      The wrapper records the cell’s value before and after the edit in the page’s history, then hands the new value to one save function, which builds the payload the column type needs (a string, a list of numbers, chosen options, file references) and sends it to one endpoint for cell updates.
    </p>

    <CaseFigure caption="How a cell edit is saved and recorded, with undo and redo highlighted; collaborators’ live edits skip the history.">
      <svg
        viewBox="0 0 560 238"
        role="img"
        aria-labelledby="data-interfaces-fig-title"
        aria-describedby="data-interfaces-fig-desc"
      >
        <title id="data-interfaces-fig-title">How a cell edit is saved, recorded and undone</title>
        <desc id="data-interfaces-fig-desc">A typed cell, drawn by one component per column type, sends each edit two ways. Its values before and after the edit are recorded in the page’s edit history, and the new value goes to a save path that builds the payload for the column’s type and calls one endpoint for cell updates. Undo and redo take a recorded value from the history and send it through the same save path. Edits by collaborators arrive as real-time events and update the cell directly without being recorded.</desc>
        <defs>
          <marker
            id="data-interfaces-arrow"
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
            id="data-interfaces-arrow-signal"
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
          <!-- Row 1: the typed cell, and collaborators' live edits (dashed). -->
          <rect
            x="1"
            y="1"
            width="220"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="339"
            y="1"
            width="220"
            height="60"
            stroke-dasharray="5 4"
            style="fill: var(--paper)"
          />
          <!-- Row 2: edit history and save path. -->
          <rect
            x="1"
            y="89"
            width="220"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="339"
            y="89"
            width="220"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- Row 3: the API. -->
          <rect
            x="1"
            y="177"
            width="558"
            height="60"
            style="fill: var(--paper-2)"
          />

          <!-- Arrows. -->
          <path
            d="M339 31H224"
            stroke-dasharray="5 4"
            marker-end="url(#data-interfaces-arrow)"
          />
          <path
            d="M111 61V86"
            marker-end="url(#data-interfaces-arrow)"
          />
          <path
            d="M200 61V75H449V86"
            fill="none"
            marker-end="url(#data-interfaces-arrow)"
          />
          <path
            d="M449 149V174"
            marker-end="url(#data-interfaces-arrow)"
          />
        </g>

        <!-- The highlighted path: undo and redo replay a recorded value through the save path. -->
        <path
          d="M221 119H336"
          style="stroke: var(--signal)"
          stroke-width="2"
          marker-end="url(#data-interfaces-arrow-signal)"
        />

        <g fill="currentColor">
          <text
            x="17"
            y="27"
            font-size="20"
            font-weight="600"
          >Typed cell</text>
          <text
            x="17"
            y="49"
            class="font-mono"
            font-size="16"
          >one per column type</text>

          <text
            x="355"
            y="27"
            font-size="20"
            font-weight="600"
          >Others’ edits</text>
          <text
            x="355"
            y="49"
            class="font-mono"
            font-size="16"
          >live, not recorded</text>

          <text
            x="123"
            y="80"
            class="font-mono"
            font-size="16"
          >record</text>
          <text
            x="280"
            y="70"
            class="font-mono"
            font-size="16"
            text-anchor="middle"
          >save</text>

          <text
            x="17"
            y="115"
            font-size="20"
            font-weight="600"
          >Edit history</text>
          <text
            x="17"
            y="137"
            class="font-mono"
            font-size="16"
          >before + after</text>

          <text
            x="355"
            y="115"
            font-size="20"
            font-weight="600"
          >Save path</text>
          <text
            x="355"
            y="137"
            class="font-mono"
            font-size="16"
          >payload per type</text>

          <text
            x="17"
            y="203"
            font-size="20"
            font-weight="600"
          >Schedule API</text>
          <text
            x="17"
            y="225"
            class="font-mono"
            font-size="16"
          >one endpoint for cell updates</text>
        </g>

        <text
          x="280"
          y="111"
          class="font-mono"
          font-size="16"
          text-anchor="middle"
          style="fill: var(--signal)"
        >undo/redo</text>
      </svg>
    </CaseFigure>

    <p>
      The editor for defining fields got the same separation. Before adding company-wide fields in late 2025, I moved its logic out of the modal and into composables for options, type conversion, payloads and updates. The modal went from about 1,400 lines to about 500, and company fields reused those pieces, including promoting a project field to a company field and archiving, not deleting, an option other projects still use.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Record before-and-after values, and undo by saving the old one again.">
      <template #why>
        Undo doesn’t need its own write path. The history keeps each cell’s value from before and after an edit, and undo or redo sends the recorded value through the same save function as typing, with the usual shortcuts and a toast to confirm. Only your own single-cell edits enter the history, so undo steps back through what you typed, and it works the same on shared bundle pages.
      </template>
      <template #cost>
        The history lives in the open page, so a reload clears it, and it covers edits made in one cell at a time: pasted values and adding, moving or deleting products never entered it. Undo doesn’t check what the cell holds now, so if a collaborator has changed that cell since, your old value replaces theirs. Pairing values per cell also took follow-up fixes for edge cases such as repeated undos.
      </template>
    </CaseDecision>

    <CaseDecision title="Extract the shared search first, then ship in small stacked pull requests.">
      <template #why>
        The schedule needed keyword search across the whole catalog, with filters and paging, which the app’s catalog page already did. The first of ten stacked pull requests moved that logic into one composable and switched the catalog page to it, so the schedule’s new search dialog (Explore Products in the app) could reuse it. Each of the other nine had a narrow scope, such as category and manufacturer filters, loading and empty states, a shared product card or the replace mode, with its own summary and test plan.
      </template>
      <template #cost>
        Small parts didn’t make it bug-free. The stack merged down and landed as one change, and in the following days I shipped a handful of fixes, such as results that didn’t reset when the search was cleared.
      </template>
    </CaseDecision>

    <CaseDecision title="Narrow the table when a search is committed, not on every keystroke.">
      <template #instead>
        Narrowing the table as you type, which the first plan called for.
      </template>
      <template #why>
        Search within a schedule found products and manufacturers through two backend endpoints I didn’t write. Suggestions updated as you typed, but the table changed only on Enter, a picked suggestion or a cleared search. Narrowing reloaded rows from the server and reset the scroll, so doing it on every pause would have kept resetting the table under someone still typing; feedback during the build moved it to commit time. The committed search lived in the URL, so a shared link or a refresh restored it.
      </template>
      <template #cost>
        The table didn’t respond while you typed, so the suggestions carried that feedback. Focus took several rounds: after Enter the input stayed blurred, Tab still moved on, and reopening it showed cached suggestions without another request. The decision was later reversed: a teammate rebuilt the search to match every visible column in the browser, against a cached copy, and switched the table to narrow as you type, after a short pause.
      </template>
    </CaseDecision>

    <CaseDecision title="Ask the server what a bulk action would do before confirming it.">
      <template #instead>
        Keeping a client-side record of which products were already reported.
      </template>
      <template #why>
        Reporting asks Material Hub to add a product to its catalog, and it can’t be undone. No cell carries the reported flag, and a select-all over a whole view can’t be listed cheaply in the browser. A preview endpoint sorts the selection without writing: products to report, catalog products, ones already reported, empty rows. If nothing is reportable, a toast says why; otherwise the confirmation names how many products will actually be reported. The write endpoint runs the same classification, and a test asserts the two agree. The button reuses the toolbar’s selection, so select-all and exclusions work as they do elsewhere.
      </template>
      <template #cost>
        One more request before each confirmation. It also surfaced an older bug: the weekly report of reported products selected them by the date a product was added, not when it was reported, so most products reported in bulk would never have reached it. I added a reported date, set in the data layer so no write path can flag a product without dating it, and backfilled it so nothing already in the report dropped out.
      </template>
    </CaseDecision>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>One question per flag.</strong> A column filter didn’t narrow its options as you typed. It chose between filtering locally and searching the server from a snapshot that could be empty, while loading and searching read the live column, so it waited on a search that never ran. My fix reads the live column everywhere and splits a flag that was answering two questions: do the options come from the server, and is the list on hand complete.
    </p>
    <p>
      <strong>What I’d change.</strong> I’d extend undo to row actions, recorded as inverse operations, and make it check a cell’s current value before writing over a collaborator’s change. And the bulk-report button was verified by component tests but not in a browser; I’d hold that kind of change for a visual check.
    </p>

    <h2>What transfers</h2>
    <p>
      A grid like this stays easy to change when the paths every feature shares are few and obvious: one contract for cell types, one save path, one history, one source for each decision. New work then adds a case, not a path. And when the browser can’t cheaply know what an action will touch, ask the server first instead of caching a guess. None of this is specific to Vue or to construction products.
    </p>

    <h2>Outcome</h2>
    <p>
      I have no usage numbers for these features. Everything here is merged into the main branches of Acelab’s web app and API, and it held up: the save path and undo from 2024 are still in use, and in 2026 teammates added date and formula columns by extending the same composable. The bulk report shipped with 24 new unit tests in the web app and 24 in the API.
    </p>
  </CaseStudy>
</template>
