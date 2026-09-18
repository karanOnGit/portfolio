'use client'

import { useEffect } from 'react'

/**
 * SmoothScroll — Lenis-backed inertial scrolling.
 *
 * Loaded dynamically after first paint so it never blocks hydration, and never
 * initialised for visitors who have asked for reduced motion or who are on a
 * touch device (where the native scroller is already better than anything we
 * would replace it with).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersReducedMotion || isTouch) return

    let lenis
    let frame
    let cancelled = false

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return

        lenis = new Lenis({
          duration: 1.05,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
        })

        const raf = (time) => {
          lenis.raf(time)
          frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)
      })
      .catch(() => {
        // Native scrolling remains in place; nothing to recover from.
      })

    return () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return null
}
