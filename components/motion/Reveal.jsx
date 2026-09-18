/**
 * Reveal — marks an element for scroll-triggered entrance.
 *
 * Deliberately a server component: it only writes attributes and CSS custom
 * properties. A single observer mounted once in the layout (see RevealAgent)
 * handles every marked element on the page, so adding a hundred reveals adds
 * no additional client JavaScript.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  distance = 20,
  clip = false,
  className,
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-y': `${distance}px`,
        ...(clip ? { '--reveal-clip': 'inset(0 0 100% 0)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
