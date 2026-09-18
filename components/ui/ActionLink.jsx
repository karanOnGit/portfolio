import Link from 'next/link'
import styles from './ActionLink.module.css'

const VARIANTS = {
  quiet: styles.link,
  solid: styles.solid,
  outline: styles.outline,
}

/**
 * One link component for the three shapes the site uses: a quiet underlined
 * cross-reference, a solid primary action, and an outlined secondary action.
 *
 * Internal hrefs route through next/link for client-side navigation; external
 * ones fall back to a plain anchor with the right rel attributes.
 */
export default function ActionLink({
  href,
  variant = 'quiet',
  arrow = true,
  external,
  className,
  children,
  ...rest
}) {
  const classes = [VARIANTS[variant] || styles.link, className].filter(Boolean).join(' ')
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href || '')

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          {isExternal ? '↗' : '→'}
        </span>
      ) : null}
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  )
}
