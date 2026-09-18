import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { deletePost, updatePost } from '@/lib/api/blog'
import { isAuthor } from '@/lib/auth'
import { CACHE_TAGS } from '@/lib/constants'
import { normalizeSubmission, validateSubmission } from '@/lib/api/blog-input'

/** Update and delete for a single entry, by upstream id. */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PUT(request, { params }) {
  if (!(await isAuthor())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  const { id } = await params

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
    const result = await updatePost(id, submission)
    revalidateTag(CACHE_TAGS.blogList)
    revalidateTag(CACHE_TAGS.blogDetail(submission.slug))
    // An edit that changes the slug leaves the old URL cached, so drop it too.
    if (body.previousSlug && body.previousSlug !== submission.slug) {
      revalidateTag(CACHE_TAGS.blogDetail(body.previousSlug))
    }
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error('[blog:update]', error.message)
    return NextResponse.json({ error: error.message }, { status: 502 })
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthor())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  const { id } = await params
  const slug = new URL(request.url).searchParams.get('slug')

  try {
    await deletePost(id)
    revalidateTag(CACHE_TAGS.blogList)
    if (slug) revalidateTag(CACHE_TAGS.blogDetail(slug))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[blog:delete]', error.message)
    return NextResponse.json({ error: error.message }, { status: 502 })
  }
}
