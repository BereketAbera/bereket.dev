<template>
  <CaseStudy
    slug="modernization"
    problem="A large production web app had to cross a breaking framework upgrade while the product kept shipping, then pay down the patterns it carried over."
    part="I was one of five engineers on the upgrade, working on the projects, account, schedules, comments and notifications areas, and wrote 11 of the roughly 39 pull requests in the 2026 cleanup."
    result="The upgrade merged in November 2025 after almost eight months on its branch; my 2026 bundles typed the API client, replaced several mixins with typed composables and moved state from Vuex to Pinia, with unit tests."
  >
    <h2>The problem</h2>
    <p>
      Long-lived frontends tend to face a generational move in their framework: AngularJS to Angular, React classes to hooks, Vue 2 to Vue 3. First the application has to get across the change while the product keeps shipping. Then someone has to pay down what came across with it: patterns the new version still runs but no longer recommends, and code that works only because nothing checks it.
    </p>
    <p>
      For me that application was the main web app behind Acelab’s <ExtLink href="https://www.acelabusa.com/">Material Hub</ExtLink>, a materials platform for architects, owners and manufacturers: a Nuxt application of more than a thousand Vue files. In 2025 it moved from Nuxt 2 and Vue 2 to Nuxt 3 and Vue 3; in 2026 the frontend team worked through what the upgrade had left behind.
    </p>

    <h2>What I owned</h2>
    <p>
      I was a major contributor to both efforts and led neither.
    </p>
    <ul>
      <li>
        <strong>The upgrade, 2025.</strong> A teammate led it, starting the branch in March with a plan to convert a page or area at a time while keeping the branch in step with main. I joined in late July as one of five engineers on the branch. My areas were projects, account and sign-up, the specification tools, schedules, comments and notifications. Along the way I moved the shared inputs and the forms I touched to vee-validate 4, components to Vue 3’s v-model and event conventions, and popovers to floating-vue.
      </li>
      <li>
        <strong>The cleanup, 2026.</strong> A teammate had added TypeScript and unit tests in February. In April the cleanup ran as bundles grouped by kind of file, and I wrote 11 of the roughly 39 pull requests: typed plugins and five feature areas’ API route modules, composables converted to TypeScript, mixins replaced by composables, two pieces of state moved from Vuex to Pinia, typed layouts and an icon cleanup. In May I combined three more component bundles into one pull request.
      </li>
      <li>
        <strong>Not mine.</strong> Teammates built the API types generated from the backend’s OpenAPI schema and did the later moves to Nuxt 4 and Tailwind 4.
      </li>
    </ul>

    <h2>How it works</h2>
    <h3>The upgrade</h3>
    <p>
      The upgrade lived on its own branch for almost eight months, and main didn’t wait: more than a hundred merges landed on it in that time, and the upgrade branch took in main fifteen times, twice by my hand. Syncs had a cost; after my first one I had to fix code the merge had broken.
    </p>
    <p>
      Most of my work was getting the pages in those areas working under Vue 3 and Nuxt 3. Some of it was mechanical: the <code class="whitespace-nowrap">v-model</code> prop changed from <code>value</code> to <code>modelValue</code> and its event from <code>input</code> to <code>update:modelValue</code>, and <code>.native</code> listeners went away. The HTTP layer changed underneath too: the old client put every response body under <code>data</code>, the new one returns the body itself, so I updated the file-download handlers in one pass. Forms moved from vee-validate 3’s wrapper components to version 4’s composition API.
    </p>
    <p>
      When the branch merged, the framework was new but the patterns were not. The codebase had no TypeScript and no unit tests yet, 123 components still imported from a folder of 40 mixins, and the old Vuex store ran beside Pinia through a compatibility module.
    </p>

    <h3>The cleanup</h3>
    <p>
      The bundles went into a shared integration branch, kept in sync with staging, that merged after about two weeks. Mine followed roughly the same loop: search for references, delete what nothing uses, convert what’s live, add unit tests, then check with the type checker, lint on the changed files and the unit suite. Several also got a Playwright smoke test of the routes they touched.
    </p>
    <p>
      The header navigation shows what the bundles removed. Its menu used to pass through a mixin and a global Vuex module that another component filled. After my bundle, one chain of typed calls runs from the navigation bar to the API client, and a Pinia store loads the menu once.
    </p>

    <CaseFigure caption="The header navigation’s path to its menu when the upgrade merged (left) and after my cleanup bundle (right).">
      <svg
        viewBox="0 0 560 356"
        role="img"
        aria-labelledby="fig-modernization-title"
        aria-describedby="fig-modernization-desc"
      >
        <title id="fig-modernization-title">How the header navigation reached its data, before and after the cleanup</title>
        <desc id="fig-modernization-desc">Before: a component used fields merged in from a mixin; the mixin read the menu from a global Vuex module by string key; another component fetched the menu and wrote it into that module. After: the component declares what it uses by calling a typed composable from setup(); the composable reads a Pinia store; the store loads the menu once through a typed, tested API client.</desc>
        <defs>
          <marker
            id="fig-modernization-arrow"
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
            id="fig-modernization-arrow-signal"
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

        <!-- Lanes: before on the left, after on the right. -->
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
        >BEFORE</text>
        <text
          x="559"
          y="14"
          class="font-mono"
          font-size="14"
          letter-spacing="0.08em"
          text-anchor="end"
          fill="currentColor"
        >AFTER</text>

        <g
          stroke="currentColor"
          stroke-width="1.25"
        >
          <!-- Before: component, mixin, global store, the component that fills it. -->
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
          <rect
            x="1"
            y="204"
            width="260"
            height="60"
            style="fill: var(--paper-2)"
          />
          <rect
            x="1"
            y="292"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />
          <!-- After: component, composable, store, API client. -->
          <rect
            x="299"
            y="28"
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
          <rect
            x="299"
            y="204"
            width="260"
            height="60"
            style="fill: var(--paper-2)"
          />
          <rect
            x="299"
            y="292"
            width="260"
            height="60"
            style="fill: var(--paper)"
          />

          <!-- Before: implicit links, dashed. -->
          <path
            d="M131 116V91"
            stroke-dasharray="5 4"
            marker-end="url(#fig-modernization-arrow)"
          />
          <path
            d="M131 176V201"
            stroke-dasharray="5 4"
            marker-end="url(#fig-modernization-arrow)"
          />
          <path
            d="M131 292V267"
            stroke-dasharray="5 4"
            marker-end="url(#fig-modernization-arrow)"
          />
        </g>

        <!-- The highlighted path: one chain of typed calls. -->
        <g
          style="stroke: var(--signal)"
          stroke-width="2"
        >
          <path
            d="M429 88V113"
            marker-end="url(#fig-modernization-arrow-signal)"
          />
          <path
            d="M429 176V201"
            marker-end="url(#fig-modernization-arrow-signal)"
          />
          <path
            d="M429 264V289"
            marker-end="url(#fig-modernization-arrow-signal)"
          />
        </g>

        <g fill="currentColor">
          <text
            x="17"
            y="54"
            font-size="20"
            font-weight="600"
          >Component</text>
          <text
            x="17"
            y="76"
            class="font-mono"
            font-size="16"
          >undeclared fields</text>

          <text
            x="143"
            y="107"
            class="font-mono"
            font-size="16"
          >merged in</text>

          <text
            x="17"
            y="142"
            font-size="20"
            font-weight="600"
          >Mixin</text>
          <text
            x="17"
            y="164"
            class="font-mono"
            font-size="16"
          >untyped JavaScript</text>

          <text
            x="143"
            y="195"
            class="font-mono"
            font-size="16"
          >reads by key</text>

          <text
            x="17"
            y="230"
            font-size="20"
            font-weight="600"
          >Global Vuex module</text>
          <text
            x="17"
            y="252"
            class="font-mono"
            font-size="16"
          >one module, many jobs</text>

          <text
            x="143"
            y="283"
            class="font-mono"
            font-size="16"
          >writes</text>

          <text
            x="17"
            y="318"
            font-size="20"
            font-weight="600"
          >Another component</text>
          <text
            x="17"
            y="340"
            class="font-mono"
            font-size="16"
          >fetches the menu</text>

          <text
            x="315"
            y="54"
            font-size="20"
            font-weight="600"
          >Component</text>
          <text
            x="315"
            y="76"
            class="font-mono"
            font-size="16"
          >declares what it uses</text>

          <text
            x="315"
            y="142"
            font-size="20"
            font-weight="600"
          >Composable</text>
          <text
            x="315"
            y="164"
            class="font-mono"
            font-size="16"
          >typed return value</text>

          <text
            x="315"
            y="230"
            font-size="20"
            font-weight="600"
          >Pinia store</text>
          <text
            x="315"
            y="252"
            class="font-mono"
            font-size="16"
          >loads the menu once</text>

          <text
            x="315"
            y="318"
            font-size="20"
            font-weight="600"
          >API client</text>
          <text
            x="315"
            y="340"
            class="font-mono"
            font-size="16"
          >typed and tested</text>
        </g>

        <g
          class="font-mono"
          font-size="16"
          style="fill: var(--signal)"
        >
          <text
            x="441"
            y="107"
          >calls</text>
          <text
            x="441"
            y="195"
          >reads</text>
          <text
            x="441"
            y="283"
          >fetches</text>
        </g>
      </svg>
    </CaseFigure>

    <h2>Decisions</h2>

    <CaseDecision title="Let each shared input register itself with the form.">
      <template #why>
        The branch’s first converted forms wired every field by hand: define it, bind its value and attributes, pass its error back in. In my sample, the new-project form, I moved that into the shared text input and select, which register themselves with vee-validate under their own name. A form then declares one schema of names and rules, and each input brings its own value, error and blur handling. I applied it to login next, then to other forms, from spec templates to the admin announcement forms.
      </template>
      <template #cost>
        Two sources of a starting value can fight. My first version always handed the form one, an empty string by default, which overrode the values an edit form started with; a teammate fixed it three weeks later so an input supplies one only when given one.
      </template>
    </CaseDecision>

    <CaseDecision title="Type the API client without changing how anyone calls it.">
      <template #why>
        About 280 files called the API client, and dozens of calls still passed query parameters in the shape of the HTTP library the upgrade removed. I replaced the 470-line JavaScript plugin with a small typed plugin over a tested client that keeps that calling convention, typed the clients injected into the app so callers written in TypeScript are checked, and moved five feature areas’ route modules to TypeScript. Once a teammate added types generated from the API’s schema, I made request bodies check against them.
      </template>
      <template #cost>
        It leaves a compatibility layer for someone to remove later, with a comment saying why it exists. And types can look strict while checking nothing: my first pass at the request-body type ended in a union with <code>unknown</code>, which accepts anything. I caught it before merge.
      </template>
    </CaseDecision>

    <CaseDecision title="Swap one mixin at a time for a composable called from setup().">
      <template #why>
        A mixin merges its data and methods into a component that never declares them, so a reader can’t tell where a field comes from, and in plain JavaScript nothing checks it. A composable is an import with a typed return value, and its internals stay private: the unread-message poller keeps its timer in a local variable instead of in the component’s data. Calling it from <code>setup()</code> moved one dependency without rewriting the Options API component around it.
      </template>
      <template #cost>
        Moving code moves timing. My first version of the header change started the menu request only after two unrelated requests had finished; review caught it, and I moved it back to the start before merge. Components also stay half-migrated: the navigation bar kept two other mixins.
      </template>
    </CaseDecision>

    <CaseDecision title="Delete what a search shows unused; convert only what’s live.">
      <template #why>
        Typing and testing code nobody runs is wasted work. Unused icons, three dead mixins, a table helper and eight unused layouts went once a search showed nothing live referenced them; the live mixins, composables and stores were converted and given tests.
      </template>
      <template #cost>
        A search finds only what it looks for. One icon was used only through a string name, which a search for imports would miss. Icons used only by dead parent components were the hard case: I left them in one bundle, deleted two in the next, and one had to come back because its dead parent still imported it.
      </template>
    </CaseDecision>

    <h2>Tradeoffs and what I’d change</h2>
    <p>
      <strong>My bugs, found late.</strong> While fixing the notification panel on the upgrade branch, I left a watcher reading <code>.value</code> from a plain boolean prop, so it never saw the panel open and the load it guarded never ran. With no types or tests, nothing flagged it. It surfaced in May 2026 when I typed and tested the notification components, along with two older slips of mine: a component writing to its own prop, and a busy flag switched on and off in one call. I’d want types and tests in place before a framework switch, not after.
    </p>
    <p>
      <strong>Typed, then deleted.</strong> During the upgrade I moved the schedule table’s pagination component to Vue 3’s v-model syntax. A teammate later took pagination out of schedules, and in May 2026 I typed and tested the component in the same pull request where I noted that no page mounted it any more; I deleted it five days later. The reference search belongs before the conversion, even in a bundle whose main job is converting.
    </p>
    <p>
      <strong>Clean files, not a clean repo.</strong> The repo-wide lint had a backlog, and at times the full type check failed on an unrelated error, so my bundles were checked against the files they changed rather than the whole repo. That kept bundles moving, but a green pull request didn’t mean a green codebase.
    </p>

    <h2>What transfers</h2>
    <p>
      I’d use the same two steps for any framework move: get across the change with the old patterns still running, then remove them in small bundles, deleting before converting, until every dependency is something a reader can follow from an import. And I’d put types and tests at the boundaries before the switch, not after; the bug I shipped in the upgrade is exactly the kind a type checker catches.
    </p>

    <h2>Outcome</h2>
    <p>
      The upgrade merged on November 6, 2025, with 253 commits from five engineers. My cleanup work merged in April and May 2026: 11 bundle pull requests in the April program plus a follow-up that tightened the API types, then a combined bundle that typed three more component sets and added 36 unit tests for the notification components alone.
    </p>
  </CaseStudy>
</template>
