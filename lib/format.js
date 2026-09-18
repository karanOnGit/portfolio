/**
 * lib/format.js
 * Presentation helpers shared by server components and client islands.
 */

/**
 * The upstream API serialises list fields as Python repr strings, e.g.
 * "['#SeatCovers', '#CarAccessories']". Accept that, real arrays, and
 * comma-separated strings, and always return a clean array.
 */
export function toList(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean)

  const raw = String(value).trim()
  if (!raw) return []

  if (raw.startsWith('[') && raw.endsWith(']')) {
    const inner = raw.slice(1, -1)
    return inner
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

/** ISO-ish timestamp → "15 Sep 2026". Returns '' for unusable input. */
export function formatDate(value, { month = 'short' } = {}) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month,
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** Machine-readable date for <time dateTime>. */
export function isoDate(value) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

/** Rough reading time from an HTML body, at 220 words per minute. */
export function readingTime(html = '') {
  const words = String(html)
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

/** Strip tags and clamp, for card excerpts and meta descriptions. */
export function excerpt(html = '', limit = 180) {
  const text = String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= limit) return text
  return `${text.slice(0, text.lastIndexOf(' ', limit)).trim()}…`
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
