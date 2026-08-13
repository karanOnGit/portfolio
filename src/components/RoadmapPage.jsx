import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/roadmap.css';

/* ─────────────────────────────────────────────────────────
   LIFE CHAPTERS — Edit these to personalise the journey.
───────────────────────────────────────────────────────── */
const CHAPTERS = [
    {
        year: '2002',
        era: 'Chapter 01 — The Origin',
        title: 'Born in Patna, Bihar',
        desc: 'A small-town beginning that quietly planted seeds of curiosity. Spent childhood deconstructing hardware and exploring logical systems.',
        tags: ['Patna', 'Childhood', 'Curiosity'],
        color: '#6366f1',
    },
    {
        year: '2019',
        era: 'Chapter 02 — School & Mathematics',
        title: 'Academic Foundations at Gyan Niketan',
        desc: 'Completed Matriculation and Intermediate boards at Gyan Niketan with a Physics, Chemistry, and Mathematics (PCM) focus. Realized problem-solving was addictive.',
        tags: ['PCM', 'Gyan Niketan', 'Mathematics'],
        color: '#10b981',
    },
    {
        year: '2021',
        era: 'Chapter 03 — Galgotias & First Code',
        title: 'B.Tech CSE & Freelance Launch',
        desc: 'Started Bachelor of Technology in Computer Software Engineering at Galgotias University. Deployed my first paid commercial project — a healthcare patient scheduling mobile app.',
        tags: ['Galgotias', 'React Native', 'B.Tech'],
        color: '#8b5cf6',
    },
    {
        year: '2023',
        era: 'Chapter 04 — Building Complex Products',
        title: 'Socioglamm, Carsnbike & PMEDU4U',
        desc: 'Deep-dived into full-stack scaling, Redis caching, and technical SEO. Developed Carsnbike (automotive listing CMS) and PMEDU4U (EdTech testing platform).',
        tags: ['Next.js', 'System Design', 'Redis'],
        color: '#f97316',
    },
    {
        year: '2025',
        era: 'Chapter 05 — Flyhead Media',
        title: 'Associate Software Engineer',
        desc: 'Graduated Galgotias University in May. Joined Flyhead Media (Gurugram) as a Software Engineer Intern and was promoted to Associate Software Engineer. Built Next.js web applications, optimizing build processes and Core Web Vitals.',
        tags: ['Flyhead Media', 'Next.js', 'Core Web Vitals'],
        color: '#14b8a6',
    },
    {
        year: '2026',
        era: 'Chapter 06 — Creative Volt',
        title: 'Full Stack Engineer & AI Architect',
        desc: 'Joined Creative Volt in Sahibzada Ajit Singh Nagar. Architecting full-stack systems, writing automation scripts using Selenium and requests, and deploying autonomous news platform FHMNews.com with Groq API and LLMs.',
        tags: ['Creative Volt', 'AI Automation', 'FastAPI', 'FHMNews'],
        color: '#64ffda',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
    })
};

export default function RoadmapPage() {
    const navigate = useNavigate();

    return (
        <div className="roadmap-root">
            {/* Back button */}
            <motion.button
                className="roadmap-back"
                onClick={() => navigate('/')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                ← Portfolio
            </motion.button>

            {/* Hero */}
            <section className="roadmap-hero">
                <motion.p
                    className="roadmap-hero-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    // my journey
                </motion.p>
                <motion.h1
                    className="roadmap-hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    The Road<br />
                    <span>So Far</span>
                </motion.h1>
                <motion.p
                    className="roadmap-hero-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    A timeline of the milestones, pivots, and breakthroughs that shaped my career.
                </motion.p>
            </section>

            {/* Timeline */}
            <section className="roadmap-timeline">
                <div className="roadmap-timeline-line" />

                {CHAPTERS.map((chapter, idx) => (
                    <motion.div
                        key={idx}
                        className={`roadmap-chapter ${idx % 2 === 0 ? 'left' : 'right'}`}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        custom={0.1}
                    >
                        {/* Year marker on the line */}
                        <div className="roadmap-chapter-marker" style={{ borderColor: chapter.color }}>
                            <span className="roadmap-chapter-year" style={{ color: chapter.color }}>
                                {chapter.year}
                            </span>
                        </div>

                        {/* Card */}
                        <div className="roadmap-chapter-card">
                            <div className="roadmap-chapter-card-accent" style={{ background: chapter.color }} />
                            <p className="roadmap-chapter-era">{chapter.era}</p>
                            <h2 className="roadmap-chapter-title">{chapter.title}</h2>
                            <p className="roadmap-chapter-desc">{chapter.desc}</p>
                            <div className="roadmap-chapter-tags">
                                {chapter.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="roadmap-chapter-tag"
                                        style={{ borderColor: `${chapter.color}50`, color: chapter.color }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* End section */}
            <section className="roadmap-end">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center' }}
                >
                    <p className="roadmap-end-label">// end of known road</p>
                    <h2 className="roadmap-end-title">
                        The road ahead is unwritten.
                    </h2>
                    <p className="roadmap-end-desc">
                        Every chapter so far has been a stepping stone. The next ones are still being
                        built — one commit, one launch, one late night at a time.
                    </p>
                    <button
                        className="roadmap-end-btn"
                        onClick={() => navigate('/')}
                    >
                        Back to Portfolio →
                    </button>
                </motion.div>
            </section>
        </div>
    );
}