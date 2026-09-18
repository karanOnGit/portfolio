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
    'Notes on autonomous systems, generative AI in production, rendering strategy and the parts of web performance that actually move the numbers.',
  path: '/blog',
  keywords: ['engineering blog', 'AI automation', 'Next.js rendering', 'technical SEO'],
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
            Writing about systems that <em>run themselves</em>
          </>
        }
        lede="Long-form notes on automation, generative AI in the critical path, and the engineering decisions behind the platforms I build."
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
