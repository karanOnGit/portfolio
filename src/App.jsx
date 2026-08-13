import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Main portfolio components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Sub-pages
import BlogsPage from './components/BlogsPage';
import BlogDetailPage from './components/BlogDetailPage';
import MyInterestsPage from './components/MyInterestsPage';
import RoadmapPage from './components/RoadmapPage';
import GuestbookPage from './components/GuestbookPage';

function Portfolio() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
            </main>
            <Footer />
            {/* Subtle film grain overlay */}
            <div className="grain-overlay" />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/blog" element={<BlogsPage />} />
                <Route path="/my-interests" element={<MyInterestsPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/guestbook" element={<GuestbookPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;