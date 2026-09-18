'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

/**
 * A hairline reading-progress rule across the top of the viewport.
 *
 * Writes a CSS custom property from inside a rAF callback rather than setting
 * React state, so scrolling never triggers a re-render.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      bar.style.setProperty('--progress', Math.min(1, Math.max(0, progress)).toFixed(4))
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={styles.rail} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
