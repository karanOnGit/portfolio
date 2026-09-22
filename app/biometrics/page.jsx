import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import SectionHeading from '@/components/ui/SectionHeading'
import BiometricInteractive from './BiometricInteractive'

export const dynamic = 'force-static'

export const metadata = buildMetadata({
  title: 'Biological Blueprint & Specifications',
  description:
    'Anthropometric specifications, anatomical proportions, and biological baselines of Karan Bhardwaj — height 6\'4", weight 70kg, body fat <5%, testosterone 500 ng/dL, and ectomorphic physical telemetry.',
  path: '/biometrics',
  keywords: [
    'biological blueprint',
    'Karan Bhardwaj height',
    'Karan Bhardwaj biometrics',
    'human specifications',
    'ectomorph physical telemetry',
    'anthropometric codex',
    'da vinci anatomical sketch',
  ],
})

export default function BiometricsPage() {
  return (
    <div className="section section--flush shell">
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Biometrics', path: '/biometrics' },
        ])}
      />

      <SectionHeading
        index="—"
        eyebrow="Biological Blueprint · Codex"
        title={
          <>
            The Physical <em>Specifications</em>
          </>
        }
        lede="A human machine defined in numbers. Classical anatomical proportions, measured endocrine markers, and anthropometric baselines documented as an empirical physical blueprint."
      />

      <BiometricInteractive />
    </div>
  )
}
