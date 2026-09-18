import { capabilities } from '@/content/career'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import styles from './Stack.module.css'

/**
 * Capabilities, plus a short note on how this site itself is rendered.
 *
 * The rendering note is not filler: choosing a strategy per route is the
 * argument the section is making, and the page in front of you is the example.
 */
const renderingStrategies = [
  {
    key: 'Static',
    body: (
      <>
        <b>This page.</b> Prerendered at build time and served from the edge as HTML. Nothing here
        changes between deploys, so nothing should be computed per request.
      </>
    ),
  },
  {
    key: 'ISR',
    body: (
      <>
        <b>The journal.</b> Built statically, revalidated on a window, and invalidated on demand by
        tag the moment a post is written — fresh content without a rebuild.
      </>
    ),
  },
  {
    key: 'SSR',
    body: (
      <>
        <b>The guestbook.</b> Rendered per request, uncached, because a visitor who has just signed
        it must see their own entry immediately.
      </>
    ),
  },
  {
    key: 'CSR',
    body: (
      <>
        <b>The interactive parts.</b> Filters, the editor and the clock hydrate as isolated islands.
        Everything around them stays server-rendered HTML.
      </>
    ),
  },
]

export default function Stack() {
  return (
    <section className="section shell" id="stack" aria-labelledby="stack-title">
      <SectionHeading
        id="stack-title"
        index="04"
        eyebrow="Capabilities"
        title={
          <>
            The tools, and <em>when</em> each one earns its place
          </>
        }
        lede="A stack is a set of trade-offs, not a badge collection. These are the ones I reach for, and the reasons they hold up under production traffic."
      />

      <div className={styles.grid}>
        {capabilities.map((group, index) => (
          <Reveal key={group.index} className={styles.cell} delay={index * 80} distance={22}>
            <span className={styles.numeral} aria-hidden="true">
              {group.index}
            </span>

            <h3 className={styles.title}>{group.title}</h3>
            <p className={styles.body}>{group.description}</p>

            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.itemMark} aria-hidden="true">
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className={styles.note}>
        <Reveal>
          <h3 className={styles.noteTitle}>
            How <em>this</em> site renders
          </h3>
        </Reveal>

        <Reveal className={styles.strategies} delay={90}>
          {renderingStrategies.map((strategy) => (
            <div key={strategy.key} className={styles.strategy}>
              <span className={styles.strategyKey}>{strategy.key}</span>
              <p className={styles.strategyValue}>{strategy.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
