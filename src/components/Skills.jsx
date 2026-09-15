import { motion } from 'framer-motion'

const skillCategories = [
    {
        title: 'Generative AI & LLM Systems',
        icon: '🧠',
        desc: 'Integrating state-of-the-art LLMs into production applications with sub-second response times.',
        skills: [
            'Groq API',
            'Llama-3.3-70B',
            'Prompt Architecture',
            'Autonomous AI Agents',
            'Dynamic AI CMS',
            'Deep Learning Integrations',
        ],
    },
    {
        title: 'Full Stack & Web Core',
        icon: '⚡',
        desc: 'Building ultra-fast, SEO-dominant digital experiences with modern React and FastAPI backends.',
        skills: [
            'Next.js (SSR / ISR)',
            'React 19',
            'FastAPI (Python)',
            'Node.js & Express',
            'JavaScript (ES6+)',
            'Vanilla CSS Systems',
        ],
    },
    {
        title: 'Data, Caching & Storage',
        icon: '💾',
        desc: 'Architecting resilient databases, indexing strategies, and multi-tier memory caching.',
        skills: [
            'MongoDB Cluster',
            'MySQL Databases',
            'Redis Caching',
            'RESTful API Standards',
            'Database Profiling',
            'JSON Schemas',
        ],
    },
    {
        title: 'Automation & Cloud Infrastructure',
        icon: '🛠',
        desc: 'Automating multi-platform content distribution, data ingestion, and cloud delivery.',
        skills: [
            'Selenium Automation',
            'Python Data Crawlers',
            'SEO Automation',
            'Cloudflare Edge',
            'Vercel Deployment',
            'Git & CI/CD',
        ],
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: custom, ease: [0.16, 1, 0.3, 1] }
    })
}

export default function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container">
                {/* Section Header */}
                <div className="section__header">
                    <motion.div
                        className="section__tag"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                    >
                        <span>04</span> // Technical Arsenal
                    </motion.div>
                    <motion.h2
                        className="section__title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.08}
                    >
                        Frameworks, tools & <span>engineering craft</span>
                    </motion.h2>
                    <motion.p
                        className="section__subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.16}
                    >
                        Technologies I leverage daily to architect autonomous products and scalable applications.
                    </motion.p>
                </div>

                {/* 4-Quadrant Skills Grid */}
                <div className="skills-grid">
                    {skillCategories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            className="skill-matrix-card"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            custom={idx * 0.1}
                        >
                            <div className="matrix-header">
                                <span className="matrix-icon">{cat.icon}</span>
                                <div>
                                    <h3 className="matrix-title">{cat.title}</h3>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                                {cat.desc}
                            </p>
                            <div className="matrix-pills">
                                {cat.skills.map((skill) => (
                                    <span key={skill} className="matrix-pill">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
