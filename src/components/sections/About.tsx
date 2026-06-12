"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import FadeIn from "@/components/animations/FadeIn";
import { Briefcase, Code2, Award } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    // GSAP ScrollTrigger for parallax/scroll effects
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: 100,
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
    <section id="about" ref={sectionRef} className="py-32 relative bg-transparent z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <FadeIn>
              <div className="aspect-[4/5] bg-background border border-border rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-transparent mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none" />
                <img 
                  src="/sertif/foto saya.png" 
                  alt="My Photo" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="h-[1px] w-full bg-border/50 mb-4 overflow-hidden">
                    <div className="h-full bg-accent-cyan w-1/3 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                  <p className="text-sm font-mono text-white/80 uppercase tracking-wider mix-blend-difference drop-shadow-md">Based in Bandar Lampung</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7" ref={textRef}>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                Design-driven <br />
                <span className="text-foreground/40">Engineering.</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="space-y-6 text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
                <p>
                  Hello everyone,<br />
                  I&apos;m M. Rayhan Zulkarnain, an Informatics Management student from State Polytechnic Of Lampung. As a true beginner, I enjoy exploring new technologies and leveraging AI to create smarter and more efficient digital solutions.
                </p>
                <p>
                  I specialize in building interactive, high‑performance web applications that blur the line between design and technology. My approach is rooted in the belief that digital experiences should be as emotionally resonant as they are functionally flawless. With a deep understanding of modern frontend architectures and WebGL, I craft interfaces that feel alive prioritizing fluid motion, precise typography, and uncompromising performance.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-12 flex flex-wrap gap-6 md:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">1+</h4>
                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Years Exp</p>
                  </div>
                </div>
                
                <div className="w-[1px] bg-border self-stretch hidden sm:block" />
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">2+</h4>
                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Projects</p>
                  </div>
                </div>
                
                <div className="w-[1px] bg-border self-stretch hidden sm:block" />
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">5+</h4>
                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Certifications</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}



