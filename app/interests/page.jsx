import { exploring, interests } from '@/content/interests'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TagList from '@/components/ui/TagList'
import styles from './interests.module.css'

/** Static — curated content, edited in the repository. */
export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: 'Interests',
  description:
    'What I read, build and study outside the day job: distributed systems, applied machine learning, technical SEO, creative development and security.',
  path: '/interests',
  keywords: ['engineering interests', 'distributed systems', 'applied machine learning'],
})

export default function InterestsPage() {
  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Interests', path: '/interests' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Interests"
        title={
          <>
            The things I chase when <em>nobody</em> is paying me to
          </>
        }
        lede="Curiosity that predates the job description. Some of it becomes work eventually; most of it just makes the work better."
      />

      <div className={styles.grid}>
        {interests.map((interest, index) => (
          <Reveal
            key={interest.title}
            as="article"
            className={styles.card}
            delay={index * 60}
            distance={22}
          >
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>{interest.title}</h2>
              <span className={styles.cardTag}>{interest.tag}</span>
            </div>
            <p className={styles.cardBody}>{interest.body}</p>
            <TagList items={interest.items} className={styles.cardItems} />
          </Reveal>
        ))}
      </div>

      <section className={styles.exploring} aria-labelledby="exploring-title">
        <Reveal className={styles.exploringHead}>
          <h2 className={styles.exploringTitle} id="exploring-title">
            Currently <em>exploring</em>
          </h2>
          <span className="label">{exploring.length} threads</span>
        </Reveal>

        {exploring.map((item, index) => (
          <Reveal key={item.title} className={styles.row} delay={index * 50} distance={16}>
            <span className={styles.state} data-state={item.state}>
              {item.state}
            </span>
            <div>
              <h3 className={styles.rowTitle}>{item.title}</h3>
              <p className={styles.rowBody}>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
