import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Torus, Text } from '@react-three/drei';

export default function Project3D({ project }) {
  const groupRef = useRef();
  const cubeRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
    
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.3;
      cubeRef.current.rotation.y = time * 0.5;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.2;
      ringRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Cube */}
      <Box ref={cubeRef} args={[1.2, 1.2, 1.2]}>
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Wireframe Cube */}
      <Box args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial
          color="white"
          wireframe
          transparent
          opacity={0.2}
        />
      </Box>

      {/* Orbiting Rings */}
      <Torus
        ref={ringRef}
        args={[1, 0.03, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.3} />
      </Torus>

      <Torus
        args={[1.2, 0.02, 16, 100]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
      </Torus>

      {/* Floating Dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}