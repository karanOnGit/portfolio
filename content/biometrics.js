/**
 * content/biometrics.js
 * Empirical Biometric Specifications & Anthropometric Codex.
 * Documenting physiological baselines, physical proportions, and endocrine markers.
 */

export const biometricSummary = {
  subject: 'Karan Bhardwaj',
  logDate: 'September 22, 2026',
  somatotype: 'Ectomorphic / Hyper-Lean Athletic',
  phenotype: 'High-Metabolic Stature Frame',
}

export const coreMetrics = [
  {
    id: 'height',
    key: 'STATURE',
    label: 'Total Height',
    value: '6 ft 4 in',
    metricValue: '193.0 cm',
    subtext: '99th percentile vertical stature',
    pinCoords: { top: '16%', left: '50%' },
    category: 'Skeletal Frame',
    status: 'Elite Stature',
    highlight: 'Long-lever biomechanics with high vertical reach',
    description:
      'Standing at 193 cm (6\'4"), the skeletal architecture features extended femur and humerus lever arms, high wingspan reach, and an elongated thoracic cage characteristic of tall ectomorphic physiology.',
    clinicalTakeaway:
      'Requires intentional joint loading mechanics and dedicated posterior chain development to leverage mechanical moment arms efficiently in athletics.',
  },
  {
    id: 'weight',
    key: 'MASS',
    label: 'Body Weight',
    value: '70.0 kg',
    metricValue: '154.3 lbs',
    subtext: 'Logged on 22 Sep, 2026',
    pinCoords: { top: '78%', left: '50%' },
    category: 'Total Mass',
    status: 'Hyper-Lean Mass',
    highlight: 'Minimal non-functional tissue with high power-to-weight potential',
    description:
      'Total mass of 70 kg at 193 cm stature yields a lean, aerodynamic frame with virtually zero extraneous fat luggage. Extremely agile for calisthenics, running, and rapid acceleration.',
    clinicalTakeaway:
      'Caloric expenditure runs high due to large surface area heat dissipation. Requires high-density clean caloric surplus to build dense contractile muscle.',
  },
  {
    id: 'bmi',
    key: 'INDEX',
    label: 'Body Mass Index (BMI)',
    value: '17.83',
    metricValue: '17.83 kg/m²',
    subtext: 'Ultra-lean metabolic category',
    pinCoords: { top: '26%', left: '46%' },
    category: 'Proportional Ratio',
    status: 'Sub-18 Density',
    highlight: 'Minimal visceral adipose deposition',
    description:
      'At 17.83 kg/m², BMI reflects a tall, natural ectomorph with exceptionally low visceral and deep fat deposits. High basal insulin sensitivity and rapid carbohydrate partitioning.',
    clinicalTakeaway:
      'While standard population tables categorize sub-18.5 as lean, in athletic tall frames it signifies low cellular inflammation and absence of metabolic syndrome risks.',
  },
  {
    id: 'bodyfat',
    key: 'ADIPOSITY',
    label: 'Body Fat Percentage',
    value: '< 5%',
    metricValue: 'Sub-5% Essential',
    subtext: 'Visible vascularity & full striation',
    pinCoords: { top: '39%', left: '50%' },
    category: 'Body Composition',
    status: 'Essential Minimum',
    highlight: 'Complete abdominal separation & vascular definition',
    description:
      'Subcutaneous fat levels under 5% represent elite contest-lean conditioning. Zero subcutaneous water retention, clearly defined intercostal muscles, and visible venous vascularity across extremities.',
    clinicalTakeaway:
      'Essential fats must be guarded through quality dietary lipids (Omega-3s, ghee, avocados, whole eggs) to sustain hormone production and cellular myelin sheath integrity.',
  },
  {
    id: 'testosterone',
    key: 'ENDOCRINE',
    label: 'Total Testosterone',
    value: '500 ng/dL',
    metricValue: '17.34 nmol/L',
    subtext: 'Healthy endocrine homeostasis',
    pinCoords: { top: '48%', left: '50%' },
    category: 'Hormonal Baseline',
    status: 'Optimal Equilibrium',
    highlight: 'Natural androgenic balance sustaining vigor and drive',
    description:
      'A baseline reading of 500 ng/dL represents robust natural androgenic equilibrium within the healthy male physiological range (300–1000 ng/dL). Supports muscle protein synthesis, bone density, and neurochemical drive.',
    clinicalTakeaway:
      'Maintained naturally through circadian sleep optimization, zinc supplementation, shilajit mineral intake, and strength training without exogenous endocrine disruption.',
  },
  {
    id: 'anatomical',
    key: 'PELVIC',
    label: 'Anatomical Dimension',
    value: '*|* inches',
    metricValue: 'Documented dimension',
    subtext: 'Pelvic & Urological marker',
    pinCoords: { top: '53%', left: '50%' },
    category: 'Anatomical Telemetry',
    status: 'Verified Metric',
    highlight: 'Healthy urological tonus & micro-vascular endothelial compliance',
    description:
      'Individual pelvic and urological dimension recorded within personal anthropometric telemetry. Supported by nitric oxide optimization (L-Citrulline) and pelvic sphincter tonicity protocols (Charak Neo).',
    clinicalTakeaway:
      'Optimal micro-arterial blood inflow and endothelial health ensure complete functional vigor and tissue longevity.',
  },
]

export const derivedRatios = [
  {
    label: 'Lean Mass Ratio',
    value: '95%+',
    detail: 'Contractile bone & muscle',
  },
  {
    label: 'Estimated Basal Metabolic Rate',
    value: '~1,820 kcal',
    detail: 'Resting energy expenditure',
  },
  {
    label: 'Body Surface Area (DuBois)',
    value: '1.98 m²',
    detail: 'High environmental heat exchange',
  },
  {
    label: 'Ponderal Index',
    value: '9.74 kg/m³',
    detail: 'Tall linear lean morphology',
  },
]
