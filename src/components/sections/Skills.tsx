"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Motion & 3D", items: ["Framer Motion", "GSAP", "Three.js", "WebGL"] },
  { name: "Graphic Design", items: ["Adobe Illustrator", "Adobe Photoshop", "CorelDraw", "Canva"] },
  { name: "Architecture", items: ["System Design", "Performance", "Accessibility", "SEO"] },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative bg-transparent z-10 overflow-hidden">
      {/* Decorative large text background */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full text-[15vw] font-bold text-surface whitespace-nowrap opacity-50 pointer-events-none tracking-tighter"
      >
        CAPABILITIES
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">
            Technical <span className="text-foreground/40">Arsenal.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skills.map((category, idx) => (
            <FadeIn key={category.name} delay={0.2 + idx * 0.2} direction="up">
              <HoverTiltCard tiltAmount={10}>
                <div
                  className="h-full rounded-xl p-8 border border-white/15 transition-all duration-300 hover:border-accent-cyan/50 group bg-white/[0.06] hover:bg-white/[0.10]"
                >
                  <h3 className="text-2xl font-bold tracking-tight mb-8 text-foreground group-hover:text-accent-cyan transition-colors">
                    {category.name}
                  </h3>
                  <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/85 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverTiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



