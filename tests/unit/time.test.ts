import { describe, expect, it } from 'vitest'
import { describeOffset, formatClock, formatUtcOffset, zoneOffsetMinutes } from '../../app/utils/time'

// 2 Nov 2026 14:00 UTC: Europe and the US are back on standard time.
const winter = new Date(Date.UTC(2026, 10, 2, 14, 0))
// 1 Jul 2026 14:00 UTC: daylight saving time in Europe and the US.
const summer = new Date(Date.UTC(2026, 6, 1, 14, 0))

describe('zoneOffsetMinutes', () => {
  it('reads fixed and DST-aware offsets', () => {
    expect(zoneOffsetMinutes('Africa/Addis_Ababa', winter)).toBe(180)
    expect(zoneOffsetMinutes('Africa/Addis_Ababa', summer)).toBe(180)
    expect(zoneOffsetMinutes('Europe/Berlin', winter)).toBe(60)
    expect(zoneOffsetMinutes('Europe/Berlin', summer)).toBe(120)
    expect(zoneOffsetMinutes('America/New_York', winter)).toBe(-300)
    expect(zoneOffsetMinutes('Asia/Kolkata', winter)).toBe(330)
  })
})

describe('describeOffset', () => {
  it('describes the gap from the visitor’s point of view', () => {
    expect(describeOffset('Africa/Addis_Ababa', 'America/New_York', winter)).toBe('8 hours ahead of you')
    expect(describeOffset('Africa/Addis_Ababa', 'Europe/Berlin', summer)).toBe('1 hour ahead of you')
    expect(describeOffset('Africa/Addis_Ababa', 'Asia/Kolkata', winter)).toBe('2 hours 30 min behind you')
  })

  it('returns null when the offsets match', () => {
    expect(describeOffset('Africa/Addis_Ababa', 'Africa/Nairobi', winter)).toBeNull()
  })
})

describe('formatting', () => {
  it('formats a 24-hour clock and UTC offsets', () => {
    expect(formatClock('Africa/Addis_Ababa', winter)).toBe('17:00')
    expect(formatUtcOffset(180)).toBe('UTC+3')
    expect(formatUtcOffset(-270)).toBe('UTC-4:30')
  })
})
