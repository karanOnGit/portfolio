'use client'

import { useMemo, useState } from 'react'
import { prescriptionCategories, prescriptions } from '@/content/prescriptions'
import styles from './prescriptions.module.css'

export default function PrescriptionList() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filteredPrescriptions = useMemo(() => {
    const q = query.trim().toLowerCase()

    return prescriptions.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.domainKey === selectedCategory
      if (!matchesCategory) return false

      if (!q) return true

      const haystack = [
        item.rxCode,
        item.symptom,
        item.symptomSubtitle,
        item.remedy,
        item.category,
        item.form,
        item.mechanism,
        item.experience,
        ...(item.tags || []),
        ...(item.keyBenefits || []),
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(q)
    })
  }, [selectedCategory, query])

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className={styles.container}>
      {/* Meta Bar with Stats & Print */}
      <div className={styles.metaBar}>
        <div className={styles.metaStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Protocols</span>
            <span className={styles.statVal}>{prescriptions.length} Catalogued</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Active View</span>
            <span className={styles.statVal}>
              {filteredPrescriptions.length} of {prescriptions.length} Visible
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Format</span>
            <span className={styles.statVal}>Empirical Personal Rx</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className={styles.printActionBtn}
          title="Print or Save PDF of this personal prescription ledger"
        >
          <span>🖨</span>
          <span>Print Ledger / PDF</span>
        </button>
      </div>

      {/* Medical & Experiential Disclaimer */}
      <div className={styles.disclaimerCard} role="note">
        <div className={styles.disclaimerTitle}>
          <span>⚠️</span>
          <span>Personal Empirical Log · Clinical Disclaimer</span>
        </div>
        <p className={styles.disclaimerText}>
          This page documents my individual trials, outcomes, and recovery experiences with specific symptoms I suffered through in the past. It is maintained so I never forget what works for my biology. <strong>This is not generic medical advice.</strong> Human physiology varies significantly; always consult a licensed medical doctor or dermatologist before initiating prescription medications or clinical interventions.
        </p>
      </div>

      {/* Filter Section: Search & Categories */}
      <div className={styles.filterSection}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by symptom (e.g. acne, nightfall, stamina, stress, plaque, hydration)..."
            className={styles.searchInput}
            aria-label="Search remedies and symptoms"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={styles.clearSearchBtn}
              aria-label="Clear search"
            >
              ✕ Clear
            </button>
          ) : null}
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills} role="tablist">
          {prescriptionCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              data-active={selectedCategory === cat.id}
              className={styles.categoryBtn}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className={styles.categoryCount}>
                {cat.id === 'all'
                  ? prescriptions.length
                  : prescriptions.filter((p) => p.domainKey === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {query || selectedCategory !== 'all' ? (
          <p className={styles.resultsNotice}>
            Showing {filteredPrescriptions.length} protocol{filteredPrescriptions.length === 1 ? '' : 's'} matching your criteria.
          </p>
        ) : null}
      </div>

      {/* Prescription Cards Grid */}
      {filteredPrescriptions.length > 0 ? (
        <div className={styles.cardsGrid}>
          {filteredPrescriptions.map((item) => (
            <article key={item.id} className={styles.rxCard} id={item.id}>
              {/* Header / Identity */}
              <div className={styles.rxHeader}>
                <div className={styles.rxIdentity}>
                  <span className={styles.rxSymbol} aria-hidden="true">℞</span>
                  <span className={styles.rxCode}>{item.rxCode}</span>
                </div>
                <span className={styles.rxCategoryBadge}>{item.category}</span>
              </div>

              {/* Target Symptom */}
              <div className={styles.symptomBlock}>
                <span className={styles.symptomTargetLabel}>Target Symptom</span>
                <h3 className={styles.symptomTitle}>{item.symptom}</h3>
                <p className={styles.symptomSubtitle}>{item.symptomSubtitle}</p>
              </div>

              {/* Prescribed Remedy Box */}
              <div className={styles.remedyBox}>
                <div className={styles.remedyMeta}>
                  <span className={styles.dosagePill}>
                    <span>●</span>
                    <span>{item.dosage}</span>
                  </span>
                  <span className={styles.formLabel}>{item.form}</span>
                </div>
                <h4 className={styles.remedyName}>{item.remedy}</h4>
              </div>

              {/* Mechanism of Action */}
              <div className={styles.sectionBlock}>
                <span className={styles.sectionHeading}>Physiological Mechanism</span>
                <p className={styles.sectionText}>{item.mechanism}</p>
              </div>

              {/* Lived Experience */}
              <div className={styles.experienceBox}>
                <span className={styles.experienceLabel}>Personal Experience & Takeaway</span>
                <blockquote className={styles.experienceQuote}>
                  "{item.experience}"
                </blockquote>
              </div>

              {/* Key Benefits Tags */}
              {item.keyBenefits && item.keyBenefits.length > 0 ? (
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionHeading}>Key Observed Benefits</span>
                  <div className={styles.benefitsList}>
                    {item.keyBenefits.map((benefit) => (
                      <span key={benefit} className={styles.benefitTag}>
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Protocol Notes & Precautions */}
              {item.protocolNotes ? (
                <div className={styles.protocolBox}>
                  <strong>Protocol Note:</strong> {item.protocolNotes}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No matching protocols found</p>
          <p className={styles.emptyText}>
            No remedies matched "{query}". Try clearing the search or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setSelectedCategory('all')
            }}
            className={styles.resetBtn}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  )
}
