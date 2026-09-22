import Link from 'next/link'
import { navigation, site, socials } from '@/content/site'
import Reveal from '@/components/motion/Reveal'
import styles from './Footer.module.css'

/**
 * Footer, with a colophon. Stating how the site is built is a small claim of
 * craft, and it happens to be the honest answer to the question this page is
 * meant to raise.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <Reveal className={styles.brandColumn}>
            <p className={styles.wordmark}>
              Let's build <em>something</em>
            </p>
            <p className={styles.blurb}>
              {site.availability}. The fastest way to reach me is email — I answer everything that
              is not a template.
            </p>
            <Link href="/contact" className={styles.directContactLink}>
              Send a message <span>→</span>
            </Link>
          </Reveal>

          <Reveal className={styles.column} delay={80}>
            <p className={styles.columnTitle}>Sections</p>
            {navigation.sections.map((item) => (
              <Link key={item.href} href={item.href} className={styles.columnLink}>
                {item.label}
              </Link>
            ))}
          </Reveal>

          <Reveal className={styles.column} delay={140}>
            <p className={styles.columnTitle}>Pages</p>
            {navigation.pages.map((item) => (
              <Link key={item.href} href={item.href} className={styles.columnLink}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className={styles.columnLink}>
              Contact
            </Link>
            <Link href="/prescriptions" className={styles.columnLink}>
              Prescriptions
            </Link>
            <Link href="/biometrics" className={styles.columnLink}>
              Biometrics
            </Link>
          </Reveal>

          <Reveal className={styles.column} delay={200}>
            <p className={styles.columnTitle}>Elsewhere</p>
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.columnLink}
                {...(item.href.startsWith('http')
                  ? { target: '_blank', rel: 'me noopener noreferrer' }
                  : {})}
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.resume}
              className={styles.columnLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </Reveal>
        </div>

        <div className={styles.meta}>
          <span>
            © {year} {site.name}
          </span>

          <p className={styles.colophon}>
          </p>

          <span className={styles.metaGroup}>
            <span>
              {site.location.city}, {site.location.country}
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
