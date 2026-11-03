<script setup lang="ts">
/**
 * A small rebuild of the response-grid patterns from the workflow case study, written
 * for this site with made-up data: keyboard movement, type-to-edit, per-cell autosave
 * over a deliberately unreliable fake network, undo and redo, and a filter.
 * The point it demonstrates: a save that returns after a newer edit must not win.
 */
defineProps<{ compact?: boolean }>()

interface Column { key: 'finish' | 'color' | 'lead', label: string, numeric?: boolean }
interface Row { id: string, tag: string, product: string }
interface Change { key: string, before: string, after: string }
interface Entry { id: number, text: string, tone: 'plain' | 'good' | 'bad' }

const columns: Column[] = [
  { key: 'finish', label: 'Finish' },
  { key: 'color', label: 'Color' },
  { key: 'lead', label: 'Lead time (weeks)', numeric: true },
]

const rows: Row[] = [
  { id: 'pt1', tag: 'PT1', product: 'Porcelain field tile' },
  { id: 'act2', tag: 'ACT2', product: 'Acoustic ceiling panel' },
  { id: 'qz1', tag: 'QZ1', product: 'Quartz countertop' },
  { id: 'wv3', tag: 'WV3', product: 'Wood veneer wall panel' },
  { id: 'cpt1', tag: 'CPT1', product: 'Carpet tile' },
]

const seed: Record<string, string> = {
  'pt1:finish': 'Matte', 'pt1:lead': '6',
  'act2:color': 'White',
  'qz1:finish': 'Polished', 'qz1:lead': '8',
  'wv3:color': 'Natural oak',
  'cpt1:finish': 'Loop pile', 'cpt1:color': 'Graphite', 'cpt1:lead': '4',
}

const cellKey = (row: Row, col: Column) => `${row.id}:${col.key}`

/** What the screen shows, what the fake server last confirmed, and saves still in flight. */
const values = reactive<Record<string, string>>({ ...seed })
const saved = reactive<Record<string, string>>({ ...seed })
const inFlight = reactive<Record<string, number>>({})

const guard = ref(true)
const query = ref('')
const active = ref({ row: 0, col: 0 })
const editing = ref(false)
const draft = ref('')
const log = ref<Entry[]>([])
const undoStack: Change[] = []
const redoStack: Change[] = []
const canUndo = ref(false)
const canRedo = ref(false)
/** The scripted walkthrough: its caption, the cell it plays on, and a token Reset can cancel. */
const story = ref('')
const spotlight = ref<string | null>(null)
const running = ref(false)
let runs = 0

const grid = useTemplateRef<HTMLTableElement>('grid')
const editor = useTemplateRef<HTMLInputElement[]>('editor')

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return rows
  return rows.filter(row => [row.tag, row.product, ...columns.map(col => values[cellKey(row, col)] ?? '')]
    .some(text => text.toLowerCase().includes(q)))
})

watch(visible, (list) => {
  if (active.value.row >= list.length) active.value = { row: Math.max(0, list.length - 1), col: active.value.col }
})

const labelOf = (row: Row, col: Column) => `${col.label.replace(/ \(.*\)$/, '')} for ${row.tag}`

function note(text: string, tone: Entry['tone'] = 'plain') {
  log.value = [{ id: Date.now() + Math.random(), text, tone }, ...log.value].slice(0, 4)
}

// The first save to an idle cell is slow; a save sent while another for the same cell is
// still out is fast. So two quick edits to one cell always come back in the wrong order,
// which is the case worth seeing. Reset bumps the epoch, so saves sent before it are dropped.
let requests = 0
let epoch = 0
function save(key: string, value: string, label: string, latency?: number) {
  const id = ++requests
  const sentIn = epoch
  const delay = latency ?? ((inFlight[key] ?? 0) > 0 ? 350 : 1500)
  inFlight[key] = (inFlight[key] ?? 0) + 1
  note(`Save ${id} sent: ${label} = “${value || 'empty'}”`)
  setTimeout(() => {
    if (sentIn !== epoch) return
    inFlight[key] = Math.max(0, (inFlight[key] ?? 1) - 1)
    if (values[key] === value) {
      saved[key] = value
      note(`Save ${id} confirmed`, 'good')
    }
    else if (guard.value) {
      note(`Save ${id} came back after a newer edit, so it was ignored`, 'good')
    }
    else {
      // The naive version treats every response as the truth and repaints the cell.
      values[key] = value
      saved[key] = value
      note(`Save ${id} came back late and overwrote the newer edit`, 'bad')
    }
  }, delay)
}

