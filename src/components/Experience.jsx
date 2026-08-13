import { motion } from 'framer-motion'

const experiences = [
    {
        period: 'Feb 2026 — Present',
        role: 'Full Stack Engineer',
        company: 'Creative Volt',
        location: 'Sahibzada Ajit Singh Nagar',
        details: [
            'Architected and deployed robust full-stack web applications utilizing React, Node.js, Express, and MongoDB, ensuring high availability and performance.',
            'Built FHMNews.com, a fully automated news platform that fetches, formats, and publishes content via API integrations, drastically reducing manual operational effort.',
            'Designed Python-based automation scripts leveraging Selenium and requests for seamless content ingestion, data scraping, and multi-platform distribution.',
            'Developed intelligent blogging systems utilizing Groq API and LLMs for automated content generation and dynamic scheduling.',
        ],
    },
    {
        period: 'Jul 2025 — Feb 2026',
        role: 'Associate Software Engineer',
        company: 'Flyhead Media',
        location: 'Gurugram',
        details: [
            'Developed and optimized dynamic web interfaces using Next.js and React.js, improving page load speeds and Core Web Vitals for better SEO performance.',
            'Designed and implemented efficient build procedures to streamline software development processes and deployment cycles.',
            'Engaged deeply in coding, testing, and documenting complex new systems to ensure bug-free, high-quality deliverables.',
        ],
    },
    {
        period: 'Apr 2025 — Jul 2025',
        role: 'Software Engineer Intern',
        company: 'Flyhead Media',
        location: 'Gurugram',
        details: [
            'Assisted the core engineering team in building and optimizing cross-platform applications using React Native.',
            'Implemented caching strategies and data structuring utilizing Redis, significantly enhancing data retrieval speeds.',
            'Collaborated in debugging and testing features to ensure stable releases in a fast-paced startup ecosystem.',
        ],
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function Experience() {
    return (
        <section className="section" id="experience">
            <motion.p
                className="section__label"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
            >
                02 — Experience
            </motion.p>
            <motion.h2
                className="section__heading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
            >
                Where I've worked
            </motion.h2>
            <motion.p
                className="section__subheading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
            >
                Building products that matter, from startups to scale.
            </motion.p>

            <div className="experience__list">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        className="experience__item"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        custom={idx * 0.1}
                    >
                        <div className="experience__date">{exp.period}</div>
                        <div>
                            <h3 className="experience__role">{exp.role}</h3>
                            <p className="experience__company">{exp.company} — {exp.location}</p>
                            <div className="experience__details">
                                {exp.details.map((detail, dIdx) => (
                                    <p key={dIdx} className="experience__detail">{detail}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
