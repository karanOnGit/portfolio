# karanbhardwaj.in

Portfolio of Karan Bhardwaj — Full Stack Engineer and AI systems architect.

Next.js App Router, deployed on Vercel. Rendering strategy is chosen per route
rather than applied uniformly, and the site says so on its own Capabilities
section, because the argument it makes is the one it demonstrates.

```bash
npm install
cp .env.example .env.local   # fill in as needed; every value is optional in dev
npm run dev                  # http://localhost:3000
```

---

## Rendering strategy, by route

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | Every section reads from `content/`, resolved at build. Nothing to recompute per request. |
| `/roadmap`, `/interests` | Static | Curated content, edited in the repository. |
| `/blog` | ISR — 5 min | Built statically, revalidated on a window, invalidated on demand by cache tag when a post is written. |
| `/blog/[slug]` | ISR — 5 min | Recent entries prerendered via `generateStaticParams`; the rest generated on first request (`dynamicParams`) and then cached. |
| `/guestbook` | SSR | `force-dynamic`. Someone who just signed the book must see their own entry. |
| `/studio` | SSR | Depends on the session cookie. Excluded from indexing. |
| `/sitemap.xml`, `/llms.txt` | ISR — 5 min | Generated from the same content modules and the live post list. |
| `/opengraph-image` | Static | Rendered once at build by `next/og`. |
| `/api/*` | Dynamic | Route handlers. |

Interactive elements — the journal filter and search, the clock, the copy
button, the editor, the guestbook form — hydrate as isolated client islands.
Everything around them stays server-rendered HTML.

### On-demand revalidation

Writes do not wait out the window. `lib/constants.js` defines the cache tags;
`lib/api/blog.js` attaches them to each `fetch`; the write routes call
`revalidateTag()` for exactly the entries they touched.

```bash
# From the CMS, or any machine caller holding the token
curl -X POST "https://karanbhardwaj.in/api/revalidate?token=$REVALIDATE_TOKEN&slug=my-post"
```

An author session works in place of the token, so the same endpoint is usable
from the browser while signed in.

---

## Layout

```
app/                    Routes. One directory per URL segment.
  layout.jsx            Fonts, metadata defaults, global chrome.
  page.jsx              Home — composes the sections.
  blog/                 Journal index and articles (ISR).
  guestbook/            SSR guestbook, with its client form.
  studio/               Author sign-in.
  api/                  Route handlers: auth, AI drafting, blog writes, revalidation.
  sitemap.js robots.js manifest.js llms.txt/  Generated SEO surfaces.
  opengraph-image.jsx   Social card, rendered by next/og.

components/
  layout/               Header, Footer.
  sections/             Home page sections. One file, one section.
  blog/                 Journal index, author tooling, render note.
  motion/               SketchField, Reveal, RevealAgent, SmoothScroll, ScrollProgress.
  ui/                   SectionHeading, ActionLink, TagList, JsonLd, HandRule, …

content/                All copy and data. No strings live in components.
  site.js career.js work.js roadmap.js interests.js

lib/
  env.js                Validated server config. Nothing is NEXT_PUBLIC_.
  seo.js                Metadata builder and JSON-LD emitters.
  sanitize.js           Server-side HTML sanitisation for CMS bodies.
  auth.js               HMAC-signed author session.
  rate-limit.js         Fixed-window limiter for auth and guestbook.
  sketch.js             Deterministic generator for the background drawing.
  api/                  blog.js, blog-input.js, guestbook.js, groq.js
  format.js constants.js

styles/                 tokens.css, globals.css, prose.css. Components use CSS Modules.
```

Content is separated from presentation on purpose: every string on the site can
be changed in `content/` without opening a component.

---

## Design

A paper-and-ink system. Warm off-white ground, near-black ink, a single burnt
sienna accent used sparingly and never as a gradient. All colour, type, spacing
and motion values are tokens in `styles/tokens.css`; components reference the
tokens, never raw values.

- **Type** — Instrument Serif for display, Inter for body and interface,
  JetBrains Mono for labels and metadata. Self-hosted by `next/font`, so there
  is no runtime request to Google and no layout shift.
- **Background** — `components/motion/SketchField.jsx` draws a topographic
  contour field generated deterministically by `lib/sketch.js`. It is a server
  component: the geometry ships as static markup and every movement is CSS, so
  the drawing costs no client JavaScript.
- **Scroll reveals** — `Reveal` is a server component that only writes
  attributes. One `IntersectionObserver`, mounted once in the layout, handles
  every marked element on the page.
- **Reduced motion** — honoured throughout. Without JavaScript, or with
  `prefers-reduced-motion`, all content renders immediately.

---

## Security

- No secret is prefixed `NEXT_PUBLIC_`, so none reaches the client bundle. The
  Groq key in particular is used only by `/api/ai/draft`, which is author-only
  and rate-limited.
- Article bodies from the CMS are sanitised server-side (`lib/sanitize.js`)
  before they are rendered with `dangerouslySetInnerHTML`.
- Journal writes require an author session: a passphrase exchanged for an
  HMAC-signed, `httpOnly`, `sameSite=strict` cookie. Every write route
  re-checks it; the client never decides authorisation.
- Login and guestbook submissions are rate-limited per address, and the
  guestbook carries a honeypot field.
- Security headers are set in `next.config.mjs`.

---

## Environment

See `.env.example`. Everything is optional for local development; the journal
and guestbook degrade to an empty state rather than erroring if their upstreams
are unreachable.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and OG images. |
| `BLOG_API_BASE` | Upstream content API for the journal. |
| `GUESTBOOK_API_URL` | Google Apps Script endpoint behind the guestbook. |
| `GROQ_API_KEY`, `GROQ_MODEL` | Draft generation in the editor. |
| `ADMIN_PASSPHRASE`, `SESSION_SECRET` | Author access to `/studio` and journal writes. |
| `REVALIDATE_TOKEN` | Shared token for `POST /api/revalidate`. |

---

## Known behaviour

**Missing articles return 200, not 404.** Next.js caches a `notFound()` render
on an ISR route as a prerendered page and replays it with a 200 status. The
page itself is correct — it renders the 404 design and emits
`robots: noindex, nofollow`, which is what actually keeps it out of search
indexes — but the status line is wrong. The article segment deliberately has no
`loading.jsx` for a related reason: a sibling loading file streams the shell,
committing a 200 before `notFound()` can run.

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

To verify a production build while a dev server is running in the same
checkout, point the build elsewhere so the two do not fight over `.next`:

```bash
NEXT_DIST_DIR=.next-verify npm run build && NEXT_DIST_DIR=.next-verify npm run start
```
