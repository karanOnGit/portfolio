import { getGuestbookEntries } from '@/lib/api/guestbook'
import { formatDate, isoDate } from '@/lib/format'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import SectionHeading from '@/components/ui/SectionHeading'
import RenderNote from '@/components/blog/RenderNote'
import GuestbookForm from './GuestbookForm'
import styles from './guestbook.module.css'

/**
 * Guestbook — server-side rendered on every request.
 *
 * This is the one route where caching would be actively wrong: someone who has
 * just signed the book must see their own entry when the page re-renders.
 * `force-dynamic` opts the whole route out of the static and ISR paths.
 */
export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Guestbook',
  description:
    'Leave a note. A small, server-rendered guestbook — read every entry, or add your own.',
  path: '/guestbook',
})

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries()
  const renderedAt = new Date().toISOString()

  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Guestbook', path: '/guestbook' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Guestbook"
        title={
          <>
            Leave a <em>mark</em> on the page
          </>
        }
        lede="A note, a question, a correction, or just a hello. This page renders fresh on every request, so whatever you write appears the moment you send it."
      />

      <div className={styles.layout}>
        <GuestbookForm />

        <div>
          <div className={styles.entries}>
            {entries.length === 0 ? (
              <p className={styles.empty}>
                No entries yet — or the guestbook service is briefly unreachable. Yours could be
                the first.
              </p>
            ) : (
              entries.map((entry, index) => (
                <article key={`${entry.name}-${index}`} className={styles.entry}>
                  <span className={styles.initial} aria-hidden="true">
                    {entry.name.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <div className={styles.entryHead}>
                      <h2 className={styles.entryName}>{entry.name}</h2>
                      {entry.timestamp ? (
                        <time className={styles.entryDate} dateTime={isoDate(entry.timestamp)}>
                          {formatDate(entry.timestamp)}
                        </time>
                      ) : null}
                    </div>
                    <p className={styles.entryMessage}>{entry.message}</p>
                  </div>
                </article>
              ))
            )}
          </div>

          <RenderNote strategy="SSR" generatedAt={renderedAt} />
        </div>
      </div>
    </div>
  )
}
