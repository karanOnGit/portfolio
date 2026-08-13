import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function About() {
    return (
        <section className="section" id="about">
            <hr className="section__divider" />
            <div style={{ paddingTop: 'var(--section-padding-y)' }}>
                <div className="about">
                    <div>
                        <motion.p
                            className="section__label"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0}
                        >
                            01 — About
                        </motion.p>
                        <motion.h2
                            className="section__heading"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            Building the<br />future of the web
                        </motion.h2>
                    </div>

                    <motion.div
                        className="about__text"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                    >
                        <p>
                            Based in <strong>Sahibzada Ajit Singh Nagar, Punjab</strong>, I specialize in
                            architecting scalable, automation-driven web applications and AI-powered systems.
                            A Computer Software Engineering graduate from <strong>Galgotias University</strong>,
                            I build innovative platforms that seamlessly combine generative AI, sophisticated
                            backend automation, and dynamic content distribution.
                        </p>
                        <p>
                            I bridge the gap between cutting-edge artificial intelligence and robust web
                            infrastructure, delivering high-performance, SEO-optimized digital ecosystems
                            that solve complex real-world challenges.
                        </p>

                        <div className="about__stats">
                            <div>
                                <div className="about__stat-value">1+</div>
                                <div className="about__stat-label">Years Exp</div>
                            </div>
                            <div>
                                <div className="about__stat-value">15+</div>
                                <div className="about__stat-label">Projects</div>
                            </div>
                            <div>
                                <div className="about__stat-value">2</div>
                                <div className="about__stat-label">Companies</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
