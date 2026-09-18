import { site, socials } from '@/content/site'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ActionLink from '@/components/ui/ActionLink'
import CopyEmail from '@/components/ui/CopyEmail'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className="section shell" id="contact" aria-labelledby="contact-title">
      <SectionHeading
        id="contact-title"
        index="06"
        eyebrow="Contact"
        title="Available for the next hard problem"
      />

      <div className={styles.panel}>
        <Reveal>
          <p className={styles.statement}>
            Let&apos;s build <em>something</em> <span className={styles.outline}>worth</span> keeping
            up.
          </p>
        </Reveal>

        <div className={styles.body}>
          <Reveal as="p" className={styles.copy} delay={80}>
            Autonomous pipelines, AI in the critical path, or a frontend that has to rank and load
            in under a second — those are the briefs I do my best work on. Tell me what is breaking
            and I will tell you honestly whether I am the right person for it.
          </Reveal>

          <Reveal className={styles.address} delay={140}>
            <a className={styles.mailto} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className={styles.actions}>
              <ActionLink href={`mailto:${site.email}`} variant="solid">
                Send an email
              </ActionLink>
              <CopyEmail label="Copy address" />
            </div>
          </Reveal>
        </div>

        <div className={styles.channels}>
          {socials.map((channel, index) => (
            <Reveal
              key={channel.label}
              as="a"
              href={channel.href}
              className={styles.channel}
              delay={index * 70}
              distance={14}
              {...(channel.href.startsWith('http')
                ? { target: '_blank', rel: 'me noopener noreferrer' }
                : {})}
            >
              <span className={styles.channelLabel}>{channel.label}</span>
              <span className={styles.channelValue}>{channel.handle}</span>
            </Reveal>
          ))}

          <Reveal
            as="a"
            href={site.resume}
            className={styles.channel}
            delay={210}
            distance={14}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.channelLabel}>Résumé</span>
            <span className={styles.channelValue}>Download PDF</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
