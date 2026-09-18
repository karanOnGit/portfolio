/**
 * lib/api/guestbook.js
 * Reads and writes the guestbook through a Google Apps Script endpoint.
 *
 * The endpoint URL lives in server env rather than client code, so the write
 * path can be rate-limited and validated before it leaves our origin.
 */

import 'server-only'
import { env } from '@/lib/env'
import { sanitizeText } from '@/lib/sanitize'

const MAX_NAME = 60
const MAX_MESSAGE = 600

function normalizeEntry(raw) {
  if (!raw || typeof raw !== 'object') return null
  const name = sanitizeText(raw.name || raw.Name || '').slice(0, MAX_NAME)
  const message = sanitizeText(raw.message || raw.Message || '').slice(0, MAX_MESSAGE)
  if (!name || !message) return null

  const timestamp = raw.timestamp || raw.Timestamp || raw.date || raw.Date || null
  return { name, message, timestamp }
}

/**
 * Always uncached: the guestbook is rendered per request so a visitor sees
 * their own entry the moment they submit it.
 */
export async function getGuestbookEntries() {
  if (!env.guestbookApi) return []

  try {
    const response = await fetch(env.guestbookApi, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`Upstream responded ${response.status}`)

    const payload = await response.json()
    const rows = Array.isArray(payload) ? payload : payload.data || []
    return rows
      .map(normalizeEntry)
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
  } catch (error) {
    console.error('[guestbook] fetch failed:', error.message)
    return []
  }
}

/** @returns {{ok: true} | {ok: false, error: string}} */
export async function addGuestbookEntry({ name, message }) {
  if (!env.guestbookApi) {
    return { ok: false, error: 'The guestbook is not configured right now.' }
  }

  const cleanName = sanitizeText(name).slice(0, MAX_NAME)
  const cleanMessage = sanitizeText(message).slice(0, MAX_MESSAGE)

  if (cleanName.length < 2) return { ok: false, error: 'Please enter your name.' }
  if (cleanMessage.length < 4) return { ok: false, error: 'Please write a short message.' }

  try {
    const response = await fetch(env.guestbookApi, {
      method: 'POST',
      // Apps Script treats text/plain as a simple request, avoiding a preflight
      // it would not answer correctly.
      headers: { 'content-type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: cleanName, message: cleanMessage }),
      cache: 'no-store',
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok || (payload.status && payload.status !== 'success')) {
      throw new Error(payload.message || `Upstream responded ${response.status}`)
    }
    return { ok: true }
  } catch (error) {
    console.error('[guestbook] submit failed:', error.message)
    return { ok: false, error: 'Could not save your message. Please try again.' }
  }
}
