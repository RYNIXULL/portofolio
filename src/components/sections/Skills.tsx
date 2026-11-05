"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { 
  Smartphone, 
  Monitor, 
  Globe, 
  ShieldCheck, 
  Camera, 
  MapPin, 
  Database, 
  Printer, 
  RefreshCw, 
  Network, 
  Lock, 
  Layers, 
  Server
} from "lucide-react";

const skills = [
  {
    name: "Mobile & Android",
    icon: Smartphone,
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    bg: "from-emerald-500/10",
    items: ["Flutter & Dart", "Android (Kotlin)", "CameraX API", "GPS Geofencing"],
  },
  {
    name: "Windows Desktop",
    icon: Monitor,
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/40",
    bg: "from-sky-500/10",
    items: ["Electron.js", "SQLite & Prisma", "Thermal Print POS", "Offline-First Sync"],
  },
  {
    name: "Web & Fullstack",
    icon: Globe,
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/40",
    bg: "from-purple-500/10",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Socket.IO & Node"],
  },
  {
    name: "Security & Systems",
    icon: ShieldCheck,
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/40",
    bg: "from-amber-500/10",
    items: ["Device Binding", "Argon2id & JWT", "Anti-Cheat Engine", "System Design"],
  },
];

function SkillIcon({ name }: { name: string }) {
  const cleanName = name.toLowerCase().trim();

  if (cleanName === "flutter & dart") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#54c5f8] flex-shrink-0" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 11.23l-6.17 6.17 3.7 3.7 2.47-2.47 6.17-6.17-6.17-1.23zM8.144 17.4l6.17 6.17h7.372l-9.87-9.87-3.672 3.7z" />
      </svg>
    );
  }
  if (cleanName === "android (kotlin)") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3ddc84] flex-shrink-0" fill="currentColor">
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0002s.4482-1.0002.9993-1.0002c.5516 0 .9997.4486.9997 1.0002s-.4481 1.0002-.9997 1.0002m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0002s.4482-1.0002.9993-1.0002c.5516 0 .9997.4486.9997 1.0002s-.4481 1.0002-.9997 1.0002m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8 12 8s-3.5902.4116-5.1367 1.4497L4.841 5.9467a.416.416 0 0 0-.5677-.1521.4157.4157 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.6667 1 15.006 1 18.8412h22c0-3.8352-1.6889-7.1745-5.1185-9.5198"/>
      </svg>
    );
  }
  if (cleanName === "camerax api") {
    return <Camera size={18} className="text-emerald-400 flex-shrink-0" />;
  }
  if (cleanName === "gps geofencing") {
    return <MapPin size={18} className="text-emerald-300 flex-shrink-0" />;
  }
  if (cleanName === "electron.js") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#9feaf9] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      </svg>
    );
  }
  if (cleanName === "sqlite & prisma") {
    return <Database size={18} className="text-sky-300 flex-shrink-0" />;
  }
  if (cleanName === "thermal print pos") {
    return <Printer size={18} className="text-sky-400 flex-shrink-0" />;
  }
  if (cleanName === "offline-first sync") {
    return <RefreshCw size={18} className="text-cyan-300 flex-shrink-0 animate-spin-slow" />;
  }
  if (cleanName === "react & next.js") {
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
  if (cleanName === "socket.io & node") {
    return <Server size={18} className="text-purple-300 flex-shrink-0" />;
  }
  if (cleanName === "device binding") {
    return <Lock size={18} className="text-amber-400 flex-shrink-0" />;
  }
  if (cleanName === "argon2id & jwt") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (cleanName === "anti-cheat engine") {
    return <ShieldCheck size={18} className="text-amber-400 flex-shrink-0" />;
  }
  if (cleanName === "system design") {
    return <Network size={18} className="text-amber-300 flex-shrink-0" />;
  }

  return <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/60 flex-shrink-0" />;
}

export default function Skills() {
  const cardDirections: ("left" | "up" | "up" | "right")[] = ["left", "up", "up", "right"];

  return (
    <SectionReveal id="skills" variant="cascade" className="py-32 relative bg-transparent z-10 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-4 shadow-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Technical <span className="text-foreground/40">Arsenal.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skills.map((category, idx) => {
            const CategoryIcon = category.icon;

            return (
              <FadeIn key={category.name} delay={0.12 + idx * 0.12} direction={cardDirections[idx % cardDirections.length]}>
                <HoverTiltCard tiltAmount={8}>
                  <div
                    className={`h-full rounded-2xl p-7 border border-white/15 transition-all duration-300 group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] ${category.border} relative overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Ambient Radial Highlight */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${category.bg} to-transparent rounded-full blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />

                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-foreground group-hover:scale-105 transition-transform shadow-inner">
                          <CategoryIcon className={`w-5 h-5 ${category.accent}`} />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/75 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 font-medium">
                          {category.items.length} Skills
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight mb-6 text-foreground group-hover:text-accent-cyan transition-colors">
                        {category.name}
                      </h3>

                      {/* Items List with Glassmorphic Badges */}
                      <ul className="space-y-3.5">
                        {category.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-sm text-foreground/85 font-medium px-3 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all"
                          >
                            <SkillIcon name={item} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </HoverTiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
