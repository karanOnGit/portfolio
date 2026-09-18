import { site } from '@/content/site'
import { buildMetadata, personSchema, websiteSchema, profilePageSchema } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import Stack from '@/components/sections/Stack'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

/**
 * Home — fully static.
 *
 * Every section reads from `content/`, which is resolved at build time, so
 * there is nothing to recompute per request. Next prerenders this route to
 * HTML and the CDN serves it without invoking a function at all.
 */
export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: `${site.name} — ${site.role} & ${site.secondaryRole}`,
  description: site.description,
  path: '/',
  type: 'profile',
  keywords: [
    'Karan Bhardwaj',
    'Full Stack Engineer',
    'AI Systems Architect',
    'Next.js developer India',
    'FastAPI engineer',
    'automation engineer Mohali',
    'generative AI web systems',
  ],
})

export default function HomePage() {
  return (
    <>
      <JsonLd schema={[personSchema(), websiteSchema(), profilePageSchema()]} />

      <Hero />
      <Work />
      <Experience />
      <Stack />
      <About />
      <Contact />
    </>
  )
}
