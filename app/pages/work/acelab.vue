<template>
  <CaseStudy
    slug="acelab"
    problem="A large B2B product where architects and manufacturers work on the same data: dense editing, requests between companies, and interfaces that must stay right as data changes."
    part="The frontend of these features in Vue and Nuxt, and since 2026 some of the server code behind them, inside services teammates built and run. Where teammates built or led something, the page says so."
    result="The editor work and AceClipper shipped. The request workflow merged behind a feature flag in 2026 and Acelab markets it. I have no usage or business numbers to share."
  >
    <h2>A spreadsheet-style editor for building products</h2>
    <p>
      Architects keep the products and finishes on a project in a schedule: a spreadsheet-style list that ends up in the drawing set. Most cells are edited in place, and several people can have a schedule open at once.
    </p>
    <p>
      I built how cell edits are saved, single-cell undo and redo, most of the sharing of saved views, three cell types, and catalog search with product replacement. With my team I built real-time cell updates and showing who is on which cell. Teammates built the grid's rendering, scrolling, keyboard movement and copy and paste. The saving and undo code is still in use, and teammates have since extended it for new column types.
    </p>

    <h2>A request workflow between two companies</h2>
    <p>
      Architects ask manufacturers for product details from inside a schedule. Each manufacturer answers in a grid that saves as they type, and the answers land back in the schedule. Acelab markets this as <ExtLink href="https://www.acelabusa.com/solutions/project-delivery/automated-rfis">Bulk Vendor RFIs</ExtLink>, where RFI means request for information.
    </p>
    <p>
      I owned the frontend: a multi-step send flow with saved drafts, the manufacturer's inbox and response grid, and live status in the schedule. A teammate led the .NET backend, and I built endpoints for paging, cancellation and live updates. The grid saves each cell on its own, ignores responses that arrive out of order, moves by keyboard like a spreadsheet, and pages on the server. It merged behind a feature flag in 2026.
    </p>

    <SaveGridDemo compact>
      A small rebuild with made-up data. Two saves to one cell race: press "Show conflicting saves" to watch the late one get ignored, or edit cells with the keyboard. Built for this site. It is not Acelab's code or design.
    </SaveGridDemo>

    <h2>Browser extensions for product data</h2>
    <p>
      <ExtLink href="https://chromewebstore.google.com/detail/aceclipper/kpljfojfnempmahijdcncjbopekfcjag">AceClipper</ExtLink>, public on the Chrome Web Store, turns a manufacturer's product page into products an architect can paste into a schedule. I built the React extension, the sign-in hand-off that gives it a short-lived, scoped token, the server endpoint that parses pages with an LLM and validates the result, and the import step in the web app. A teammate added the screenshot feature and some build and icon changes.
    </p>
    <p>
      I am also the only engineer on an internal extension that collects product files for reviewers, with no LLM at run time. In an offline replay of reviewers' decisions on 23 products, it found 117 of the 164 files they approved (71%). The same products scored 94 (57%) before a round of fixes, so this is not a held-out test. It measures recall, not reviewer time or production impact.
    </p>

    <h2>Keeping a large application current</h2>
    <p>
      I was a major contributor to moving the web app, more than 1,000 Vue files, from Nuxt 2 to Nuxt 3 while the product kept shipping. A teammate led the upgrade, which merged in November 2025. Afterwards I typed the API client, replaced several mixins with composables and moved some state to Pinia.
    </p>

    <h2>Other product work</h2>
    <ul>
      <li>Built the interface and real-time updates of the first in-app notification center.</li>
      <li>Took the frontend of a teammate's new notification system through review to release.</li>
      <li>Finished a teammate's threaded comments through to general release.</li>
      <li>Contributed core components to the product's shared Vue design system.</li>
    </ul>

    <h2>Server code, since mid-2026</h2>
    <p>
      Inside services teammates built, I added .NET endpoints with server-side permission checks from June 2026, and from September Python workflow steps that keep reviewers' edits when a product page is scraped again and Node.js route handlers for an internal review tool, with the SQL migrations behind them. The clearest example is a bulk report of missing products, which I built from the editor action through .NET endpoints to a SQL migration. These ship through the team's pipelines, and I write tests as a routine part of this work, in Vitest, NUnit and pytest.
    </p>

    <h2>How this work was done</h2>
    <p>
      I use AI coding tools, mainly Claude Code, in my development every day. I review what they produce and I answer for what ships.
    </p>
  </CaseStudy>
</template>
