import { site, socials } from '@/content/site'
import { projects } from '@/content/work'
import { capabilities, education, experience } from '@/content/career'
import { getPosts } from '@/lib/api/blog'
import { absoluteUrl } from '@/lib/seo'

/**
 * /llms.txt — an AI-readable summary of this site, in the llmstxt.org shape.
 *
 * Generated from the same content modules the pages render, so it cannot drift
 * out of date the way a hand-maintained copy does. Regenerated on the journal's
 * revalidation window so newly published entries are listed.
 */

export const revalidate = 300
export const dynamic = 'force-static'

function line(...parts) {
  return parts.filter(Boolean).join(' ')
}

export async function GET() {
  const posts = await getPosts()
  const updated = new Date().toISOString().slice(0, 10)

  const body = `# ${site.name}

> ${site.tagline}

${site.description}

- Canonical URL: ${site.url}
- Role: ${site.role} and ${site.secondaryRole}
- Location: ${site.location.city}, ${site.location.region}, ${site.location.country}
- Contact: ${site.email}
- Availability: ${site.availability}
- Last generated: ${updated}

## Pages

- [Portfolio](${absoluteUrl('/')}): selected work, experience, capabilities and contact details.
- [Journal](${absoluteUrl('/blog')}): published writing from the editorial platforms described below.
- [Roadmap](${absoluteUrl('/roadmap')}): a chronological account of education and career.
- [Interests](${absoluteUrl('/interests')}): long-running technical interests and the current learning queue.
- [Guestbook](${absoluteUrl('/guestbook')}): visitor notes, rendered per request.
- [Résumé](${absoluteUrl(site.resume)}): a one-page PDF.

## Experience

${experience
  .map((role) =>
    line(`- **${role.role}**, ${role.company} (${role.period}) —`, role.summary),
  )
  .join('\n')}

## Education

${education.map((item) => `- ${item.credential}, ${item.institution} (${item.period})`).join('\n')}

## Selected work

${projects
  .map((project) =>
    line(
      `- **${project.name}** (${project.year}, ${project.kind}) —`,
      project.summary,
      `Stack: ${project.stack.join(', ')}.`,
    ),
  )
  .join('\n')}

## Capabilities

${capabilities.map((group) => `- **${group.title}**: ${group.items.join(', ')}.`).join('\n')}

## Recent journal entries

${
  posts.length
    ? posts
        .slice(0, 20)
        .map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.summary}`)
        .join('\n')
    : '- No entries are currently available from the content API.'
}

## Elsewhere

${socials.map((item) => `- ${item.label}: ${item.href}`).join('\n')}

## How this site is built

Next.js App Router. The home page, roadmap and interests are prerendered
statically; the journal index and its articles use incremental static
regeneration on a five-minute window with on-demand invalidation by cache tag;
the guestbook is server-rendered per request. Interactive elements hydrate as
isolated client islands. Sitemap: ${absoluteUrl('/sitemap.xml')}
`

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
