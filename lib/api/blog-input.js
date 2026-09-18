/**
 * lib/api/blog-input.js
 * Shapes and checks author submissions before they reach the upstream API.
 *
 * Kept separate from lib/api/blog.js so the validation rules can be read in one
 * place, and so both the create and update routes apply exactly the same ones.
 */

import 'server-only'
import { slugify } from '@/lib/format'
import { sanitizeArticleHtml, sanitizeText } from '@/lib/sanitize'

const LIMITS = {
  title: 140,
  metaTitle: 70,
  metaDescription: 170,
  shortDescription: 200,
  category: 40,
  author: 80,
}

function clamp(value, max) {
  return sanitizeText(value || '').slice(0, max)
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return value.split(',')
  return []
}

/** Produces the exact payload shape the upstream CMS expects. */
export function normalizeSubmission(body = {}) {
  const title = clamp(body.title, LIMITS.title)

  return {
    title,
    slug: slugify(body.slug || title).slice(0, 120),
    // Bodies are author-authored or model-generated HTML; both are sanitised.
    body_text: sanitizeArticleHtml(body.body_text || body.body || ''),
    short_description: clamp(body.short_description, LIMITS.shortDescription),
    meta_title: clamp(body.meta_title || title, LIMITS.metaTitle),
    meta_description: clamp(body.meta_description || body.short_description, LIMITS.metaDescription),
    meta_keyword: toArray(body.meta_keyword).map((item) => clamp(item, 60)).filter(Boolean).slice(0, 12),
    tags: toArray(body.tags).map((item) => clamp(item, 40)).filter(Boolean).slice(0, 10),
    category: clamp(body.category || 'Notes', LIMITS.category),
    author: clamp(body.author || 'Karan Bhardwaj', LIMITS.author),
    blog_image: /^https:\/\//.test(body.blog_image || '') ? body.blog_image : '',
    status: body.status === 'draft' ? 'draft' : 'published',
    visibility: body.visibility === 'private' ? 'private' : 'public',
    pinned: body.pinned === true || body.pinned === 'true' ? 'True' : 'False',
  }
}

/** @returns {string[]} Human-readable problems; empty means valid. */
export function validateSubmission(submission) {
  const problems = []

  if (submission.title.length < 6) problems.push('The title is too short.')
  if (!submission.slug) problems.push('A slug is required.')
  if (submission.body_text.replace(/<[^>]*>/g, '').trim().length < 200) {
    problems.push('The body needs at least a couple of paragraphs.')
  }
  if (!submission.short_description) problems.push('A short description is required.')

  return problems
}