function write(row: Row, col: Column, value: string, record = true, latency?: number) {
  const key = cellKey(row, col)
  const before = values[key] ?? ''
  const after = col.numeric ? value.replace(/\D/g, '').slice(0, 3) : value.trim().slice(0, 40)
  if (after === before) return
  values[key] = after
  if (record) {
    undoStack.push({ key, before, after })
    redoStack.length = 0
    syncHistory()
  }
  save(key, after, labelOf(row, col), latency)
}

const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Plays the case worth seeing without asking the visitor to race the network: two edits
// to one cell, the second sent while the first save is still out, so the saves return in
// the wrong order. It sets its own, slower latencies so each caption stays up long enough
// to read: the first save takes 5 s, the second, sent 2 s later, 0.7 s.
async function showConflict() {
  if (running.value) return
  const run = ++runs
  const row = rows[0]
  const col = columns[0]
  if (!row || !col) return
  const key = cellKey(row, col)
  running.value = true
  // A save the visitor started on this cell would land mid-story; let it finish first.
  while ((inFlight[key] ?? 0) > 0) {
    await pause(100)
    if (run !== runs) return
  }
  query.value = ''
  editing.value = false
  active.value = { row: 0, col: 0 }
  spotlight.value = key
  // Start from the seeded value so both edits register as changes.
  values[key] = seed[key] ?? ''
  saved[key] = seed[key] ?? ''
  const steps: Array<[number, () => void]> = [
    [0, () => {
      write(row, col, 'Satin', true, 5000)
      story.value = `1. You type “Satin” into ${labelOf(row, col)}. Its save goes out and is slow.`
    }],
    [2000, () => {
      write(row, col, 'Gloss', true, 700)
      story.value = '2. Before it returns, you change your mind: “Gloss”. That save is fast.'
    }],
    [900, () => {
      story.value = '3. The newer save comes back first and is confirmed. The older one is still out…'
    }],
    [2300, () => {
      story.value = guard.value
        ? '4. The older save finally returns. Its value no longer matches the cell, so it’s ignored: the cell keeps “Gloss”, the last thing you typed.'
        : '4. The older save finally returns and is treated as the truth, so the cell flips back to “Satin”: your newer edit is lost. That’s the bug the guard prevents.'
    }],
  ]
  for (const [wait, step] of steps) {
    await pause(wait)
    if (run !== runs) return
    step()
  }
  running.value = false
  spotlight.value = null
}

function syncHistory() {
  canUndo.value = undoStack.length > 0
  canRedo.value = redoStack.length > 0
}

function replay(from: Change[], to: Change[], pick: (change: Change) => string) {
  const change = from.pop()
  if (!change) return
  to.push(change)
  syncHistory()
  // The pressed button is disabled once its stack empties; keep keyboard focus in the grid.
  if (!from.length && document.activeElement?.tagName === 'BUTTON') focusActive()
  const [rowId, colKey] = change.key.split(':')
  const row = rows.find(r => r.id === rowId)
  const col = columns.find(c => c.key === colKey)
  if (row && col) write(row, col, pick(change), false)
}
const undo = () => replay(undoStack, redoStack, change => change.before)
const redo = () => replay(redoStack, undoStack, change => change.after)

function focusActive() {
  nextTick(() => {
    const cell = grid.value?.querySelector<HTMLElement>(`[data-cell="${active.value.row}-${active.value.col}"]`)
    if (editing.value) editor.value?.[0]?.focus()
    else cell?.focus()
  })
}

