<template>
  <CaseStudy
    slug="browser-extensions"
    problem="Product data lives on third-party web pages that each hide it differently, and it has to reach an application as structured records that people can trust."
    part="I built both extensions end to end and the pieces they connect to: token handoff and LLM parsing in the .NET API, the import flow in the web app, and the paste dialogs in an internal data-quality platform."
    result="The public extension is on the Chrome Web Store. The internal one reached version 2.0.1 with 1,673 unit tests, and on an 11-page benchmark of the pages it was developed against, it found all 245 reachable files."
  >
    <h2>The problem</h2>
    <p>
      Some data lives only on other companies’ websites. Product pages are a hard case: the facts sit in text, structured data and scripts, behind tabs and dropdowns, in embedded frames and linked PDFs, and every site differs. The work is reading pages you don’t control, handing the result over securely, and knowing how accurate it is.
    </p>
    <p>
      At Acelab, whose Material Hub is a materials-management platform for architects, owners and manufacturers, that data is manufacturers’ product information. In 2026 I built two Chrome extensions for it.
    </p>
    <ul>
      <li>
        <strong>AceClipper</strong> is public on the <ExtLink href="https://chromewebstore.google.com/detail/aceclipper/kpljfojfnempmahijdcncjbopekfcjag">Chrome Web Store</ExtLink>. An architect opens it on a manufacturer’s page and pastes the products it finds into a project schedule, the spreadsheet-style product list for a drawing set.
      </li>
      <li>
        <strong>The internal extension</strong> is for Acelab’s product-data reviewers. Automated scraping misses swatches on many manufacturer pages, so it collects a product’s swatches, finish photos and linked documents for a reviewer to check in Chrome’s side panel and copy to the review platform.
      </li>
    </ul>

    <h2>What I owned</h2>
    <ul>
      <li>
        <strong>AceClipper.</strong> The popup, service worker, content script and page capture; a teammate added three commits: environment-based build configuration, a screenshot feature and icons.
      </li>
      <li>
        <strong>Its server and web-app pieces.</strong> In the .NET API: short-lived extension tokens, an endpoint that parses a capture with OpenAI and validates the answer, image import from remote URLs, and matching scoped to imported products. In the Nuxt web app: the connect page, the clipboard import modal and matching after import.
      </li>
      <li>
        <strong>The internal extension.</strong> Sole author, including the Playwright evaluation harness. It started as a measured prototype whose written plan ruled out a backend and AI.
      </li>
      <li>
        <strong>Where its data lands.</strong> The review platform’s paste dialogs for images and documents, and a change in the Python workers that keeps reviewer-added document links through a rescrape.
      </li>
    </ul>

    <h2>How it works</h2>
    <p>
      Both extensions use Manifest V3, read a page only after a click, and hand over a versioned JSON clip on the clipboard. They differ in where extraction happens.
    </p>

    <CaseFigure caption="Same input, two ways to extract, one hand-off: the public extension parses on the server with an LLM, the internal one reads the page with rules, and both pass a versioned JSON clip (highlighted).">
      <svg
        viewBox="0 0 560 468"
        role="img"
        aria-labelledby="browser-extensions-fig-title"
        aria-describedby="browser-extensions-fig-desc"
      >
        <title id="browser-extensions-fig-title">Two extraction strategies with one hand-off</title>
        <desc id="browser-extensions-fig-desc">Both extensions start from a manufacturer’s product page, which is third-party and untrusted. Public extension: on a click, a content script captures the page’s text, JSON-LD and images; the API, called with a short-lived scoped token, parses the capture with an LLM and validates the result; the popup shows the products for review and copies them. Internal extension: on a click, a page reader runs in each frame and collects with rules and no AI; the side panel runs the collect and reads linked PDFs; the reviewer checks the status, picks anything missed and copies the result. Both hand off the same way, highlighted: a versioned JSON clip, copied and pasted into the web app’s schedule, which imports and matches the products, or into the review platform, where the reviewer adds them.</desc>
        <defs>
          <marker
            id="browser-extensions-arrow"
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
            id="browser-extensions-arrow-signal"
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

        <!-- Lanes: public extension on the left, internal extension on the right. -->
        <path
          d="M280 26V352"
          style="stroke: var(--hair)"
          stroke-width="1"
        />
        <text
          x="1"
          y="14"
          class="font-mono"
          font-size="14"
          letter-spacing="0.08em"
          fill="currentColor"
        >PUBLIC EXTENSION</text>
        <text
          x="559"
          y="14"
          class="font-mono"
          font-size="14"
          letter-spacing="0.08em"
          text-anchor="end"
          fill="currentColor"
        >INTERNAL EXTENSION</text>

        <g
          stroke="currentColor"
          stroke-width="1.25"
        >
          <!-- The third-party page both start from (dashed: not ours). -->
          <rect
            x="1"
            y="28"
            width="558"
            height="60"
            stroke-dasharray="5 4"
            style="fill: var(--paper)"
          />
          <!-- Row 2: what reads the page. -->
          <rect
            x="1"
            y="116"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="299"
            y="116"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- Row 3: where extraction finishes (the server, on the left). -->
          <rect
            x="1"
            y="204"
            width="260"
            height="60"
            style="fill: var(--paper-2)"
          />
          <rect
            x="299"
            y="204"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- Row 4: review and copy. -->
          <rect
            x="1"
            y="292"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="299"
            y="292"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- Row 5: the receiving applications. -->
          <rect
            x="1"
            y="400"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <rect
            x="299"
            y="400"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />

          <!-- Arrows. -->
          <path
            d="M131 88V113"
            marker-end="url(#browser-extensions-arrow)"
          />
          <path
            d="M429 88V113"
            marker-end="url(#browser-extensions-arrow)"
          />
          <path
            d="M131 176V201"
            marker-end="url(#browser-extensions-arrow)"
          />
          <path
            d="M429 176V201"
            marker-end="url(#browser-extensions-arrow)"
          />
          <path
            d="M131 264V289"
            marker-end="url(#browser-extensions-arrow)"
          />
          <path
            d="M429 264V289"
            marker-end="url(#browser-extensions-arrow)"
          />
        </g>

        <!-- The highlighted path: the same hand-off in both lanes. -->
        <path
          d="M131 352V397"
          style="stroke: var(--signal)"
          stroke-width="2"
          marker-end="url(#browser-extensions-arrow-signal)"
        />
        <path
          d="M429 352V397"
          style="stroke: var(--signal)"
          stroke-width="2"
          marker-end="url(#browser-extensions-arrow-signal)"
        />
        <rect
          x="1"
          y="400"
          width="5"
          height="60"
          style="fill: var(--signal)"
        />
        <rect
          x="299"
          y="400"
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
          >Manufacturer product page</text>
          <text
            x="17"
            y="76"
            class="font-mono"
            font-size="16"
          >third-party markup · untrusted input</text>

          <text
            x="143"
            y="107"
            class="font-mono"
            font-size="16"
          >on click</text>
          <text
            x="441"
            y="107"
            class="font-mono"
            font-size="16"
          >on click</text>

          <text
            x="17"
            y="142"
            font-size="20"
            font-weight="600"
          >Content script</text>
          <text
            x="17"
            y="164"
            class="font-mono"
            font-size="16"
          >text · JSON-LD · images</text>
          <text
            x="315"
            y="142"
            font-size="20"
            font-weight="600"
          >Page reader</text>
          <text
            x="315"
            y="164"
            class="font-mono"
            font-size="16"
          >rules, no AI · per frame</text>

          <text
            x="143"
            y="195"
            class="font-mono"
            font-size="16"
          >capture</text>
          <text
            x="441"
            y="195"
            class="font-mono"
            font-size="16"
          >results</text>

          <text
            x="17"
            y="230"
            font-size="20"
            font-weight="600"
          >API + LLM</text>
          <text
            x="17"
            y="252"
            class="font-mono"
            font-size="16"
          >scoped token · validated</text>
          <text
            x="315"
            y="230"
            font-size="20"
            font-weight="600"
          >Side panel</text>
          <text
            x="315"
            y="252"
            class="font-mono"
            font-size="16"
          >runs the collect · PDFs</text>

          <text
            x="143"
            y="283"
            class="font-mono"
            font-size="16"
          >products</text>
          <text
            x="441"
            y="283"
            class="font-mono"
            font-size="16"
          >items</text>

          <text
            x="17"
            y="318"
            font-size="20"
            font-weight="600"
          >Popup</text>
          <text
            x="17"
            y="340"
            class="font-mono"
            font-size="16"
          >review · copy</text>
          <text
            x="315"
            y="318"
            font-size="20"
            font-weight="600"
          >Review</text>
          <text
            x="315"
            y="340"
            class="font-mono"
            font-size="16"
          >status · pick · copy</text>

          <text
            x="17"
            y="426"
            font-size="20"
            font-weight="600"
          >Web app schedule</text>
          <text
            x="17"
            y="448"
            class="font-mono"
            font-size="16"
          >import · match</text>
          <text
            x="315"
            y="426"
            font-size="20"
            font-weight="600"
          >Review platform</text>
          <text
            x="315"
            y="448"
            class="font-mono"
            font-size="16"
          >paste · review · add</text>
        </g>

        <g
          class="font-mono"
          font-size="16"
          text-anchor="middle"
          style="fill: var(--signal)"
        >
          <text
            x="280"
            y="372"
          >copy · paste</text>
          <text
            x="280"
            y="391"
          >versioned JSON clip</text>
        </g>
      </svg>
    </CaseFigure>

    <p>
      <strong>AceClipper</strong> is a popup, a service worker and a content script. Early builds declared the script on every page and could read any URL; I narrowed the store version to injecting it only when needed, on https pages. The capture holds the URL, title, up to 10,000 characters of visible text, meta tags, JSON-LD and up to 50 image URLs, each part guarded so one failure can’t sink the rest. The API asks OpenAI for products in a fixed shape and validates the answer. Pasted into a schedule, the clip opens an import modal; the server creates the products, downloads and checks each image, and can match just the new ones.
    </p>
    <p>
      <strong>The internal extension</strong> runs everything from the side panel. Its service worker only opens the panel and holds no state, so suspension loses nothing. The panel injects a reader into the page and each readable frame; results come back in an envelope that separates a value from an error, because a frame whose code throws otherwise returns nothing. Small probes read page data and framework state in the page’s own JavaScript context, writing nothing. The reader opens tabs, dropdowns and closed sections, never a product option, a form or a link off the page. Linked PDFs are fetched without the reviewer’s cookies and read with pdf.js.
    </p>
    <p>
      Handlers know page situations, such as frames, carousels and PDFs, and profiles know data types, which let documents join swatches later. A run ends with a status: “complete” needs a count the page itself states that matches what was found, with nothing failed, cut short or unreadable.
    </p>

    <h2>Decisions</h2>

    <CaseDecision title="Keep secrets and the model on the server; give the extension a short-lived token.">
      <template #why>
        The extension is treated as an untrusted client: no model key, no service credential, no password prompt. It opens the web app’s connect page, which signs the user in, or reuses their session, gets a token from the API and sends it over. The token is user-scoped, lasts an hour by default and is limited to the extension’s scopes; the extension accepts it only from the web app’s origin and in the expected shape.
      </template>
      <template #cost>
        Connecting is a trip through a browser tab, and returning the user to their page with the popup reopened depends on Chrome’s APIs, so it’s best effort. Every capture is a server round trip.
      </template>
    </CaseDecision>

    <CaseDecision title="Collect with rules, and keep AI out of the internal tool.">
      <template #instead>
        A model reading the page, as in the public extension. The code keeps only an unused seam for an optional assist on unresolved items.
      </template>
      <template #why>
        Reviewers approve what the tool finds, so every item records where it came from, and where sources disagree the panel shows both values. Rules can be rerun on saved pages and scored against fixed answers, and only rule-based items count toward “complete.”
      </template>
      <template #cost>
        Coverage grows one page pattern at a time, each needing a generic rule, a saved page and a test; a CI check fails if the source names a test site. Against reviewers’ decisions, most remaining misses sat only in page data, behind buttons that open a dialog, on a page that hadn’t rendered, or under review rules a page can’t show.
      </template>
    </CaseDecision>

    <CaseDecision title="Freeze the ground truth, and score every change against it.">
      <template #why>
        Live pages change, so a score alone can’t tell a regression from a site update. For swatches, each example site’s truth is derived from its own verified source, spot-checked once and saved as a dated file. That eval loads the built extension into Chromium with Playwright, collects on each page, scores recall, precision, names, codes, groups and status, and reports drift apart from regressions; a false “complete” fails the run. For documents, the truth lists every file on the 11 example pages and what reviewers kept, frozen on one date, and the eval fails when a target is missed.
      </template>
      <template #cost>
        The harness is a second codebase; most of the 2.0.0 diff was harness data. Live runs still need judgment: when old and new builds ran side by side on 200 pages, every difference turned out to be a site change or a bot block, which took reruns to confirm.
      </template>
    </CaseDecision>

    <CaseDecision title="Hand off through a versioned clipboard format, and ship the reader first.">
      <template #why>
        Neither extension writes into the application. A schedule recognizes AceClipper’s clip on paste. The internal extension has no server and sends nothing; the review platform’s paste dialog matches the clip against what the product already has and saves nothing until the reviewer clicks Add. The documents format is an identical copy in both codebases, with golden tests, and the reader went live before the release that writes it.
      </template>
      <template #cost>
        What the format can’t carry doesn’t arrive. A swatch picture read from a PDF has no web address, so it pastes as a name and code. Color-only swatches were refused until I made the review platform draw them as images, and unnamed ones were dropped until the dialog asked for a name.
      </template>
    </CaseDecision>

    <h2>The pipeline it feeds</h2>
    <p>
      The internal extension feeds a review pipeline in which Python workers scrape and extract products and reviewers check them on the review platform. I later re-implemented its rules as a page scan in the server-side scraper, with no LLM, tested against the extension’s frozen truths.
    </p>
    <p>
      I also changed how those workers assign categories, measured by offline replay, not in production. Where the search wasn’t confident, products had fallen back to a generic category; now the product’s MasterFormat section (its construction-industry classification), or a set score margin, can pick one of the search’s top two candidates instead. Replayed over approved products and scored against reviewers’ final categories, more than three times as many products got a real category and the share needing a reviewer’s fix roughly halved, while the share of assigned categories that were right dipped by a few points, a deliberate trade.
    </p>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>The model failed quietly.</strong> A reported page with 16 color variants came back empty: the model listed each variant as a product, hit the output limit, and the endpoint returned an empty list. I changed the prompt to treat schema.org JSON-LD as strong evidence and fold variants into one product, raised the limit, and made a truncated answer return a clear error. I’d give the LLM path a frozen test set from day one.
    </p>
    <p>
      <strong>Untrusted input includes the model’s output.</strong> Links and images from the parse response pass through helpers that allow only web URLs (and <code>data:</code> images), so a <code>javascript:</code> link can’t run inside the extension. Production builds don’t ship source maps, and the API also drops any link from the model that isn’t http(s).
    </p>

    <h2>What transfers</h2>
    <p>
      Pulling data from pages you don’t control is a measurement problem before it’s a parsing problem: fix the answers, score every change, and make the tool say when it isn’t sure. Keep credentials and model calls behind your own API, validate what pages and models return, and integrate through a versioned contract that both sides test.
    </p>

    <h2>Outcome</h2>
    <p>
      AceClipper is public on the Chrome Web Store (version 0.1.2, updated June 25, 2026), and the web app’s navigation links architects to it.
    </p>
    <p>
      The internal extension reached version 2.0.1 in November 2026 with 1,673 unit tests. On an 11-page benchmark of the live example pages it was developed against, its documents mode found all 245 reachable files (those the page links to without a click) against a 95% target, and 96% of its suggested file types were right against a 90% target. Against reviewers’ decisions on 23 reviewed products, replayed offline after fixes, it found 117 of the 164 reviewer-approved files (71%, up from 94, or 57%) and left 22% of those files untyped, down from 41%.
    </p>
  </CaseStudy>
</template>
