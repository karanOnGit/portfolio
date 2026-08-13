import { motion } from 'framer-motion'

const skillCategories = [
    {
        title: 'Frontend',
        items: ['Next.js', 'React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'React Native'],
    },
    {
        title: 'Backend & APIs',
        items: ['FastAPI', 'Node.js / Express', 'Flask', 'RESTful APIs'],
    },
    {
        title: 'Databases & Cache',
        items: ['MongoDB', 'MySQL', 'Redis'],
    },
    {
        title: 'AI & Automation',
        items: ['Generative AI', 'Deep Learning', 'Selenium', 'Web Scraping', 'Groq API', 'LLMs'],
    },
    {
        title: 'Deployment',
        items: ['Vercel', 'Cloudflare', 'Netlify', 'Render', 'Git'],
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

export default function Skills() {
    return (
        <section className="section" id="skills">
            <motion.p
                className="section__label"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
            >
                04 — Skills
            </motion.p>
            <motion.h2
                className="section__heading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
            >
                Tech stack
            </motion.h2>
            <motion.p
                className="section__subheading"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
            >
                Technologies and tools I use to bring products to life.
            </motion.p>

            <div className="skills__grid">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        className="skills__category"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        custom={idx * 0.08}
                    >
                        <h3 className="skills__category-title">{category.title}</h3>
                        <ul className="skills__list">
                            {category.items.map((item) => (
                                <li key={item} className="skills__item">{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
