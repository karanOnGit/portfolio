import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import SectionHeading from '@/components/ui/SectionHeading'
import PrescriptionList from './PrescriptionList'

export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: 'Personal Prescriptions & Protocol',
  description:
    'An empirical codex of remedies, compounds, and clinical interventions based on lived experience with persistent symptoms — from dermatology to vitality, cardiovascular, and cellular recovery.',
  path: '/prescriptions',
  keywords: [
    'personal prescriptions',
    'medical protocol',
    'isotretinoin experience',
    'shilajit energy',
    'ashwagandha cortisol',
    'l-citrulline blood flow',
    'shockwave therapy ed',
    'charak neo nightfall',
    'benzoyl peroxide bacne',
    'zinc immunity',
  ],
})

export default function PrescriptionsPage() {
  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Prescriptions', path: '/prescriptions' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Personal Formulary · Protocol"
        title={
          <>
            The Empirical <em>Prescriptions</em>
          </>
        }
        lede="A personal codex of remedies, clinical compounds, and therapeutic protocols discovered through trial, recovery, and lived physiological experience. Documented so I never forget what works for my biology."
      />

      <PrescriptionList />
    </div>
  )
}
