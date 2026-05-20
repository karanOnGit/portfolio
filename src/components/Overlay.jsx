import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Section = ({ children, style, className }) => (
    <section
        className={`section ${className || ''}`}
        style={{
            padding: '10vw',
            ...style
        }}
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
        style={{
            background: 'rgba(255, 255, 255, 0.02)', // Slightly more subtle
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            ...style
        }}
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

                <AnimatedText delay={0.5} style={{ fontSize: '1.2rem', marginTop: '1rem', maxWidth: '600px', fontWeight: 300, color: '#aaa', letterSpacing: '0.05em' }}>
                    FULL-STACK DEVELOPER & MACHINE LEARNING ENGINEER
                    <br />
                    <span style={{ color: 'var(--color-accent)', opacity: 0.8 }}>// ARCHITECTING DIGITAL UNIVERSES</span>
                </AnimatedText>

                <AnimatedText delay={1.0} style={{ marginTop: '3rem' }}>
                    <p className="typewriter" style={{ fontFamily: 'monospace', color: '#666' }}>
                        &gt; Initializing protocol...
                    </p>
                </AnimatedText>

                <AnimatedText delay={1.4} style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <Link
                        to="/blog"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            color: '#000',
                            background: 'var(--color-accent)',
                            padding: '0.65rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            transition: 'transform 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        VIEW BLOGS →
                    </Link>
                    <Link
                        to="/my-interests"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            color: '#000',
                            background: 'var(--color-accent)',
                            padding: '0.65rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            transition: 'transform 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        MY INTERESTS →
                    </Link>
                    <Link
                        to="/roadmap"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            color: '#000',
                            background: 'var(--color-accent)',
                            padding: '0.65rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            transition: 'transform 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        ROADMAP →
                    </Link>
                    <Link
                        to="/guestbook"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            color: '#000',
                            background: 'var(--color-accent)',
                            padding: '0.65rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            transition: 'transform 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        GUESTBOOK →
                    </Link>
                </AnimatedText>
            </Section>

            {/* About Section */}
            <Section>
                <GlassCard>
                    <h2 className="text-glow" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-accent)' }}>PROFILE</h2>
                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8 }}>
                            Based in <strong>Gurgaon, India</strong>, I specialize in building high-performance, commercially viable web ecosystems.
                            A 2025 Computer Science graduate from <strong>Galgotias University</strong>, I combine core software engineering with business-critical strategies like Technical SEO and Digital Visibility.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8 }}>
                            Unlike a standard developer who focuses solely on code execution, I build platforms that are optimized for search engine crawlers to ensure business growth.
                        </p>
                    </div>
                </GlassCard>
            </Section>

            {/* Expertise Section */}
            <Section>
                <GlassCard>
                    <h2 className="text-glow" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '4rem', color: 'var(--color-accent)' }}>CORE PILLARS</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { title: 'Business-First Dev', desc: 'Intersection of Next.js and SEO. Leveraging SSR and dynamic sitemaps for maximum visibility.' },
                            { title: 'Ecosystem Architect', desc: 'Architecting dual-module digital ecosystems. Integrating E-commerce with community engagement.' },
                            { title: 'Full-Cycle Delivery', desc: 'Managing the entire SDLC. From requirement analysis to cross-platform deployment.' },
                            { title: 'Tech Stack Versatility', desc: 'React, Next.js, Python, Flask, Node.js, Three.js, AWS, Docker.' }
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
            <section className="skills-section" style={{ padding: '5vw 10vw' }}>
                <GlassCard style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #333' }}>
                    <h2 className="text-glow" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--color-accent)' }}>TECH STACKS </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'C++', 'SQL'] },
                            { title: 'Frontend', items: ['React.js / Next.js', 'Redux / Context', 'Tailwind CSS', 'Three.js / R3F', 'HTML5 / CSS3'] },
                            { title: 'Backend', items: ['Node.js / Express', 'Python (Flask)', 'RESTful APIs', 'GraphQL', 'MongoDB / MySQL'] },
                            { title: 'Tools & DevOps', items: ['Git / GitHub', 'Docker', 'AWS (EC2, S3)', 'CI/CD Pipelines', 'Agile / Scrum'] },
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
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '4rem', textAlign: 'right', color: '#fff' }}>SELECTED WORKS</h2>

                {[
                    {
                        title: 'SOCIOGLAMM',
                        subtitle: 'Social Media Platform',
                        desc: 'A complex platform integrating brand advertising E-commerce with community-driven social engagement (videos & reels). Managed complex state logic optimized for user retention.'
                    },
                    {
                        title: 'CARSNBIKE',
                        subtitle: 'Automotive Listing Platform',
                        desc: 'Engineered a dynamic listing platform with location-based change in currency and price for US and Indian users. Demonstrated expertise in handling large datasets and scalable CMS.'
                    },
                    {
                        title: 'HEALTHCARE APP',
                        subtitle: 'Healthcare Mobile Application',
                        desc: 'Built a cross-platform mobile application for doctor appointment scheduling. Handled push notifications for appointment reminders and follow-ups. It is my first freelancing project.'
                    },
                    {
                        title: 'FHM NEWS',
                        subtitle: 'News Delivery Web Application',
                        desc: 'Built a news aggregation platform using Next.js. Handled API integration and data fetching for news articles.'
                    }
                ].map((project, idx) => (
                    <GlassCard key={idx} delay={idx * 0.1} style={{ marginBottom: '4rem', transform: `translateX(${idx % 2 === 0 ? '-20px' : '20px'})` }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'monospace' }}>{project.subtitle}</p>
                        <p style={{ opacity: 0.7, maxWidth: '600px', lineHeight: '1.6' }}>
                            {project.desc}
                        </p>
                    </GlassCard>
                ))}
            </Section>

            {/* Contact Section */}
            <Section style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <GlassCard style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
                    <p style={{ marginBottom: '1rem', opacity: 0.5, letterSpacing: '0.2em' }}>INITIATE COMMUNICATION</p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '2rem' }}>LET'S TALK</h2>
                    <a href="mailto:hello@example.com" style={{
                        fontSize: '1.5rem',
                        color: 'var(--color-bg)',
                        background: 'var(--color-accent)',
                        textDecoration: 'none',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        display: 'inline-block',
                        fontWeight: 600,
                        transition: 'transform 0.3s ease'
                    }}>
                        Get in Touch
                    </a>
                </GlassCard>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4rem' }}>
                    {[
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/karan-bhardwaj-849296227/' },
                        { name: 'GitHub', url: 'https://github.com/karanOnGit' },
                        { name: 'Behance', url: 'https://www.behance.net/karanbhardwaj13' },
                        { name: 'Instagram', url: 'https://www.instagram.com/reely_karan/' },
                        { name: 'Twitter', url: 'https://x.com/KaranIsBihari' }
                    ].map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7, fontFamily: 'monospace', textTransform: 'uppercase' }}>{link.name}</a>
                    ))}
                </div>
            </Section>
        </main>
    )
}