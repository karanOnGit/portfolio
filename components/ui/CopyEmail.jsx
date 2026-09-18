'use client'

import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import styles from './CopyEmail.module.css'

/**
 * Copies my address to the clipboard, with a text-selection fallback for
 * browsers that refuse the Clipboard API outside a secure context.
 */
export default function CopyEmail({ label = 'Copy email', className }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard unavailable — hand the visitor their mail client instead.
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={[styles.button, className].filter(Boolean).join(' ')}
      data-state={copied ? 'copied' : 'idle'}
    >
      <span className={styles.glyph} aria-hidden="true">
        {copied ? '✓' : '⧉'}
      </span>
      <span>{copied ? 'Copied' : label}</span>
      <span className="visually-hidden" role="status" aria-live="polite">
        {copied ? `${site.email} copied to clipboard` : ''}
      </span>
    </button>
  )
}
