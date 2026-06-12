"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 3000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const [positions, colors, sizes] = useMemo(() => {
    let seed = 42;
    const random = () => {
      const val = Math.sin(seed++) * 10000;
      return val - Math.floor(val);
    };

    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const color = new THREE.Color();

    const ARMS = 2;
    const SPREAD = 0.6;
    const GALAXY_RADIUS = 14;
    const CORE_RATIO = 0.15;
    const BULGE_RATIO = 0.25;

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number;
      const roll = random();

      if (roll < CORE_RATIO) {
        // Dense bright core
        const r = random() * 1.5;
        const theta = random() * Math.PI * 2;
        x = Math.cos(theta) * r * (0.5 + random() * 0.5);
        y = Math.sin(theta) * r * (0.5 + random() * 0.5);
        z = (random() - 0.5) * 0.6;

        const pick = random();
        if (pick < 0.5) {
          color.setHex(0xfff8e7);   // warm white
        } else if (pick < 0.8) {
          color.setHex(0xffd700);   // golden
        } else {
          color.setHex(0xe6e6fa);   // cool white / lavender
        }
        siz[i] = 0.02 + random() * 0.025; // Small core stars

      } else if (roll < CORE_RATIO + BULGE_RATIO) {
        // Central bulge
        const r = 1 + random() * 3.5;
        const theta = random() * Math.PI * 2;
        x = Math.cos(theta) * r;
        y = Math.sin(theta) * r * 0.7;
        z = (random() - 0.5) * 1.0;

        const pick = random();
        if (pick < 0.4) {
          color.setHex(0xfff8e7);   // warm white
        } else if (pick < 0.7) {
          color.setHex(0xadd8ff);   // soft blue
        } else {
          color.setHex(0xe8d0ff);   // lavender
        }
        siz[i] = 0.015 + random() * 0.02; // Small bulge stars

      } else {
        // Spiral arms
        const armIndex = Math.floor(random() * ARMS);
        const armOffset = (armIndex / ARMS) * Math.PI * 2;
        const dist = 1.5 + random() * (GALAXY_RADIUS - 1.5);
        const spiralAngle = armOffset + Math.log(1 + dist) * 2.2;
        const perpSpread = (random() - 0.5) * SPREAD * (1 + dist * 0.12);
        const angle = spiralAngle + perpSpread;

        x = Math.cos(angle) * dist;
        y = Math.sin(angle) * dist;
        z = (random() - 0.5) * (0.3 + 0.15 * Math.max(0, GALAXY_RADIUS - dist));

        // All bright, glowing colors
        const ct = random();
        if (ct < 0.3) {
          color.setHex(0x00aaff);  // bright blue
        } else if (ct < 0.5) {
          color.setHex(0x00ffff);  // cyan
        } else if (ct < 0.65) {
          color.setHex(0xffffff);  // pure white
        } else if (ct < 0.8) {
          color.setHex(0xd4b8ff);  // purple nebula
        } else if (ct < 0.9) {
          color.setHex(0xff66a3);  // pink star-forming
        } else {
          color.setHex(0xffe5b4);  // warm old stars
        }

        const falloff = 1 - (dist / GALAXY_RADIUS) * 0.5;
        siz[i] = (0.008 + random() * 0.012) * falloff; // Tiny arm stars
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      color.toArray(col, i * 3);
    }

    return [pos, col, siz];
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
    const t = state.clock.elapsedTime;

    for (let j = 0; j < count; j++) {
      const baseX = positions[j * 3];
      const baseY = positions[j * 3 + 1];
      const baseZ = positions[j * 3 + 2];

      const dist = Math.sqrt(baseX * baseX + baseY * baseY);
      const orbitSpeed = 0.02 / (1 + dist * 0.15);
      const angle = Math.atan2(baseY, baseX) + t * orbitSpeed;

      const xPos = Math.cos(angle) * dist;
      const yPos = Math.sin(angle) * dist;
      const zPos = baseZ + Math.sin(t * 0.3 + j * 0.01) * 0.05;

      dummy.position.set(xPos, yPos, zPos);

      // Twinkle
      const twinkle = 0.7 + Math.sin(t * 3 + j * 7.13) * 0.3;
      const s = sizes[j] * twinkle;
      dummy.scale.set(s, s, s);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(j, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;

    // Andromeda tilt
    mesh.current.rotation.x = -0.55;
    mesh.current.rotation.z = 0.3;
    mesh.current.rotation.y = t * 0.015;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
