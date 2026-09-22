/**
 * content/prescriptions.js
 * Personal Empirical Formulary & Protocol Codex.
 * Documenting remedies, therapeutic interventions, and lived experiences
 * for persistent physiological symptoms.
 */

export const prescriptionCategories = [
  { id: 'all', label: 'All Protocols', count: 9 },
  { id: 'skin', label: 'Dermatology & Skin', count: 2 },
  { id: 'vitality', label: 'Vitality & Hormonal', count: 2 },
  { id: 'cardio', label: 'Cardio & Vasodilation', count: 2 },
  { id: 'mind', label: 'Stress & Focus', count: 1 },
  { id: 'immunity', label: 'Cellular & Metabolism', count: 2 },
]

export const prescriptions = [
  {
    id: 'facial-acne-isotretinoin',
    rxCode: 'RX-01',
    category: 'Dermatology',
    domainKey: 'skin',
    symptom: 'Facial Acne & Deep Cystic Pimples',
    symptomSubtitle: 'Chronic persistent breakouts, inflammatory nodules, and clogged sebaceous units',
    remedy: 'Isotretinoin Capsules IP 20 mg',
    form: 'Oral Capsule (Systemic Retinoid)',
    dosage: '20 mg / day (as clinically prescribed)',
    tags: ['Prescription Only', 'Systemic Retinoid', 'Sebum Reducer'],
    mechanism:
      'Downregulates sebaceous gland volume and reduces sebum output by up to 90%. Inhibits Cutibacterium acnes colonization, normalizes follicular keratinization, and prevents microcomedone formation.',
    experience:
      'After struggling with recurring facial cystic breakouts that failed topical antibiotics and washes, Isotretinoin 20 mg provided definitive, root-cause clearance. It halts persistent inflammation and completely alters skin oil architecture.',
    keyBenefits: [
      'Stops formation of new cystic lesions',
      'Normalizes skin surface turnover',
      'Drastically minimizes oil overproduction',
      'Long-term dermatological remission',
    ],
    protocolNotes:
      'Take strictly after a high-fat meal to maximize absorption. Requires rigorous lip care (ceramide balm), internal hydration, and periodic liver function/lipid profile monitoring under dermatological supervision.',
  },
  {
    id: 'cellular-hydration-hydrasalt',
    rxCode: 'RX-02',
    category: 'Cellular Hydration',
    domainKey: 'immunity',
    symptom: 'Dehydration, Brain Fog & Electrolyte Depletion',
    symptomSubtitle: 'Chronic dry mouth, midday energy crashes, muscle cramps, and poor cellular osmotic fluid balance',
    remedy: 'Wellbeing Nutrition Hydrasalt Electrolyte Drink',
    form: 'Dissolvable Effervescent / Drink Mix',
    dosage: '1 Serving in 500ml water daily or post-workout',
    tags: ['Ionic Electrolytes', 'Cellular Osmolarity', 'Zero Crash'],
    mechanism:
      'Delivers an optimal balance of bioavailable sodium, potassium, magnesium, and chloride ions to facilitate sodium-glucose co-transport in the gut, driving cellular fluid absorption far faster than plain water.',
    experience:
      'Plain water often passes right through without addressing cellular thirst during intense coding sprints or workouts. Hydrasalt restores mental alertness, sharpens cognitive focus, and eliminates muscle twitching and lethargy.',
    keyBenefits: [
      'Rapid cellular rehydration via ionic minerals',
      'Prevents headache, dizziness, and mental fatigue',
      'Supports optimal nerve signal transmission',
      'Restores muscle contraction capacity',
    ],
    protocolNotes:
      'Consume first thing in the morning upon waking or mid-afternoon when cognitive fatigue sets in. Dissolve completely in chilled water for peak palatability.',
  },
  {
    id: 'controlling-nightfall-charak-neo',
    rxCode: 'RX-03',
    category: 'Ayurvedic Vitality',
    domainKey: 'vitality',
    symptom: 'Nocturnal Emission (Nightfall) & Seminal Debility',
    symptomSubtitle: 'Involuntary seminal leakage, nocturnal emissions, bladder neck weakness, and post-discharge physical fatigue',
    remedy: 'Charak Neo Tablet',
    form: 'Herbo-Mineral Ayurvedic Tablet',
    dosage: '1–2 Tablets twice daily with milk/water',
    tags: ['Ayurvedic Formulation', 'Neuro-Muscular Tonic', 'Nerve Calming'],
    mechanism:
      'Combines Kapikachchhu, Shatavari, Hingula, and Vatsanabh to tone the neuro-muscular apparatus of the urinary and reproductive tract. Centrally calms excessive hyperexcitability of pelvic spinal centers.',
    experience:
      'Involuntary nocturnal loss caused significant energy depletion, anxiety, and guilt. Charak Neo restored tonus to pelvic floor muscles, stabilized nocturnal nerve excitement, and rebuilt systemic vigor.',
    keyBenefits: [
      'Strengthens bladder neck and pelvic sphincter tone',
      'Reduces central nervous hyperexcitability during REM sleep',
      'Alleviates post-emission weakness and lower back ache',
      'Traditional non-hormonal, side-effect-free therapy',
    ],
    protocolNotes:
      'Consistent administration for 6–8 weeks is essential. Avoid spicy, heavy meals and screen stimulation right before bedtime to maximize parasympathetic deep sleep.',
  },
  {
    id: 'stamina-mitochondria-shilajit',
    rxCode: 'RX-04',
    category: 'Adaptogen & Energy',
    domainKey: 'vitality',
    symptom: 'Low Physical Stamina, Sluggish Recovery & Vitality Slump',
    symptomSubtitle: 'Chronic mid-day exhaustion, slow athletic recovery, low baseline vigor, and diminished physical drive',
    remedy: 'Purified Shilajit (Asphaltum Punjabianum)',
    form: 'Standardized Resin / Purified Extract (60%+ Fulvic Acid)',
    dosage: 'Pea-sized portion (~250–500 mg) dissolved in warm milk or water',
    tags: ['Fulvic Acid Complex', 'Mitochondrial ATP', '84+ Ionic Minerals'],
    mechanism:
      'Rich in bioactive fulvic acid and dibenzo-alpha-pyrones that act as electron carriers in the mitochondrial respiratory chain. Accelerates ATP cellular synthesis and drives trace mineral delivery across cell membranes.',
    experience:
      'Shilajit produces a steady, non-jittery surge in physical endurance and cognitive stamina. It noticeably accelerated post-training muscular recovery and restored baseline morning vitality.',
    keyBenefits: [
      'Amplifies mitochondrial ATP energy production',
      'Provides 84+ naturally occurring ionic trace minerals',
      'Enhances oxygen-carrying capacity and endurance',
      'Supports healthy testosterone and endocrine equilibrium',
    ],
    protocolNotes:
      'Take in the morning on an empty stomach or pre-training. Always use lab-tested, heavy-metal-purified resin (avoid unpurified raw rock preparations).',
  },
  {
    id: 'stress-anxiety-ashwagandha',
    rxCode: 'RX-05',
    category: 'Neuro-Endocrine',
    domainKey: 'mind',
    symptom: 'Elevated Cortisol, Chronic Stress & Scattered Focus',
    symptomSubtitle: 'Restless mind, racing thoughts under high-pressure deadlines, shallow sleep, and adrenal exhaustion',
    remedy: 'Ashwagandha (Withania Somnifera / KSM-66 Extract)',
    form: 'Standardized Full-Spectrum Root Extract (Capsule / Powder)',
    dosage: '300–600 mg daily in the evening',
    tags: ['Withanolides Active', 'Cortisol Blocker', 'GABA Mimetic'],
    mechanism:
      'Modulates the hypothalamic-pituitary-adrenal (HPA) axis, significantly lowering circulating cortisol levels. Exhibits GABA-mimetic activity, calming hyperactive neurological pathways without day-time sedation.',
    experience:
      'When juggling demanding software deadlines, elevated stress created an agitated feedback loop of shallow sleep and daytime anxiety. Ashwagandha acts as an internal shock absorber, softening stress spikes and promoting restorative sleep.',
    keyBenefits: [
      'Clinically reduces serum cortisol levels',
      'Promotes deep, regenerative non-REM slow-wave sleep',
      'Protects neurons against oxidative stress and burnout',
      'Improves executive focus and emotional equanimity',
    ],
    protocolNotes:
      'Best taken with warm milk or a light dinner in the evening. Cycle intermittently (e.g. 8 weeks on, 2 weeks off) to prevent desensitization of receptor pathways.',
  },
  {
    id: 'cardiovascular-l-citrulline',
    rxCode: 'RX-06',
    category: 'Cardiovascular',
    domainKey: 'cardio',
    symptom: 'Poor Peripheral Circulation, High Vascular Resistance & Heart Strain',
    symptomSubtitle: 'Cold extremities, sub-optimal arterial compliance, sluggish blood pump, and poor endothelial dilation',
    remedy: 'L-Citrulline (Pure Fermented Amino Acid)',
    form: 'Pure Free-Form Powder / Capsules',
    dosage: '3g to 6g daily (or 45 minutes pre-exercise)',
    tags: ['Nitric Oxide Booster', 'Vasodilation', 'Endothelial Health'],
    mechanism:
      'Bypasses liver arginase breakdown and converts directly to L-Arginine in the kidneys. Fuels endothelial Nitric Oxide Synthase (eNOS) to elevate cyclic GMP, relaxing smooth arterial muscle and expanding vessel diameter.',
    experience:
      'Far more potent and stomach-friendly than standard L-Arginine. Dramatically improves arterial blood flow, warm peripheral capillary circulation, reduces resting arterial stiffness, and enhances workout endurance.',
    keyBenefits: [
      'Drives systemic Nitric Oxide (NO) synthesis',
      'Lowers systemic vascular resistance and blood pressure',
      'Enhances oxygen and nutrient delivery to tissues',
      'Clears metabolic ammonia and reduces muscular fatigue',
    ],
    protocolNotes:
      'Consume with water on an empty stomach. L-Citrulline (pure) is preferred over Citrulline Malate if taking solely for cardiovascular and endothelial health.',
  },
  {
    id: 'vascular-plaque-ed-shockwave',
    rxCode: 'RX-07',
    category: 'Regenerative Vascular',
    domainKey: 'cardio',
    symptom: 'Erectile Dysfunction (ED) & Micro-Vascular Plaque Buildup',
    symptomSubtitle: 'Impaired arterial inflow to erectile tissue, endothelial calcification, and micro-capillary narrowing',
    remedy: 'Shockwave Therapy (Low-Intensity Extracorporeal Shockwave Therapy / Li-ESWT)',
    form: 'Clinical Acoustic Wave Treatment Protocol',
    dosage: '6 to 12 Clinical Sessions (twice weekly, non-invasive)',
    tags: ['Neo-Vascularization', 'Plaque Dissolution', 'Drug-Free Restoration'],
    mechanism:
      'Transmits acoustic low-intensity soundwaves through penile corpora cavernosa. Triggers localized mechanical shear stress that stimulates VEGF (Vascular Endothelial Growth Factor), dissolving micro-arterial plaque and growing new functional blood vessels.',
    experience:
      'Unlike temporary PDE5 inhibitor pills (which merely mask symptoms for a few hours), Li-ESWT addresses the underlying mechanical vascular blockage. It physically rebuilds arterial architecture and restores spontaneous, natural hemodynamic potency.',
    keyBenefits: [
      'Triggers angiogenesis (formation of new micro-capillaries)',
      'Breaks down micro-arterial atherosclerotic plaque',
      'Restores intrinsic endothelial and smooth muscle reactivity',
      'Permanent regenerative outcome rather than temporary pill dependence',
    ],
    protocolNotes:
      'Must be performed using genuine focused/radial shockwave medical devices under clinical guidance. Non-invasive, completely painless, requiring zero downtime.',
  },
  {
    id: 'back-acne-benzoyl-peroxide',
    rxCode: 'RX-08',
    category: 'Dermatology',
    domainKey: 'skin',
    symptom: 'Back Acne (Bacne), Follicular Bumps & Body Pimples',
    symptomSubtitle: 'Deep sweat-trapped pustules across back and shoulders, bacterial folliculitis, and painful surface inflammation',
    remedy: 'Benzoyl Peroxide (2.5% to 5% Wash or Gel)',
    form: 'Topical Cleanser / Leave-on Gel',
    dosage: 'Apply once daily in shower; leave on skin for 3–5 minutes before rinsing',
    tags: ['Bactericidal Oxidizer', 'Pore Decongestant', 'Non-Resistance'],
    mechanism:
      'Releases active oxygen radicals deep into hair follicles, creating an aerobic environment that rapidly eradicates anaerobic Cutibacterium acnes bacteria without causing microbial resistance. Promotes mild keratolytic peeling.',
    experience:
      'Gym sweat and back friction made body acne a constant struggle. Applying a 5% Benzoyl Peroxide wash in the shower and leaving it for 3 minutes clears stubborn bacne within two weeks where normal body washes do nothing.',
    keyBenefits: [
      'Kills 99% of acne-causing bacteria on contact',
      'Bacteria cannot build resistance to peroxide oxidation',
      'Unplugs dense keratin plugs and sebum from torso follicles',
      'Prevents painful post-inflammatory hyperpigmentation',
    ],
    protocolNotes:
      'Rinse thoroughly as Benzoyl Peroxide can bleach colored towels and clothing. Start with 2.5% or 5% to avoid excessive skin irritation; higher 10% strengths cause more redness without extra efficacy.',
  },
  {
    id: 'immunity-metabolism-zinc',
    rxCode: 'RX-09',
    category: 'Essential Minerals',
    domainKey: 'immunity',
    symptom: 'Weak Immune Defenses, Slow Wound Healing & Sluggish Metabolism',
    symptomSubtitle: 'Frequent throat infections, prolonged skin recovery, brittle nails, and compromised enzymatic metabolism',
    remedy: 'Elemental Zinc (Zinc Picolinate or Gluconate 25 mg)',
    form: 'Oral Tablet / Capsule',
    dosage: '15–25 mg daily with a solid meal',
    tags: ['Enzymatic Cofactor', 'T-Cell Activation', 'Skin Repair'],
    mechanism:
      'Acts as an indispensable structural cofactor for over 300 essential enzymes and 1,000+ transcription factors. Regulates viral replication, promotes cellular protein synthesis, stimulates T-lymphocyte maturation, and facilitates tissue collagen repair.',
    experience:
      'Zinc is the foundational backbone of systemic defense. Whenever my immune resistance dipped or skin cuts lingered, supplementing Zinc Picolinate brought fast recovery, reduced seasonal sniffles, and fortified skin healing.',
    keyBenefits: [
      'Accelerates cutaneous tissue regeneration and scar recovery',
      'Inhibits viral replication and reduces duration of respiratory bugs',
      'Maintains healthy testosterone and endocrine homeostasis',
      'Supports thyroid hormone synthesis and optimal metabolic rate',
    ],
    protocolNotes:
      'Always ingest with a meal to avoid mild nausea. Long-term supplementation above 30 mg should be balanced with 1–2 mg of Copper to avoid copper depletion.',
  },
]
