import styles from './TagList.module.css'

/** A row of technology or topic tags. Purely presentational. */
export default function TagList({ items = [], tone = 'default', className, limit }) {
  const visible = limit ? items.slice(0, limit) : items
  if (!visible.length) return null

  return (
    <ul
      className={[styles.list, tone === 'accent' ? styles.accent : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {visible.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  )
}