function move(row: number, col: number) {
  active.value = {
    row: Math.min(Math.max(row, 0), visible.value.length - 1),
    col: Math.min(Math.max(col, 0), columns.length - 1),
  }
  focusActive()
}

function startEdit(initial?: string) {
  const row = visible.value[active.value.row]
  const col = columns[active.value.col]
  if (!row || !col) return
  draft.value = initial ?? values[cellKey(row, col)] ?? ''
  editing.value = true
  focusActive()
}

function commit(then?: () => void) {
  if (!editing.value) return
  const row = visible.value[active.value.row]
  const col = columns[active.value.col]
  editing.value = false
  if (row && col) write(row, col, draft.value)
  if (then) then()
  else focusActive()
}

function cancel() {
  editing.value = false
  focusActive()
}

function onCellKeydown(event: KeyboardEvent) {
  if (editing.value) return
  const { row, col } = active.value
  const mod = event.metaKey || event.ctrlKey
  if (mod && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    if (event.shiftKey) redo()
    else undo()
    return
  }
  if (mod && event.key.toLowerCase() === 'y') {
    event.preventDefault()
    redo()
    return
  }
  const moves: Record<string, [number, number]> = {
    ArrowUp: [row - 1, col], ArrowDown: [row + 1, col], ArrowLeft: [row, col - 1], ArrowRight: [row, col + 1],
    Home: [row, 0], End: [row, columns.length - 1],
  }
  const target = moves[event.key]
  if (target) {
    event.preventDefault()
    move(...target)
  }
  else if (event.key === 'Enter' || event.key === 'F2') {
    event.preventDefault()
    startEdit()
  }
  else if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault()
    const r = visible.value[row]
    const c = columns[col]
    if (r && c) write(r, c, '')
  }
  else if (event.key.length === 1 && !mod && !event.altKey) {
    // Type-to-edit: the first key replaces the value, as in a spreadsheet.
    event.preventDefault()
    startEdit(event.key)
  }
}

function onEditorKeydown(event: KeyboardEvent) {
  // The cell's own handler would otherwise see this key after the edit has closed.
  event.stopPropagation()
  if (event.key === 'Enter') {
    event.preventDefault()
    commit(() => move(active.value.row + 1, active.value.col))
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
  }
  else if (event.key === 'Tab') {
    const next = active.value.col + (event.shiftKey ? -1 : 1)
    if (next >= 0 && next < columns.length) {
      event.preventDefault()
      commit(() => move(active.value.row, next))
    }
    else {
      commit(() => {})
    }
  }
}

// A second click or tap on the selected cell edits it, so touch screens can edit
// without a keyboard. "Selected" means it already had focus before this press.
let armed = false
function onCellPointerdown(row: number, col: number) {
  const cell = grid.value?.querySelector(`[data-cell="${row}-${col}"]`)
  armed = !editing.value && cell !== null && document.activeElement === cell
}

function onCellClick(row: number, col: number) {
  if (editing.value && active.value.row === row && active.value.col === col) return
  active.value = { row, col }
  if (armed) startEdit()
  else focusActive()
  armed = false
}

function state(row: Row, col: Column) {
  const key = cellKey(row, col)
  if ((inFlight[key] ?? 0) > 0) return 'saving'
  return values[key] === saved[key] ? 'saved' : 'unsaved'
}

function reset() {
  runs++
  running.value = false
  spotlight.value = null
  story.value = ''
  epoch++
  for (const key of Object.keys(inFlight)) inFlight[key] = 0
  for (const key of new Set([...Object.keys(values), ...Object.keys(seed)])) {
    values[key] = seed[key] ?? ''
    saved[key] = seed[key] ?? ''
  }
  undoStack.length = 0
  redoStack.length = 0
  syncHistory()
  query.value = ''
  editing.value = false
  log.value = []
  note('Reset to the starting values')
}
</script>

