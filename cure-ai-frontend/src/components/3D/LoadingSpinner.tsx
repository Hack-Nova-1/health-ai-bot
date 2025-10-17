import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

export default function LoadingSpinner() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1, 0.3, 16, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#C8AFFF"
          metalness={0.8}
          roughness={0.2}
          transmission={0.9}
          thickness={0.1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Torus>
      <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00FFFF" />
      </Sphere>
    </group>
  );
}
