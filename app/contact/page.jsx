import { site, socials } from '@/content/site'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import SectionHeading from '@/components/ui/SectionHeading'
import LocalTime from '@/components/ui/LocalTime'
import CopyEmail from '@/components/ui/CopyEmail'
import ContactForm from './ContactForm'
import styles from './contact.module.css'

export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Karan Bhardwaj. Send a direct email or project inquiry regarding full-stack engineering, AI autonomous pipelines, and web applications.',
  path: '/contact',
  keywords: [
    'contact Karan Bhardwaj',
    'hire full stack engineer',
    'hire AI developer',
    'Mohali software engineer email',
  ],
})

export default function ContactPage() {
  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Contact"
        title={
          <>
            Start a <em>direct</em> conversation
          </>
        }
        lede="Have an ambitious problem, a full-stack role, or an autonomous AI pipeline you need built? Send me an email below or reach out across any channel."
      />

      <div className={styles.layout}>
        {/* Left Column: Direct Interactive Email Form */}
        <div>
          <ContactForm />
        </div>

        {/* Right Column: Direct Channels, Availability & Location */}
        <aside className={styles.sidebar}>
          {/* Primary Email Card */}
          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Direct Inbox</p>
            <a href={`mailto:${site.email}`} className={styles.directEmail}>
              {site.email}
            </a>
            <p className={styles.sideCardText}>
              I read every email that is not an automated marketing blast. For priority outreach, include a brief summary of the project or opportunity.
            </p>
            <div className={styles.emailActions}>
              <CopyEmail label="Copy Address" />
              <a
                href={`mailto:${site.email}`}
                className={styles.channelArrow}
                style={{ textDecoration: 'underline' }}
              >
                Open Mail ↗
              </a>
            </div>
          </div>

          {/* Location & Status Card */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <p className={styles.sideCardTitle}>Status & Base</p>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span>Available</span>
              </span>
            </div>

            <p className={styles.sideCardHighlight}>
              {site.availability}
            </p>

            <div className={styles.sideCardMeta}>
              <span>
                📍 {site.location.city}, {site.location.country}
              </span>
              <span>
                <LocalTime />
              </span>
            </div>
          </div>

          {/* Other Channels */}
          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Elsewhere</p>
            <div className={styles.channelsList}>
              {socials.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className={styles.channelRow}
                  {...(channel.href.startsWith('http')
                    ? { target: '_blank', rel: 'me noopener noreferrer' }
                    : {})}
                >
                  <span className={styles.channelLabel}>{channel.label}</span>
                  <span className={styles.channelArrow}>{channel.handle} ↗</span>
                </a>
              ))}
              <a
                href={site.resume}
                className={styles.channelRow}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.channelLabel}>Résumé</span>
                <span className={styles.channelArrow}>PDF ↗</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