<template>
  <figure
    class="grid-demo"
    :class="{ compact }"
  >
    <div class="frame">
      <div class="bar">
        <p class="label">
          Interactive rebuild · made-up data
        </p>
        <div class="tools">
          <button
            type="button"
            class="primary"
            :aria-disabled="running"
            @click="showConflict"
          >
            Show conflicting saves
          </button>
          <label class="filter">
            <span class="visually-hidden">Filter products</span>
            <input
              v-model="query"
              type="search"
              placeholder="Filter"
              autocomplete="off"
              spellcheck="false"
            >
          </label>
          <button
            type="button"
            :disabled="!canUndo"
            @click="undo"
          >
            Undo
          </button>
          <button
            type="button"
            :disabled="!canRedo"
            @click="redo"
          >
            Redo
          </button>
        </div>
      </div>

      <div class="scroller">
        <table
          ref="grid"
          role="grid"
          aria-label="Product response grid, editable"
          :aria-rowcount="visible.length + 1"
        >
          <thead>
            <tr>
              <th scope="col">
                Product
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                scope="col"
                :class="{ num: col.numeric }"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, r) in visible"
              :key="row.id"
            >
              <th scope="row">
                <span class="tag">{{ row.tag }}</span> {{ row.product }}
              </th>
              <td
                v-for="(col, c) in columns"
                :key="col.key"
                role="gridcell"
                :data-cell="`${r}-${c}`"
                :data-state="state(row, col)"
                :tabindex="active.row === r && active.col === c && !editing ? 0 : -1"
                :aria-selected="active.row === r && active.col === c"
                :class="{ num: col.numeric, active: active.row === r && active.col === c, spotlight: spotlight === cellKey(row, col) }"
                @keydown="onCellKeydown"
                @pointerdown="onCellPointerdown(r, c)"
                @click="onCellClick(r, c)"
                @dblclick="startEdit()"
              >
                <input
                  v-if="editing && active.row === r && active.col === c"
                  ref="editor"
                  v-model="draft"
                  :aria-label="labelOf(row, col)"
                  :inputmode="col.numeric ? 'numeric' : 'text'"
                  autocomplete="off"
                  spellcheck="false"
                  @keydown="onEditorKeydown"
                  @blur="commit(() => {})"
                >
                <template v-else>
                  <span :class="{ empty: !values[cellKey(row, col)] }">{{ values[cellKey(row, col)] || '—' }}</span>
                  <span
                    class="dot"
                    aria-hidden="true"
                  />
                  <span
                    v-if="state(row, col) === 'saving'"
                    class="visually-hidden"
                  >, saving</span>
                </template>
              </td>
            </tr>
            <tr v-if="!visible.length">
              <td
                :colspan="columns.length + 1"
                class="none"
              >
                No products match “{{ query }}”.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        class="story"
        :class="{ empty: !story }"
        aria-live="polite"
      >
        {{ story || 'Press “Show conflicting saves” to watch two edits race, or edit any cell yourself.' }}
      </p>
      <div class="foot">
        <label class="guard">
          <input
            v-model="guard"
            type="checkbox"
          >
          <span>Ignore saves that return after a newer edit</span>
        </label>
        <button
          type="button"
          class="reset"
          @click="reset"
        >
          Reset
        </button>
      </div>
      <div
        class="log data"
        role="log"
        aria-label="Save activity"
        aria-live="off"
      >
        <ol>
        <li
          v-for="entry in log"
          :key="entry.id"
          :class="entry.tone"
        >
          {{ entry.text }}
        </li>
        <li
          v-if="!log.length"
          class="hint"
        >
          Each save appears here as it’s sent and as it returns.
        </li>
        </ol>
      </div>
    </div>
    <figcaption>
      <slot>
        “Show conflicting saves” plays the race for you. To try it by hand, click a cell or use the arrow keys; type to replace a value, Enter to save, Escape to cancel, {{ '⌘/Ctrl' }}+Z to undo. Each cell saves on its own over a deliberately unreliable fake network. Untick the box to see the bug the guard prevents. On a touch screen, tap a selected cell again to edit it. Undo and redo come from my product-schedule work, not the response grid. Built for this site with made-up data; not Acelab’s code or design.
      </slot>
    </figcaption>
  </figure>
</template>

