import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: custom, ease: [0.16, 1, 0.3, 1] }
    })
}

export default function About() {
    return (
        <section className="section" id="about">
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
                        <span>01</span> // The Foundation
                    </motion.div>
                    <motion.h2
                        className="section__title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.08}
                    >
                        Engineering autonomous products & <span>scalable systems</span>
                    </motion.h2>
                    <motion.p
                        className="section__subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.16}
                    >
                        A software engineer driven by automation, artificial intelligence, and rock-solid architecture.
                    </motion.p>
                </div>

                {/* About Grid: Profile Portrait + Philosophy Pillars */}
                <div className="about__grid">
                    {/* Left: Professional Portrait Card */}
                    <motion.div
                        className="about__profile-card"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                    >
                        <div className="about__image-wrapper">
                            <img
                                src="/professional-img.png"
                                alt="Karan Bhardwaj - Full Stack Engineer"
                                className="about__image"
                                loading="lazy"
                            />
                            <div className="about__image-gradient" />
                            <div className="about__image-meta">
                                <span className="about__image-name">Karan Bhardwaj</span>
                                <span className="about__image-role">Full Stack & AI Engineer</span>
                            </div>
                        </div>

                        <div className="about__badges-bar">
                            <span className="about__badge">
                                <span>📍</span> Mohali, Punjab
                            </span>
                            <span className="about__badge">
                                <span>🎓</span> Galgotias Univ • CSE '25
                            </span>
                            <span className="about__badge">
                                <span>⚡</span> AI & Automation
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Three Core Engineering Pillars */}
                    <div className="about__pillars">
                        <motion.div
                            className="pillar-card"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.25}
                        >
                            <div className="pillar-header">
                                <div className="pillar-icon">⚡</div>
                                <h3 className="pillar-title">Autonomous Web & Scraping Pipelines</h3>
                            </div>
                            <p className="pillar-text">
                                I design self-healing ingestion engines utilizing Python, Selenium, and FastAPI.
                                From autonomous news publishing to multi-source data crawlers, I minimize manual operations
                                through resilient server-side pipelines.
                            </p>
                        </motion.div>

                        <motion.div
                            className="pillar-card"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.32}
                        >
                            <div className="pillar-header">
                                <div className="pillar-icon">🧠</div>
                                <h3 className="pillar-title">AI-Native Product Architecture</h3>
                            </div>
                            <p className="pillar-text">
                                Integrating large language models (Groq API, Llama-3.3) directly into consumer web apps.
                                Specializing in automated content generation, dynamic markdown rendering, and intelligent
                                backend scheduling with sub-second latency.
                            </p>
                        </motion.div>

                        <motion.div
                            className="pillar-card"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.4}
                        >
                            <div className="pillar-header">
                                <div className="pillar-icon">🚀</div>
                                <h3 className="pillar-title">Performance & High-Speed Caching</h3>
                            </div>
                            <p className="pillar-text">
                                Architecting Next.js SSR apps with Redis multi-tier caching, clean RESTful APIs,
                                and MongoDB/MySQL optimizations that guarantee top Core Web Vitals and rapid Google indexation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
