import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────
   RoadScene — the 3D road that the camera flies through.
   scrollProgress: 0 → 1 drives the camera along the path.
───────────────────────────────────────────────────────── */

/* Build a winding CatmullRom path through the scene */
function buildPath(chapters) {
    const points = chapters.map((_, i) => {
        const z = -i * 18;
        const x = (i % 2 === 0 ? -1 : 1) * (i === 0 ? 0 : 3.5);
        return new THREE.Vector3(x, -0.6, z);
    });
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
}

/* Single road segment mesh */
function RoadSegment({ start, end }) {
    const mid = useMemo(() => new THREE.Vector3().lerpVectors(start, end, 0.5), [start, end]);
    const dir = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
    const len = dir.length();
    const quat = useMemo(() => {
        const q = new THREE.Quaternion();
        q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize());
        return q;
    }, [dir]);

    return (
        <mesh position={mid} quaternion={quat} receiveShadow>
            <boxGeometry args={[5.5, 0.08, len]} />
            <meshStandardMaterial color="#111115" roughness={0.9} metalness={0.1} />
        </mesh>
    );
}

/* Dashed white center line */
function CenterLines({ path, segments = 200 }) {
    const points = useMemo(() => path.getPoints(segments), [path, segments]);

    return (
        <>
            {points.map((p, i) => {
                if (i % 8 !== 0 || i >= points.length - 1) return null;
                const next = points[Math.min(i + 4, points.length - 1)];
                const mid = new THREE.Vector3().lerpVectors(p, next, 0.5);
                const dir = new THREE.Vector3().subVectors(next, p).normalize();
                const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
                const len = p.distanceTo(next);
                return (
                    <mesh key={i} position={mid} quaternion={q}>
                        <boxGeometry args={[0.12, 0.12, len * 0.5]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
                    </mesh>
                );
            })}
        </>
    );
}

/* Road edge markers / guard posts */
function EdgePosts({ path, segments = 80 }) {
    const points = useMemo(() => path.getPoints(segments), [path, segments]);
    return (
        <>
            {points.map((p, i) => {
                if (i % 5 !== 0) return null;
                return (
                    <group key={i}>
                        <mesh position={[p.x + 3, p.y + 0.4, p.z]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                            <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.4} />
                        </mesh>
                        <mesh position={[p.x - 3, p.y + 0.4, p.z]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                            <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.4} />
                        </mesh>
                    </group>
                );
            })}
        </>
    );
}

/* Floating milestone pillar at each chapter */
function MilestonePillar({ position, index, isActive }) {
    const meshRef = useRef();
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * (isActive ? 1.5 : 0.3);
        }
    });

    return (
        <group position={position}>
            {/* Pillar */}
            <mesh>
                <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Diamond gem on top */}
            <mesh ref={meshRef} position={[0, 1.8, 0]}>
                <octahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial
                    color={isActive ? '#ffffff' : '#808080'}
                    emissive={isActive ? '#C0C0C0' : '#333333'}
                    emissiveIntensity={isActive ? 3 : 0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
            {/* Point light for active */}
            {isActive && (
                <pointLight position={[0, 2, 0]} intensity={6} distance={10} color="#e0e0ff" />
            )}
        </group>
    );
}

/* Glowing road light rings */
function RoadLights({ path, count = 12 }) {
    const lights = useMemo(() =>
        Array.from({ length: count }, (_, i) => {
            const t = i / count;
            return path.getPoint(t);
        }),
        [path, count]
    );

    return (
        <>
            {lights.map((pos, i) => (
                <mesh key={i} position={[pos.x, pos.y - 0.5, pos.z]}>
                    <torusGeometry args={[2.8, 0.015, 8, 40]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#aaaaff"
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.35}
                    />
                </mesh>
            ))}
        </>
    );
}

/* Ground plane */
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, -60]} receiveShadow>
            <planeGeometry args={[200, 300]} />
            <meshStandardMaterial color="#040406" roughness={1} />
        </mesh>
    );
}

/* Floating ambient particles around the road */
function FloatingDust() {
    const count = 300;
    const points = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 1] = Math.random() * 6 - 2;
            arr[i * 3 + 2] = -(Math.random() * 200);
        }
        geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return geo;
    }, []);

    return (
        <points geometry={points}>
            <pointsMaterial size={0.04} color="#aaaacc" transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

/* ── Main exported 3D Scene ── */
export default function RoadScene({ scrollProgress, chapters, activeChapter }) {
    const cameraRef = useRef();
    const path = useMemo(() => buildPath(chapters), [chapters]);

    // Camera follows the path
    useFrame(({ camera }) => {
        const t = Math.min(scrollProgress, 0.99);
        const camPos = path.getPoint(t);
        const lookT = Math.min(t + 0.03, 0.99);
        const lookAt = path.getPoint(lookT);

        camera.position.lerp(
            new THREE.Vector3(camPos.x, camPos.y + 1.2, camPos.z),
            0.07
        );
        const target = new THREE.Vector3(lookAt.x, lookAt.y + 0.6, lookAt.z);
        camera.lookAt(target);
    });

    // Build road segments from path points
    const segments = useMemo(() => {
        const pts = path.getPoints(chapters.length * 4);
        const segs = [];
        for (let i = 0; i < pts.length - 1; i++) {
            segs.push({ start: pts[i], end: pts[i + 1] });
        }
        return segs;
    }, [path, chapters.length]);

    // Milestone pillar positions (one per chapter)
    const milestones = useMemo(() =>
        chapters.map((_, i) => {
            const t = i / (chapters.length - 1);
            const pt = path.getPoint(t);
            return new THREE.Vector3(pt.x + 3.5, pt.y, pt.z);
        }),
        [path, chapters]
    );

    return (
        <>
            {/* Camera is handled via useFrame above */}
            <color attach="background" args={['#000005']} />
            <fog attach="fog" args={['#000010', 20, 90]} />

            {/* Lighting */}
            <ambientLight intensity={0.06} color="#1a1a3a" />
            <directionalLight position={[10, 20, 5]} intensity={0.4} color="#e0e0ff" />

            {/* Road */}
            {segments.map((seg, i) => (
                <RoadSegment key={i} start={seg.start} end={seg.end} />
            ))}
            <CenterLines path={path} />
            <EdgePosts path={path} />
            <RoadLights path={path} count={chapters.length * 2} />

            {/* Milestones */}
            {milestones.map((pos, i) => (
                <MilestonePillar
                    key={i}
                    position={pos}
                    index={i}
                    isActive={activeChapter === i}
                />
            ))}

            {/* Environment */}
            <Ground />
            <FloatingDust />
            <Stars radius={200} depth={60} count={8000} factor={3} saturation={0} fade speed={0.5} />
            <Sparkles count={200} scale={15} size={1.5} speed={0.2} opacity={0.4} color="#aaaaff" />
        </>
    );
}
