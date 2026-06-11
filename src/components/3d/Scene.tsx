"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import HeroObject from "./HeroObject";
import Particles from "./Particles";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2be2" />
          
          <Environment preset="city" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <HeroObject />
          </Float>
          
          <Particles count={200} />
        </Suspense>
      </Canvas>
    </div>
  );
}
