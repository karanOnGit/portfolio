'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './author.module.css'

const EMPTY = {
  title: '',
  slug: '',
  category: 'Engineering',
  short_description: '',
  meta_title: '',
  meta_description: '',
  meta_keyword: '',
  tags: '',
  blog_image: '',
  body_text: '',
}

function toFormState(post) {
  if (!post) return EMPTY
  return {
    title: post.title || '',
    slug: post.slug || '',
    category: post.category || 'Engineering',
    short_description: post.summary || '',
    meta_title: post.metaTitle || '',
    meta_description: post.metaDescription || '',
    meta_keyword: (post.keywords || []).join(', '),
    tags: (post.tags || []).join(', '),
    blog_image: post.image || '',
    body_text: post.body || '',
  }
}

/**
 * The journal editor.
 *
 * Draft generation posts to /api/ai/draft rather than calling Groq directly —
 * the credential never enters this bundle. Saving posts to our own API, which
 * validates, sanitises and then invalidates the ISR cache for the affected
 * paths.
 */
export default function EntryEditor({ post, onClose }) {
  const router = useRouter()
  const isEdit = Boolean(post?.id)

  const [form, setForm] = useState(() => toFormState(post))
  const [topic, setTopic] = useState('')
  const [guidance, setGuidance] = useState('')
  const [busy, setBusy] = useState(null)
  const [status, setStatus] = useState(null)

  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  // Focus moves into the dialog on open, and Escape closes it.
  useEffect(() => {
    firstFieldRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const update = (key) => (event) => setForm((state) => ({ ...state, [key]: event.target.value }))

  const generate = async () => {
    if (topic.trim().length < 4) {
      setStatus({ tone: 'error', text: 'Give the draft a topic first.' })
      return
    }

    setBusy('draft')
    setStatus({ tone: 'info', text: 'Drafting — this usually takes 10 to 30 seconds…' })

    try {
      const response = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ topic, guidance }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Draft generation failed.')

      const draft = payload.draft
      setForm((state) => ({
        ...state,
        title: draft.title || state.title,
        slug: draft.slug || state.slug,
        category: draft.category || state.category,
        short_description: draft.short_description || state.short_description,
        meta_title: draft.meta_title || state.meta_title,
        meta_description: draft.meta_description || state.meta_description,
        meta_keyword: Array.isArray(draft.meta_keyword)
          ? draft.meta_keyword.join(', ')
          : draft.meta_keyword || state.meta_keyword,
        tags: Array.isArray(draft.tags) ? draft.tags.join(', ') : draft.tags || state.tags,
        body_text: draft.body_text || state.body_text,
      }))
      setStatus({ tone: 'success', text: 'Draft ready — review it before publishing.' })
    } catch (error) {
      setStatus({ tone: 'error', text: error.message })
    } finally {
      setBusy(null)
    }
  }

  const save = async (event) => {
    event.preventDefault()
    setBusy('save')
    setStatus({ tone: 'info', text: 'Saving…' })

    try {
      const response = await fetch(isEdit ? `/api/blog/${post.id}` : '/api/blog', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          meta_keyword: form.meta_keyword,
          tags: form.tags,
          previousSlug: post?.slug,
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Save failed.')

      setStatus({ tone: 'success', text: 'Saved. Refreshing…' })
      // Pulls the freshly revalidated server render without a full reload.
      router.refresh()
      setTimeout(onClose, 700)
    } catch (error) {
      setStatus({ tone: 'error', text: error.message })
      setBusy(null)
    }
  }

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <form
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Edit entry' : 'New entry'}
        onSubmit={save}
      >
        <div className={styles.dialogHead}>
          <h2 className={styles.dialogTitle}>{isEdit ? 'Edit entry' : 'New entry'}</h2>
          <button type="button" className={styles.action} onClick={onClose}>
            Close
          </button>
        </div>

        <div className={styles.dialogBody}>
          <div className={styles.assist}>
            <p className={styles.fieldLabel}>Draft assistant</p>
            <div className={styles.assistRow}>
              <label className={styles.field}>
                <span className="visually-hidden">Topic</span>
                <input
                  ref={firstFieldRef}
                  className={styles.input}
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="Topic — e.g. why ISR beats a nightly rebuild"
                />
              </label>
              <label className={styles.field}>
                <span className="visually-hidden">Direction</span>
                <input
                  className={styles.input}
                  value={guidance}
                  onChange={(event) => setGuidance(event.target.value)}
                  placeholder="Optional direction — angle, audience, length"
                />
              </label>
              <button
                type="button"
                className={styles.action}
                onClick={generate}
                disabled={busy !== null}
              >
                {busy === 'draft' ? 'Drafting…' : 'Generate'}
              </button>
            </div>
            <p className={styles.hint}>
              Runs server-side against Groq. Everything it produces is a starting point, not a
              publication.
            </p>
          </div>

          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Title</span>
              <input className={styles.input} value={form.title} onChange={update('title')} required />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Slug</span>
              <input className={styles.input} value={form.slug} onChange={update('slug')} required />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Category</span>
              <input className={styles.input} value={form.category} onChange={update('category')} />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Cover image URL</span>
              <input
                className={styles.input}
                value={form.blog_image}
                onChange={update('blog_image')}
                placeholder="https://…"
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Short description</span>
            <input
              className={styles.input}
              value={form.short_description}
              onChange={update('short_description')}
              required
            />
          </label>

          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Meta title</span>
              <input className={styles.input} value={form.meta_title} onChange={update('meta_title')} />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Meta description</span>
              <input
                className={styles.input}
                value={form.meta_description}
                onChange={update('meta_description')}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Keywords</span>
              <input
                className={styles.input}
                value={form.meta_keyword}
                onChange={update('meta_keyword')}
                placeholder="comma, separated"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Tags</span>
              <input
                className={styles.input}
                value={form.tags}
                onChange={update('tags')}
                placeholder="comma, separated"
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Body — HTML</span>
            <textarea
              className={styles.textarea}
              value={form.body_text}
              onChange={update('body_text')}
              rows={16}
              required
            />
            <span className={styles.hint}>
              Sanitised on save: script, style and iframe tags are discarded, and outbound links get
              rel="noopener".
            </span>
          </label>
        </div>

        <div className={styles.dialogFoot}>
          {status ? (
            <p className={styles.status} data-tone={status.tone} role="status">
              {status.text}
            </p>
          ) : (
            <span className={styles.status} />
          )}

          <button type="button" className={styles.action} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.action} disabled={busy !== null}>
            {busy === 'save' ? 'Saving…' : isEdit ? 'Update entry' : 'Publish entry'}
          </button>
        </div>
      </form>
    </div>
  )
}
