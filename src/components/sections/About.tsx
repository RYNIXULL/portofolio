"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import { Briefcase, Code2, Award, User, MapPin } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionReveal id="about" variant="split" className="py-32 relative bg-transparent z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Photo Frame with Glassmorphism & Status Badge */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="left">
              <div className="relative group">
                {/* Ambient glow behind image */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-cyan/30 to-accent-purple/30 blur-xl opacity-50 group-hover:opacity-90 transition-opacity duration-700" />

                <div className="aspect-[4/5] bg-surface rounded-3xl overflow-hidden relative border border-white/20 shadow-2xl backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-transparent mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none" />
                  <img
                    src="/sertif/foto saya.png"
                    alt="M Rayhan Zulkarnain"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                  />

                  {/* Top Status Pill: Available for Work */}
                  <div className="absolute top-5 left-5 z-20">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-300 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for work</span>
                    </div>
                  </div>

                  {/* Bottom Location Overlay */}
                  <div className="absolute bottom-5 inset-x-5 z-20">
                    <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                        <MapPin size={14} className="text-accent-cyan" />
                        <span>Bandar Lampung, Indonesia</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">WIB / UTC+7</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Bio & Track Record */}
          <div className="lg:col-span-7" ref={textRef}>
            <FadeIn delay={0.1} direction="right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-6 shadow-sm">
                <User className="w-3.5 h-3.5" />
                <span>About The Engineer</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Design-driven <br />
                <span className="text-foreground/40">Engineering.</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.25} direction="right">
              <div className="space-y-6 text-base md:text-lg text-foreground/75 font-light leading-relaxed">
                <p>
                  Hi! I am <strong className="text-foreground font-semibold">M. Rayhan Zulkarnain</strong>, an Informatics Management student at Politeknik Negeri Lampung focusing on multi-platform software engineering, spanning Android mobile applications, Windows desktop systems, and the modern web ecosystem.
                </p>
                <p>
                  I specialize in architecting and building comprehensive solutions that bridge intuitive interface design with solid software architecture. My engineering background spans the implementation of distributed operational and Point of Sale (POS) systems, production workflow integration, mobile attendance tracking with high data integrity protection (device binding, visual verification, and precision geolocation validation), to interactive platforms powered by real-time data synchronization. Every system is built with a strong emphasis on data processing efficiency, system reliability, and an uncompromising user experience.
                </p>
              </div>
            </FadeIn>

            {/* Stat Counters in Frosted Glass Cards */}
            <FadeIn delay={0.4}>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/15 hover:border-accent-cyan/40 transition-all duration-300 shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4 group-hover:scale-105 transition-transform">
                    <Briefcase size={18} />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground leading-tight mb-1">1+</h4>
                  <p className="text-xs text-foreground/75 uppercase tracking-widest font-mono font-medium">Years Experience</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/15 hover:border-accent-cyan/40 transition-all duration-300 shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-glow mb-4 group-hover:scale-105 transition-transform">
                    <Code2 size={18} />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground leading-tight mb-1">6+</h4>
                  <p className="text-xs text-foreground/75 uppercase tracking-widest font-mono font-medium">Flagship Projects</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/15 hover:border-accent-cyan/40 transition-all duration-300 shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4 group-hover:scale-105 transition-transform">
                    <Award size={18} />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground leading-tight mb-1">12+</h4>
                  <p className="text-xs text-foreground/75 uppercase tracking-widest font-mono font-medium">Certifications</p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </SectionReveal>
  );
}
