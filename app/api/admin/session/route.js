import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken, isAuthor, sessionCookieOptions, verifyPassphrase } from '@/lib/auth'
import { clientKey, rateLimit, sweep } from '@/lib/rate-limit'
import { ADMIN_COOKIE } from '@/lib/constants'
import { env } from '@/lib/env'

/**
 * Author session.
 *
 * POST establishes one from a passphrase; DELETE tears it down. The passphrase
 * itself is never stored anywhere — the cookie carries only an expiry and an
 * HMAC over it.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  sweep()

  // Five attempts a minute per address. Brute-forcing a passphrase over the
  // network should not be a viable strategy.
  const limit = rateLimit(`auth:${clientKey(request)}`, 5, 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  if (!env.hasAdminPassphrase) {
    return NextResponse.json(
      { error: 'Author access is not configured on this deployment.' },
      { status: 503 },
    )
  }

  let passphrase
  try {
    ({ passphrase } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  if (!verifyPassphrase(passphrase)) {
    // Deliberately vague: a specific message would confirm which half was wrong.
    return NextResponse.json({ error: 'That passphrase was not accepted.' }, { status: 401 })
  }

  const store = await cookies()
  store.set({ ...sessionCookieOptions, value: createSessionToken() })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
  return NextResponse.json({ ok: true })
}

/**
 * Session status.
 *
 * The session cookie is httpOnly, so the browser cannot read it directly. The
 * author UI asks this endpoint instead, which keeps the pages it lives on
 * statically renderable — reading cookies inside those routes would force
 * every visitor onto a dynamic render for a control only I ever see.
 */
export async function GET() {
  return NextResponse.json(
    { author: await isAuthor() },
    { headers: { 'cache-control': 'no-store, private' } },
  )
}
