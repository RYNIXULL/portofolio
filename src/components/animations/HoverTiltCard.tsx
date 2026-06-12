"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverTiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function HoverTiltCard({ children, className, tiltAmount = 15 }: HoverTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const currentTilt = isMobile ? 0 : tiltAmount;
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [currentTilt, -currentTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-currentTilt, currentTilt]);

  // Spotlight coordinates for interactive glass sheen
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightXSpring = useSpring(spotlightX, { stiffness: 200, damping: 25 });
  const spotlightYSpring = useSpring(spotlightY, { stiffness: 200, damping: 25 });
  const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${spotlightXSpring}px ${spotlightYSpring}px, rgba(255, 255, 255, 0.18), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Update spotlight position
    spotlightX.set(mouseX);
    spotlightY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let initialBeta: number | null = null;
    let initialGamma: number | null = null;

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
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

      // Limit response angles to range [-0.5, 0.5]
      // Max tilt delta we care about is 15 degrees
      const xVal = Math.min(Math.max(deltaGamma / 15, -0.5), 0.5);
      const yVal = Math.min(Math.max(deltaBeta / 15, -0.5), 0.5);

      x.set(xVal);
      y.set(yVal);

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        spotlightX.set(rect.width / 2 + xVal * rect.width);
        spotlightY.set(rect.height / 2 + yVal * rect.height);
      }
    };

    // Detect if this is a mobile/touch pointer device
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
      const DeviceOrientation = DeviceOrientationEvent as any;
      
      // Android / non-iOS or already granted orientation
      if (typeof DeviceOrientation === "undefined" || typeof DeviceOrientation.requestPermission !== "function") {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      } else {
        // iOS requires user gesture
        let granted = false;
        const requestPermission = async () => {
          if (granted) return;
          try {
            const res = await DeviceOrientation.requestPermission();
            if (res === "granted") {
              granted = true;
              window.addEventListener("deviceorientation", handleDeviceOrientation);
              cleanupGestures();
            }
          } catch (err) {
            console.error("Orientation permission rejected", err);
          }
        };

        const cleanupGestures = () => {
          window.removeEventListener("touchstart", requestPermission);
          window.removeEventListener("click", requestPermission);
        };

        window.addEventListener("touchstart", requestPermission, { passive: true });
        window.addEventListener("click", requestPermission, { passive: true });
      }
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [x, y, spotlightX, spotlightY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative transition-transform ease-out group/tilt", className)}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}
        <motion.div
          className={cn(
            "absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30",
            isMobile ? "opacity-100" : "opacity-0 group-hover/tilt:opacity-100"
          )}
          style={{
            background: spotlightBg,
          }}
        />
      </div>
    </motion.div>
  );
}
