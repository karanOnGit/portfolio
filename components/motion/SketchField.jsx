import { contourField, constructionLines } from '@/lib/sketch'
import styles from './SketchField.module.css'

/**
 * SketchField — the background drawing.
 *
 * A server component by design: the geometry is generated once at build time
 * and shipped as static markup, so the page carries no JavaScript for it. All
 * movement is CSS, composited on the GPU, and disabled under reduced motion.
 */

const VIEW = 1000

// Two overlapping fields, offset and counter-rotating, read as depth without
// needing a second colour or a blur.
const primary = contourField({
  seed: 11,
  cx: 690,
  cy: 300,
  rings: 15,
  innerRadius: 52,
  spacing: 27,
  amplitude: 0.3,
})

const secondary = contourField({
  seed: 29,
  cx: 220,
  cy: 760,
  rings: 11,
  innerRadius: 44,
  spacing: 31,
  amplitude: 0.36,
})

const guides = constructionLines({ seed: 41, count: 5, width: VIEW, height: VIEW })

export default function SketchField() {
  return (
    <div className={styles.field} aria-hidden="true">
      <div className={styles.grid} />

      <svg
        className={styles.canvas}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className={styles.guides}>
          {guides.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              style={{ animationDelay: `${index * 1.6}s` }}
            />
          ))}
        </g>

        <g className={styles.contours}>
          {primary.map((d, index) => (
            <path key={index} d={d} style={{ animationDelay: `${index * 90}ms` }} />
          ))}
        </g>

        <g className={styles.contoursAlt}>
          {secondary.map((d, index) => (
            <path key={index} d={d} style={{ animationDelay: `${400 + index * 110}ms` }} />
          ))}
        </g>
      </svg>

      {/* Paper grain, generated in-browser by the filter rather than shipped
          as a texture image. */}
      <svg className={styles.grain} focusable="false">
        <filter id="sketch-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sketch-grain)" />
      </svg>
    </div>
  )
}
