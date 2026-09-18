'use client'

import { useEffect } from 'react'
import ActionLink from '@/components/ui/ActionLink'
import HandRule from '@/components/ui/HandRule'
import styles from './status.module.css'

/**
 * Route-level error boundary.
 *
 * Client-side by requirement — it needs the reset callback. The digest is
 * surfaced deliberately: it is the only handle that ties a visitor's report to
 * a line in the server logs.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={`shell ${styles.wrap}`}>
      <p className="label">Error 500</p>
      <h1 className={styles.code} aria-hidden="true">
        500
      </h1>
      <h2 className={styles.title}>
        Something <em>broke</em> on my side
      </h2>
      <HandRule width={220} tone="accent" />
      <p className={styles.body}>
        This one is mine, not yours. Try again — and if it keeps happening, the reference below
        will tell me exactly where to look.
      </p>

      {error?.digest ? <p className={styles.digest}>Reference: {error.digest}</p> : null}

      <div className={styles.actions}>
        <button type="button" onClick={reset} className={styles.retry}>
          Try again
        </button>
        <ActionLink href="/" variant="outline">
          Back to the start
        </ActionLink>
      </div>
    </div>
  )
}
