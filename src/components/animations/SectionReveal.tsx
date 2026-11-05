"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionAnimationVariant =
  | "hero"
  | "split"
  | "cascade"
  | "panoramic"
  | "timeline"
  | "fan"
  | "radiant"
  | "fade";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  variant?: SectionAnimationVariant;
}

const VARIANTS_MAP: Record<SectionAnimationVariant, Variants> = {
  // Hero: Celestial zoom & drift
  hero: {
    initial: {
      opacity: 0,
      scale: 1.05,
      y: -35,
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },

  // About: Horizontal depth slide
  split: {
    initial: {
      opacity: 0,
      x: -45,
      scale: 0.97,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Skills: 3D perspective pop & upward cascade
  cascade: {
    initial: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      rotateX: 6,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  },

  // Projects: Panoramic wide curved expansion
  panoramic: {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Experience: Conduit stream slide & rise
  timeline: {
    initial: {
      opacity: 0,
      x: -35,
      y: 35,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Certificates: Spring card fan-out & tilt
  fan: {
    initial: {
      opacity: 0,
      scale: 0.91,
      rotateZ: -1.5,
      y: 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.34, 1.3, 0.64, 1],
      },
    },
  },

  // Contact: Radiant gravitational bloom & glass expansion
  radiant: {
    initial: {
      opacity: 0,
      scale: 0.88,
      y: 40,
      filter: "blur(8px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // General Fade
  fade: {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

export default function SectionReveal({
  children,
  className,
  id,
  delay = 0,
  variant = "fade",
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.3 } },
      }
    : VARIANTS_MAP[variant] || VARIANTS_MAP.fade;

  return (
    <motion.section
      id={id}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.12, margin: "-40px 0px" }}
      variants={selectedVariant}
      transition={{ delay }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
    </motion.section>
  );
}
