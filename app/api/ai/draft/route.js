import { NextResponse } from 'next/server'
import { generateDraft } from '@/lib/api/groq'
import { isAuthor } from '@/lib/auth'
import { clientKey, rateLimit, sweep } from '@/lib/rate-limit'

/**
 * Draft generation.
 *
 * This endpoint exists so the Groq credential stays on the server. It is
 * author-only and rate-limited, because every call costs tokens.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Model completions for a full article routinely exceed the default budget.
export const maxDuration = 60

export async function POST(request) {
  if (!(await isAuthor())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  sweep()
  const limit = rateLimit(`draft:${clientKey(request)}`, 6, 5 * 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Rate limited. Try again in ${limit.retryAfter}s.` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let topic
  let guidance
  try {
    ({ topic, guidance } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  if (!topic || String(topic).trim().length < 4) {
    return NextResponse.json({ error: 'Give the draft a topic to work from.' }, { status: 400 })
  }

  try {
    const draft = await generateDraft(String(topic).trim(), String(guidance || '').trim())
    return NextResponse.json({ draft })
  } catch (error) {
    console.error('[ai/draft]', error.message)
    return NextResponse.json({ error: 'Draft generation failed.' }, { status: 502 })
  }
}
