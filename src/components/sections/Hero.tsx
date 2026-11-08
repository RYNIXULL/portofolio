"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import StaggerText from "@/components/animations/StaggerText";
import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import { MagicButton } from "@/components/ui/MagicButton";
import { ArrowRight, Download, Compass } from "lucide-react";
import HoverTiltCard from "@/components/animations/HoverTiltCard";

// Lazy load 3D scene for performance
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Hero() {
  return (
    <SectionReveal id="hero" variant="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-transparent pt-32 pb-16">
      {/* 3D Interactive Background */}
      <Scene />

      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none my-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <FadeIn delay={2.3} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-black/65 backdrop-blur-xl border border-accent-cyan/30 text-accent-glow mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <Compass className="w-3.5 h-3.5 text-accent-cyan animate-spin-slow" />
              <span>Creative Engineer & Developer</span>
            </div>
          </FadeIn>

          <StaggerText
            text="Crafting digital experiences with purpose and precision."
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] mb-8 justify-center"
            delay={2.5}
          />
          
          <FadeIn delay={3.0} direction="up" className="max-w-xl mx-auto">
            <p className="text-foreground/75 text-lg md:text-xl font-light mb-12 leading-relaxed">
              Bridging the gap between design and engineering to build premium, immersive web applications with fluid physics and modern architecture.
            </p>
          </FadeIn>

          <FadeIn delay={3.3} direction="up">
            <div className="pointer-events-auto flex flex-col sm:flex-row justify-center items-center gap-4">
              <HoverTiltCard tiltAmount={10} className="rounded-full inline-block overflow-hidden">
                <MagicButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  <span className="text-base flex items-center gap-2">
                    <span>Explore My Work</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagicButton>
              </HoverTiltCard>

              <HoverTiltCard tiltAmount={10} className="rounded-full inline-block overflow-hidden">
                <a 
                  href="/CV-MRayhanZulkarnain.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Download CV M Rayhan Zulkarnain (PDF)"
                  className="relative inline-flex h-14 items-center justify-center rounded-full px-8 py-1 text-sm font-medium text-foreground gap-3 transition-all duration-300 bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-xl border border-white/30 hover:border-accent-cyan/50 shadow-lg group active:scale-95 cursor-pointer"
                >
                  <span className="text-base">Download CV</span>
                  <span className="group-hover:-translate-y-0.5 transition-transform">
                    <Download size={18} />
                  </span>
                </a>
              </HoverTiltCard>
            </div>
          </FadeIn>

        </div>
      </div>
    </SectionReveal>
  );
}
