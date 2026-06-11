"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverTiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function HoverTiltCard({ children, className, tiltAmount = 15 }: HoverTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

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
          className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: spotlightBg,
          }}
        />
      </div>
    </motion.div>
  );
}
