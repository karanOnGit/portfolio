'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EntryEditor from './EntryEditor'
import useAuthorSession from './useAuthorSession'
import styles from './author.module.css'

/**
 * Edit and delete controls on a single article. Hidden unless the server
 * confirms an author session; the article itself stays statically rendered.
 */
export default function EntryActions({ post }) {
  const router = useRouter()
  const { author } = useAuthorSession()
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const remove = async () => {
    setBusy(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/blog/${post.id}?slug=${encodeURIComponent(post.slug)}`,
        { method: 'DELETE' },
      )
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Delete failed.')

      router.push('/blog')
      router.refresh()
    } catch (deleteError) {
      setError(deleteError.message)
      setBusy(false)
      setConfirming(false)
    }
  }

  if (!author) return null

  return (
    <>
      <div className={styles.entryActions}>
        <button type="button" className={styles.action} onClick={() => setEditing(true)}>
          Edit entry
        </button>

        {confirming ? (
          <>
            <button
              type="button"
              className={styles.actionDanger}
              onClick={remove}
              disabled={busy}
            >
              {busy ? 'Deleting…' : 'Confirm delete'}
            </button>
            <button type="button" className={styles.action} onClick={() => setConfirming(false)}>
              Keep it
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.actionDanger}
            onClick={() => setConfirming(true)}
          >
            Delete
          </button>
        )}

        {error ? (
          <span className={styles.status} data-tone="error" role="status">
            {error}
          </span>
        ) : null}
      </div>

      {editing ? <EntryEditor post={post} onClose={() => setEditing(false)} /> : null}
    </>
  )
}
