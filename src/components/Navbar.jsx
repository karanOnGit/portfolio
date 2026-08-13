import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

const pageLinks = [
    { label: 'Interests', to: '/my-interests' },
    { label: 'Roadmap', to: '/roadmap' },
    { label: 'Guestbook', to: '/guestbook' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const el = document.querySelector(href)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
                setMobileOpen(false)
            }
        }
    }

    return (
        <motion.nav
            className={`navbar${scrolled ? ' scrolled' : ''}`}
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
            <a href="#" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                Karan<span>.</span>
            </a>

            <div className={`navbar__links${mobileOpen ? ' open' : ''}`}>
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="navbar__link"
                        onClick={(e) => handleNavClick(e, item.href)}
                    >
                        {item.label}
                    </a>
                ))}
                {pageLinks.map((item) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className="navbar__link"
                        onClick={() => setMobileOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <button
                className={`navbar__mobile-toggle${mobileOpen ? ' open' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </motion.nav>
    )
}
