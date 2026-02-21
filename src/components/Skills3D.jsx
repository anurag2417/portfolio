import React, { useRef } from 'react';
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
        sphere.position.x = Math.sin(time * 0.5 + i) * 3;
        sphere.position.y = Math.cos(time * 0.5 + i) * 3;
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
          <group key={skill.name}>
            <mesh
              ref={(el) => (spheresRef.current[index] = el)}
              position={[x, 0, z]}
            >
              <sphereGeometry args={[0.5 + skill.level / 200, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.3}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
            
            <Text
              position={[x, 1, z]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}