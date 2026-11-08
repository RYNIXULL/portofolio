"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    year: "2023 - Present",
    role: "Developer",
    company: "Kaesang Cendawan",
    description: "Developing and maintaining custom e-commerce web applications, ensuring high performance, responsive layout, and a seamless checkout experience.",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    year: "2025 - Present",
    role: "Junior Creative Developer",
    company: "Freelance",
    description: "Specializing in WebGL, Three.js shaders, and highly interactive web experiences for premium digital brands and modern startups.",
    skills: ["Three.js", "WebGL", "Framer Motion", "GSAP"],
  },
  {
    year: "2022 - Present",
    role: "Graphic Designer",
    company: "Rimbun Digital Utama",
    description: "Creating digital assets, brand visual identities, marketing collateral, and UI layout designs for various client projects.",
    skills: ["Adobe Illustrator", "Photoshop", "Brand Identity"],
  },
  {
    year: "2025 - Present",
    role: "Frontend Engineer",
    company: "Freelance",
    description: "Built scalable React applications, modular component architectures, and improved Core Web Vitals performance across web products.",
    skills: ["React Architecture", "State Management", "Performance Optimization"],
  },
  {
    year: "2025 - Present",
    role: "Interactive Designer",
    company: "Freelance",
    description: "Designed and developed custom portfolios and high-converting landing pages with a focus on fluid micro-animations, typography, and accessibility.",
    skills: ["UI/UX Design", "Micro-animations", "Responsive Design"],
  },
];

export default function Experience() {
  return (
    <SectionReveal id="experience" variant="timeline" className="py-32 relative bg-transparent z-10 overflow-hidden">
      {/* ─── Ambient CSS blobs ─── */}
      <div className="exp-blob exp-blob-1" />
      <div className="exp-blob exp-blob-2" />
      <div className="exp-blob exp-blob-3" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <FadeIn>
          <div className="text-center md:text-left mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-4 shadow-sm">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Path</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Professional <span className="text-foreground/40">Journey.</span>
            </h2>
          </div>
        </FadeIn>

        {/* ─── Interactive Luminous Timeline ─── */}
        <div className="relative pl-6 md:pl-10 border-l border-white/15 space-y-10">
          {experiences.map((exp, idx) => (
            <FadeIn key={idx} delay={0.1 * idx} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className="relative group">
                {/* Glowing Timeline Node */}
                <div className="absolute -left-[31px] md:-left-[47px] top-6 w-4 h-4 rounded-full bg-background border-2 border-accent-cyan/60 group-hover:border-accent-cyan group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(226,232,240,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                </div>

                {/* Glassmorphic Experience Card */}
                <div className="rounded-3xl p-7 md:p-8 border border-white/15 transition-all duration-300 hover:border-accent-cyan/40 hover:-translate-y-1 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-cyan font-semibold px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 w-fit">
                      <Calendar size={13} />
                      {exp.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/75 font-medium">
                      <Building2 size={13} />
                      {exp.company}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent-cyan transition-colors">
                    {exp.role}
                  </h3>

                  <p className="text-foreground/75 leading-relaxed font-light text-sm md:text-base mb-6">
                    {exp.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {exp.skills.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
