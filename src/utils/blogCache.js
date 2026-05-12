/**
 * blogCache.js — sessionStorage-backed cache for blog data.
 *
 * Keys used in sessionStorage:
 *   blog_list          → full array of all blogs from /api/blog/
 *   blog_list_ts       → timestamp (ms) when the list was cached
 *   blog_detail_{slug} → individual blog object from /api/blog/{slug}
 *
 * Strategy:
 *   - List TTL: 5 minutes (avoids stale listing, but cuts API hits per session)
 *   - Detail TTL: 10 minutes (details change less often)
 *   - After any mutation (create/edit/delete), call invalidate() to bust the cache
 */

const LIST_KEY     = 'blog_list';
const LIST_TS_KEY  = 'blog_list_ts';
const LIST_TTL_MS  = 5  * 60 * 1000;   // 5 min
const DETAIL_TTL_MS = 10 * 60 * 1000;  // 10 min

function detailKey(slug) { return `blog_detail_${slug}`; }
function detailTsKey(slug) { return `blog_detail_ts_${slug}`; }

// ── safe JSON helpers ─────────────────────────────────────────────────────────

function ssGet(key) {
    try { return JSON.parse(sessionStorage.getItem(key)); }
    catch { return null; }
}

function ssSet(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); }
    catch { /* quota exceeded — silently skip caching */ }
}

function ssRemove(key) {
    try { sessionStorage.removeItem(key); }
    catch { /* ignore */ }
}

// ── List cache ────────────────────────────────────────────────────────────────

export function getCachedList() {
    const ts  = ssGet(LIST_TS_KEY);
    const age = Date.now() - (ts ?? 0);
    if (age > LIST_TTL_MS) return null;          // expired
    return ssGet(LIST_KEY);                       // may still be null if never set
}

export function setCachedList(arr) {
    ssSet(LIST_KEY,    arr);
    ssSet(LIST_TS_KEY, Date.now());
}

// ── Detail cache ──────────────────────────────────────────────────────────────

export function getCachedDetail(slug) {
    const ts  = ssGet(detailTsKey(slug));
    const age = Date.now() - (ts ?? 0);
    if (age > DETAIL_TTL_MS) return null;
    return ssGet(detailKey(slug));
}

export function setCachedDetail(slug, blog) {
    ssSet(detailKey(slug),   blog);
    ssSet(detailTsKey(slug), Date.now());
}

// ── Invalidation ──────────────────────────────────────────────────────────────

/**
 * Call after any successful create / edit / delete.
 * @param {string|null} slug  If provided, only bust that slug's detail cache too.
 *                            Pass null to bust the list only.
 */
export function invalidateCache(slug = null) {
    ssRemove(LIST_KEY);
    ssRemove(LIST_TS_KEY);
    if (slug) {
        ssRemove(detailKey(slug));
        ssRemove(detailTsKey(slug));
    } else {
        // Bust ALL detail entries when slug unknown (e.g. after create)
        Object.keys(sessionStorage)
            .filter(k => k.startsWith('blog_detail_'))
            .forEach(k => ssRemove(k));
    }
}

/**
 * Convenience: update a single detail entry in-place after an edit
 * without busting everything else.
 */
export function patchCachedDetail(slug, updatedBlog) {
    ssSet(detailKey(slug),   updatedBlog);
    ssSet(detailTsKey(slug), Date.now());

    // Also patch the list array so cards reflect the change immediately
    const list = ssGet(LIST_KEY);
    if (Array.isArray(list)) {
        const idx = list.findIndex(b => b.slug === slug || b.id === updatedBlog.id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...updatedBlog };
            ssSet(LIST_KEY, list);
        }
    }
}

/**
 * Remove one item from the cached list after deletion.
 */
export function removeCachedItem(id, slug) {
    if (slug) {
        ssRemove(detailKey(slug));
        ssRemove(detailTsKey(slug));
    }
    const list = ssGet(LIST_KEY);
    if (Array.isArray(list)) {
        const filtered = list.filter(b => b.id !== id && b.slug !== slug);
        ssSet(LIST_KEY, filtered);
    }
}
