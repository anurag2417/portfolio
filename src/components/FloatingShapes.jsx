import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingShapes({ count = 50 }) {
  const meshRef = useRef();
  
  const shapes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 3);
      const size = Math.random() * 0.3 + 0.1;
      const position = [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30 - 10
      ];
      const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.5);
      const speed = Math.random() * 0.02 + 0.01;
      const rotationSpeed = Math.random() * 0.02;
      
      temp.push({ type, size, position, color, speed, rotationSpeed });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        child.rotation.x += shapes[i].rotationSpeed;
        child.rotation.y += shapes[i].rotationSpeed;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {shapes.map((shape, i) => {
        let geometry;
        switch (shape.type) {
          case 0:
            geometry = <boxGeometry args={[shape.size, shape.size, shape.size]} />;
            break;
          case 1:
            geometry = <sphereGeometry args={[shape.size, 16, 16]} />;
            break;
          case 2:
            geometry = <icosahedronGeometry args={[shape.size, 0]} />;
            break;
        }
        
        return (
          <mesh
            key={i}
            position={shape.position}
            geometry={geometry}
          >
            <meshStandardMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}