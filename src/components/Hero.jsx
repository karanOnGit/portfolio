import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState('pipeline')
    const [istTime, setIstTime] = useState('')

    // Live Indian Standard Time (IST) clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const istString = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            })
            setIstTime(istString)
        }
        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('karanbhardwaj1107@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
    }

    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="hero__grid">
                    {/* Left Column: Editorial & Value Proposition */}
                    <motion.div
                        className="hero__intro"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Live Location & Telemetry Badge */}
                        <div className="hero__badge-row">
                            <span className="hero__location-chip">
                                <span>📍</span> Mohali, India • {istTime ? `${istTime} IST` : '15:20 IST'}
                            </span>
                        </div>

                        {/* Bold Modern Headline */}
                        <h1 className="hero__headline">
                            Full Stack Engineer & <span className="text-gradient">AI Architect</span>
                        </h1>

                        {/* Punchy Narrative Bio */}
                        <p className="hero__bio">
                            I architect scalable, automation-driven web applications and AI-powered systems.
                            Bridging the gap between <strong>cutting-edge generative AI</strong> and <strong>high-performance web infrastructure</strong>,
                            delivering zero-overhead autonomous digital products.
                        </p>

                        {/* Actions */}
                        <div className="hero__actions">
                            <a
                                href="#contact"
                                className="btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                Initiate Contact →
                            </a>

                            <button
                                className="btn-secondary btn-copy"
                                onClick={handleCopyEmail}
                                aria-label="Copy email address"
                            >
                                <span>✉</span> Copy Email
                                {copied && <span className="copy-toast">✓ Copied to clipboard!</span>}
                            </button>

                            <a
                                href="#projects"
                                className="btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                View Systems ↓
                            </a>
                        </div>

                        {/* Credibility Metric Strip */}
                        <div className="hero__metrics-strip">
                            <div className="metric-item">
                                <span className="metric-value">1+ Years</span>
                                <span className="metric-label">Commercial Exp</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">15+ Systems</span>
                                <span className="metric-label">Shipped to Prod</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">Galgotias</span>
                                <span className="metric-label">B.Tech CSE '25</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">Creative Volt</span>
                                <span className="metric-label">Current Role</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Engineering Terminal */}
                    <motion.div
                        className="hero__visual"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="terminal-window">
                            {/* Window Header with macOS Dots & Tabs */}
                            <div className="terminal-header">
                                <div className="mac-buttons">
                                    <span className="mac-btn mac-btn--red" />
                                    <span className="mac-btn mac-btn--yellow" />
                                    <span className="mac-btn mac-btn--green" />
                                </div>

                                <div className="terminal-tabs">
                                    <button
                                        className={`terminal-tab ${activeTab === 'pipeline' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('pipeline')}
                                    >
                                        pipeline.py
                                    </button>
                                    <button
                                        className={`terminal-tab ${activeTab === 'stack' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('stack')}
                                    >
                                        stack.json
                                    </button>
                                    <button
                                        className={`terminal-tab ${activeTab === 'system' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('system')}
                                    >
                                        telemetry.sh
                                    </button>
                                </div>
                            </div>

                            {/* Terminal Window Content */}
                            <div className="terminal-body">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'pipeline' && (
                                        <motion.div
                                            key="pipeline"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className="pipeline-flow"
                                        >
                                            <div style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
                                                # Autonomous Content & AI Execution Engine
                                            </div>

                                            <div className="pipeline-step">
                                                <span className="step-num">01</span>
                                                <div className="step-content">
                                                    <div className="step-title">Autonomous Ingestion</div>
                                                    <div className="step-detail">Python • Selenium • Multi-source APIs</div>
                                                </div>
                                                <span className="step-badge">Ingest</span>
                                            </div>

                                            <div className="pipeline-step">
                                                <span className="step-num">02</span>
                                                <div className="step-content">
                                                    <div className="step-title">Groq LLM Synthesis</div>
                                                    <div className="step-detail">Qwen 3.8 / GPT-OSS • Content Structuring</div>
                                                </div>
                                                <span className="step-badge">AI Core</span>
                                            </div>

                                            <div className="pipeline-step">
                                                <span className="step-num">03</span>
                                                <div className="step-content">
                                                    <div className="step-title">Cache & Storage Layer</div>
                                                    <div className="step-detail">FastAPI • Redis Cache • MongoDB Cluster</div>
                                                </div>
                                                <span className="step-badge">Storage</span>
                                            </div>

                                            <div className="pipeline-step">
                                                <span className="step-num">04</span>
                                                <div className="step-content">
                                                    <div className="step-title">Dynamic SSR Publishing</div>
                                                    <div className="step-detail">Next.js SSR • Instant Google Indexing</div>
                                                </div>
                                                <span className="step-badge">Live</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'stack' && (
                                        <motion.div
                                            key="stack"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <pre style={{ margin: 0, overflowX: 'auto' }}>
<code><span className="code-var">&#123;</span>
  <span className="code-keyword">"engineer"</span>: <span className="code-string">"Karan Bhardwaj"</span>,
  <span className="code-keyword">"architecture"</span>: &#91;
    <span className="code-string">"Full Stack Web"</span>,
    <span className="code-string">"Generative AI Systems"</span>,
    <span className="code-string">"Autonomous Pipelines"</span>
  &#93;,
  <span className="code-keyword">"primary_stack"</span>: &#123;
    <span className="code-func">"frontend"</span>: <span className="code-string">"Next.js, React 19, Vanilla CSS"</span>,
    <span className="code-func">"backend"</span>: <span className="code-string">"FastAPI, Node.js, Express"</span>,
    <span className="code-func">"ai_engine"</span>: <span className="code-string">"Groq API, Qwen 3.8 / GPT-OSS"</span>,
    <span className="code-func">"databases"</span>: <span className="code-string">"MongoDB, MySQL, Redis"</span>,
    <span className="code-func">"automation"</span>: <span className="code-string">"Selenium, Python Scraping"</span>
  &#123;,
  <span className="code-keyword">"status"</span>: <span className="code-string">"Available for contract & full-time"</span>
<span className="code-var">&#125;</span></code>
                                            </pre>
                                        </motion.div>
                                    )}

                                    {activeTab === 'system' && (
                                        <motion.div
                                            key="system"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <pre style={{ margin: 0, overflowX: 'auto' }}>
<code><span className="code-comment"># Karan's System Diagnostics & Metrics</span>
<span className="code-func">$</span> status --detailed

<span className="code-keyword">[SYSTEM METRICS]</span>
  ├── <span className="code-var">Platform:</span>       macOS Darwin / Linux Ubuntu
  ├── <span className="code-var">Core Focus:</span>     AI Workflows & High-Perf Web
  ├── <span className="code-var">Uptime:</span>         100% Reliable Delivery
  ├── <span className="code-var">API Throughput:</span> Sub-200ms with FastAPI
  └── <span className="code-var">SEO Score:</span>      98+ Lighthouse / Core Web Vitals

<span className="code-keyword">[ORGANIZATIONS]</span>
  ├── <span className="code-string">Creative Volt</span>   (Full Stack Engineer)
  └── <span className="code-string">Flyhead Media</span>   (Associate Software Engineer)

<span className="code-func">$</span> echo <span className="code-string">"Ready to build the future."</span>
<span className="code-string">Ready to build the future.</span></code>
                                            </pre>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
