"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

export default function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth floating animation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t / 2) * 0.2;
    
    // Rotation
    groupRef.current.rotation.x = t * 0.1;
    groupRef.current.rotation.y = t * 0.15;

    // Mouse parallax (using native R3F pointer — no React re-renders)
    const targetX = (state.pointer.x) * 2;
    const targetY = (state.pointer.y) * 2;
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y + Math.sin(t/2)*0.2) * 0.05;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.65 : 1.0}>
      {/* Solid Core */}
      <Icosahedron ref={meshRef} args={[2, 4]} scale={1.2}>
        <MeshDistortMaterial
          color="#050505"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </Icosahedron>

      {/* Wireframe overlay for tech/futuristic feel */}
      <Icosahedron ref={wireframeRef} args={[2.2, 2]} scale={1.25}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Icosahedron>
      
      {/* Inner glow */}
      <pointLight color="#8a2be2" intensity={2} distance={5} />
    </group>
  );
}
