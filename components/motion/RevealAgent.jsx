'use client'

import { useEffect } from 'react'

/**
 * RevealAgent — the one piece of client code behind every scroll animation.
 *
 * It marks the document as script-enabled (so the CSS only hides content when
 * something can reveal it again), then watches for [data-reveal] elements with
 * a single IntersectionObserver. A MutationObserver picks up nodes added by
 * client navigation.
 *
 * Elements are unobserved once revealed — entrances play once, not on every
 * pass, which is what keeps long scrolls from feeling twitchy.
 */
export default function RevealAgent() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const reveal = (element) => {
      element.setAttribute('data-revealed', '')
      // Nested drawn paths share the parent's trigger.
      element.querySelectorAll?.('.draw-path').forEach((path) => {
        path.setAttribute('data-revealed', '')
      })
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(reveal)
      return () => root.classList.remove('js')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      },
      {
        // Fire a little before the element reaches the fold, so the motion has
        // finished by the time it is properly in view.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      },
    )

    const observeAll = () => {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach((element) => {
          // Anything already on screen at load should not animate in late.
          const { top } = element.getBoundingClientRect()
          if (top < window.innerHeight * 0.92) reveal(element)
          else observer.observe(element)
        })
    }

    observeAll()

    const mutations = new MutationObserver(observeAll)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      root.classList.remove('js')
    }
  }, [])

  return null
}
