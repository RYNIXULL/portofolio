"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function StaggerText({ text, className, delay = 0, once = true }: StaggerTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  // Split text into words, then characters, but here we just do simple word split for cleaner motion
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      className={cn("flex flex-wrap gap-[0.25em]", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-flex">
          <motion.span variants={childVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
