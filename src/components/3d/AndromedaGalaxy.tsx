"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Seeded RNG ───────────────────────────────────────────────────────────────
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Galaxy geometry helpers ──────────────────────────────────────────────────
function spiralPoint(rng: () => number, arm: number, t: number, galaxyR: number, spread: number) {
  const ang = (arm / 2) * Math.PI * 2 + t * 4.3;
  const rad = t * galaxyR * 0.93;
  const sp = (rng() - 0.5) * spread * (0.3 + t * 0.7);
  const fa = ang + sp;
  const rn = rad * (1 + (rng() - 0.5) * 0.16);
  return {
    x: Math.cos(fa) * rn,
    y: (rng() - 0.5) * galaxyR * 0.055 * (1 - t * 0.7), // Z in 2D maps to Y in 3D
    z: Math.sin(fa) * rn * 0.37, // Y in 2D maps to Z in 3D
  };
}

// ─── Build static scene data once ─────────────────────────────────────────────
function useGalaxyGeometry() {
  return useMemo(() => {
    const galaxyR = 15; // Abstract 3D units
    const rng = makeRng(7);
    const rr = (a: number, b: number) => a + rng() * (b - a);

    const starsPos = [];
    const starsCol = [];
    const starsSize = [];

    const dustPos = [];
    const dustCol = [];
    const dustSize = [];

    const bgPos = [];
    const bgCol = [];
    const bgSize = [];

    // Spiral arm stars
    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < 2500; i++) { // Increased count since GPU is fast!
        const t = rr(0.03, 1);
        const p = spiralPoint(rng, a, t, galaxyR, 0.65);
        starsPos.push(p.x, p.y, p.z);
        
        const bl = rng() > 0.55;
        const color = new THREE.Color();
        if (bl) {
          color.setRGB(rr(0.7, 0.8), rr(0.8, 0.9), rr(0.9, 1.0)); // Blueish
        } else {
          color.setRGB(rr(0.9, 1.0), rr(0.8, 0.9), rr(0.7, 0.8)); // Warm
        }
        starsCol.push(color.r, color.g, color.b);
        starsSize.push(rr(0.1, 0.4));
      }
    }

    // Bulge / halo stars
    for (let i = 0; i < 800; i++) {
      const ang = rng() * Math.PI * 2;
      const rad = rng() * galaxyR * 0.8;
      const x = Math.cos(ang) * rad * (1 + (rng() - 0.5) * 0.28);
      const z = Math.sin(ang) * rad * 0.32;
      const y = (rng() - 0.5) * galaxyR * 0.09;
      
      starsPos.push(x, y, z);
      starsCol.push(1.0, 0.9, 0.7); // Bright warm core
      starsSize.push(rr(0.15, 0.5));
    }

    // Dust clouds
    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < 150; i++) {
        const t = rr(0.1, 0.92);
        const p = spiralPoint(rng, a, t, galaxyR, 0.45);
        dustPos.push(p.x, p.y, p.z);
        
        const h = rng() > 0.5 ? 260 : 230; // Purple/Blue hues
        const color = new THREE.Color().setHSL(h / 360, 0.55, 0.58);
        dustCol.push(color.r, color.g, color.b);
        dustSize.push(rr(1.5, 4.0));
      }
    }

    // Background stars
    for (let i = 0; i < 1500; i++) {
      const x = (rng() - 0.5) * 60;
      const y = (rng() - 0.5) * 60;
      const z = (rng() - 0.5) * 60 - 20; // Push back slightly
      bgPos.push(x, y, z);
      bgCol.push(0.8, 0.8, 1.0);
      bgSize.push(rr(0.05, 0.15));
    }

    return {
      stars: {
        pos: new Float32Array(starsPos),
        col: new Float32Array(starsCol),
        size: new Float32Array(starsSize),
      },
      dust: {
        pos: new Float32Array(dustPos),
        col: new Float32Array(dustCol),
        size: new Float32Array(dustSize),
      },
      bg: {
        pos: new Float32Array(bgPos),
        col: new Float32Array(bgCol),
        size: new Float32Array(bgSize),
      }
    };
  }, []);
}

