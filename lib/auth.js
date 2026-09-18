/**
 * lib/auth.js
 * Passphrase-gated author session for journal write operations.
 *
 * The cookie carries an expiry and an HMAC over it. There is no database and no
 * user table — this exists to keep the public internet out of the editor, not
 * to model identity.
 */

import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import { ADMIN_COOKIE, ADMIN_SESSION_TTL } from '@/lib/constants'

function sign(payload) {
  return createHmac('sha256', env.sessionSecret).update(payload).digest('base64url')
}

function safeEqual(a, b) {
  const bufferA = Buffer.from(a)
  const bufferB = Buffer.from(b)
  if (bufferA.length !== bufferB.length) return false
  return timingSafeEqual(bufferA, bufferB)
}

export function createSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL * 1000
  const payload = String(expiresAt)
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  if (!safeEqual(signature, sign(payload))) return false
  return Number(payload) > Date.now()
}

/** Constant-time passphrase check against the configured secret. */
export function verifyPassphrase(candidate) {
  if (!candidate || !env.hasAdminPassphrase) return false
  // Hash both sides first so the comparison is length-independent.
  const digest = (value) => createHmac('sha256', 'passphrase').update(String(value)).digest()
  return timingSafeEqual(digest(candidate), digest(env.adminPassphrase))
}

/** Reads the session cookie. Safe to call from any server component. */
export async function isAuthor() {
  const store = await cookies()
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value)
}

export const sessionCookieOptions = {
  name: ADMIN_COOKIE,
  httpOnly: true,
  sameSite: 'strict',
  secure: env.isProduction,
  path: '/',
  maxAge: ADMIN_SESSION_TTL,
}
