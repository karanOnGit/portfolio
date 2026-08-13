export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p>© {year} Karan Bhardwaj. All rights reserved.</p>
            <div className="footer__links">
            </div>
        </footer>
    )
}
