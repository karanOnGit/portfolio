import Reveal from '@/components/motion/Reveal'
import HandRule from '@/components/ui/HandRule'
import styles from './SectionHeading.module.css'

/**
 * The standard section opener: numbered eyebrow, display title, drawn rule,
 * and an optional lede. Used by every section so vertical rhythm stays
 * identical across the page.
 */
export default function SectionHeading({ index, eyebrow, title, lede, id }) {
  return (
    <header className={styles.header}>
      <Reveal className={styles.eyebrow} distance={12}>
        {index ? <span className={styles.index}>{index}</span> : null}
        <span className={styles.divider} aria-hidden="true" />
        <span className="label">{eyebrow}</span>
      </Reveal>

      <Reveal delay={90} distance={24}>
        <h2 className={styles.title} id={id}>
          {title}
        </h2>
      </Reveal>

      <Reveal delay={160} distance={0} className={styles.rule}>
        <HandRule width={180} delay={260} />
      </Reveal>

      {lede ? (
        <Reveal as="p" delay={220} className={styles.lede}>
          {lede}
        </Reveal>
      ) : null}
    </header>
  )
}
