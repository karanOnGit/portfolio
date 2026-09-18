import styles from './Skeleton.module.css'

export function SkeletonBlock({ width = '100%', height = '1rem', style }) {
  return <span className={styles.block} style={{ display: 'block', width, height, ...style }} />
}

/** A stand-in for a ruled list of entries, used by route-level loading states. */
export default function SkeletonList({ rows = 5 }) {
  return (
    <div className={styles.rows} aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className={styles.row}>
          <SkeletonBlock width="8rem" height="0.7rem" />
          <SkeletonBlock width="min(32rem, 80%)" height="1.9rem" />
          <SkeletonBlock width="min(46rem, 95%)" height="0.85rem" />
          <SkeletonBlock width="min(38rem, 78%)" height="0.85rem" />
        </div>
      ))}
    </div>
  )
}
