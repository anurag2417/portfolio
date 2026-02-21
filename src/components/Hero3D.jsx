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
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.2;
      sphereRef.current.rotation.y = time * 0.3;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Center Sphere */}
      <Sphere ref={sphereRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff6b6b"
          emissive="#ff6b6b"
          emissiveIntensity={0.8}
          distort={0.6}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      {/* Orbiting Torus Knot */}
      <TorusKnot
        ref={torusRef}
        args={[3, 0.5, 128, 16]}
        position={[0, 0, 0]}
      >
        <MeshWobbleMaterial
          color="#4ecdc4"
          emissive="#4ecdc4"
          emissiveIntensity={0.5}
          factor={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </TorusKnot>

      {/* Floating Rings */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[0, i * 1.5 - 1.5, 0]}
        >
          <torusGeometry args={[4 + i * 0.5, 0.03, 16, 100]} />
          <meshBasicMaterial 
            color={`hsl(${i * 120}, 70%, 60%)`} 
            transparent 
            opacity={0.2} 
          />
        </mesh>
      ))}

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
          size={0.1}
          color="#ffffff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbiting Small Spheres */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Sphere
            key={i}
            args={[0.2, 16, 16]}
            position={[x, Math.sin(angle * 2) * 2, z]}
          >
            <meshStandardMaterial
              color={`hsl(${i * 30}, 70%, 60%)`}
              emissive={`hsl(${i * 30}, 70%, 60%)`}
              emissiveIntensity={0.5}
            />
          </Sphere>
        );
      })}
    </group>
  );
}