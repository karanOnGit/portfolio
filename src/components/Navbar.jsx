import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navSections = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

const subPages = [
    { label: 'Blog', to: '/blog' },
    { label: 'Roadmap', to: '/roadmap' },
    { label: 'Interests', to: '/my-interests' },
    { label: 'Guestbook', to: '/guestbook' },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === '/'

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const handleAnchorClick = (e, href) => {
        if (isHome) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
                setMobileOpen(false)
            }
        }
    }

    return (
        <header className="nav-wrapper">
            <motion.nav
                className="navbar-capsule"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Brand & Live Status */}
                <a
                    href={isHome ? '#' : '/'}
                    className="nav__brand"
                    onClick={(e) => {
                        if (isHome) {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    }}
                >
                    <span className="nav__logo-text">Karan<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
                    <span className="nav__status-pill">
                        <span className="status-dot" />
                        Available
                    </span>
                </a>

                {/* Desktop Navigation Links */}
                <div className={`nav__menu ${mobileOpen ? 'open' : ''}`}>
                    {isHome && navSections.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="nav__link"
                            onClick={(e) => handleAnchorClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}

                    <span className="nav__divider" />

                    {subPages.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="nav__link"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Resume Download CTA */}
                <a
                    href="/KaranBhardwaj_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav__cta-btn"
                >
                    Resume
                    <span style={{ fontSize: '0.9em' }}>↗</span>
                </a>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="nav__mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                    <span style={{ opacity: mobileOpen ? 0 : 1 }} />
                    <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
                </button>
            </motion.nav>
        </header>
    )
}
