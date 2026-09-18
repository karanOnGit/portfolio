import { getPosts } from '@/lib/api/blog'
import { buildMetadata, breadcrumbSchema, itemListSchema } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import SectionHeading from '@/components/ui/SectionHeading'
import JournalIndex from '@/components/blog/JournalIndex'
import RenderNote from '@/components/blog/RenderNote'
import AuthorBar from '@/components/blog/AuthorBar'

/**
 * Journal index — incremental static regeneration.
 *
 * The page is built statically and served from cache. Every 5 minutes the
 * first request after expiry triggers a background rebuild; writes through the
 * editor invalidate `blog:list` immediately, so new posts appear without
 * waiting out the window.
 */
// Next requires this to be a static literal, so it cannot read from
// lib/constants — REVALIDATE.blogList documents the same value.
export const revalidate = 300

export const metadata = buildMetadata({
  title: 'Journal',
  description:
    'Published writing from the content platforms I build and operate, including the automated editorial feed behind CarsNBike.',
  path: '/blog',
  keywords: ['automated publishing', 'AI content pipeline', 'editorial automation'],
})

export default async function JournalPage() {
  const posts = await getPosts()
  const generatedAt = new Date().toISOString()

  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
          ]),
          itemListSchema(posts.slice(0, 20)),
        ]}
      />

      <SectionHeading
        index="—"
        eyebrow="Journal"
        title={
          <>
            Published by the systems I <em>built</em>
          </>
        }
        lede="Live output from the editorial platforms I build and operate. Most of what you see here was researched, written and published by the automated pipeline described on the home page — this page reads it back through the same API, on a five-minute revalidation window."
      />

      {/* Renders only for an authenticated author; invisible to everyone else. */}
      <AuthorBar />

      {posts.length ? (
        <JournalIndex posts={posts} />
      ) : (
        <p className="lede">
          The journal is briefly unavailable — the upstream content service did not respond. Please
          try again shortly.
        </p>
      )}

      <RenderNote strategy="ISR" revalidate="5 minutes" generatedAt={generatedAt} />
    </div>
  )
}
