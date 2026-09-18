import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createPost } from '@/lib/api/blog'
import { isAuthor } from '@/lib/auth'
import { CACHE_TAGS } from '@/lib/constants'
import { normalizeSubmission, validateSubmission } from '@/lib/api/blog-input'

/**
 * Create an entry.
 *
 * On success the journal's list tag is invalidated immediately, so the ISR
 * cache serves the new post on the very next request rather than waiting out
 * the revalidation window.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  if (!(await isAuthor())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const submission = normalizeSubmission(body)
  const problems = validateSubmission(submission)
  if (problems.length) {
    return NextResponse.json({ error: problems.join(' ') }, { status: 422 })
  }

  try {
    const result = await createPost(submission)
    revalidateTag(CACHE_TAGS.blogList)
    revalidateTag(CACHE_TAGS.blogDetail(submission.slug))
    return NextResponse.json({ ok: true, result }, { status: 201 })
  } catch (error) {
    console.error('[blog:create]', error.message)
    return NextResponse.json({ error: error.message }, { status: 502 })
  }
}
