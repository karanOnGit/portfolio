import { chapters } from '@/content/roadmap'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TagList from '@/components/ui/TagList'
import ActionLink from '@/components/ui/ActionLink'
import styles from './roadmap.module.css'

/** Static — the timeline changes when I edit it, which means at deploy time. */
export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: 'Roadmap',
  description:
    'The road so far — from a small town in Bihar to architecting autonomous AI systems. Milestones, pivots and the work that shaped each of them.',
  path: '/roadmap',
  keywords: ['Karan Bhardwaj timeline', 'engineer career path', 'software engineer journey'],
})

export default function RoadmapPage() {
  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Roadmap', path: '/roadmap' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Roadmap"
        title={
          <>
            The road <em>so far</em>
          </>
        }
        lede="Six chapters, twenty-four years, and a fairly consistent habit of taking things apart to find out how they work."
      />

      <div className={styles.timeline}>
        <span className={styles.spine} aria-hidden="true" />

        {chapters.map((chapter, index) => (
          <Reveal
            key={chapter.year}
            as="article"
            className={styles.chapter}
            delay={index * 60}
            distance={26}
          >
            <span className={styles.node} aria-hidden="true" />

            <div className={styles.marker}>
              <span className={styles.year}>{chapter.year}</span>
              <span className={styles.label}>{chapter.chapter}</span>
            </div>

            <div>
              <h2 className={styles.title}>{chapter.title}</h2>
              <p className={styles.body}>{chapter.body}</p>
              <TagList items={chapter.tags} className={styles.tags} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.closing}>
        <h2 className={styles.closingTitle}>
          The next chapter is <em>unwritten</em>
        </h2>
        <ActionLink href="/#contact" variant="outline">
          Help me write it
        </ActionLink>
      </Reveal>
    </div>
  )
}
