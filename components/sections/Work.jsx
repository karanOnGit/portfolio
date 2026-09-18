import { featuredProject, supportingProjects } from '@/content/work'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TagList from '@/components/ui/TagList'
import styles from './Work.module.css'

/**
 * Selected work.
 *
 * The rows are <article> elements rather than links, because most of this work
 * sits behind client domains I cannot link to publicly. Where a live URL does
 * exist, the name itself becomes the link.
 */
export default function Work() {
  return (
    <section className="section shell" id="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        index="02"
        eyebrow="Selected work"
        title={
          <>
            Systems built for <em>autonomy</em> and scale
          </>
        }
        lede="Production platforms across news automation, travel, commerce and education. Each one had a constraint that shaped the architecture — those are the parts worth reading."
      />

      {featuredProject ? (
        <Reveal className={styles.feature} distance={28}>
          <span className={styles.featureIndex} aria-hidden="true">
            01
          </span>

          <div>
            <div className={styles.featureTop}>
              <span className={styles.badge}>Featured</span>
              <span className={styles.kind}>
                {featuredProject.kind} · {featuredProject.year}
              </span>
            </div>

            <h3 className={styles.featureTitle}>{featuredProject.name}</h3>
            <p className={styles.featureSummary}>{featuredProject.summary}</p>

            <dl className={styles.notes}>
              <div className={styles.note}>
                <dt className={styles.noteKey}>Problem</dt>
                <dd className={styles.noteValue}>{featuredProject.problem}</dd>
              </div>
              <div className={styles.note}>
                <dt className={styles.noteKey}>Outcome</dt>
                <dd className={styles.noteValue}>{featuredProject.outcome}</dd>
              </div>
              <div className={styles.note}>
                <dt className={styles.noteKey}>Role</dt>
                <dd className={styles.noteValue}>{featuredProject.role}</dd>
              </div>
            </dl>

            <TagList items={featuredProject.stack} className={styles.featureTags} />
          </div>

          <div className={styles.pipeline}>
            <p className={styles.pipelineTitle}>Data path</p>
            {featuredProject.pipeline.map((step, index) => (
              <Reveal key={step} className={styles.step} delay={index * 90} distance={12}>
                <span className={styles.stepDot} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.stepLabel}>{step}</span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      ) : null}

      <div className={styles.index}>
        {supportingProjects.map((project, index) => (
          <Reveal
            key={project.slug}
            as="article"
            className={styles.row}
            delay={index * 60}
            distance={16}
            tabIndex={0}
            aria-label={`${project.name} — ${project.kind}`}
          >
            <div className={styles.rowHead}>
              <span className={styles.rowIndex}>{String(index + 2).padStart(2, '0')}</span>

              <h3 className={styles.rowName}>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>

              <span className={styles.rowKind}>{project.kind}</span>
              <span className={styles.rowYear}>{project.year}</span>
              <span className={styles.rowArrow} aria-hidden="true">
                {project.href ? '↗' : '·'}
              </span>
            </div>

            <div className={styles.rowSummaryWrap}>
              <span aria-hidden="true" />
              <p className={styles.rowSummary}>{project.summary}</p>
            </div>

            <div className={styles.rowBody}>
              <div className={styles.rowBodyInner}>
                <div className={styles.rowBodyContent}>
                  <span aria-hidden="true" />
                  <TagList items={project.stack} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
