/** Minutes east of UTC for `timeZone` at `date` (handles DST). */
export function zoneOffsetMinutes(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find(p => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  const truncated = Math.floor(date.getTime() / 60_000) * 60_000
  return Math.round((asUtc - truncated) / 60_000)
}

/** Wall-clock time in `timeZone`, e.g. "17:05". */
export function formatClock(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date)
}

/**
 * Human description of how far `zone` is from `reference`, e.g. "8 hours ahead of you".
 * Returns null when both zones share an offset.
 */
export function describeOffset(zone: string, reference: string, date: Date): string | null {
  const diff = zoneOffsetMinutes(zone, date) - zoneOffsetMinutes(reference, date)
  if (diff === 0) return null
  const abs = Math.abs(diff)
  const hours = Math.floor(abs / 60)
  const minutes = abs % 60
  const amount = [hours && `${hours} hour${hours === 1 ? '' : 's'}`, minutes && `${minutes} min`].filter(Boolean).join(' ')
  return `${amount} ${diff > 0 ? 'ahead of' : 'behind'} you`
}

/** "UTC+3", "UTC-4:30" */
export function formatUtcOffset(minutes: number): string {
  const sign = minutes < 0 ? '-' : '+'
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`
}
