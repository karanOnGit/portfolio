/**
 * content/work.js
 * Selected engineering work. `weight` drives ordering; `featured` promotes a
 * project into the large slot of the index grid.
 */

export const projects = [
  {
    slug: 'fhmnews',
    name: 'FHMNews',
    kind: 'Autonomous news network',
    year: '2026',
    featured: true,
    summary:
      'A newsroom that runs without a newsroom. It ingests external feeds, filters noise, rewrites each story through a Groq-hosted LLM and publishes SEO-complete articles with no human in the loop.',
    problem:
      'Manual curation capped publishing volume and delayed indexing by days.',
    outcome:
      'Continuous publishing with zero manual steps and same-day search indexing.',
    pipeline: [
      'Multi-source ingestion',
      'LLM synthesis',
      'FastAPI service layer',
      'MongoDB cluster',
      'SSR publish',
    ],
    stack: ['FastAPI', 'Python', 'Selenium', 'Groq API', 'MongoDB', 'Next.js'],
    role: 'Architecture, backend, automation',
    href: null,
  },
  {
    slug: 'tripxpedia',
    name: 'Tripxpedia',
    kind: 'Online travel agency',
    year: '2025',
    featured: false,
    summary:
      'A digital-first OTA covering flights, hotels and packages across 120+ destinations, with real-time search, booking management and a technical SEO layer built for organic acquisition.',
    problem: 'Search and booking flows had to stay fast under wide inventory fan-out.',
    outcome: 'Real-time comparison across 120+ destinations with crawlable route architecture.',
    stack: ['Next.js', 'React', 'Booking flows', 'Technical SEO', 'Dashboards'],
    role: 'Frontend architecture, SEO infrastructure',
    href: null,
  },
  {
    slug: 'thebusinessclassfly',
    name: 'TheBusinessClassFly',
    kind: 'Premium flight booking',
    year: '2025',
    featured: false,
    summary:
      'A booking platform scoped to business and first class inventory — transparent fare presentation, a personalised enquiry flow and a frontend tuned for high-intent luxury travel search.',
    problem: 'High-intent luxury queries convert only when pricing reads as honest and pages load instantly.',
    outcome: 'Conversion-focused funnel on a performance budget, ranking for premium-cabin terms.',
    stack: ['Next.js', 'Performance tuning', 'Technical SEO', 'Conversion UX'],
    role: 'Frontend architecture, performance',
    href: null,
  },
  {
    slug: 'socioglamm',
    name: 'Socioglamm',
    kind: 'Commerce + community',
    year: '2024',
    featured: false,
    summary:
      'A dual-module consumer platform: a commerce surface for partner brands beside a reel and video community engine, joined by server rendering and programmatic sitemaps for fast indexing.',
    problem: 'Two products with opposite caching needs had to share one domain and one index.',
    outcome: 'SSR plus dynamic sitemaps gave both modules rapid, independent indexing.',
    stack: ['Next.js', 'React', 'SSR', 'MongoDB', 'Video delivery'],
    role: 'Full stack',
    href: null,
  },
  {
    slug: 'carsnbike',
    name: 'CarsNBike',
    kind: 'Automotive marketplace',
    year: '2024',
    featured: false,
    summary:
      'A vehicle discovery portal with geolocation filtering, live inventory and an integrated editorial CMS that captures long-tail automotive search traffic.',
    problem: 'Listing portals die on slow filters and thin content.',
    outcome: 'Geo-filtered search paired with a content engine that earns its own traffic.',
    stack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'CMS'],
    role: 'Full stack',
    href: 'https://carsnbike.com',
  },
  {
    slug: 'pmedu4u',
    name: 'PMEDU4U',
    kind: 'EdTech platform',
    year: '2023',
    featured: false,
    summary:
      'Student enrolment and aptitude testing, plus an interview preparation module with simulated test environments, automated grading and per-attempt performance tracking.',
    problem: 'Mock tests need to feel like the real exam or students do not trust the score.',
    outcome: 'Timed simulation engine with automated grading and longitudinal tracking.',
    stack: ['React', 'Express', 'MySQL', 'Node.js'],
    role: 'Full stack',
    href: null,
  },
]

export const featuredProject = projects.find((project) => project.featured)
export const supportingProjects = projects.filter((project) => !project.featured)
