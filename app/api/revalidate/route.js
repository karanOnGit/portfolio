import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/constants'
import { env } from '@/lib/env'
import { isAuthor } from '@/lib/auth'

/**
 * On-demand revalidation.
 *
 * Lets the upstream CMS push a change through the ISR cache the moment it is
 * published, instead of waiting for the next revalidation window. Accepts
 * either a shared token (for machine callers, such as a CMS webhook) or an
 * author session (for me, from the browser).
 *
 *   POST /api/revalidate?token=…&slug=my-post
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || request.headers.get('x-revalidate-token')

  const tokenMatches = Boolean(env.revalidateToken) && token === env.revalidateToken
  const authorised = tokenMatches || (await isAuthor())

  if (!authorised) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  const slug = url.searchParams.get('slug')

  revalidateTag(CACHE_TAGS.blogList)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  if (slug) {
    revalidateTag(CACHE_TAGS.blogDetail(slug))
    revalidatePath(`/blog/${slug}`)
  }

  return NextResponse.json({
    ok: true,
    revalidated: slug ? ['/blog', `/blog/${slug}`] : ['/blog'],
    at: new Date().toISOString(),
  })
}
