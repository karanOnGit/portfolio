'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './studio.module.css'

/** Exchanges a passphrase for an author session cookie, then returns to the journal. */
export default function SignInForm() {
  const router = useRouter()
  const [passphrase, setPassphrase] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Sign-in failed.')

      router.replace('/blog')
      router.refresh()
    } catch (signInError) {
      setError(signInError.message)
      setBusy(false)
    }
  }

  return (
    <form className={styles.card} onSubmit={submit}>
      <h1 className={styles.title}>Studio</h1>
      <p className={styles.body}>
        Author access for the journal. Everything behind this is re-checked on the server, so a
        session here grants nothing the API would not already allow.
      </p>

      <label className={styles.field}>
        <span className={styles.label}>Passphrase</span>
        <input
          className={styles.input}
          type="password"
          autoComplete="current-password"
          value={passphrase}
          onChange={(event) => setPassphrase(event.target.value)}
          required
        />
      </label>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <button className={styles.submit} type="submit" disabled={busy || passphrase.length === 0}>
        {busy ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  )
}
