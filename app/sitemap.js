import { getPosts } from '@/lib/api/blog'
import { absoluteUrl } from '@/lib/seo'

/**
 * Sitemap.
 *
 * Regenerated on the same window as the journal index, so a newly published
 * entry is discoverable without a deploy. Priorities are relative, not
 * absolute — they only tell a crawler how this site ranks its own pages.
 */
// Static literal by requirement; mirrors REVALIDATE.blogList.
export const revalidate = 300

export default async function sitemap() {
  const now = new Date()

  const routes = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/roadmap', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/interests', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/guestbook', priority: 0.5, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/prescriptions', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/biometrics', priority: 0.6, changeFrequency: 'monthly' },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const posts = await getPosts()
  const entries = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: post.pinned ? 0.8 : 0.7,
  }))

  return [...routes, ...entries]
}
