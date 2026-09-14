import { Link } from 'react-router-dom'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p>© {year} Karan Bhardwaj. All rights reserved.</p>
            <div className="footer__links">
                <Link to="/blog" className="footer__link">
                    Blog
                </Link>
                <a
                    href="https://github.com/karanongit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/karan-bhardwaj-849296227/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:karanbhardwaj1107@gmail.com"
                    className="footer__link"
                >
                    Email
                </a>
            </div>
        </footer>
    )
}
