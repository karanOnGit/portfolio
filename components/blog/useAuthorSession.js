'use client'

import { useEffect, useState } from 'react'

/**
 * Asks the server whether the current visitor holds an author session.
 *
 * Doing this from the client is what keeps the journal on the static and ISR
 * paths: reading the cookie inside the page's server component would opt the
 * whole route into per-request rendering, for a control that only one person
 * ever sees. The answer is advisory — every write is re-authorised server-side.
 */
export default function useAuthorSession() {
  const [author, setAuthor] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let active = true

    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { author: false }))
      .then((payload) => {
        if (active) setAuthor(Boolean(payload.author))
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecked(true)
      })

    return () => {
      active = false
    }
  }, [])

  return { author, checked }
}
