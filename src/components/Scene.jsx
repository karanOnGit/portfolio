import { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float, Stars, Sphere, Cloud, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Particles from './Particles'
import Asteroids from './Asteroids'
import RingParticles from './RingParticles'
import Sun from './Sun'

export default function Scene() {
    const planetRef = useRef()
    const atmosphereRef = useRef()
    const cameraRef = useRef()

    useFrame((state, delta) => {
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * 0.05
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += delta * 0.07 // Rotate atmosphere slightly faster
        }
    })

    useLayoutEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const maxScroll = document.body.scrollHeight - window.innerHeight
            const progress = scrollY / maxScroll

            if (cameraRef.current) {
                // Fly through effect
                cameraRef.current.position.z = 12 - progress * 15 // Start further, go deeper
                cameraRef.current.position.y = -progress * 4

                // Slight camera rotation for dynamic feel
                cameraRef.current.rotation.z = progress * 0.1
                cameraRef.current.rotation.x = -progress * 0.2
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} ref={cameraRef} />

            {/* Distant Sun in the bottom right corner */}
            {/* <Sun x={20} y={0} z={-250} /> */}

            {/* Space Lighting - Dramatic and cool */}
            <ambientLight intensity={0.05} color="#4040a0" />
            {/* <pointLight position={[-50, -20, -30]} intensity={1.5} color="#bf00ff" /> */}

            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    <group ref={planetRef}>
                        <Sphere args={[1.5, 64, 64]}>
                            <meshStandardMaterial
                                color="#1a1a3a"
                                roughness={0.7}
                                metalness={0.2}
                            />
                        </Sphere>
                        {/* Atmosphere / Glow */}
                        {/* <Sphere args={[1, 64, 64]} ref={atmosphereRef}>
                            <meshPhongMaterial
                                color="#4040ff"
                                transparent
                                opacity={0.15}
                                side={THREE.BackSide}
                                blending={THREE.AdditiveBlending}
                            />
                        </Sphere> */}
                    </group>

                    {/* <group rotation={[210 * Math.PI / 180, 0, -30 * Math.PI / 180]}>
                        <RingParticles count={2000} radius={1} thickness={0.5} speed={0.1} />
                        <RingParticles count={4000} radius={2} thickness={0.5} speed={0.01} />
                        <RingParticles count={20000} radius={4} thickness={2.5} speed={0.001} />
                    </group> */}
                </group>
            </Float>

            {/* <Asteroids /> */}

            {/* <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[-5, 2, -10]} color="#bf00ff" />
            <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[5, -2, -15]} color="#00f3ff" /> */}

            <Particles count={1000} />
            <Sparkles count={500} scale={12} size={2} speed={0.4} opacity={0.5} color="#fff" />
            <Stars radius={300} depth={50} count={10000} factor={4} saturation={1} fade speed={1.5} />

            <Environment preset="dawn" />

            {/* <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} radius={0.6} />
            </EffectComposer> */}
        </>
    )
}