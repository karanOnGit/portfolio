import { motion } from 'framer-motion'

const projects = [
    {
        title: 'FHMNews',
        subtitle: 'Autonomous News Platform',
        description: 'Engineered a fully autonomous news platform designed to fetch, process, and publish high-quality content via external APIs with minimal manual intervention. Optimized data pipelines and server-side logic for maximum efficiency.',
        tags: ['FastAPI', 'Python', 'Selenium', 'Groq API', 'MongoDB'],
    },
    {
        title: 'Socioglamm',
        subtitle: 'Dual-Module Social Ecosystem',
        description: 'Architected a dual-module ecosystem using Next.js — E-commerce for brand advertising and Community for video/reel uploads. Implemented SSR and dynamic sitemap generation for rapid Google indexing.',
        tags: ['Next.js', 'React', 'SSR', 'SEO', 'MongoDB'],
    },
    {
        title: 'CarsNBike',
        subtitle: 'Automotive Listing & CMS',
        description: 'Developed a dynamic listing portal with location-based filtering for cars and bikes, plus a blog CMS to track automobile industry trends and drive organic traffic.',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'SEO'],
    },
    {
        title: 'PMEDU4U',
        subtitle: 'EdTech Platform & Testing',
        description: 'Delivered a full-stack educational platform facilitating student enrollment and aptitude testing, featuring an Interview Preparation Kit module with simulated tests.',
        tags: ['React', 'Express', 'MySQL', 'Node.js'],
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

export default function Projects() {
    return (
        <section className="section" id="projects">
            <motion.p
                className="section__label"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
            >
                03 — Projects
            </motion.p>
            <motion.h2
                className="section__heading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
            >
                Selected work
            </motion.h2>
            <motion.p
                className="section__subheading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
            >
                A collection of projects that showcase my expertise in full-stack development, AI integration, and automation.
            </motion.p>

            <div className="projects__grid">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        className="project-card"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        custom={idx * 0.1}
                    >
                        <div className="project-card__header">
                            <span className="project-card__icon">⬡</span>
                        </div>
                        <h3 className="project-card__title">{project.title}</h3>
                        <p className="project-card__subtitle">{project.subtitle}</p>
                        <p className="project-card__description">{project.description}</p>
                        <div className="project-card__tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="project-card__tag">{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
