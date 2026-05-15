import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RoadScene from './RoadScene';
import '../styles/roadmap.css';

/* ─────────────────────────────────────────────────────────
   LIFE CHAPTERS — Edit these to personalise the journey.
   Each chapter = one section of road the camera travels.
───────────────────────────────────────────────────────── */
const CHAPTERS = [
    {
        year: '2002',
        era: 'Chapter 01 — The Origin',
        title: 'Born in Rohtak, Haryana',
        desc: 'A small-town beginning that would quietly plant seeds of curiosity. Childhood spent exploring, questioning how things worked — radios, calculators, TVs. A mind wired for systems from day one.',
        tags: ['Haryana', 'Childhood', 'Curiosity'],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
        imageCaption: '// humble beginnings',
        color: '#6366f1',
    },
    {
        year: '2010',
        era: 'Chapter 02 — First Sparks',
        title: 'First Computer. First Program.',
        desc: 'Got access to a family desktop running Windows XP. Spent hours discovering Paint, then Notepad, then accidentally stumbling upon how HTML could make things appear on screen. The internet felt like a superpower.',
        tags: ['Windows XP', 'HTML', 'Discovery'],
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&q=80',
        imageCaption: '// ctrl + alt + curiosity',
        color: '#f59e0b',
    },
    {
        year: '2014',
        era: 'Chapter 03 — School Years',
        title: 'Maths, Science & Building Things',
        desc: 'A competitive school environment pushed analytical thinking hard. Science fairs, math olympiads, and the discovery that problem-solving was addictive. First time using Python in a borrowed laptop — love at first syntax.',
        tags: ['Python', 'Olympiads', 'School'],
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
        imageCaption: '// equations & experiments',
        color: '#10b981',
    },
    {
        year: '2018',
        era: 'Chapter 04 — The Decision',
        title: 'Choosing Computer Science',
        desc: 'Board exams done. The decision was clear — CS was the only path that felt like the future. Enrolled at Galgotias University. Moved to Greater Noida. Left the comfort zone. Embraced the chaos.',
        tags: ['Galgotias', 'CS', 'New Chapter'],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
        imageCaption: '// gateway to the digital world',
        color: '#3b82f6',
    },
    {
        year: '2020',
        era: 'Chapter 05 — Lockdown & Code',
        title: 'The Pandemic Pivot',
        desc: 'COVID hit. The world paused. I accelerated. 12-hour coding sessions, online courses, building projects nobody asked for. React, Node.js, APIs. Built my first full-stack app during lockdown. The world was ending and I was shipping.',
        tags: ['React', 'Node.js', 'Self-taught'],
        image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80',
        imageCaption: '// quarantine → code',
        color: '#ec4899',
    },
    {
        year: '2022',
        era: 'Chapter 06 — First Real Work',
        title: 'Freelancing & First Clients',
        desc: 'Landed the first paid project — a healthcare mobile app for appointment scheduling. Deployed to real users. Real feedback. Real responsibility. That feeling of seeing strangers use something you built is irreplaceable.',
        tags: ['Freelance', 'React Native', 'Launch'],
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
        imageCaption: '// from idea to production',
        color: '#8b5cf6',
    },
    {
        year: '2023',
        era: 'Chapter 07 — Going Deeper',
        title: 'Full-Stack, SEO & Three.js',
        desc: 'Joined a startup. Built Socioglamm — a social media platform with E-commerce. Discovered Technical SEO was my hidden superpower. Fell in love with Three.js and the idea that web could be a cinematic experience.',
        tags: ['Socioglamm', 'SEO', 'Three.js'],
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80',
        imageCaption: '// web as a canvas',
        color: '#f97316',
    },
    {
        year: '2024',
        era: 'Chapter 08 — The Ecosystem',
        title: 'Carsnbike & FHM News',
        desc: 'Built and deployed multi-module commercial platforms. Carsnbike — an automotive listing platform with location-based currency. FHM News — a Next.js news aggregation system. Learned what it takes to build for scale.',
        tags: ['Carsnbike', 'Next.js', 'AWS'],
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
        imageCaption: '// architecting at scale',
        color: '#14b8a6',
    },
    {
        year: '2025',
        era: 'Chapter 09 — NOW',
        title: 'Graduated. Building. Shipping.',
        desc: "CS degree from Galgotias University — 2025. Now building systems that sit at the intersection of beautiful code, business strategy, and search visibility. The road ahead is longer than what's behind. That's the point.",
        tags: ['Graduated', 'Full-Stack', 'Future'],
        image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=400&q=80',
        imageCaption: '// destination: unknown',
        color: '#C0C0C0',
    },
];

/* ── Tiny hook: scroll progress 0→1 ── */
function useScrollProgress(containerRef) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(Math.min(scrollTop / docH, 1));
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [containerRef]);

    return progress;
}

/* ── Chapter indicator dot ── */
function SidebarDot({ index, isActive, onClick }) {
    return (
        <button
            className={`roadmap-sidebar-dot${isActive ? ' active' : ''}`}
            onClick={onClick}
            title={CHAPTERS[index].title}
        />
    );
}

