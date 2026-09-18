/**
 * lib/sketch.js
 * Deterministic generator for the background line drawing.
 *
 * The output is a set of concentric contour paths whose radii are modulated by
 * layered sine waves — the shape of a topographic survey rather than a perfect
 * circle. Everything is seeded, so the server render and any client hydration
 * produce byte-identical markup, and the drawing is stable across deploys.
 */

/** Mulberry32 — small, fast, and reproducible from an integer seed. */
function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Closes a list of points into a smooth path using Catmull-Rom segments
 * converted to cubic beziers. Catmull-Rom passes through every point, which is
 * what keeps the contour reading as a traced line rather than a blobby spline.
 */
function toClosedPath(points, precision = 2) {
  const round = (n) => Number(n.toFixed(precision))
  const at = (i) => points[(i + points.length) % points.length]

  let d = `M ${round(points[0].x)} ${round(points[0].y)}`

  for (let i = 0; i < points.length; i += 1) {
    const p0 = at(i - 1)
    const p1 = at(i)
    const p2 = at(i + 1)
    const p3 = at(i + 2)

    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2.x)} ${round(p2.y)}`
  }

  return `${d} Z`
}

/**
 * @param {object} options
 * @param {number} options.seed
 * @param {number} options.cx        Centre, in viewBox units.
 * @param {number} options.cy
 * @param {number} options.rings     Number of contour lines.
 * @param {number} options.innerRadius
 * @param {number} options.spacing   Distance between successive contours.
 * @param {number} options.amplitude Deformation strength, 0–1.
 * @returns {string[]} SVG path `d` strings, innermost first.
 */
export function contourField({
  seed = 7,
  cx = 500,
  cy = 500,
  rings = 14,
  innerRadius = 60,
  spacing = 26,
  amplitude = 0.26,
  samples = 72,
} = {}) {
  const random = seededRandom(seed)

  // Three harmonics per field: a broad lobe, a medium ripple, a fine wobble.
  const harmonics = [
    { frequency: 2 + Math.floor(random() * 2), phase: random() * Math.PI * 2, weight: 1 },
    { frequency: 3 + Math.floor(random() * 3), phase: random() * Math.PI * 2, weight: 0.45 },
    { frequency: 6 + Math.floor(random() * 4), phase: random() * Math.PI * 2, weight: 0.18 },
  ]

  const paths = []

  for (let ring = 0; ring < rings; ring += 1) {
    const baseRadius = innerRadius + ring * spacing
    // Outer contours deform more, as elevation lines do on real terrain.
    const ringAmplitude = amplitude * (0.35 + ring / rings)
    const drift = ring * 0.19

    const points = []
    for (let i = 0; i < samples; i += 1) {
      const angle = (i / samples) * Math.PI * 2

      const modulation = harmonics.reduce(
        (sum, h) => sum + Math.sin(angle * h.frequency + h.phase + drift) * h.weight,
        0,
      )

      const radius = baseRadius * (1 + modulation * ringAmplitude * 0.42)
      points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius * 0.86 })
    }

    paths.push(toClosedPath(points))
  }

  return paths
}

/**
 * Straight construction lines — the ruled guides an architect leaves on a
 * drawing. Angles are seeded but constrained so they never read as noise.
 */
export function constructionLines({ seed = 19, count = 5, width = 1000, height = 1000 } = {}) {
  const random = seededRandom(seed)
  const lines = []

  for (let i = 0; i < count; i += 1) {
    const vertical = random() > 0.55
    if (vertical) {
      const x = Math.round(width * (0.08 + random() * 0.84))
      lines.push({ x1: x, y1: 0, x2: x + Math.round((random() - 0.5) * 120), y2: height })
    } else {
      const y = Math.round(height * (0.08 + random() * 0.84))
      lines.push({ x1: 0, y1: y, x2: width, y2: y + Math.round((random() - 0.5) * 90) })
    }
  }

  return lines
}
