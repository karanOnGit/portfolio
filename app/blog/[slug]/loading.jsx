import SkeletonList, { SkeletonBlock } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="section section--flush shell">
      <SkeletonBlock width="8rem" height="0.7rem" />
      <div style={{ marginTop: 'var(--space-lg)', display: 'grid', gap: '0.8rem' }}>
        <SkeletonBlock width="min(40rem, 90%)" height="3rem" />
        <SkeletonBlock width="min(30rem, 70%)" height="3rem" />
      </div>
      <SkeletonList rows={3} />
      <span className="visually-hidden" role="status">
        Loading article
      </span>
    </div>
  )
}
