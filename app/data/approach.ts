import type { Approach } from './types'

/**
 * The five things I bring to a team, in the order they happen on a project.
 * Every example must trace to the evidence file and appear on a linked case study;
 * tests/unit/content.test.ts checks that each evidence link points at something that exists.
 */
export const approach: Approach[] = [
  {
    id: 'plan',
    title: 'Turn ambiguity into a plan',
    summary: 'I pin down the workflow, the edge cases and what “done” means, then split the work into ordered, stacked pieces.',
    examples: [
      'Led the frontend of a request-for-information feature from its product spec to a five-step send wizard and a response workspace. Before it merged, I audited it against the spec, traced each requirement to the code, and within two days fixed most of the missed criteria in paired frontend and API changes, deferring the rest in writing.',
      'Planned a catalog-search feature as ten stacked pull requests, each with a narrow scope.',
    ],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Data interfaces', work: 'data-interfaces' },
    ],
  },
  {
    id: 'design',
    title: 'Design the interface and the architecture behind it',
    summary: 'Interfaces that behave the way people expect, built on components with clear contracts and state in one obvious place, so the next feature is easier than the last.',
    examples: [
      'A response grid that behaves like the spreadsheet it writes into: a real table with a sticky header, an editor for each data type, arrow-key movement and type-to-edit.',
      'Undo and redo, how cell edits save, and most of view sharing for a spreadsheet-style product schedule.',
      'Converted mixins to typed composables and Vuex stores to Pinia as part of a team cleanup of a large Vue application.',
    ],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Data interfaces', work: 'data-interfaces' },
      { label: 'Modernization', work: 'modernization' },
    ],
  },
  {
    id: 'build',
    title: 'Build reliable applications and integrations',
    summary: 'Validated input, explicit permissions, and events published after the database commit.',
    examples: [
      'A transactional cancel that notifies other users only after the commit, over live channels authorized by the same access rules as the API.',
      'Short-lived, narrowly scoped tokens handed from a web app to a browser extension, and server-side product parsing with an LLM whose output is treated as untrusted.',
      'Fail-closed server-side authorization for a workflow shared between companies.',
    ],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Browser extensions', work: 'browser-extensions' },
    ],
  },
  {
    id: 'tradeoffs',
    title: 'Make the tradeoff visible',
    summary: 'I say what an option costs as well as what it buys, and I choose the boring option when it is the right one.',
    examples: [
      'Moved a feature-flag check into server rendering, then removed it a day later: it put a blocking call in front of every signed-in page for almost no measured gain.',
      'Paged, sorted and filtered on the server, and left one column unsortable rather than ship a sort that behaves differently on each page.',
      'An offline replay of a category-assignment change: more than three times as many products got a real category, while the share of correct categories dipped a few points. A deliberate trade of a little precision for much more coverage.',
    ],
    evidence: [
      { label: 'Workflow engineering', work: 'workflow-engineering' },
      { label: 'Browser extensions', work: 'browser-extensions' },
    ],
  },
  {
    id: 'own',
    title: 'Own it after the merge',
    summary: 'Tests ship with the feature, large features ship dark behind a flag, and I stay with a change through the fixes it turns up after release.',
    examples: [
      'Finished a teammate’s threaded-comments feature, fixed its bugs in batches and removed its feature flag for general release.',
      'Followed a cancel feature’s long tail after release: paging that skipped a row once rows could vanish, readers left on a thread that no longer existed, and a resend that created nothing until its idempotency key rotated on cancel.',
    ],
    evidence: [
      { label: 'Real-time sync', work: 'realtime-sync' },
      { label: 'Workflow engineering', work: 'workflow-engineering' },
    ],
  },
]
