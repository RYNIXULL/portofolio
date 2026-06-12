"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Terminal, Bot, Network, Gauge, Eye, Search } from "lucide-react";

const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "AI & Automation", items: ["NVIDIA NIM", "OpenAI API", "Prompt Engineering", "AI Chatbots"] },
  { name: "Graphic Design", items: ["Adobe Illustrator", "Adobe Photoshop", "CorelDraw", "Canva"] },
  { name: "Architecture", items: ["System Design", "Performance", "Accessibility", "SEO"] },
];

function SkillIcon({ name }: { name: string }) {
  const cleanName = name.toLowerCase().trim();

  if (cleanName === "react") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <g transform="translate(12, 12)">
          <ellipse rx="10" ry="3.8" transform="rotate(0)" />
          <ellipse rx="10" ry="3.8" transform="rotate(60)" />
          <ellipse rx="10" ry="3.8" transform="rotate(120)" />
          <circle cx="0" cy="0" r="1.8" fill="currentColor" />
        </g>
      </svg>
    );
  }
  if (cleanName === "next.js") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" fill="black" stroke="currentColor" />
        <path d="M9 17V7l7.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16.5 17V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (cleanName === "typescript") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3178c6] flex-shrink-0" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <text x="14" y="18" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TS</text>
      </svg>
    );
  }
  if (cleanName === "tailwind css") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38bdf8] flex-shrink-0" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 14.887 11.6 18.001 11.6c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 5.782 15.114 4.8 12.001 4.8zm-6 6.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.418 8.887 18.4 12.001 18.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 12.582 9.114 11.6 6.001 11.6z"/>
      </svg>
    );
  }
  if (cleanName === "nvidia nim") {
    return <Cpu size={18} className="text-emerald-400 flex-shrink-0" />;
  }
  if (cleanName === "openai api") {
    return <Sparkles size={18} className="text-purple-400 flex-shrink-0" />;
  }
  if (cleanName === "prompt engineering") {
    return <Terminal size={18} className="text-amber-400 flex-shrink-0" />;
  }
  if (cleanName === "ai chatbots") {
    return <Bot size={18} className="text-cyan-400 flex-shrink-0" />;
  }
  if (cleanName === "adobe illustrator") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ff9a00] flex-shrink-0" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#331e00" stroke="#ff9a00" strokeWidth="1.5" />
        <text x="12" y="16" fill="#ff9a00" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ai</text>
      </svg>
    );
  }
  if (cleanName === "adobe photoshop") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00c8ff] flex-shrink-0" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#001c26" stroke="#00c8ff" strokeWidth="1.5" />
        <text x="12" y="16" fill="#00c8ff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ps</text>
      </svg>
    );
  }
  if (cleanName === "coreldraw") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#8dc63f] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 4.5 4.5 9 8 11.5 3.5-2.5 8-7 8-11.5a8 8 0 0 0-8-8z" />
        <path d="M12 2v19.5" />
        <path d="M4 10h16" />
      </svg>
    );
  }
  if (cleanName === "canva") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00c4cc] flex-shrink-0" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="15.5" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">C</text>
      </svg>
    );
  }
  if (cleanName === "system design") {
    return <Network size={18} className="text-blue-400 flex-shrink-0" />;
  }
  if (cleanName === "performance") {
    return <Gauge size={18} className="text-rose-400 flex-shrink-0" />;
  }
  if (cleanName === "accessibility") {
    return <Eye size={18} className="text-violet-400 flex-shrink-0" />;
  }
  if (cleanName === "seo") {
    return <Search size={18} className="text-teal-400 flex-shrink-0" />;
  }

  return <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/60 flex-shrink-0" />;
}

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative bg-transparent z-10 overflow-hidden">
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
                        <SkillIcon name={item} />
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



