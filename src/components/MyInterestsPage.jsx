import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/interests.css';
import '../styles/blogs.css'; // reuse blog-back-btn

/* ── Animation Variants ──────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Data ────────────────────────────────────────────── */
const INTERESTS = [
    {
        icon: '🌐',
        title: 'Full-Stack Architecture',
        tag: 'Core Passion',
        desc: 'Designing end-to-end systems that scale — from DB schemas to pixel-perfect UIs. I treat the whole stack as one cohesive product.',
        pills: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
        glow: 'rgba(99, 102, 241, 0.08)',
    },
    {
        icon: '🤖',
        title: 'Machine Learning',
        tag: 'Deep Dive',
        desc: 'Experimenting with neural networks, model fine-tuning, and deploying ML pipelines that add real business value.',
        pills: ['PyTorch', 'scikit-learn', 'LLMs', 'HuggingFace'],
        glow: 'rgba(236, 72, 153, 0.06)',
    },
    {
        icon: '🔭',
        title: 'Technical SEO',
        tag: 'Differentiator',
        desc: 'Using SSR, dynamic sitemaps, structured data, and Core Web Vitals to make products discoverable — and dominant in SERPs.',
        pills: ['Schema.org', 'SSR', 'Sitemaps', 'CWV'],
        glow: 'rgba(234, 179, 8, 0.06)',
    },
    {
        icon: '🎨',
        title: '3D & Creative Dev',
        tag: 'Side Craft',
        desc: 'Blending Three.js and React Three Fiber to push web interfaces beyond the flat plane. Particles, shaders, interactive universes.',
        pills: ['Three.js', 'R3F', 'GLSL', 'Lenis'],
        glow: 'rgba(34, 211, 238, 0.06)',
    },
    {
        icon: '📡',
        title: 'System Design',
        tag: 'Obsession',
        desc: 'Breaking down complex platforms into modular, resilient building blocks. CAP theorem, event-driven patterns, microservices trade-offs.',
        pills: ['Microservices', 'Kafka', 'Docker', 'AWS'],
        glow: 'rgba(192, 192, 192, 0.05)',
        wide: true,
    },
    {
        icon: '🔐',
        title: 'Cybersecurity',
        tag: 'Learning',
        desc: 'Understanding how systems break so I can build them stronger. OWASP top 10, pentesting basics, and secure-by-default development.',
        pills: ['OWASP', 'Auth flows', 'Encryption', 'CTF'],
        glow: 'rgba(239, 68, 68, 0.05)',
    },
];

const EXPLORING = [
    {
        title: 'Rust for Systems Programming',
        desc: 'Exploring ownership, lifetimes, and zero-cost abstractions to understand low-level performance tuning.',
        badge: 'active',
        label: 'Active',
    },
    {
        title: 'WebGPU & Advanced Rendering',
        desc: 'Experimenting with the next-gen GPU API in the browser for real-time graphics beyond WebGL limitations.',
        badge: 'learning',
        label: 'Learning',
    },
    {
        title: 'AI Agents & LangChain Workflows',
        desc: 'Building autonomous agent pipelines that reason, use tools, and take multi-step actions to complete goals.',
        badge: 'active',
        label: 'Active',
    },
    {
        title: 'Distributed Systems (MIT 6.824)',
        desc: 'Working through Raft consensus, MapReduce labs, and distributed key-value stores.',
        badge: 'learning',
        label: 'Learning',
    },
    {
        title: 'Open-Source Contribution',
        desc: 'Planning first meaningful contribution to a production-grade OSS project in the React ecosystem.',
        badge: 'planned',
        label: 'Planned',
    },
];

const MEDIA = [
    { type: 'Book', title: 'Designing Data-Intensive Applications', by: 'Martin Kleppmann' },
    { type: 'Book', title: 'Clean Code', by: 'Robert C. Martin' },
    { type: 'Podcast', title: 'Lex Fridman Podcast', by: 'Lex Fridman' },
    { type: 'Course', title: 'CS231n — CNNs for Visual Recognition', by: 'Stanford' },
    { type: 'Book', title: 'The Pragmatic Programmer', by: 'Hunt & Thomas' },
    { type: 'Podcast', title: 'Software Engineering Daily', by: 'Jeff Meyerson' },
    { type: 'Course', title: 'MIT 6.824 Distributed Systems', by: 'MIT OpenCourseWare' },
    { type: 'Book', title: 'Zero to One', by: 'Peter Thiel' },
];

/* ── Component ───────────────────────────────────────── */
export default function MyInterestsPage() {
    const navigate = useNavigate();

    return (
        <div className="interests-page">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <button className="blog-back-btn" onClick={() => navigate('/')}>
                    ← Back to Portfolio
                </button>
            </motion.div>

            {/* Header */}
            <div className="interests-header">
                <motion.h1
                    className="interests-title text-glow"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    MY<br />
                    <span style={{ color: 'var(--color-accent)', fontWeight: 400 }}>INTERESTS</span>
                </motion.h1>

                <motion.p
                    className="interests-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    The things that pull me out of bed at 2 AM — technical obsessions,
                    creative experiments, and ideas I'm chasing right now.
                </motion.p>
            </div>

            {/* ── Interest Cards ── */}
            <div className="interests-section-label">// WHAT I CARE ABOUT</div>

            <motion.div
                className="interests-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
            >
                {INTERESTS.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`interest-card${item.wide ? ' interest-card--wide' : ''}`}
                        style={{ '--card-glow': item.glow }}
                        variants={cardVariant}
                    >
                        <span className="interest-card-icon">{item.icon}</span>
                        <span className="interest-card-tag">{item.tag}</span>
                        <h3 className="interest-card-title">{item.title}</h3>
                        <p className="interest-card-desc">{item.desc}</p>
                        <div className="interest-card-pills">
                            {item.pills.map((p, j) => (
                                <span key={j} className="interest-pill">{p}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Manifesto Strip ── */}
            <motion.div
                className="interests-manifesto"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
            >
                <blockquote>
                    "I don't just want to write code —<br />
                    I want to build systems that <em style={{ color: '#C0C0C0' }}>outlast</em> me."
                </blockquote>
                <cite>— A philosophy I live by</cite>
            </motion.div>

            {/* ── Currently Exploring ── */}
            <div className="exploring-section">
                <div className="interests-section-label">// CURRENTLY EXPLORING</div>

                <motion.div
                    className="exploring-list"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                >
                    {EXPLORING.map((item, i) => (
                        <motion.div key={i} className="exploring-item" variants={cardVariant}>
                            <span className="exploring-num">{String(i + 1).padStart(2, '0')}</span>
                            <div className="exploring-text">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <span className={`exploring-badge exploring-badge--${item.badge}`}>
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* ── Reading & Listening ── */}
            <div className="interests-section-label">// READING & LISTENING</div>

            <motion.div
                className="media-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
            >
                {MEDIA.map((m, i) => (
                    <motion.div key={i} className="media-item" variants={cardVariant}>
                        <div className="media-item-type">{m.type}</div>
                        <div className="media-item-title">{m.title}</div>
                        <div className="media-item-by">{m.by}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