// ─── Particle Components ──────────────────────────────────────────────────────

const particleVertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  void main() {
    // Creating a soft circular glow instead of a square
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if (ll > 0.5) discard;
    float alpha = exp(-ll * 6.0); // Soft exponential falloff for glow
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function GalaxyParticles() {
  const geo = useGalaxyGeometry();
  const groupRef = useRef<THREE.Group>(null);
  const gyroRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let initialBeta: number | null = null;
    let initialGamma: number | null = null;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const beta = e.beta;
      const gamma = e.gamma;

      if (beta === null || gamma === null) return;

      // Calibrate on first orientation event
      if (initialBeta === null || initialGamma === null) {
        initialBeta = beta;
        initialGamma = gamma;
        return;
      }

      // Calculate relative delta from calibrated baseline position
      const deltaBeta = beta - initialBeta;
      const deltaGamma = gamma - initialGamma;

      // Max orientation delta is 20 deg, normalize to -1 to 1
      gyroRef.current.x = Math.min(Math.max(deltaGamma / 20, -1), 1);
      gyroRef.current.y = Math.min(Math.max(deltaBeta / 20, -1), 1);
    };

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      const DeviceOrientation = DeviceOrientationEvent as any;
      if (typeof DeviceOrientation === "undefined" || typeof DeviceOrientation.requestPermission !== "function") {
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        // iOS gesture permissions
        let granted = false;
        const req = async () => {
          if (granted) return;
          try {
            const res = await DeviceOrientation.requestPermission();
            if (res === "granted") {
              granted = true;
              window.addEventListener("deviceorientation", handleOrientation);
              cleanup();
            }
          } catch (e) {
            console.error(e);
          }
        };
        const cleanup = () => {
          window.removeEventListener("touchstart", req);
          window.removeEventListener("click", req);
        };
        window.addEventListener("touchstart", req, { passive: true });
        window.addEventListener("click", req, { passive: true });
      }
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Auto rotate very slowly
      groupRef.current.rotation.y += 0.0005;
      
      let xOffset = 0;
      let yOffset = 0;
      
      const isMobile = window.matchMedia("(pointer: coarse)").matches;
      if (isMobile) {
        xOffset = gyroRef.current.x;
        yOffset = gyroRef.current.y;
      } else {
        // Desktop mouse parallax
        xOffset = state.pointer.x;
        yOffset = -state.pointer.y; // Invert to align with pitch direction
      }
      
      const targetRotX = 0.4 + yOffset * 0.15; // Pitch changes X tilt
      const targetRotZ = -xOffset * 0.15;      // Roll/MouseX changes Z tilt
      
      // Smoothly interpolate current rotation to target rotation
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.05;
    }
  });

  const materialArgs = {
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Background Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.bg.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[geo.bg.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[geo.bg.size, 1]} />
        </bufferGeometry>
        <shaderMaterial {...materialArgs} />
      </points>

      {/* Dust Clouds */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.dust.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[geo.dust.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[geo.dust.size, 1]} />
        </bufferGeometry>
        <shaderMaterial {...materialArgs} opacity={0.6} />
      </points>

      {/* Main Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.stars.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[geo.stars.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[geo.stars.size, 1]} />
        </bufferGeometry>
        <shaderMaterial {...materialArgs} />
      </points>

      {/* Core Glow (Simple Sprite) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial 
          color={new THREE.Color(1.0, 0.9, 0.7)}
          transparent 
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={createGlowTexture()}
        />
      </mesh>
    </group>
  );
}

// Helper to generate a soft gradient texture for the core glow
function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AndromedaGalaxy() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#000308]">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <GalaxyParticles />
      </Canvas>
      {/* Subtle overlay to blend into the main dark theme and make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
    </div>
  );
}
