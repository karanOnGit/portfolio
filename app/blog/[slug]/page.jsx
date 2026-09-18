import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPostSlugs, getRelatedPosts } from '@/lib/api/blog'
import { sanitizeArticleHtml } from '@/lib/sanitize'
import { formatDate, isoDate } from '@/lib/format'
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import TagList from '@/components/ui/TagList'
import RenderNote from '@/components/blog/RenderNote'
import EntryActions from '@/components/blog/EntryActions'
import '@/styles/prose.css'
import styles from '../article.module.css'

/**
 * Article — incremental static regeneration.
 *
 * The most recent entries are prerendered at build time; anything older is
 * rendered on first request and then cached under its own tag. `dynamicParams`
 * is what makes that possible — without it, an unbuilt slug would 404 instead
 * of being generated on demand.
 */
// Static literal by requirement; mirrors REVALIDATE.blogDetail.
export const revalidate = 300
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getPostSlugs(40)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return buildMetadata({
      title: 'Entry not found',
      description: 'This journal entry is no longer available.',
      path: `/blog/${slug}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    path: `/blog/${post.slug}`,
    image: post.image || undefined,
    type: 'article',
    keywords: [...post.keywords, ...post.tags],
    article: {
      publishedTime: isoDate(post.createdAt),
      modifiedTime: isoDate(post.updatedAt),
      tags: post.tags,
    },
  })
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  // A missing slug renders the 404 route rather than an empty article shell.
  if (!post) notFound()

  const related = await getRelatedPosts(post)
  const html = sanitizeArticleHtml(post.body)
  const generatedAt = new Date().toISOString()

  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Link href="/blog" className={styles.back}>
        <span aria-hidden="true">←</span> All entries
      </Link>

      <article>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <time dateTime={isoDate(post.createdAt)}>{formatDate(post.createdAt, { month: 'long' })}</time>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          {post.summary ? <p className={styles.summary}>{post.summary}</p> : null}

          {/* Author-only; renders nothing for ordinary visitors. */}
          <EntryActions post={post} />

          {post.image ? (
            <div className={styles.hero}>
              {/* Third-party origin with no guaranteed dimensions — a plain
                  <img> is more robust here than next/image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="" loading="eager" decoding="async" />
            </div>
          ) : null}
        </header>

        <div className={styles.layout}>
          <aside className={styles.rail}>
            <div className={styles.railGroup}>
              <p className={styles.railTitle}>Written by</p>
              <p className={styles.railValue}>{post.author}</p>
            </div>

            <div className={styles.railGroup}>
              <p className={styles.railTitle}>Published</p>
              <p className={styles.railValue}>{formatDate(post.createdAt, { month: 'long' })}</p>
            </div>

            {post.tags.length ? (
              <div className={styles.railGroup}>
                <p className={styles.railTitle}>Tags</p>
                <TagList items={post.tags} />
              </div>
            ) : null}
          </aside>

          {/* Sanitised on the server before it reaches this point. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-title">
          <h2 className={styles.relatedTitle} id="related-title">
            Keep reading
          </h2>

          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                <span className={styles.relatedCategory}>{item.category}</span>
                <span className={styles.relatedName}>{item.title}</span>
                <span className={styles.relatedSummary}>{item.summary.slice(0, 120)}…</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <RenderNote strategy="ISR" revalidate="5 minutes" generatedAt={generatedAt} />
    </div>
  )
}
