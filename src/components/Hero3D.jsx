import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, TorusKnot, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const groupRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const particlesRef = useRef();

  // Create particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.2;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.1;
      sphereRef.current.rotation.y = time * 0.2;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Center Sphere */}
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff6b6b"
          emissive="#ff6b6b"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbiting Torus Knot */}
      <TorusKnot
        ref={torusRef}
        args={[2.5, 0.4, 128, 16]}
        position={[0, 0, 0]}
      >
        <MeshWobbleMaterial
          color="#4ecdc4"
          emissive="#4ecdc4"
          emissiveIntensity={0.3}
          factor={0.5}
          speed={2}
          roughness={0.3}
          metalness={0.7}
        />
      </TorusKnot>

      {/* Orbiting Spheres */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Sphere
            key={i}
            args={[0.3, 32, 32]}
            position={[x, 0, z]}
          >
            <MeshDistortMaterial
              color={`hsl(${i * 45}, 70%, 60%)`}
              distort={0.2}
              speed={1}
            />
          </Sphere>
        );
      })}

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 2 - 2, 0]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial color={`hsl(${i * 120}, 70%, 60%)`} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}