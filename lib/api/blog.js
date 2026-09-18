/**
 * lib/api/blog.js
 * Server-side data access for the journal.
 *
 * Read paths go through Next's fetch cache with explicit tags, which is what
 * makes ISR work here: pages declare a revalidate window, and mutations call
 * revalidateTag() to invalidate the exact entries they touched.
 */

import 'server-only'
import { env } from '@/lib/env'
import { CACHE_TAGS, REVALIDATE } from '@/lib/constants'
import { toList, excerpt, readingTime } from '@/lib/format'
import { sanitizeText } from '@/lib/sanitize'

/**
 * Upstream records are loosely typed and inconsistently serialised. Normalising
 * once, here, keeps every consumer working against a stable shape.
 */
function normalize(raw) {
  if (!raw || typeof raw !== 'object') return null
  const slug = raw.slug || raw.id
  if (!slug) return null

  const body = typeof raw.body_text === 'string' ? raw.body_text : ''

  return {
    id: raw.id ?? null,
    slug: String(slug),
    title: sanitizeText(raw.title || 'Untitled'),
    metaTitle: sanitizeText(raw.meta_title || raw.title || ''),
    metaDescription: sanitizeText(raw.meta_description || raw.short_description || ''),
    summary: sanitizeText(raw.short_description || '') || excerpt(body, 180),
    body,
    image: typeof raw.blog_image === 'string' && raw.blog_image.startsWith('http')
      ? raw.blog_image
      : null,
    author: sanitizeText(raw.author || 'Editorial'),
    category: sanitizeText(raw.category || 'Notes'),
    tags: toList(raw.tags).map(sanitizeText).filter(Boolean),
    keywords: toList(raw.meta_keyword).map(sanitizeText).filter(Boolean),
    createdAt: raw.created_at || null,
    updatedAt: raw.updated_at || raw.created_at || null,
    pinned: String(raw.pinned).toLowerCase() === 'true',
    status: raw.status || 'published',
    visibility: raw.visibility || 'public',
    readingMinutes: readingTime(body),
  }
}

function isPublic(post) {
  return post && post.status === 'published' && post.visibility === 'public'
}

/** Newest first, pinned entries promoted to the top. */
function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  })
}

/**
 * Journal index. Cached under a tag so a single revalidateTag() call after a
 * mutation refreshes every page built from this list.
 */
export async function getPosts() {
  try {
    const response = await fetch(`${env.blogApi}/`, {
      headers: { accept: 'application/json' },
      next: { revalidate: REVALIDATE.blogList, tags: [CACHE_TAGS.blogList] },
    })
    if (!response.ok) throw new Error(`Upstream responded ${response.status}`)

    const payload = await response.json()
    const rows = Array.isArray(payload) ? payload : payload.data || payload.blogs || []
    return sortPosts(rows.map(normalize).filter(isPublic))
  } catch (error) {
    // A journal outage must not take down the route; the page renders its
    // empty state instead.
    console.error('[blog] list fetch failed:', error.message)
    return []
  }
}

/** Single article, or null when the slug does not resolve. */
export async function getPost(slug) {
  if (!slug) return null
  try {
    const response = await fetch(`${env.blogApi}/${encodeURIComponent(slug)}`, {
      headers: { accept: 'application/json' },
      next: {
        revalidate: REVALIDATE.blogDetail,
        tags: [CACHE_TAGS.blogDetail(slug), CACHE_TAGS.blogList],
      },
    })
    if (response.status === 404) return null
    if (!response.ok) throw new Error(`Upstream responded ${response.status}`)

    const payload = await response.json()
    const raw = payload.blog || payload.data || payload
    const post = normalize(Array.isArray(raw) ? raw[0] : raw)
    return isPublic(post) ? post : null
  } catch (error) {
    console.error(`[blog] detail fetch failed for "${slug}":`, error.message)
    return null
  }
}

/**
 * Slugs prerendered at build time. Capped so a large archive does not turn
 * every deploy into a full crawl — the rest are rendered on first request and
 * then cached, thanks to `dynamicParams`.
 */
export async function getPostSlugs(limit = 40) {
  const posts = await getPosts()
  return posts.slice(0, limit).map((post) => post.slug)
}

/** Related reading: same category first, then most recent. */
export async function getRelatedPosts(post, limit = 3) {
  if (!post) return []
  const posts = await getPosts()
  const pool = posts.filter((item) => item.slug !== post.slug)
  const sameCategory = pool.filter((item) => item.category === post.category)
  return [...sameCategory, ...pool.filter((item) => item.category !== post.category)].slice(0, limit)
}

/* ── Write paths ───────────────────────────────────────────────────────────
   Only invoked from authenticated route handlers in app/api/blog.
──────────────────────────────────────────────────────────────────────────── */

async function writeRequest(url, method, body) {
  const response = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || payload.detail || `Upstream responded ${response.status}`)
  }
  return payload
}

export function createPost(data) {
  return writeRequest(`${env.blogApi}/`, 'POST', data)
}

export function updatePost(id, data) {
  return writeRequest(`${env.blogApi}/${encodeURIComponent(id)}`, 'PUT', data)
}

export function deletePost(id) {
  return writeRequest(`${env.blogApi}/${encodeURIComponent(id)}`, 'DELETE')
}
