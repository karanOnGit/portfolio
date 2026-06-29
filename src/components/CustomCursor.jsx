import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        // Check if device is touch
        if (window.matchMedia("(pointer: coarse)").matches) return

        const moveCursor = (e) => {
            // Immediate inner dot follow
            gsap.to(dotRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.05,
                ease: "power2.out"
            });
            // Outer ring lag
            gsap.to(ringRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.35,
                ease: "power3.out"
            });
        }

        window.addEventListener('mousemove', moveCursor)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
        }
    }, [])

    return (
        <>
            {/* Inner Dot: Crimson Glow */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--color-accent, #d90429)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10000,
                    boxShadow: '0 0 10px var(--color-accent)'
                }}
            />
            {/* Outer Ring: Electric Blue */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '36px',
                    height: '36px',
                    border: '1.5px solid var(--color-accent-secondary, #0070f3)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    boxShadow: '0 0 15px rgba(0, 112, 243, 0.2)'
                }}
            />
        </>
    )
}