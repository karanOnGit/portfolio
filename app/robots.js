import { absoluteUrl } from '@/lib/seo'

/**
 * Robots directives.
 *
 * The API surface and the author studio are excluded — they hold nothing a
 * crawler can use, and indexing them would waste crawl budget on 401s.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/^https?:\/\//, ''),
  }
}
