"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("magnetic")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const animate = () => {
      // Smooth lerp follow
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${currentX - 12}px, ${currentY - 12}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-accent-cyan pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-[width,height,background-color] duration-200 ${
        isHovering ? "w-12 h-12 bg-accent-cyan/20" : ""
      }`}
      style={{ willChange: "transform" }}
    >
      {isHovering && (
        <div className="w-1 h-1 bg-accent-cyan rounded-full" />
      )}
    </div>
  );
}
