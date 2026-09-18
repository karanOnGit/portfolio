import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { addGuestbookEntry } from '@/lib/api/guestbook'
import { clientKey, rateLimit, sweep } from '@/lib/rate-limit'

/**
 * Guestbook submissions.
 *
 * Proxied through our own origin so the upstream endpoint stays private, the
 * input is validated before it is stored, and abuse can be rate-limited — none
 * of which is possible when the browser posts to the script directly.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  sweep()

  // Three signings an hour per address is generous for a guestbook and
  // tedious for a spam script.
  const limit = rateLimit(`guestbook:${clientKey(request)}`, 3, 60 * 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'You have already signed recently. Thank you!' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Honeypot: a field hidden from people but filled in by naive bots.
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  const result = await addGuestbookEntry({ name: body.name, message: body.message })
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  // The guestbook renders per request, but this keeps any cached shell honest.
  revalidatePath('/guestbook')
  return NextResponse.json({ ok: true })
}
