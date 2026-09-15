import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: custom, ease: [0.16, 1, 0.3, 1] }
    })
}

export default function Projects() {
    return (
        <section className="section" id="projects">
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
                        <span>02</span> // Selected Systems
                    </motion.div>
                    <motion.h2
                        className="section__title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.08}
                    >
                        Products built for <span>autonomy & scale</span>
                    </motion.h2>
                    <motion.p
                        className="section__subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.16}
                    >
                        A curated collection of production applications combining generative AI, backend automation, and high-performance frontends.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="projects-bento">
                    {/* Featured Bento Card (Full Width): FHMNews */}
                    <motion.div
                        className="bento-card bento-card--featured"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.15}
                    >
                        <div>
                            <div className="bento-header">
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className="bento-tag bento-tag--highlight">★ Featured Platform</span>
                                    <span className="bento-tag">Autonomous News Network</span>
                                </div>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">FHMNews</h3>
                            <p className="bento-subtitle">Autonomous News Ingestion & Publishing Pipeline</p>
                            <p className="bento-desc">
                                Engineered a completely autonomous digital news publication that continuously ingests external data feeds,
                                filters noise, enriches content with Groq LLMs, and auto-publishes SEO-optimized articles with zero human intervention.
                            </p>

                            {/* Visual Architecture Flow Diagram */}
                            <div className="bento-diagram">
                                <div className="diagram-node">Multi-API Ingestion</div>
                                <span className="diagram-arrow">➔</span>
                                <div className="diagram-node diagram-node--accent">Groq AI Engine</div>
                                <span className="diagram-arrow">➔</span>
                                <div className="diagram-node">FastAPI Server</div>
                                <span className="diagram-arrow">➔</span>
                                <div className="diagram-node diagram-node--accent">MongoDB Cluster</div>
                                <span className="diagram-arrow">➔</span>
                                <div className="diagram-node">Next.js Live SSR</div>
                            </div>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">FastAPI</span>
                            <span className="tech-pill">Python</span>
                            <span className="tech-pill">Selenium</span>
                            <span className="tech-pill">Groq API</span>
                            <span className="tech-pill">Open-Source LLMs</span>
                            <span className="tech-pill">MongoDB</span>
                            <span className="tech-pill">SEO Infrastructure</span>
                        </div>
                    </motion.div>

                    {/* Bento Card 2: Tripxpedia */}
                    <motion.div
                        className="bento-card bento-card--half"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.2}
                    >
                        <div>
                            <div className="bento-header">
                                <span className="bento-tag bento-tag--highlight">Online Travel Agency</span>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">Tripxpedia</h3>
                            <p className="bento-subtitle">Full-Stack Online Travel Agency Platform</p>
                            <p className="bento-desc">
                                Built a complete digital-first Online Travel Agency (OTA) platform enabling users to search, compare, and book flights, hotels, and vacation packages across 120+ destinations. Implemented real-time search flows, user dashboards, booking management, and technical SEO architecture for high organic discoverability.
                            </p>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">Next.js</span>
                            <span className="tech-pill">React</span>
                            <span className="tech-pill">OTA Engine</span>
                            <span className="tech-pill">Technical SEO</span>
                            <span className="tech-pill">Booking Flows</span>
                            <span className="tech-pill">Clean Architecture</span>
                        </div>
                    </motion.div>

                    {/* Bento Card 3: TheBusinessClassFly */}
                    <motion.div
                        className="bento-card bento-card--half"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.25}
                    >
                        <div>
                            <div className="bento-header">
                                <span className="bento-tag bento-tag--highlight">Luxury Travel & Aviation</span>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">TheBusinessClassFly</h3>
                            <p className="bento-subtitle">Premium Flight Booking Platform</p>
                            <p className="bento-desc">
                                Developed a specialized premium flight booking platform focused on Business and First Class inventory with transparent pricing and personalized booking flows. Handled frontend architecture, performance tuning, and technical SEO foundations for high-intent luxury travel keywords.
                            </p>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">Next.js</span>
                            <span className="tech-pill">Luxury Travel</span>
                            <span className="tech-pill">Technical SEO</span>
                            <span className="tech-pill">Performance Tuning</span>
                            <span className="tech-pill">Conversion UX</span>
                        </div>
                    </motion.div>

                    {/* Bento Card 4: Socioglamm */}
                    <motion.div
                        className="bento-card bento-card--half"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.3}
                    >
                        <div>
                            <div className="bento-header">
                                <span className="bento-tag">Dual-Module Ecosystem</span>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">Socioglamm Platform</h3>
                            <p className="bento-subtitle">E-Commerce & Community Video Ecosystem</p>
                            <p className="bento-desc">
                                Architected a dual-module consumer ecosystem combining an e-commerce marketplace for brand advertising with a social reel and video-sharing community engine. Engineered SSR and dynamic sitemaps for rapid Google indexing.
                            </p>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">Next.js</span>
                            <span className="tech-pill">React 19</span>
                            <span className="tech-pill">SSR</span>
                            <span className="tech-pill">MongoDB</span>
                            <span className="tech-pill">Video Streaming</span>
                            <span className="tech-pill">SEO Engine</span>
                        </div>
                    </motion.div>

                    {/* Bento Card 5: CarsNBike */}
                    <motion.div
                        className="bento-card bento-card--half"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.35}
                    >
                        <div>
                            <div className="bento-header">
                                <span className="bento-tag">Automotive Portal & CMS</span>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">CarsNBike Portal</h3>
                            <p className="bento-subtitle">Automotive Marketplace & Industry CMS</p>
                            <p className="bento-desc">
                                Developed a high-speed vehicle discovery portal featuring geolocation-based vehicle search, real-time inventory management, and an integrated blog CMS to capture automotive search traffic.
                            </p>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">Next.js</span>
                            <span className="tech-pill">Node.js</span>
                            <span className="tech-pill">Express</span>
                            <span className="tech-pill">MongoDB</span>
                            <span className="tech-pill">Geo-Filtering</span>
                            <span className="tech-pill">Blog Engine</span>
                        </div>
                    </motion.div>

                    {/* Bento Card 6: PMEDU4U */}
                    <motion.div
                        className="bento-card bento-card--featured"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        custom={0.4}
                    >
                        <div>
                            <div className="bento-header">
                                <span className="bento-tag">EdTech & Aptitude Simulation</span>
                                <span className="bento-link-arrow">↗</span>
                            </div>

                            <h3 className="bento-title">PMEDU4U Platform</h3>
                            <p className="bento-subtitle">Educational Portal & Simulated Interview Kit</p>
                            <p className="bento-desc">
                                Delivered an educational platform facilitating student enrollment and aptitude testing. Built an interactive 'Interview Preparation Kit' module featuring simulated test environments, automated grading, and live performance tracking.
                            </p>
                        </div>

                        <div className="bento-footer">
                            <span className="tech-pill">React</span>
                            <span className="tech-pill">Express.js</span>
                            <span className="tech-pill">MySQL</span>
                            <span className="tech-pill">Node.js</span>
                            <span className="tech-pill">Test Simulation Engine</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
