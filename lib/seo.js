/**
 * lib/seo.js
 * Metadata and structured-data builders.
 *
 * Every route composes its <head> through `buildMetadata` so canonical URLs,
 * Open Graph images and robots directives stay consistent by construction.
 */

import { site, socials } from '@/content/site'
import { experience, education, capabilities } from '@/content/career'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * @param {object} options
 * @param {string} options.title      Page title, without the site suffix.
 * @param {string} options.description
 * @param {string} options.path       Route path, used for the canonical URL.
 * @param {string} [options.image]    Social image path or absolute URL.
 * @param {boolean} [options.noIndex] Excludes the route from search indexes.
 * @param {'website'|'article'|'profile'} [options.type]
 * @param {object} [options.article]  Article timestamps and tags, when type is article.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = site.ogImage,
  noIndex = false,
  type = 'website',
  article,
  keywords,
}) {
  const url = absoluteUrl(path)
  const ogImage = absoluteUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: type === 'profile' ? 'profile' : type,
      title,
      description,
      url,
      siteName: `${site.name} — ${site.role}`,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [absoluteUrl('/')],
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   JSON-LD
   Emitted per route through <JsonLd /> so each page carries exactly the graph
   nodes it can substantiate.
──────────────────────────────────────────────────────────────────────────── */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.name,
    url: SITE_URL,
    image: absoluteUrl(site.avatar),
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    alumniOf: education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.institution,
    })),
    worksFor: {
      '@type': 'Organization',
      name: experience[0].company,
    },
    knowsAbout: capabilities.flatMap((group) => group.items),
    sameAs: socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${site.name} — ${site.role}`,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': `${SITE_URL}/#person` },
  }
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': absoluteUrl(`/blog/${post.slug}#article`),
    headline: post.meta_title || post.title,
    description: post.meta_description || post.short_description,
    image: post.blog_image ? [post.blog_image] : [absoluteUrl(site.ogImage)],
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { '@type': 'Person', name: post.author || site.name },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.keywords?.join(', '),
    articleSection: post.category,
    inLanguage: site.language,
  }
}

export function itemListSchema(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  }
}

export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${site.name} — ${site.role} & ${site.secondaryRole}`,
    mainEntity: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
  }
}
