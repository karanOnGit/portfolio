import { Link } from 'react-router-dom'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer-main">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">Karan<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
                        <span className="footer-copy">
                            © {new Date().getFullYear()} Karan Bhardwaj. Built with precision & craft.
                        </span>
                    </div>

                    <div className="footer-links">
                        <Link to="/blog" className="footer-link">Blog</Link>
                        <Link to="/roadmap" className="footer-link">Roadmap</Link>
                        <Link to="/guestbook" className="footer-link">Guestbook</Link>
                        <Link to="/my-interests" className="footer-link">Interests</Link>
                        <a
                            href="https://github.com/karanongit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/karan-bhardwaj-849296227"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            LinkedIn
                        </a>
                        <button
                            onClick={scrollToTop}
                            className="footer-link"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            aria-label="Scroll to top of page"
                        >
                            Back to top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
