import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import ActionLink from '@/components/ui/ActionLink'
import HandRule from '@/components/ui/HandRule'
import styles from './status.module.css'

export const metadata = buildMetadata({
  title: 'Page not found',
  description: 'That page does not exist.',
  path: '/404',
  noIndex: true,
})

export default function NotFound() {
  return (
    <div className={`shell ${styles.wrap}`}>
      <p className="label">Error 404</p>
      <h1 className={styles.code} aria-hidden="true">
        404
      </h1>
      <h2 className={styles.title}>
        That page is <em>not here</em>
      </h2>
      <HandRule width={220} tone="accent" />
      <p className={styles.body}>
        The link may be old, or I may have moved something. The work, the journal and the timeline
        are all still where they should be.
      </p>

      <div className={styles.actions}>
        <ActionLink href="/" variant="solid">
          Back to the start
        </ActionLink>
        <ActionLink href="/blog" variant="outline">
          Read the journal
        </ActionLink>
      </div>

      <nav className={styles.links} aria-label="Other pages">
        <Link href="/roadmap">Roadmap</Link>
        <Link href="/interests">Interests</Link>
        <Link href="/guestbook">Guestbook</Link>
      </nav>
    </div>
  )
}
