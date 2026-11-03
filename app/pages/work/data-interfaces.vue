<template>
  <CaseStudy
    slug="data-interfaces"
    problem="A spreadsheet-style schedule for specifying building products, where every cell is editable, needs saves people can trust, undo, search, sharing and bulk actions, and must stay easy to change as each arrives."
    part="Core contributor: I built the cell save path, undo/redo, most of view sharing, catalog search with product replacement, and a bulk missing-product report; teammates built the grid’s rendering, scrolling, keyboard movement, copy-paste and selection."
    result="Schedule users can undo their own cell edits, share views with chosen edit rights, search the catalog to replace a product, and report missing products in bulk; all merged into Acelab’s web app and API."
  >
    <h2>The problem</h2>
    <p>
      The grid is Acelab’s product schedule in Material Hub: a spreadsheet-style list of the products, materials and finishes on a project, the kind that ends up in a drawing set, not a calendar. Each row holds a product; the columns hold its data: text, numbers, lists, files, its MasterFormat section and fields a firm defines for itself.
    </p>
    <p>
      Every change is a save, and new column types, views, search, sharing and bulk actions keep arriving. The hard part is keeping edits predictable and the code easy to change as the grid grows.
    </p>

    <h2>What I built</h2>
    <p>
      Each cell is drawn by a component chosen by its column type, behind one contract teammates set up: the component receives the cell, its column and its editing state, and reports back a new value. I built cell types on it, for a product’s MasterFormat section, the projects it is used in and Acelab’s catalog fields, and wrote what happens when a value comes back. The values before and after the edit go into the page’s history, and the new value goes to one save function, which builds the payload the column type needs and sends it to one endpoint for cell updates. Collaborators’ live edits skip the history (see the <NuxtLink to="/work/realtime-sync">real-time case study</NuxtLink>).
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
      <strong>Products and fields.</strong> I also added placeholder products for items not in the catalog, the replace, duplicate and batch-delete actions, custom fields, PDF previews in file cells and moving products between schedules. Before adding company-wide fields, I moved the field editor’s logic out of its modal into composables, so company fields reused it, including promoting a project field to a company field and archiving, not deleting, an option other projects still use.
    </p>
    <p>
      <strong>Sharing.</strong> I connected saved views to the API and built most of sharing: a bundle groups views behind one link, each shared to view and comment or to edit data, and for edit data the sharer picks which custom fields recipients may change. I built the page recipients open.
    </p>
    <p>
      <strong>Search and bulk report.</strong> I moved the catalog page’s search into one composable, switched that page to it, and built the schedule’s catalog search on it, with a mode for replacing a product. I also built a bulk “report missing products” action across the web app, the .NET API and a database migration. That work surfaced an older bug: the weekly report of reported products went by the date a product was added, not when it was reported, so most products reported in bulk would never have reached it. I added a reported date, set in the data layer so no write path can flag a product without dating it, and backfilled it.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Record before-and-after values, and undo by saving the old one again.">
      <template #why>
        Undo doesn’t need its own write path. The history keeps each cell’s value from before and after an edit, and undo or redo sends the recorded value through the same save function as typing. Only your own single-cell edits enter the history, so undo steps back through what you typed, and it works the same on shared bundle pages.
      </template>
      <template #cost>
        The history lives in the open page, so a reload clears it, and pasted values and adding, moving or deleting products never entered it. Undo was built for your own edits, so it doesn’t reconcile with a collaborator’s later change to the same cell; that’s the first thing I’d add.
      </template>
    </CaseDecision>

    <CaseDecision title="Ask the server what a bulk action would do before confirming it.">
      <template #instead>
        Keeping a client-side record of which products were already reported.
      </template>
      <template #why>
        Reporting asks Material Hub to add a product to its catalog, and it can’t be undone. No cell carries the reported flag, and a select-all over a whole view can’t be listed cheaply in the browser. A preview endpoint sorts the selection without writing, so the confirmation names how many products will actually be reported. The write endpoint runs the same classification, and a test asserts the two agree.
      </template>
      <template #cost>
        One more request before each confirmation, and the same classification runs twice, once to preview and once to write.
      </template>
    </CaseDecision>

    <h2>What I’d change</h2>
    <p>
      I’d extend undo to row actions, recorded as inverse operations, and make it check a cell’s current value before writing over a collaborator’s change. I verified the bulk-report button with component tests, not in a browser; I’d hold that kind of change for a visual check.
    </p>

    <h2>Outcome</h2>
    <p>
      Schedule users can undo their own cell edits, share views with chosen edit rights, search the catalog to replace a product, and report missing products in bulk. Everything is merged into Acelab’s web app and API; the 2024 save path and undo are still in use, and teammates added date and formula columns by extending the same composable. I have no usage numbers. What transfers: keep shared paths few and obvious, and ask the server rather than cache a guess.
    </p>
  </CaseStudy>
</template>
