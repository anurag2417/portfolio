import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function Skills3D({ skills }) {
  const groupRef = useRef();
  const spheresRef = useRef([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    spheresRef.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.x = Math.sin(time * 0.8 + i) * 2.5;
        sphere.position.y = Math.cos(time * 0.8 + i) * 2.5;
        sphere.position.z = Math.sin(time * 0.5 + i) * 1.5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh
            key={skill.name}
            ref={(el) => (spheresRef.current[index] = el)}
            position={[x, 0, z]}
          >
            <sphereGeometry args={[0.4 + skill.percentage / 200, 32, 32]} />
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}