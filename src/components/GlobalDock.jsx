import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalDock() {
    const location = useLocation();
    const [showBlogLink, setShowBlogLink] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
                        if (res.ok) {
                            const data = await res.json();
                            const city = (data.address?.city || data.address?.town || data.address?.suburb || data.address?.state_district || data.address?.county || '').toLowerCase();
                            if (city.includes('gurgaon') || city.includes('gurugram')) {
                                setShowBlogLink(true);
                            }
                        }
                    } catch (error) {
                        console.error('Error reverse geocoding inside GlobalDock:', error);
                    }
                },
                (error) => {
                    console.error('Geolocation request declined/failed in GlobalDock:', error);
                }
            );
        }
    }, []);

    // Helper to determine if link is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="vengeance-dock-container">
            <div className="vengeance-dock">
                <Link to="/" className={`dock-item ${isActive('/') ? 'active' : ''}`} title="Home">
                    <span className="dock-icon">🏠</span>
                    <span className="dock-label">Home</span>
                    {isActive('/') && <span className="active-dot" />}
                </Link>
                <Link to="/my-interests" className={`dock-item ${isActive('/my-interests') ? 'active' : ''}`} title="Interests">
                    <span className="dock-icon">💡</span>
                    <span className="dock-label">Interests</span>
                    {isActive('/my-interests') && <span className="active-dot" />}
                </Link>
                <Link to="/roadmap" className={`dock-item ${isActive('/roadmap') ? 'active' : ''}`} title="Roadmap">
                    <span className="dock-icon">🛣️</span>
                    <span className="dock-label">Roadmap</span>
                    {isActive('/roadmap') && <span className="active-dot" />}
                </Link>
                <Link to="/guestbook" className={`dock-item ${isActive('/guestbook') ? 'active' : ''}`} title="Guestbook">
                    <span className="dock-icon">📖</span>
                    <span className="dock-label">Guestbook</span>
                    {isActive('/guestbook') && <span className="active-dot" />}
                </Link>
                {showBlogLink && (
                    <Link to="/blog" className={`dock-item ${isActive('/blog') ? 'active' : ''}`} title="Blog">
                        <span className="dock-icon">✍️</span>
                        <span className="dock-label">Blog</span>
                        {isActive('/blog') && <span className="active-dot" />}
                    </Link>
                )}
            </div>
        </div>
    );
}
