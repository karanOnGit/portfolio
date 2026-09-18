/**
 * HandRule — a horizontal rule drawn by hand rather than by `border-top`.
 *
 * The slight vertical wander is what separates it from a 1px line; combined
 * with the draw-on-reveal transition it reads as ink being laid down.
 */
export default function HandRule({ width = 220, className, tone = 'ink', delay = 120 }) {
  const stroke = tone === 'accent' ? 'var(--accent)' : 'var(--ink)'

  return (
    <svg
      className={className}
      width={width}
      height="10"
      viewBox={`0 0 ${width} 10`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path
        className="draw-path"
        style={{ '--path-length': width + 20, '--reveal-delay': `${delay}ms` }}
        d={`M1 6.2 C ${width * 0.2} 2.4, ${width * 0.42} 8.6, ${width * 0.62} 4.6 S ${width * 0.86} 2.2, ${width - 1} 5.4`}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
