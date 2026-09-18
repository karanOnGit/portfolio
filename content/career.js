/**
 * content/career.js
 * Employment history, education and capability groups.
 * Consumed by the home page and by the Person/JSON-LD builder in lib/seo.js.
 */

export const experience = [
  {
    company: 'Creative Volt',
    location: 'Mohali, Punjab',
    role: 'Full Stack Engineer',
    start: '2026-02',
    end: null,
    period: 'Feb 2026 — Present',
    status: 'Current',
    summary:
      'Own the architecture of automation-first products: autonomous publishing, AI content systems and the FastAPI services underneath them.',
    highlights: [
      'Architected and deployed full-stack applications on React, Node.js, Express and MongoDB with high-availability targets.',
      'Built FHMNews, an autonomous news platform that fetches, synthesises and publishes content with no manual step.',
      'Designed Python ingestion pipelines with Selenium and requests for scraping and multi-channel distribution.',
      'Shipped AI blogging systems on the Groq API with scheduled generation and editorial guardrails.',
      'Tuned queries, routing and API latency with FastAPI, accelerating search engine indexing.',
    ],
    stack: ['FastAPI', 'React', 'Node.js', 'Selenium', 'Groq API', 'MongoDB', 'Python'],
  },
  {
    company: 'Flyhead Media',
    location: 'Gurugram, India',
    role: 'Associate Software Engineer',
    start: '2025-07',
    end: '2026-02',
    period: 'Jul 2025 — Feb 2026',
    status: 'Promoted',
    summary:
      'Moved the product surface onto Next.js and made Core Web Vitals a release gate rather than an afterthought.',
    highlights: [
      'Built and optimised dynamic interfaces in Next.js and React, lifting page speed and Core Web Vitals.',
      'Streamlined build and deployment procedures to shorten release cycles.',
      'Tested, profiled and documented production systems to hold fault tolerance under load.',
    ],
    stack: ['Next.js', 'React', 'Core Web Vitals', 'Build pipelines', 'SEO'],
  },
  {
    company: 'Flyhead Media',
    location: 'Gurugram, India',
    role: 'Software Engineer Intern',
    start: '2025-04',
    end: '2025-07',
    period: 'Apr 2025 — Jul 2025',
    status: 'Internship',
    summary:
      'Joined the core team on cross-platform delivery and the caching layer behind it.',
    highlights: [
      'Built and optimised cross-platform applications in React Native alongside the core engineering team.',
      'Implemented Redis caching strategies that cut database query response times.',
      'Triaged, debugged and released features on a startup cadence.',
    ],
    stack: ['React Native', 'Redis', 'Mobile UI'],
  },
]

export const education = [
  {
    institution: 'Galgotias University',
    credential: 'B.Tech, Computer Software Engineering',
    period: 'Oct 2021 — May 2025',
  },
  {
    institution: 'Gyan Niketan',
    credential: 'Intermediate — Mathematics & Computer Science',
    period: 'Mar 2019 — Mar 2021',
  },
]

export const capabilities = [
  {
    index: '01',
    title: 'Generative AI systems',
    description:
      'LLMs wired into production paths, not demos — scheduled generation, structured output, retries and cost ceilings.',
    items: [
      'Groq API',
      'Qwen 3.8 / GPT-OSS',
      'Prompt architecture',
      'Autonomous agents',
      'AI-driven CMS',
    ],
  },
  {
    index: '02',
    title: 'Full stack & web core',
    description:
      'Next.js rendering strategy chosen per route, with FastAPI and Node services behind it.',
    items: [
      'Next.js — SSR / ISR / CSR',
      'React 19',
      'FastAPI',
      'Node.js & Express',
      'TypeScript-grade JS',
    ],
  },
  {
    index: '03',
    title: 'Data, caching & storage',
    description:
      'Schema design, index strategy and multi-tier caching that keeps read paths flat under load.',
    items: ['MongoDB', 'MySQL', 'Redis', 'REST API design', 'Query profiling'],
  },
  {
    index: '04',
    title: 'Automation & delivery',
    description:
      'Headless crawlers, scheduled jobs and the deploy surface that carries them.',
    items: ['Selenium', 'Python crawlers', 'SEO automation', 'Vercel & Cloudflare', 'Git & CI'],
  },
]

export const principles = [
  {
    index: '01',
    title: 'Automation over headcount',
    body: 'If a task repeats, it becomes a pipeline. Self-healing ingestion in Python, Selenium and FastAPI removes the manual step rather than documenting it.',
  },
  {
    index: '02',
    title: 'AI in the critical path',
    body: 'Generative models belong inside the product, with structured outputs, fallbacks and latency budgets — not bolted on as a feature flag.',
  },
  {
    index: '03',
    title: 'Speed is a feature',
    body: 'Render strategy per route, Redis in front of hot reads, indexes that match the query plan. Core Web Vitals are a release gate.',
  },
]
