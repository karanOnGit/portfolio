'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EntryEditor from './EntryEditor'
import useAuthorSession from './useAuthorSession'
import styles from './author.module.css'

/**
 * Renders nothing until the server confirms an author session, so the journal
 * stays statically rendered for everyone else. This component never decides
 * who is authorised — every action it triggers is re-checked server-side.
 */
export default function AuthorBar() {
  const router = useRouter()
  const { author } = useAuthorSession()
  const [editing, setEditing] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const signOut = async () => {
    setSigningOut(true)
    await fetch('/api/admin/session', { method: 'DELETE' })
    router.refresh()
  }

  if (!author) return null

  return (
    <>
      <div className={styles.bar}>
        <span className={styles.barLabel}>Author session</span>
        <span className={styles.barSpacer} />
        <button type="button" className={styles.action} onClick={() => setEditing(true)}>
          New entry
        </button>
        <button type="button" className={styles.action} onClick={signOut} disabled={signingOut}>
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>

      {editing ? <EntryEditor onClose={() => setEditing(false)} /> : null}
    </>
  )
}
