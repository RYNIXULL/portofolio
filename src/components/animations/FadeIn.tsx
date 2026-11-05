"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  viewOnce?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  duration = 0.7,
  viewOnce = false, // Dynamic come & go animation as user scrolls
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: viewOnce, margin: "-8% 0px" });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.985,
        ...directions[direction],
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.985,
        x: isInView ? 0 : directions[direction].x,
        y: isInView ? 0 : directions[direction].y,
      }}
      transition={{
        duration: duration,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
