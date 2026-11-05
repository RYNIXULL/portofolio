"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 1.0, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
