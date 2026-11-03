<template>
  <CaseStudy
    slug="modernization"
    problem="A large production web app had to cross a breaking framework upgrade while the product kept shipping, then pay down the old patterns it carried across."
    part="I was a major contributor to the Nuxt 3 upgrade, which a teammate led, and to the cleanup that followed; my upgrade areas were projects, account, schedules, comments and notifications."
    result="The product kept shipping through the move to Nuxt 3 and Vue 3, merged in November 2025; my April–May 2026 cleanup typed the API client and replaced several mixins with typed composables, with unit tests."
  >
    <h2>The problem</h2>
    <p>
      The main web app behind Acelab’s <ExtLink href="https://www.acelabusa.com/">Material Hub</ExtLink>, a materials platform for architects, owners and manufacturers, is a Nuxt application of more than a thousand Vue files. In 2025 it had to move from Nuxt 2 and Vue 2 to Nuxt 3 and Vue 3 while the product kept shipping.
    </p>
    <p>
      Crossing was only half the job. When the upgrade merged, the framework was new but the patterns were not: no TypeScript, no unit tests, components pulling fields from mixins, and the old Vuex store running beside Pinia.
    </p>

    <h2>What I built</h2>
    <h3>The upgrade, 2025</h3>
    <p>
      A teammate led the upgrade on its own branch, converting a page or area at a time while main kept moving. I joined in late July as one of five engineers on it. My areas were projects, account and sign-up, the specification tools, schedules, comments and notifications, and most of my work was getting their pages working under Vue 3 and Nuxt 3.
    </p>
    <p>
      Some of that was mechanical, like Vue 3’s <code class="whitespace-nowrap">v-model</code> and event conventions. Forms took more thought. I moved the shared inputs and the forms I touched from vee-validate 3’s wrapper components to version 4’s composition API, and popovers to floating-vue.
    </p>

    <h3>The cleanup, 2026</h3>
    <p>
      After a teammate added TypeScript and unit tests, the frontend team ran the cleanup as bundles grouped by kind of file. Mine typed plugins and the API route modules of five feature areas, replaced several mixins with composables and moved two pieces of state from Vuex to Pinia. In May I typed and tested three more component sets, including notifications.
    </p>
    <p>
      My bundles followed roughly the same loop: search for references, delete what nothing uses, convert what’s live, add unit tests, then run the type checker, lint on the changed files and the unit suite.
    </p>
    <p>
      The header navigation shows the difference: its menu used to pass through a mixin and a global Vuex module that another component filled. After my bundle, one chain of typed calls runs from the navigation bar to the API client, and a Pinia store loads the menu once.
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
        The first converted forms wired every field by hand: define it, bind its value, pass its error back. Starting with the new-project form, I moved that wiring into the shared text input and select, which register with vee-validate under their own name, then applied it to login and other forms. A form now declares one schema; each input brings its own value, error and blur handling.
      </template>
      <template #cost>
        My first version always handed the form an empty string as a starting value, which overrode an edit form’s starting values; a teammate later changed it so an input supplies one only when given one.
      </template>
    </CaseDecision>

    <CaseDecision title="Type the API client without changing how anyone calls it.">
      <template #why>
        About 280 files called the API client, and dozens of calls still passed query parameters shaped for the HTTP library the upgrade removed. I replaced the JavaScript plugin with a small typed one over a tested client that keeps that convention, so callers written in TypeScript are checked. Once a teammate added types generated from the API’s schema, I made request bodies check against them.
      </template>
      <template #cost>
        It leaves a compatibility layer to remove later, with a comment saying why. And types can look strict while checking nothing: my first request-body type ended in a union with <code>unknown</code>, which accepts anything. I caught it before merge.
      </template>
    </CaseDecision>

    <CaseDecision title="Swap one mixin at a time for a composable called from setup().">
      <template #why>
        A mixin merges fields into a component that never declares them, so a reader can’t tell where they come from, and plain JavaScript checks nothing. A composable is a typed import with private internals. Calling it from <code>setup()</code> moves one dependency without rewriting the Options API component around it.
      </template>
      <template #cost>
        Moving code moves timing: my first header change started the menu request only after two unrelated requests had finished, which review caught before merge. Components also stay half-migrated; the navigation bar kept two other mixins.
      </template>
    </CaseDecision>

    <h2>What I’d change</h2>
    <p>
      I’d put types and tests in place before a framework switch, not after. While fixing the notification panel on the upgrade branch, I left a watcher reading <code>.value</code> from a plain boolean prop, so the load it guarded never ran. With no types or tests, nothing flagged it until May 2026, when I typed and tested the notification components and found two older slips of mine as well: a component writing to its own prop, and a busy flag switched on and off in one call.
    </p>

    <h2>Outcome</h2>
    <p>
      The upgrade merged on November 6, 2025, after almost eight months on its branch, while the product kept shipping. My cleanup merged in April and May 2026: a typed API client, several mixins replaced by typed composables and two pieces of state moved to Pinia, with unit tests. Some components stay half-migrated. For any framework move I’d repeat the two steps: cross with the old patterns running, then remove them in small bundles, deleting before converting.
    </p>
  </CaseStudy>
</template>
