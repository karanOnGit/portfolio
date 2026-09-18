'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './guestbook.module.css'

const MAX_MESSAGE = 600

/**
 * The guestbook form.
 *
 * Posts to our own API route, which validates and rate-limits before touching
 * the upstream store. On success it calls router.refresh(), re-running the
 * server component above so the new entry appears without a full reload.
 */
export default function GuestbookForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setStatus(null)

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, message, website }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Could not save your message.')

      setStatus({ tone: 'success', text: 'Signed. Thank you for stopping by.' })
      setName('')
      setMessage('')
      router.refresh()
    } catch (error) {
      setStatus({ tone: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2 className={styles.formTitle}>Sign the book</h2>

      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
          autoComplete="name"
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE))}
          rows={5}
          required
        />
        <span className={styles.counter}>
          {message.length} / {MAX_MESSAGE}
        </span>
      </label>

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      {status ? (
        <p className={styles.status} data-tone={status.tone} role="status">
          {status.text}
        </p>
      ) : (
        <p className={styles.status}>
          Entries are public. Be kind — I read every one of them.
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={busy}>
        {busy ? 'Signing…' : 'Sign the guestbook'}
      </button>
    </form>
  )
}
