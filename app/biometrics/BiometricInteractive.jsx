'use client'

import { useState } from 'react'
import Image from 'next/image'
import { biometricSummary, coreMetrics, derivedRatios } from '@/content/biometrics'
import styles from './biometrics.module.css'

export default function BiometricInteractive() {
  const [activeId, setActiveId] = useState('height')
  const [unitSystem, setUnitSystem] = useState('imperial') // 'imperial' | 'metric'

  const activeMetric = coreMetrics.find((m) => m.id === activeId) || coreMetrics[0]

  const handlePinClick = (id) => {
    setActiveId(id)
    const element = document.getElementById(`metric-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <div className={styles.container}>
      {/* Spec Header Bar */}
      <div className={styles.specHeader}>
        <div className={styles.specIdentity}>
          <span className={styles.specTag}>Telemetry Protocol · Anthropometry</span>
          <h2 className={styles.specTitle}>
            {biometricSummary.subject} — <em>Physical Blueprint</em>
          </h2>
        </div>

        <div className={styles.specMetaList}>
          <div className={styles.specMetaItem}>
            <span className={styles.specMetaLabel}>Recorded Baseline</span>
            <span className={styles.specMetaVal}>{biometricSummary.logDate}</span>
          </div>
          <div className={styles.specMetaItem}>
            <span className={styles.specMetaLabel}>Somatotype</span>
            <span className={styles.specMetaVal}>{biometricSummary.somatotype}</span>
          </div>
          <div className={styles.specMetaItem}>
            <span className={styles.specMetaLabel}>Phenotype</span>
            <span className={styles.specMetaVal}>{biometricSummary.phenotype}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Blueprint Grid */}
      <div className={styles.blueprintLayout}>
        {/* Left Column: Anatomical Pencil Sketch Canvas */}
        <aside className={styles.sketchWrapper}>
          <div className={styles.sketchFrame}>
            <Image
              src="/anatomy-sketch.jpg"
              alt="Renaissance anatomical pencil sketch of male figure with Vitruvian drafting proportions"
              width={600}
              height={800}
              className={styles.sketchImage}
              priority
            />

            {/* Drafting Caliper Line Overlay */}
            <div className={styles.caliperOverlay} aria-hidden="true">
              <div className={styles.heightCaliper}>
                <span className={styles.heightBadge}>
                  {unitSystem === 'imperial' ? '6 ft 4 in' : '193 cm'}
                </span>
              </div>
            </div>

            {/* Interactive Callout Pins */}
            {coreMetrics.map((item) => {
              const isActive = activeId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  className={styles.hotspotPin}
                  style={{ top: item.pinCoords.top, left: item.pinCoords.left }}
                  data-active={isActive}
                  onClick={() => handlePinClick(item.id)}
                  title={`${item.label}: ${item.value}`}
                  aria-label={`View ${item.label}`}
                >
                  <span className={styles.pinRing} />
                  <span className={styles.pinCore} />
                </button>
              )
            })}
          </div>

          <div className={styles.sketchLegend}>
            <span>✦ Interactive Anatomy Pins (Click hotspot to inspect)</span>
            <span className={styles.activeHint}>Viewing: {activeMetric.label}</span>
          </div>
        </aside>

        {/* Right Column: Biometric Data Cards & Telemetry */}
        <section className={styles.ledgerSection}>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Physical Telemetry Metrics</span>
            <div className={styles.unitToggle} role="radiogroup" aria-label="Unit system">
              <button
                type="button"
                className={styles.unitBtn}
                data-active={unitSystem === 'imperial'}
                onClick={() => setUnitSystem('imperial')}
              >
                Imperial (ft / lbs)
              </button>
              <button
                type="button"
                className={styles.unitBtn}
                data-active={unitSystem === 'metric'}
                onClick={() => setUnitSystem('metric')}
              >
                Metric (cm / kg)
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className={styles.metricCardsGrid}>
            {coreMetrics.map((metric) => {
              const isSelected = activeId === metric.id
              const displayVal =
                unitSystem === 'imperial' ? metric.value : metric.metricValue

              return (
                <article
                  key={metric.id}
                  id={`metric-${metric.id}`}
                  className={styles.metricCard}
                  data-active={isSelected}
                  onClick={() => setActiveId(metric.id)}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.categoryBadge}>
                      [{metric.key}] {metric.category}
                    </span>
                    <span className={styles.statusPill}>{metric.status}</span>
                  </div>

                  <div className={styles.metricMain}>
                    <div>
                      <h3 className={styles.metricTitle}>{metric.label}</h3>
                      <span className={styles.metricHighlight}>
                        {metric.highlight}
                      </span>
                    </div>
                    <span className={styles.metricBigVal}>{displayVal}</span>
                  </div>

                  <p className={styles.metricDesc}>{metric.description}</p>

                  <div className={styles.clinicalBox}>
                    <strong>Physiological Takeaway:</strong> {metric.clinicalTakeaway}
                  </div>
                </article>
              )
            })}
          </div>

          {/* Derived Anthropometric Calculations */}
          <div className={styles.derivedSection}>
            <span className={styles.derivedTitle}>Derived Morphological Indicators</span>
            <div className={styles.ratiosGrid}>
              {derivedRatios.map((ratio) => (
                <div key={ratio.label} className={styles.ratioCard}>
                  <span className={styles.ratioVal}>{ratio.value}</span>
                  <span className={styles.ratioLabel}>{ratio.label}</span>
                  <span className={styles.ratioDetail}>{ratio.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
