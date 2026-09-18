/**
 * content/interests.js — long-running interests and the current learning queue.
 */

export const interests = [
  {
    title: 'Full-stack architecture',
    tag: 'Core',
    body: 'Designing systems end to end, from schema to interface, and treating the whole stack as one product rather than two teams.',
    items: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
  },
  {
    title: 'Applied machine learning',
    tag: 'Deep dive',
    body: 'Fine-tuning, evaluation and the unglamorous work of getting a model to behave the same way twice in production.',
    items: ['PyTorch', 'LLMs', 'Hugging Face', 'Evals'],
  },
  {
    title: 'Technical SEO',
    tag: 'Edge',
    body: 'Render strategy, structured data, sitemap generation and Core Web Vitals — the infrastructure half of discoverability.',
    items: ['Schema.org', 'SSR / ISR', 'Sitemaps', 'CWV'],
  },
  {
    title: 'Creative development',
    tag: 'Side craft',
    body: 'Canvas, SVG and shader work. Interfaces that move with intent rather than for decoration.',
    items: ['Canvas', 'SVG', 'GLSL', 'Lenis'],
  },
  {
    title: 'Distributed systems',
    tag: 'Obsession',
    body: 'Consensus, partition behaviour and event-driven decomposition. Reading Raft properly instead of citing it.',
    items: ['Raft', 'Kafka', 'Docker', 'Queues'],
  },
  {
    title: 'Security',
    tag: 'Learning',
    body: 'Understanding how systems break in order to build them so they do not. Secure defaults over retrofitted patches.',
    items: ['OWASP', 'Auth flows', 'Encryption'],
  },
]

export const exploring = [
  {
    title: 'Rust for systems programming',
    body: 'Ownership, lifetimes and zero-cost abstractions, to get a sharper mental model of what the runtime is actually doing.',
    state: 'Active',
  },
  {
    title: 'Agent workflows in production',
    body: 'Multi-step tool-using pipelines with real failure handling, budget limits and observability.',
    state: 'Active',
  },
  {
    title: 'Distributed systems — MIT 6.824',
    body: 'Working the labs: MapReduce, Raft consensus, and a fault-tolerant key-value store.',
    state: 'Learning',
  },
  {
    title: 'WebGPU rendering',
    body: 'The next-generation GPU API in the browser, past the limits of WebGL.',
    state: 'Learning',
  },
  {
    title: 'Open-source contribution',
    body: 'A first substantial contribution to a production-grade project in the React ecosystem.',
    state: 'Planned',
  },
]
