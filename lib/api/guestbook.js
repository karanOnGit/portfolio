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
  const name = sanitizeText(raw.name || raw.Name || raw.author || raw.Author || '').slice(0, MAX_NAME)
  const message = sanitizeText(raw.message || raw.Message || raw.comment || raw.Comment || raw.note || raw.Note || '').slice(0, MAX_MESSAGE)
  if (!name || !message) return null

  const timestamp = raw.timestamp || raw.Timestamp || raw.date || raw.Date || raw.created_at || raw.createdAt || null
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
      headers: { accept: 'application/json, text/plain, */*' },
      cache: 'no-store',
      redirect: 'follow',
    })
    if (!response.ok) throw new Error(`Upstream responded ${response.status}`)

    const text = await response.text()
    if (!text || text.trim().startsWith('<')) {
      // Returned an HTML error page or empty response
      console.warn('[guestbook] upstream returned non-JSON/HTML page')
      return []
    }

    let payload
    try {
      payload = JSON.parse(text)
    } catch {
      console.warn('[guestbook] unable to parse response as JSON')
      return []
    }

    const rows = Array.isArray(payload)
      ? payload
      : payload.data || payload.rows || payload.entries || payload.values || []

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
  // Validate first, so a visitor always gets the message that actually
  // describes their input rather than one about our configuration.
  const cleanName = sanitizeText(name).slice(0, MAX_NAME)
  const cleanMessage = sanitizeText(message).slice(0, MAX_MESSAGE)

  if (cleanName.length < 2) return { ok: false, error: 'Please enter your name.' }
  if (cleanMessage.length < 4) return { ok: false, error: 'Please write a short message.' }

  if (!env.guestbookApi) {
    return { ok: false, error: 'The guestbook backend is awaiting the new spreadsheet key.' }
  }

  try {
    const bodyPayload = JSON.stringify({
      name: cleanName,
      message: cleanMessage,
      timestamp: new Date().toISOString(),
    })

    const response = await fetch(env.guestbookApi, {
      method: 'POST',
      headers: {
        'content-type': 'text/plain;charset=utf-8',
        accept: 'application/json, text/plain, */*',
      },
      body: bodyPayload,
      cache: 'no-store',
      redirect: 'follow',
    })

    const text = await response.text()
    let payload = {}
    try {
      payload = JSON.parse(text)
    } catch {
      // If the response is plain text containing 'success' or HTTP 200, accept it
      if (response.ok && (text.toLowerCase().includes('success') || text.trim() === 'ok')) {
        return { ok: true }
      }
    }

    if (!response.ok || (payload.status && payload.status !== 'success')) {
      throw new Error(payload.message || payload.error || `Upstream responded ${response.status}`)
    }
    return { ok: true }
  } catch (error) {
    console.error('[guestbook] submit failed:', error.message)
    return { ok: false, error: 'Could not save your message. Please verify the spreadsheet connection.' }
  }
}
