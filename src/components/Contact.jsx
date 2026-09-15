import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: custom, ease: [0.16, 1, 0.3, 1] }
    })
}

export default function Contact() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText('karanbhardwaj1107@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
    }

    return (
        <section className="section" id="contact">
            <div className="container">
                <motion.div
                    className="contact-hub"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                >
                    <div className="contact-hub__glow" />

                    <div className="section__tag" style={{ margin: '0 auto 1.25rem' }}>
                        <span>05</span> // Initiate Collaboration
                    </div>

                    <h2 className="contact-hub__title">
                        Let's build something <span className="text-gradient serif-italic">exceptional</span>
                    </h2>

                    <p className="contact-hub__desc">
                        Whether you are exploring autonomous AI pipelines, need a full-stack engineer who moves fast, or have an ambitious vision to discuss — I'm always open to high-impact opportunities.
                    </p>

                    {/* Primary Actions */}
                    <div className="contact-hub__actions">
                        <a
                            href="mailto:karanbhardwaj1107@gmail.com"
                            className="contact-email-btn"
                        >
                            <span>✉</span> Send an Email
                        </a>

                        <button
                            className="btn-secondary btn-copy"
                            onClick={handleCopy}
                            aria-label="Copy email address"
                        >
                            <span>📋</span> Copy Address
                            {copied && <span className="copy-toast">✓ Copied to clipboard!</span>}
                        </button>

                        <a
                            href="/KaranBhardwaj_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            <span>📄</span> View Resume ↗
                        </a>
                    </div>

                    {/* Social Directory Bar */}
                    <div className="social-links-bar">
                        <a
                            href="https://linkedin.com/in/karan-bhardwaj-849296227"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-pill"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href="https://github.com/karanongit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-pill"
                        >
                            GitHub ↗
                        </a>
                        <Link to="/blog" className="social-pill">
                            Tech Blog ↗
                        </Link>
                        <Link to="/roadmap" className="social-pill">
                            Career Roadmap ↗
                        </Link>
                        <Link to="/guestbook" className="social-pill">
                            Sign Guestbook ✍
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
