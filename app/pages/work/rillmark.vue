<script setup lang="ts">
import { findWork } from '~/data/work'

const shots = findWork('rillmark').shots
</script>

<template>
  <CaseStudy
    slug="rillmark"
    problem="A component library has to work when someone installs it, not only in its own demo site, and it should not need a theming layer just to look different."
    part="Built with AI coding agents under my direction. They did the implementation, and the package is published under my npm account."
    result="Published on npm as version 0.2.0, with a live documentation site and five example apps. I know of no projects using it yet."
  >
    <h2>What is in it</h2>
    <p>
      48 React 19 components. 26 of them import Radix primitives directly, most of them for focus, keyboard and positioning behavior. The rest are native HTML or small pieces of logic, such as a form field that wires up labels and errors for eleven controls. The combobox adds its own listbox logic on top of a Radix Popover. It started as a shadcn-style component registry and moved to a normal npm package in its first days. Token names and most component part names still follow shadcn's conventions; the values, shapes and motion are specific to Rillmark.
    </p>

    <ShotFigure
      v-if="shots[0]"
      :shot="shots[0]"
      sizes="(width >= 64rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>What the design trades off</h2>
    <p>
      Agents made these choices while building it.
    </p>

    <CaseDecision title="Two HTML attributes instead of a theme provider.">
      <template #why>
        One tokens file generates CSS for three presets in light and dark. Setting data-rillmark-preset and data-rillmark-mode on the html element switches everything, with no JavaScript and before hydration. Portalled overlays inherit it automatically.
      </template>
      <template #cost>
        Nested themes are not supported.
      </template>
    </CaseDecision>

    <CaseDecision title="Publish the exact tarball that was tested.">
      <template #why>
        A script packs the library, installs the tarball in a fresh app, checks strict TypeScript, imports all 48 entry points and tests both stylesheet paths in a real browser. Version 0.2.0 was tested this way before it was published, and its hash matches the tested tarball.
      </template>
      <template #cost>
        A manual release step, and the fresh-app test covers only React with Vite.
      </template>
    </CaseDecision>

    <CaseDecision title="Generate the documentation from the source.">
      <template #why>
        API tables, per-component pages and an llms.txt file come from the TypeScript source, and a check fails when the generated output drifts. Coding agents get a small entry point and fetch only the pages they need.
      </template>
      <template #cost>
        Generated files live in the repository, and descriptions still need hand editing.
      </template>
    </CaseDecision>

    <ShotFigure
      v-if="shots[1]"
      :shot="shots[1]"
      sizes="(width >= 64rem) 44rem, 100vw"
      class="case-shot"
    />

    <h2>What the checks cover</h2>
    <p>
      Agents wrote and ran these checks. The counts are the project's own record.
    </p>
    <ul>
      <li>45 unit tests and 42 browser tests in headed Chromium, including keyboard paths and focus return.</li>
      <li>axe scans of all 48 component pages in all six palettes.</li>
      <li>72 color contrast assertions across the palettes.</li>
      <li>Reduced motion, checked in the browser.</li>
      <li>The test suites also pass in GitHub Actions.</li>
    </ul>
    <p>
      Not covered: Safari, Firefox, real touch devices and screen readers. The automated checks do not establish full accessibility conformance. The example apps run in the browser with sample data and have no backend.
    </p>
  </CaseStudy>
</template>

<style scoped>
.case-shot {
  max-width: 44rem;
  margin-block: 2.5rem !important;
}
</style>
