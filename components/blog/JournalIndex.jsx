'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate, isoDate } from '@/lib/format'
import styles from './JournalIndex.module.css'

/**
 * JournalIndex — the client island on an otherwise server-rendered page.
 *
 * The posts arrive already fetched, sanitised and sorted from the server
 * component above it, so this component ships no data-fetching code: it only
 * filters an array that is already in memory. That keeps search instant and
 * keeps the initial HTML complete for crawlers, which see every entry whether
 * or not the filter ever runs.
 */
export default function JournalIndex({ posts = [] }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  // Keeps typing responsive when the list is long: the input updates on every
  // keystroke while the filtered list catches up at a lower priority.
  const deferredQuery = useDeferredValue(query)

  const categories = useMemo(() => {
    const found = new Set(posts.map((post) => post.category).filter(Boolean))
    return ['All', ...[...found].sort()]
  }, [posts])

  const visible = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()

    return posts.filter((post) => {
      if (category !== 'All' && post.category !== category) return false
      if (!needle) return true

      return (
        post.title.toLowerCase().includes(needle) ||
        post.summary.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle))
      )
    })
  }, [posts, category, deferredQuery])

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.filter}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <span className="visually-hidden">Search the journal</span>
          <input
            type="search"
            value={query}
            placeholder="Search titles, summaries, tags"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <p className={styles.count} aria-live="polite">
          {visible.length} / {posts.length} entries
        </p>
      </div>

      <div className={styles.list}>
        {visible.map((post, index) => (
          <article key={post.slug} className={styles.entry}>
            <span className={styles.entryIndex} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div>
              <div className={styles.entryMeta}>
                {post.pinned ? <span className={styles.entryPin}>Pinned</span> : null}
                <span className={styles.entryCategory}>{post.category}</span>
                <time dateTime={isoDate(post.createdAt)}>{formatDate(post.createdAt)}</time>
                <span>{post.readingMinutes} min read</span>
              </div>

              <h2 className={styles.entryTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className={styles.entrySummary}>{post.summary}</p>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className={styles.entryThumb}
              tabIndex={-1}
              aria-hidden="true"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  width={320}
                  height={240}
                  sizes="10rem"
                  // Upstream images are third-party and unpredictable; an
                  // unoptimized pass avoids failing the whole card on a host
                  // that refuses Next's optimizer.
                  unoptimized
                />
              ) : null}
            </Link>
          </article>
        ))}

        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nothing matches that</p>
            <p className={styles.emptyBody}>
              Try a different term, or clear the category filter.
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}
