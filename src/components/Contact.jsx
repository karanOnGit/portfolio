import { motion } from 'framer-motion'

const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/karan-bhardwaj-849296227/' },
    { name: 'GitHub', url: 'https://github.com/karanongit' },
    { name: 'Behance', url: 'https://www.behance.net/karanbhardwaj13' },
    { name: 'Instagram', url: 'https://www.instagram.com/reely_karan/' },
    { name: 'Twitter', url: 'https://x.com/KaranIsBihari' },
]

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function Contact() {
    return (
        <section className="section" id="contact">
            <hr className="section__divider" style={{ marginBottom: 'var(--section-padding-y)' }} />
            <div className="contact">
                <motion.p
                    className="section__label"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                >
                    05 — Contact
                </motion.p>
                <motion.h2
                    className="contact__heading"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                >
                    Let's build<br />something together
                </motion.h2>
                <motion.p
                    className="contact__text"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of something exceptional.
                </motion.p>
                <motion.a
                    href="mailto:karanbhardwaj1107@gmail.com"
                    className="contact__email"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.3}
                >
                    karanbhardwaj1107@gmail.com
                </motion.a>

                <motion.div
                    className="contact__socials"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    {socials.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social"
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
