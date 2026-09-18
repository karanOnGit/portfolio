import { experience, education } from '@/content/career'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TagList from '@/components/ui/TagList'
import styles from './Experience.module.css'

export default function Experience() {
  return (
    <section className="section shell" id="experience" aria-labelledby="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Trajectory"
        title={
          <>
            Where the work has <em>actually</em> been done
          </>
        }
        lede="Two companies, three titles, and a consistent brief: make the thing faster, then make it run without anyone watching it."
      />

      <div className={styles.list}>
        {experience.map((role, index) => (
          <Reveal
            key={`${role.company}-${role.role}`}
            as="article"
            className={styles.entry}
            delay={index * 70}
          >
            <div className={styles.aside}>
              <p className={styles.period}>{role.period}</p>
              <h3 className={styles.company}>{role.company}</h3>
              <p className={styles.place}>{role.location}</p>
              <span className={styles.status} data-current={role.end === null}>
                {role.status}
              </span>
            </div>

            <div>
              <p className={styles.role}>{role.role}</p>
              <p className={styles.summary}>{role.summary}</p>

              <ul className={styles.highlights}>
                {role.highlights.map((item, itemIndex) => (
                  <li key={item} className={styles.highlight}>
                    <span className={styles.highlightIndex} aria-hidden="true">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <TagList items={role.stack} className={styles.stack} />
            </div>
          </Reveal>
        ))}
      </div>

      <div className={styles.education}>
        <Reveal className={styles.aside}>
          <p className={styles.period}>Education</p>
        </Reveal>

        <Reveal className={styles.educationList} delay={80}>
          {education.map((item) => (
            <div key={item.institution + item.credential} className={styles.educationItem}>
              <div>
                <p className={styles.educationName}>{item.institution}</p>
                <p className={styles.educationMeta}>{item.credential}</p>
              </div>
              <p className={styles.educationPeriod}>{item.period}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
