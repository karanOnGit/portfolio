import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Ambient gradient orb */}
            <div className="hero__orb" />

            <div className="hero__content">
                <motion.p
                    className="hero__greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    Hi, I'm
                </motion.p>

                <motion.h1
                    className="hero__name"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    Karan Bhardwaj
                </motion.h1>

                <motion.p
                    className="hero__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span>Full Stack Engineer</span> & AI/Automation Architect
                </motion.p>

                <motion.p
                    className="hero__description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    I build scalable, automation-driven web applications and AI-powered
                    systems that bridge the gap between cutting-edge AI and robust
                    web infrastructure.
                </motion.p>

                <motion.div
                    className="hero__cta-group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a href="#contact" className="hero__cta hero__cta--primary" onClick={(e) => {
                        e.preventDefault()
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        Get in Touch
                    </a>
                    <a href="#projects" className="hero__cta hero__cta--secondary" onClick={(e) => {
                        e.preventDefault()
                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        View Work →
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
            >
                <div className="hero__scroll-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    )
}
