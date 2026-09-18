/**
 * app/fonts.js
 * Three families, each with a job:
 *   Instrument Serif — display. Editorial, high contrast, with a real italic.
 *   Inter            — body and interface. Variable, so one file covers weights.
 *   JetBrains Mono   — labels, indices and metadata. The engineering voice.
 *
 * next/font self-hosts each file at build time, so there is no request to
 * Google at runtime, no render-blocking stylesheet and no layout shift.
 */

import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  axes: ['opsz'],
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono-jetbrains',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})

export const fontClassNames = [
  instrumentSerif.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(' ')
