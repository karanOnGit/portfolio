import Image from 'next/image'
import { site } from '@/content/site'
import { principles } from '@/content/career'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ActionLink from '@/components/ui/ActionLink'
import styles from './About.module.css'

export default function About() {
  return (
    <section className="section shell" id="about" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        index="05"
        eyebrow="About"
        title={
          <>
            An engineer who would rather <em>automate</em> it than document it
          </>
        }
      />

      <div className={styles.grid}>
        <Reveal className={styles.portrait} distance={26}>
          <div className={styles.frame}>
            <Image
              src={site.portrait}
              alt={`${site.name}, ${site.role}`}
              width={1122}
              height={1402}
              className={styles.image}
              sizes="(max-width: 900px) 20rem, 22rem"
              priority={false}
            />
          </div>
          <div className={styles.caption}>
            <span>{site.name}</span>
            <span>
              {site.location.city}, {site.location.countryCode}
            </span>
          </div>
        </Reveal>

        <div>
          <div className={styles.prose}>
            <Reveal as="p" className={`${styles.paragraph} ${styles['paragraph--lead']}`}>
              I started building because something in the house needed fixing and taking it apart
              was more interesting than being told not to. That has not really changed — the
              objects are just larger now, and other people depend on them staying up.
            </Reveal>

            <Reveal as="p" className={styles.paragraph} delay={80}>
              My work sits where <strong>generative AI meets production web infrastructure</strong>.
              At Creative Volt I architect systems that ingest, synthesise and publish without a
              person in the loop: Python and Selenium at the edges, FastAPI in the middle,
              Groq-hosted models doing the writing, and Next.js serving the result fast enough to
              index the same day.
            </Reveal>

            <Reveal as="p" className={styles.paragraph} delay={140}>
              Before that, at Flyhead Media, I learned the less glamorous half of the craft —
              Core Web Vitals as a release gate, Redis in front of the read path, and build
              pipelines that make shipping boring. I graduated from Galgotias University in 2025,
              though most of what I use daily was learned against a deadline rather than in a
              lecture.
            </Reveal>
          </div>

          <div className={styles.principles}>
            {principles.map((principle, index) => (
              <Reveal key={principle.index} className={styles.principle} delay={index * 80}>
                <span className={styles.principleIndex} aria-hidden="true">
                  {principle.index}
                </span>
                <div>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} style={{ marginTop: 'var(--space-lg)' }}>
            <ActionLink href="/roadmap">Read the full timeline</ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