<style scoped>
.grid-demo {
  margin-block: 2.75rem;
  max-width: 44rem;
}
.grid-demo.compact {
  margin-block: 0;
  max-width: none;
}
.frame {
  border: 1px solid var(--hair);
  background: var(--paper);
  font-size: 0.9375rem;
  line-height: 1.4;
}
.bar,
.foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding: 0.6rem 0.75rem;
}
.bar {
  border-bottom: 1px solid var(--hair);
}
.foot {
  border-top: 1px solid var(--hair);
}
.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.primary {
  white-space: nowrap;
}
.filter input {
  width: 7.5rem;
  min-height: 2.25rem;
  border: 1px solid var(--hair);
  background: var(--paper);
  padding: 0 0.6rem;
  font: inherit;
}
button {
  min-height: 2.25rem;
  border: 1px solid var(--ink);
  padding: 0 0.75rem;
  font: inherit;
  cursor: pointer;
}
button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}
button.primary[aria-disabled="true"] {
  background: transparent;
  color: var(--muted);
  cursor: progress;
}
button:disabled {
  border-color: var(--hair);
  color: var(--muted);
  cursor: default;
}
.reset {
  border-color: var(--hair);
}
.scroller {
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 34rem;
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid var(--hair);
  padding: 0;
  text-align: left;
  vertical-align: middle;
}
thead th {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--muted);
  padding: 0.5rem 0.75rem;
  background: var(--paper-2);
}
tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
  background: var(--paper);
  font-weight: 400;
  padding: 0.55rem 0.75rem;
  white-space: nowrap;
  border-right: 1px solid var(--hair);
}
.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  margin-right: 0.25rem;
}
td {
  position: relative;
  height: 2.6rem;
  padding: 0 1.4rem 0 0.75rem;
  cursor: cell;
  border-left: 1px solid var(--hair);
}
td.num,
th.num {
  text-align: right;
}
td.num {
  font-family: var(--font-mono);
}
td.active {
  outline: 1px solid var(--hair);
  outline-offset: -1px;
}
table:focus-within td.active {
  outline: 2px solid var(--signal);
  outline-offset: -2px;
}
td:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: -2px;
}
td input {
  width: 100%;
  min-width: 0;
  height: 2.6rem;
  border: 0;
  background: transparent;
  font: inherit;
  text-align: inherit;
  outline: none;
}
.empty {
  color: var(--muted);
}
td.spotlight {
  background: var(--signal-soft);
}
.story {
  margin: 0;
  padding: 0.7rem 0.75rem;
  border-top: 1px solid var(--hair);
  min-height: 3.6rem;
  line-height: 1.45;
}
.story.empty {
  color: var(--muted);
}
.dot {
  position: absolute;
  top: 50%;
  right: 0.55rem;
  width: 0.4rem;
  height: 0.4rem;
  margin-top: -0.2rem;
  border-radius: 50%;
}
td[data-state="saving"] .dot {
  border: 1px solid var(--signal);
  animation: pulse 0.9s ease-in-out infinite alternate;
}
td[data-state="unsaved"] .dot {
  background: var(--signal);
}
@keyframes pulse {
  to { opacity: 0.25; }
}
@media (prefers-reduced-motion: reduce) {
  td[data-state="saving"] .dot {
    animation: none;
  }
}
.none {
  padding: 1rem 0.75rem;
  color: var(--muted);
}
.guard {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.guard input {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: var(--signal);
}
/* Bigger targets where the pointer is a finger. */
@media (pointer: coarse) {
  button,
  .filter input {
    min-height: 2.75rem;
  }
  .guard {
    min-height: 2.75rem;
  }
  .guard input {
    width: 1.4rem;
    height: 1.4rem;
  }
}
.log {
  padding: 0.55rem 0.75rem 0.7rem;
  border-top: 1px solid var(--hair);
  font-size: 0.78rem;
  line-height: 1.5;
  min-height: 5.6rem;
  color: var(--muted);
}
.log ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
.log .good {
  color: var(--ink);
}
.log .bad {
  color: var(--signal);
}
figcaption {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--muted);
  text-wrap: pretty;
}
</style>
