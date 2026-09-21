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
        disallow: ['/api/', '/studio', '/media-links.txt'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'Google-Extended',
          'anthropic-ai',
          'Claude-Web',
          'Bytespider',
          'PerplexityBot',
          'FacebookBot',
          'Applebot-Extended',
          'Diffbot',
        ],
        disallow: ['/media-links.txt'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/^https?:\/\//, ''),
  }
}
