/**
 * lib/rate-limit.js
 * A small fixed-window limiter held in module memory.
 *
 * Per-instance only — on a serverless platform each cold instance keeps its own
 * counters. That is enough to blunt casual abuse of the login and guestbook
 * endpoints; a shared store would be the next step if traffic warranted it.
 */

import 'server-only'

const buckets = new Map()

/**
 * @param {string} key      Caller identity, typically an IP address.
 * @param {number} limit    Requests allowed per window.
 * @param {number} windowMs Window length in milliseconds.
 * @returns {{allowed: boolean, remaining: number, retryAfter: number}}
 */
export function rateLimit(key, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfter: 0 }
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    }
  }

  return { allowed: true, remaining: limit - bucket.count, retryAfter: 0 }
}

/** Best-effort client address from proxy headers. */
export function clientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

/** Drops expired buckets so the map cannot grow without bound. */
export function sweep() {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key)
  }
}
