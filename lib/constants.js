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
  /**
   * Journal article — ISR. Matches the list window deliberately: the article
   * route also reads the list for its "keep reading" block, and a route's
   * effective revalidation is the shortest window among its data sources.
   */
  blogDetail: 300,
  /** Home page — effectively static, refreshed daily. */
  home: 86400,
}

export const ADMIN_COOKIE = 'kb_admin'
export const ADMIN_SESSION_TTL = 60 * 60 * 8 // 8 hours
