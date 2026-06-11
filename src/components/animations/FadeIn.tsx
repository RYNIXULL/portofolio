"use client";

import { motion, useInView } from "framer-motion";
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
  duration = 0.8,
  viewOnce = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: viewOnce, margin: "-10% 0px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : directions[direction].x,
        y: isInView ? 0 : directions[direction].y,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease-out
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
