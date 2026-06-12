"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import StaggerText from "@/components/animations/StaggerText";
import FadeIn from "@/components/animations/FadeIn";
import { MagicButton } from "@/components/ui/MagicButton";
import { ArrowRight } from "lucide-react";
import HoverTiltCard from "@/components/animations/HoverTiltCard";

// Lazy load 3D scene for performance
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-transparent pt-32 pb-10">

      {/* 3D Background */}
      <Scene />

      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none my-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <FadeIn delay={2.5} direction="down">
            <span className="text-accent-cyan uppercase tracking-widest text-sm font-semibold mb-6 block">
              Creative Engineer
            </span>
          </FadeIn>

          <StaggerText
            text="Crafting digital experiences with purpose and precision."
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
            delay={2.6}
          />
          
          <FadeIn delay={3.2} direction="up" className="max-w-xl mx-auto">
            <p className="text-foreground/70 text-lg md:text-xl font-light mb-12">
              Bridging the gap between design and engineering to build premium, immersive web applications.
            </p>
          </FadeIn>

          <FadeIn delay={3.4} direction="up">
            <div className="pointer-events-auto flex justify-center">
              <HoverTiltCard tiltAmount={10} className="rounded-full inline-block">
                <MagicButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  <span className="text-base">Explore My Work</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </span>
                </MagicButton>
              </HoverTiltCard>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="relative mt-auto mx-auto flex flex-col items-center gap-2 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-accent-cyan"
            animate={{ top: ["-50%", "150%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}



