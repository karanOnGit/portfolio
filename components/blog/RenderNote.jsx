import styles from './RenderNote.module.css'

/**
 * States how the current page was rendered and when.
 *
 * `generatedAt` is captured during the render, so on an ISR route it shows the
 * moment the cached copy was produced rather than the moment you loaded it —
 * which makes the revalidation window visible rather than merely claimed.
 */
export default function RenderNote({ strategy, revalidate, generatedAt }) {
  return (
    <p className={styles.note}>
      <span className={styles.strategy}>{strategy}</span>
      {revalidate ? <span>revalidates every {revalidate}</span> : null}
      <span className={styles.dot}>
        generated{' '}
        <time dateTime={generatedAt}>
          {new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'UTC',
          }).format(new Date(generatedAt))}{' '}
          UTC
        </time>
      </span>
    </p>
  )
}
