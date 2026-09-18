/**
 * lib/sanitize.js
 * Article bodies arrive as HTML from an upstream CMS. They are rendered with
 * dangerouslySetInnerHTML, so they pass through here first — on the server,
 * before the markup ever reaches a response.
 */

import 'server-only'
import sanitizeHtml from 'sanitize-html'

const OPTIONS = {
  allowedTags: [
    'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'blockquote', 'pre', 'code', 'em', 'strong', 'del', 'mark', 'sub', 'sup',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'a', 'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
    'hr', 'br', 'span', 'div',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'rel', 'target'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
    code: ['class'],
    span: ['class'],
    div: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  transformTags: {
    // Outbound links must not leak referrer or hand over window.opener.
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.href && /^https?:/i.test(attribs.href)
          ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
          : {}),
      },
    }),
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: 'lazy', decoding: 'async' },
    }),
    // Upstream authors sometimes ship an <h1> inside the body; the page already
    // has one, so demote it to keep a single top-level heading per document.
    h1: () => ({ tagName: 'h2', attribs: {} }),
  },
  disallowedTagsMode: 'discard',
}

export function sanitizeArticleHtml(html = '') {
  if (!html) return ''
  return sanitizeHtml(String(html), OPTIONS)
}

/** For short, single-line fields (titles, names) rendered as text. */
export function sanitizeText(value = '') {
  return sanitizeHtml(String(value), { allowedTags: [], allowedAttributes: {} }).trim()
}
