'use client'

import { useEffect, useState } from 'react'
import { site } from '@/content/site'

/**
 * A live clock in my timezone.
 *
 * Renders the server-supplied fallback until mounted, so the markup the server
 * produced and the markup React expects on hydration always agree — a clock
 * rendered directly during SSR would mismatch within the same second.
 */
export default function LocalTime({ fallback = '—' }) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: site.timezone,
      }).format(new Date())

    setTime(format())
    const timer = setInterval(() => setTime(format()), 15_000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span suppressHydrationWarning>{time ? `${time} IST` : fallback}</span>
  )
}
