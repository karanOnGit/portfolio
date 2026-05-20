import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import CustomCursor from './components/CustomCursor';
import BlogsPage from './components/BlogsPage';
import BlogDetailPage from './components/BlogDetailPage';
import MyInterestsPage from './components/MyInterestsPage';
import RoadmapPage from './components/RoadmapPage';
import GuestbookPage from './components/GuestbookPage';

function Portfolio() {
    useEffect(() => {
        const lenis = new Lenis();

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
            <CustomCursor />
            <div
                className="canvas-container"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
            >
                <Canvas dpr={[1, 2]}>
                    <color attach="background" args={['#030305']} />
                    <Scene />
                </Canvas>
            </div>
            <Overlay />
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