/* ── Main Page ── */
export default function RoadmapPage() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const scrollProgress = useScrollProgress(containerRef);

    // Derive which chapter is active from scroll progress
    const activeChapter = Math.min(
        Math.floor(scrollProgress * CHAPTERS.length),
        CHAPTERS.length - 1
    );

    const chapter = CHAPTERS[activeChapter];

    // Hero only fully visible when scroll < 10%
    const heroOpacity = Math.max(0, 1 - scrollProgress * 15);
    const chapterVisible = scrollProgress > 0.02;

    // Jump to a chapter
    const jumpTo = useCallback((index) => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = (index / CHAPTERS.length) * docH;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, []);

    // Progress bar width
    const progressPct = `${(scrollProgress * 100).toFixed(1)}%`;

    return (
        <div ref={containerRef} className="roadmap-root">
            {/* ── Progress Bar ── */}
            <div className="roadmap-progress-bar" style={{ width: progressPct }} />

            {/* ── Back Button ── */}
            <button className="roadmap-back" onClick={() => navigate('/')}>
                ← Portfolio
            </button>

            {/* ── Chapter count ── */}
            <div className="roadmap-chapter-count">
                {String(activeChapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
            </div>

            {/* ── Sidebar dots ── */}
            <nav className="roadmap-sidebar">
                {CHAPTERS.map((_, i) => (
                    <SidebarDot
                        key={i}
                        index={i}
                        isActive={i === activeChapter}
                        onClick={() => jumpTo(i)}
                    />
                ))}
            </nav>

            {/* ── Sticky 3D Canvas ── */}
            <div className="roadmap-canvas">
                <Canvas
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: false }}
                    camera={{ position: [0, 1.2, 5], fov: 65 }}
                >
                    <RoadScene
                        scrollProgress={scrollProgress}
                        chapters={CHAPTERS}
                        activeChapter={activeChapter}
                    />
                </Canvas>
            </div>

            {/* ── Hero Overlay (fades out on scroll) ── */}
            <div
                className="roadmap-hero-overlay"
                style={{ opacity: heroOpacity, pointerEvents: heroOpacity < 0.05 ? 'none' : 'none' }}
            >
                <motion.h1
                    className="roadmap-hero-title text-glow"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    MY<br />
                    <span style={{ color: 'var(--color-accent)' }}>JOURNEY</span>
                </motion.h1>
                <motion.p
                    className="roadmap-hero-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.4 }}
                >
                    // A road through time — scroll to drive
                </motion.p>
                <motion.div
                    className="roadmap-scroll-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.8 }}
                >
                    <span className="roadmap-scroll-hint-line" />
                    SCROLL TO BEGIN THE JOURNEY
                    <span className="roadmap-scroll-hint-line" />
                </motion.div>
            </div>

            {/* ── Chapter Info Card (bottom left) ── */}
            <AnimatePresence mode="wait">
                {chapterVisible && (
                    <motion.div
                        key={activeChapter}
                        className="roadmap-chapter-overlay"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Polaroid image */}
                        <div className="roadmap-polaroid" style={{ transform: `rotate(${activeChapter % 2 === 0 ? -2 : 2}deg)` }}>
                            <img
                                src={chapter.image}
                                alt={chapter.title}
                                onError={e => { e.target.src = 'https://placehold.co/400x260/0a0a0a/555?text=Memory'; }}
                            />
                            <div className="roadmap-polaroid-caption">{chapter.imageCaption}</div>
                        </div>

                        {/* Text card */}
                        <div className="roadmap-chapter-card">
                            <div className="roadmap-chapter-year">{chapter.year}</div>
                            <div className="roadmap-chapter-era">{chapter.era}</div>
                            <h2 className="roadmap-chapter-title"
                                style={{ borderBottom: `2px solid ${chapter.color}30`, paddingBottom: '0.5rem' }}>
                                {chapter.title}
                            </h2>
                            <p className="roadmap-chapter-desc">{chapter.desc}</p>
                            <div className="roadmap-chapter-tags">
                                {chapter.tags.map((t, i) => (
                                    <span
                                        key={i}
                                        className="roadmap-chapter-tag"
                                        style={{ borderColor: `${chapter.color}40`, color: chapter.color }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Scroll Driver (creates scroll height for 9 chapters) ── */}
            <div
                className="roadmap-scroller"
                style={{ height: `${CHAPTERS.length * 120}vh` }}
            />

            {/* ── End of Road ── */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                padding: '8vw 10vw',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(20px)',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C0C0C0', opacity: 0.5, marginBottom: '1.5rem' }}>
                        // END OF KNOWN ROAD
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em'
                    }}>
                        The road ahead is unwritten.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        Every chapter so far has been a stepping stone. The next ones are still being built — one commit, one launch, one late night at a time.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: '#C0C0C0', color: '#000', border: 'none',
                            padding: '0.8rem 2.5rem', borderRadius: '50px',
                            fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em',
                            cursor: 'pointer', fontFamily: 'var(--font-body)',
                            transition: 'transform 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        BACK TO PORTFOLIO →
                    </button>
                </motion.div>
            </div>
        </div>
    );
}