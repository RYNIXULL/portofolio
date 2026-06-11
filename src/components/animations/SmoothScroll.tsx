"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 1.0, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
