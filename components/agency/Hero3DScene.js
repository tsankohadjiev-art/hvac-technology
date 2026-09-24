"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function CoreBlob() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 4]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        distort={0.45}
        speed={2}
        roughness={0.15}
        metalness={0.3}
      />
    </mesh>
  );
}

function OrbitingShape({ position, color, geometry, speed = 1 }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.4 * speed;
    meshRef.current.rotation.y += delta * 0.3 * speed;
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function PointerRig({ children }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y += (x * 0.4 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-y * 0.3 - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={60} color="#c084fc" />
      <pointLight position={[-4, -2, -3]} intensity={40} color="#22d3ee" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />

      <Suspense fallback={null}>
        <PointerRig>
          <CoreBlob />
          <OrbitingShape
            position={[-2.6, 1.1, -0.5]}
            color="#f472b6"
            geometry={<octahedronGeometry args={[0.45, 0]} />}
            speed={1.1}
          />
          <OrbitingShape
            position={[2.4, -1, 0.3]}
            color="#38bdf8"
            geometry={<boxGeometry args={[0.6, 0.6, 0.6]} />}
            speed={0.8}
          />
          <OrbitingShape
            position={[1.6, 1.6, -1]}
            color="#facc15"
            geometry={<torusGeometry args={[0.35, 0.13, 16, 32]} />}
            speed={1.4}
          />
        </PointerRig>
      </Suspense>
    </Canvas>
  );
}
