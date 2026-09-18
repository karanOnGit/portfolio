import SkeletonList from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="section section--flush shell">
      <p className="label">Guestbook</p>
      <h1 className="display" style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-sm)' }}>
        Loading entries…
      </h1>
      <SkeletonList rows={4} />
      <span className="visually-hidden" role="status">
        Loading guestbook entries
      </span>
    </div>
  )
}
