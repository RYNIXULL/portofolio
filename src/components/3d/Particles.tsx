"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export default function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  // Generate random positions and colors
  const [positions, colors] = useMemo(() => {
    // A simple deterministic pseudo-random number generator (LCG)
    let seed = 1;
    const random = () => {
      const val = Math.sin(seed++) * 10000;
      return val - Math.floor(val);
    };

    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 25; // x
      pos[i * 3 + 1] = (random() - 0.5) * 25; // y
      pos[i * 3 + 2] = (random() - 0.5) * 15 - 5; // z

      // Subtle cyan/purple mix
      const isCyan = random() > 0.5;
      color.setHex(isCyan ? 0x00f0ff : 0x8a2be2);
      
      // Make most particles white/gray for subtlety
      if (random() > 0.1) {
        color.setHex(0xffffff);
      }

      color.toArray(col, i * 3);
    }
    return [pos, col];
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!mesh.current) return;
    const tempColor = new THREE.Color();
    for (let j = 0; j < count; j++) {
      tempColor.fromArray(colors, j * 3);
      mesh.current.setColorAt(j, tempColor);
    }
    if (mesh.current.instanceColor) {
      mesh.current.instanceColor.needsUpdate = true;
    }
  }, [colors, count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Convert mouse to normalized device coordinates using native R3F pointer
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    let i = 0;
    for (let j = 0; j < count; j++) {
      // Create a subtle floating effect
      const t = state.clock.elapsedTime * 0.1;
      const xPos = positions[j * 3] + Math.sin(t + j) * 0.5;
      const yPos = positions[j * 3 + 1] + Math.cos(t + j) * 0.5;
      const zPos = positions[j * 3 + 2];

      // Mouse reactivity
      const dx = mouseX * 10 - xPos;
      const dy = mouseY * 10 - yPos;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const force = Math.max(0, 3 - distance) * 0.1;

      dummy.position.set(
        xPos - (dx * force),
        yPos - (dy * force),
        zPos
      );
      
      // Scale pulse
      const scale = 0.02 + Math.sin(t * 5 + j) * 0.01;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i++, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Rotate the entire particle system slowly
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        vertexColors 
        transparent 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
