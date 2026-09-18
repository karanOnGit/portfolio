/**
 * lib/constants.js
 * Values shared by both server and client bundles. Safe to import anywhere.
 */

/** Cache tags used with revalidateTag() for on-demand ISR invalidation. */
export const CACHE_TAGS = {
  blogList: 'blog:list',
  blogDetail: (slug) => `blog:detail:${slug}`,
}

/** Revalidation windows, in seconds. */
export const REVALIDATE = {
  /** Journal index — ISR. */
  blogList: 300,
  /** Journal article — ISR. */
  blogDetail: 600,
  /** Home page — effectively static, refreshed daily. */
  home: 86400,
}

export const ADMIN_COOKIE = 'kb_admin'
export const ADMIN_SESSION_TTL = 60 * 60 * 8 // 8 hours
