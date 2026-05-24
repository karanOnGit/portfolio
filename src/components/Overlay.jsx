import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Section = ({ children, style, className }) => (
    <section
        className={`section ${className || ''}`}
        style={style}
    >
        {children}
    </section>
)

const GlassCard = ({ children, style, className, delay = 0 }) => (
    <motion.div
        className={`glass-card ${className || ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }} // Smooth cubic-bezier
        viewport={{ once: true, margin: "-50px" }}
        style={style}
    >
        {children}
    </motion.div>
)

const AnimatedText = ({ children, style, className, delay = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }} // Custom smooth ease
        viewport={{ once: true }}
        style={style}
    >
        {children}
    </motion.div>
)

export default function Overlay() {
    return (
        <main className="overlay" style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}>
            {/* Hero Section */}
            <Section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.h1
                    className="text-glow"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 8vw, 8rem)',
                        lineHeight: '0.9',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        marginBottom: '1rem'
                    }}
                >
                    KARAN<br />
                    <span style={{ fontSize: '0.5em', fontWeight: 400, color: 'var(--color-accent)' }}>BHARDWAJ</span>
                </motion.h1>

                <AnimatedText delay={0.5} className="hero-subtitle">
                    FULL STACK ENGINEER & AI/AUTOMATION ARCHITECT
                    <br />
                    <span style={{ color: 'var(--color-accent)', opacity: 0.8 }}>// ARCHITECTING DIGITAL UNIVERSES</span>
                </AnimatedText>

                <AnimatedText delay={1.0} className="hero-typewriter-wrapper">
                    <p className="typewriter" style={{ fontFamily: 'monospace', color: '#666' }}>
                        &gt; Initializing protocol...
                    </p>
                </AnimatedText>

                <AnimatedText delay={1.4} className="overlay-nav-buttons">
                    <Link
                        to="/my-interests"
                        className="overlay-btn"
                    >
                        MY INTERESTS →
                    </Link>
                    <Link
                        to="/roadmap"
                        className="overlay-btn"
                    >
                        ROADMAP →
                    </Link>
                    <Link
                        to="/guestbook"
                        className="overlay-btn"
                    >
                        GUESTBOOK →
                    </Link>
                </AnimatedText>
            </Section>

            {/* About Section */}
            <Section>
                <GlassCard>
                    <h2 className="text-glow section-title">PROFILE</h2>
                    <div className="about-grid">
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8 }}>
                            Based in <strong>Sahibzada Ajit Singh Nagar, Punjab</strong>, I specialize in building scalable, automation-driven web applications and AI-powered systems.
                            A Computer Software Engineering graduate from <strong>Galgotias University</strong>, I build innovative platforms that seamlessly combine generative AI, sophisticated backend automation, and dynamic content distribution.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8 }}>
                            I bridge the gap between cutting-edge artificial intelligence and robust web infrastructure, delivering high-performance, SEO-optimized digital ecosystems.
                        </p>
                    </div>
                </GlassCard>
            </Section>

            {/* Expertise Section */}
            <Section>
                <GlassCard>
                    <h2 className="text-glow section-title" style={{ marginBottom: '4rem' }}>CORE PILLARS</h2>

                    <div className="pillars-grid">
                        {[
                            { title: 'AI & Automation', desc: 'Integrating Generative AI models (Groq API, LLMs) and writing Python automation scripts (Selenium, requests) for smart content curation.' },
                            { title: 'Full Stack Engineering', desc: 'Designing high-availability and performant web APIs and frontend interfaces using Next.js, React, FastAPI, Node.js, Express, and databases.' },
                            { title: 'System Optimization', desc: 'Improving page speeds, Core Web Vitals, and implementing caching mechanisms (Redis) for rapid URL indexing and maximum throughput.' },
                            { title: 'Ecosystem Architect', desc: 'Building multi-module digital platforms, automated data pipelines, E-commerce integrations, and autonomous news systems.' }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-accent-secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>{item.title}</h3>
                                <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </Section>

            {/* Technical Proficiency / Skills Section */}
            <section className="skills-section">
                <GlassCard style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #333' }}>
                    <h2 className="text-glow section-title" style={{ marginBottom: '3rem' }}>TECH STACKS</h2>
                    <div className="tech-grid">
                        {[
                            { title: 'Frontend', items: ['Next.js', 'React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3'] },
                            { title: 'Backend & APIs', items: ['FastAPI', 'Node.js / Express', 'Flask', 'RESTful APIs'] },
                            { title: 'Databases & Cache', items: ['MongoDB', 'MySQL', 'Redis'] },
                            { title: 'AI & Automation', items: ['Generative AI', 'Deep Learning', 'Selenium', 'Web Scraping', 'Groq API'] },
                        ].map((category, idx) => (
                            <div key={idx}>
                                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#888', marginBottom: '1rem', letterSpacing: '0.1em' }}>{category.title.toUpperCase()}</h4>
                                <ul style={{ listStyle: 'none' }}>
                                    {category.items.map(item => <li key={item} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </section>

            {/* Projects Section */}
            <Section>
                <h2 className="selected-works-title">SELECTED WORKS</h2>

                {[
                    {
                        title: 'FHMNews',
                        subtitle: 'Autonomous News Platform',
                        desc: 'Engineered a fully autonomous news platform designed to fetch, process, and publish high-quality content via external APIs with minimal manual intervention. Optimized data pipelines and server-side logic.'
                    },
                    {
                        title: 'SOCIOGLAMM',
                        subtitle: 'Dual-Module Social Ecosystem',
                        desc: 'Architected a dual-module ecosystem using Next.js. Built an E-commerce section for brand advertising and a Community section featuring video/reel uploads. Implemented SSR and dynamic sitemaps.'
                    },
                    {
                        title: 'CARSNBIKE',
                        subtitle: 'Automotive Listing & CMS',
                        desc: 'Developed carsnbike.com, a dynamic listing portal. Engineered location-based filtering for cars/bikes and a blog CMS to track automobile industry trends.'
                    },
                    {
                        title: 'PMEDU4U',
                        subtitle: 'EdTech Platform & Aptitude Testing',
                        desc: 'Delivered a full-stack educational platform (pmedu4u.com) facilitating student enrollment and aptitude testing. Developed an Interview Preparation Kit module.'
                    }
                ].map((project, idx) => (
                    <GlassCard key={idx} delay={idx * 0.1} className="project-card" style={{ transform: `translateX(${idx % 2 === 0 ? '-20px' : '20px'})` }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'monospace' }}>{project.subtitle}</p>
                        <p style={{ opacity: 0.7, maxWidth: '600px', lineHeight: '1.6' }}>
                            {project.desc}
                        </p>
                    </GlassCard>
                ))}
            </Section>

            {/* Contact Section */}
            <Section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <GlassCard style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
                    <p style={{ marginBottom: '1rem', opacity: 0.5, letterSpacing: '0.2em' }}>INITIATE COMMUNICATION</p>
                    <h2 className="section-title large" style={{ color: '#fff', marginBottom: '2rem' }}>LET'S TALK</h2>
                    <a href="mailto:karanbhardwaj1107@gmail.com" className="contact-btn">
                        Get in Touch
                    </a>
                </GlassCard>

                <div className="social-links-wrapper">
                    {[
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/karan-bhardwaj-849296227/' },
                        { name: 'GitHub', url: 'https://github.com/karanongit' },
                        { name: 'Behance', url: 'https://www.behance.net/karanbhardwaj13' },
                        { name: 'Instagram', url: 'https://www.instagram.com/reely_karan/' },
                        { name: 'Twitter', url: 'https://x.com/KaranIsBihari' }
                    ].map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">{link.name}</a>
                    ))}
                </div>
            </Section>
        </main>
    )
}