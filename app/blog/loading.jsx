import SkeletonList from '@/components/ui/Skeleton'

/**
 * Shown while the journal's data resolves — on a cold ISR render, or on a
 * client navigation into the route. Next streams this shell immediately so the
 * page never appears to hang.
 */
export default function Loading() {
  return (
    <div className="section section--flush shell">
      <p className="label">Journal</p>
      <h1 className="display" style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-sm)' }}>
        Loading entries…
      </h1>
      <SkeletonList rows={6} />
      <span className="visually-hidden" role="status">
        Loading journal entries
      </span>
    </div>
  )
}
