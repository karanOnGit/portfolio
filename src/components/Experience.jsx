import { motion } from 'framer-motion'

const experiences = [
    {
        period: 'Feb 2026 — Present',
        role: 'Full Stack Engineer',
        company: 'Creative Volt',
        location: 'Sahibzada Ajit Singh Nagar, Punjab',
        badge: 'Current Role',
        badgeColor: 'var(--accent-primary)',
        bullets: [
            'Architected and deployed full-stack web applications utilizing React, Node.js, Express, and MongoDB, ensuring 99.9% uptime and low latency.',
            'Built FHMNews, an autonomous news platform that fetches, synthesizes, and auto-publishes content via external API integrations with zero manual intervention.',
            'Designed Python automation pipelines leveraging Selenium and requests for seamless content ingestion, web scraping, and multi-channel distribution.',
            'Developed intelligent AI blogging systems using Groq API and Llama-3.3 for automated content curation and dynamic scheduling.',
            'Optimized database queries, API routing, and response speeds with FastAPI, significantly accelerating search engine indexing.',
        ],
        tags: ['FastAPI', 'React', 'Node.js', 'Selenium', 'Groq API', 'MongoDB', 'Python'],
    },
    {
        period: 'Jul 2025 — Feb 2026',
        role: 'Associate Software Engineer',
        company: 'Flyhead Media',
        location: 'Gurugram, India',
        badge: 'Promoted',
        badgeColor: '#818cf8',
        bullets: [
            'Developed and optimized dynamic web interfaces using Next.js and React.js, enhancing page speeds and Core Web Vitals for superior search rankings.',
            'Implemented streamlined automated build procedures to accelerate software development lifecycles and deployments.',
            'Tested, profiled, and documented complex production systems to maintain high test coverage and fault tolerance.',
        ],
        tags: ['Next.js', 'React.js', 'Core Web Vitals', 'Build Pipelines', 'SEO'],
    },
    {
        period: 'Apr 2025 — Jul 2025',
        role: 'Software Engineer Intern',
        company: 'Flyhead Media',
        location: 'Gurugram, India',
        badge: 'Internship',
        badgeColor: '#94a3b8',
        bullets: [
            'Assisted the core engineering team in developing and optimizing cross-platform mobile applications using React Native.',
            'Implemented in-memory caching strategies with Redis, substantially speeding up database query responses.',
            'Collaborated in rapid bug triaging, debugging, and feature rollouts in a fast-paced startup environment.',
        ],
        tags: ['React Native', 'Redis', 'Mobile UI', 'Startup Agility'],
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

export default function Experience() {
    return (
        <section className="section" id="experience">
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
                        <span>03</span> // Trajectory
                    </motion.div>
                    <motion.h2
                        className="section__title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.08}
                    >
                        Commercial experience & <span>proven impact</span>
                    </motion.h2>
                    <motion.p
                        className="section__subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.16}
                    >
                        Hands-on engineering across startups and scaleups, focusing on high availability and automation.
                    </motion.p>
                </div>

                {/* Experience Cards Stack */}
                <div className="experience-stack">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            className="exp-card"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            custom={idx * 0.12}
                        >
                            <div className="exp-card__header">
                                <div>
                                    <h3 className="exp-card__role">{exp.role}</h3>
                                    <p className="exp-card__company">
                                        <strong>{exp.company}</strong> — {exp.location}
                                    </p>
                                </div>

                                <div className="exp-card__meta">
                                    <span
                                        className="exp-card__badge"
                                        style={{ borderColor: exp.badgeColor, color: exp.badgeColor }}
                                    >
                                        {exp.badge}
                                    </span>
                                    <span className="exp-card__period">{exp.period}</span>
                                </div>
                            </div>

                            <div className="exp-card__bullets">
                                {exp.bullets.map((bullet, bIdx) => (
                                    <div key={bIdx} className="exp-card__bullet">
                                        <span className="bullet-dash">▹</span>
                                        <span>{bullet}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                                {exp.tags.map((tag) => (
                                    <span key={tag} className="tech-pill">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
