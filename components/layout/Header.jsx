'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation, site } from '@/content/site'
import styles from './Header.module.css'

/**
 * Site header.
 *
 * A client component only because of two things that genuinely need the
 * browser: the condensed state on scroll, and the mobile sheet. Everything
 * inside it is otherwise static markup.
 */
export default function Header() {
  const pathname = usePathname()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  // Condense the bar once the page has moved past the hero's first line.
  useEffect(() => {
    let ticking = false
    const update = () => {
      setStuck(window.scrollY > 24)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Route changes must close the sheet, or navigation appears to do nothing.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While the sheet covers the page, the page behind it should not scroll.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const isCurrent = (href) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className={styles.header} data-stuck={stuck}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} — home`}>
          <span className={styles.mark}>
            Karan<span>.</span>
          </span>
          <span className={styles.markMeta}>{site.role}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navigation.sections.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}

          <span className={styles.divider} aria-hidden="true" />

          {navigation.pages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            Available
          </span>

          <a
            className={styles.resume}
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.toggleBars} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className={styles.sheet} id="mobile-navigation">
          <p className={styles.sheetGroup}>Sections</p>
          {navigation.sections.map((item, index) => (
            <Link key={item.href} href={item.href} className={styles.sheetLink}>
              <span>{item.label}</span>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </Link>
          ))}

          <p className={styles.sheetGroup}>Pages</p>
          {navigation.pages.map((item, index) => (
            <Link key={item.href} href={item.href} className={styles.sheetLink}>
              <span>{item.label}</span>
              <span>{String(index + 5).padStart(2, '0')}</span>
            </Link>
          ))}

          <p className={styles.sheetGroup}>Elsewhere</p>
          <a className={styles.sheetLink} href={site.resume} target="_blank" rel="noopener noreferrer">
            <span>Résumé</span>
            <span>PDF</span>
          </a>
        </div>
      ) : null}
    </header>
  )
}
