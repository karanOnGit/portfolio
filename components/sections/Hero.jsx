import { site, metrics } from '@/content/site'
import { experience } from '@/content/career'
import Reveal from '@/components/motion/Reveal'
import HandRule from '@/components/ui/HandRule'
import ActionLink from '@/components/ui/ActionLink'
import CopyEmail from '@/components/ui/CopyEmail'
import LocalTime from '@/components/ui/LocalTime'
import styles from './Hero.module.css'

const current = experience[0]

export default function Hero() {
  return (
    <section className={`shell ${styles.hero}`} id="top">
      <Reveal className={styles.status} distance={10}>
        <span>
          {site.location.city}, {site.location.country}
        </span>
        <span className={styles.statusDivider} aria-hidden="true" />
        <LocalTime />
        <span className={styles.statusDivider} aria-hidden="true" />
        <span>Portfolio — {new Date().getFullYear()}</span>
      </Reveal>

      <div className={styles.grid}>
        <div>
          <h1 className={styles.nameplate}>
            <Reveal as="span" className={styles.line} distance={34}>
              Karan
            </Reveal>
            <Reveal
              as="span"
              className={`${styles.line} ${styles.lineOutline}`}
              distance={34}
              delay={110}
            >
              Bhardwaj
            </Reveal>
          </h1>

          <Reveal delay={220}>
            <p className={styles.role}>
              {site.role} &amp; <em>{site.secondaryRole}</em>
            </p>
            <HandRule width={260} tone="accent" delay={420} className={styles.roleRule} />
          </Reveal>

          <Reveal as="p" className={styles.lede} delay={300}>
            I build systems that run themselves — autonomous ingestion pipelines, generative AI in
            the critical path, and <strong>Next.js frontends</strong> that render fast enough to
            rank. Currently engineering at <strong>{current.company}</strong>.
          </Reveal>

          <Reveal className={styles.actions} delay={380}>
            <ActionLink href="#contact" variant="solid">
              Start a conversation
            </ActionLink>
            <CopyEmail />
            <ActionLink href="#work" variant="outline">
              Selected work
            </ActionLink>
          </Reveal>
        </div>

        {/* Title block — the facts, ruled and set in mono. */}
        <Reveal className={styles.plate} delay={260} distance={26}>
          <div className={styles.plateHead}>
            <span>Profile</span>
            <span>01 / 01</span>
          </div>

          <div className={styles.plateRow}>
            <span className={styles.plateKey}>Role</span>
            <span className={styles.plateValue}>
              {current.role}
              <small>{current.company}, since Feb 2026</small>
            </span>
          </div>

          <div className={styles.plateRow}>
            <span className={styles.plateKey}>Focus</span>
            <span className={styles.plateValue}>
              Autonomous systems
              <small>AI pipelines · FastAPI · Next.js</small>
            </span>
          </div>

          <div className={styles.plateRow}>
            <span className={styles.plateKey}>Based</span>
            <span className={styles.plateValue}>
              {site.location.city}, {site.location.region}
              <small>Remote-friendly across time zones</small>
            </span>
          </div>

          <div className={styles.plateRow}>
            <span className={styles.plateKey}>Education</span>
            <span className={styles.plateValue}>
              B.Tech, Computer Science
              <small>Galgotias University, 2025</small>
            </span>
          </div>

          <div className={styles.plateRow}>
            <span className={styles.plateKey}>Status</span>
            <span className={styles.plateValue}>
              {site.availability}
              <small>
                <ActionLink href={site.resume} arrow>
                  Résumé, PDF
                </ActionLink>
              </small>
            </span>
          </div>
        </Reveal>
      </div>

      <div className={styles.ledger}>
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} className={styles.ledgerItem} delay={index * 80}>
            <p className={styles.ledgerValue}>{metric.value}</p>
            <p className={styles.ledgerLabel}>{metric.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
