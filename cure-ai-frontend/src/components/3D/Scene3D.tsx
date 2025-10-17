import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { OrbitControls, Stars, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Custom shader for volumetric fog
const VolumetricFogShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color(0.8, 0.4, 1.0) },
  },
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec3 vPosition;
    
    void main() {
      float noise = sin(vPosition.x * 10.0 + time) * cos(vPosition.y * 10.0 + time) * sin(vPosition.z * 10.0 + time);
      float alpha = (noise + 1.0) * 0.1;
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

// Animated Brain Component
function AnimatedBrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#C8AFFF"
          metalness={0.1}
          roughness={0.2}
          transmission={0.8}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      {/* Neural network particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02, 8, 8]}
          position={[
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
          ]}
        >
          <meshBasicMaterial color="#00FFFF" />
        </Sphere>
      ))}
    </group>
  );
}

// Particle System
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      colors[i * 3] = Math.random() * 0.5 + 0.5; // R
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.7; // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
      points.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Volumetric Fog
function VolumetricFog() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={VolumetricFogShader.uniforms}
        vertexShader={VolumetricFogShader.vertexShader}
        fragmentShader={VolumetricFogShader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Main Scene Component
export default function Scene3D() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Subtle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#C8AFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D97DD9" />
      <directionalLight position={[0, 10, 5]} intensity={0.3} color="#FFFFFF" />

      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main 3D Objects */}
      <group ref={groupRef}>
        <AnimatedBrain />
        <ParticleField />
        <VolumetricFog />
      </group>

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          offset={[0.001, 0.001]}
        />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}
