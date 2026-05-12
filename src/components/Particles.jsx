import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 2000 }) {
    const mesh = useRef()

    // Generate random particles with cosmic colors
    const particles = useRef(new Float32Array(count * 3))
    const colors = useRef(new Float32Array(count * 3))

    if (particles.current.every(v => v === 0)) {
        const colorPalette = [
            new THREE.Color('#00ffff'), // Cyan
            new THREE.Color('#ff00ff'), // Magenta
            new THREE.Color('#ffffff'), // White
            new THREE.Color('#4400ff')  // Deep Blue
        ]

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // Wide spread for cosmic feel
            particles.current[i3] = (Math.random() - 0.5) * 10
            particles.current[i3 + 1] = (Math.random() - 0.5) * 10
            particles.current[i3 + 2] = (Math.random() - 0.5) * 10

            const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]

            colors.current[i3] = randomColor.r
            colors.current[i3 + 1] = randomColor.g
            colors.current[i3 + 2] = randomColor.b
        }
    }

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        // Slow, ambient rotation
        mesh.current.rotation.y = time * 0.002
        mesh.current.rotation.x = time * 0.01
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.current.length / 30}
                    array={particles.current}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.current.length / 3}
                    array={colors.current}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}