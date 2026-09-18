/**
 * lib/env.js
 * Central, validated access to runtime configuration.
 *
 * Nothing here is prefixed NEXT_PUBLIC_, so none of it is bundled into client
 * JavaScript. Modules that import this file must stay server-only.
 */

import 'server-only'

function optional(key, fallback = '') {
  const value = process.env[key]
  return value === undefined || value === '' ? fallback : value
}

function required(key) {
  const value = process.env[key]
  if (!value) {
    // Surface the misconfiguration at call time rather than shipping a silent 500.
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const env = {
  /** Canonical origin, used for metadataBase, sitemap and absolute OG URLs. */
  siteUrl: optional('NEXT_PUBLIC_SITE_URL', 'https://karanbhardwaj.in').replace(/\/$/, ''),

  /** Upstream content API backing the journal. */
  blogApi: optional('BLOG_API_BASE', 'https://api.carsnbike.com/api/blog').replace(/\/$/, ''),

  /**
   * Google Apps Script endpoint backing the guestbook. The default is the
   * endpoint the previous build shipped in client code, so the feature keeps
   * working without configuration; set the variable to point somewhere else.
   */
  guestbookApi: optional(
    'GUESTBOOK_API_URL',
    'https://script.google.com/macros/s/AKfycbx8VgsTao4Wl_YKAXXJu41lSMDT-aXBaXyPGXo5ZbhMCJuvmVGP8e9U8A6eEYFdvW4u/exec',
  ),

  /** Groq credentials — server side only. */
  get groqKey() {
    return required('GROQ_API_KEY')
  },
  groqModel: optional('GROQ_MODEL', 'qwen/qwen3-32b'),

  /** Shared secret gating write access to the journal. */
  get adminPassphrase() {
    return required('ADMIN_PASSPHRASE')
  },
  hasAdminPassphrase: Boolean(process.env.ADMIN_PASSPHRASE),

  /** Secret used to sign the admin session cookie. */
  get sessionSecret() {
    return process.env.SESSION_SECRET || required('ADMIN_PASSPHRASE')
  },

  /** Token required by the on-demand revalidation endpoint. */
  revalidateToken: optional('REVALIDATE_TOKEN', ''),

  isProduction: process.env.NODE_ENV === 'production',
}
