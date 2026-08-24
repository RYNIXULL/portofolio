"use client";

import FadeIn from "@/components/animations/FadeIn";
import { MagicButton } from "@/components/ui/MagicButton";
import Signature from "@/Signature";
import HoverTiltCard from "@/components/animations/HoverTiltCard";

const WA_NUMBER = "6281369079309";
const WA_MESSAGE = encodeURIComponent("Halo! Saya tertarik untuk berkolaborasi dengan kamu.");

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-transparent z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        {/* ─── Glass card ─── */}
        <HoverTiltCard tiltAmount={4} className="rounded-3xl">
          <div
            className="rounded-3xl p-10 md:p-16 mb-16 border border-white/25 transition-all duration-300 hover:border-accent-cyan/50 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] hover:shadow-[0_20px_60px_rgba(0,240,255,0.18)]"
            style={{
              "--card-bg": "rgba(255, 255, 255, 0.16)",
              "--card-hover-bg": "rgba(255, 255, 255, 0.24)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.3)",
            } as React.CSSProperties}
          >
            <FadeIn>
              <p className="text-accent-cyan font-mono tracking-widest text-sm uppercase mb-4">
                What&apos;s Next?
              </p>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                Let&apos;s build <br />
                <span className="text-foreground/50">something great.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-foreground/75 font-light max-w-2xl mx-auto mb-10">
                I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <MagicButton>
                  <span className="text-lg">Say Hello</span>
                </MagicButton>
              </a>
            </FadeIn>
          </div>
        </HoverTiltCard>

        {/* ─── Signature ─── */}
        <div className="flex justify-center mt-8 mb-16">
          <Signature />
        </div>

        <FadeIn delay={0.8}>
          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40 font-mono">
            <p>© {new Date().getFullYear()} All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://www.instagram.com/ryhnxull/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors flex items-center gap-2"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a
                href="https://github.com/RYNIXULL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors flex items-center gap-2"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.6a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.15-3.8s-1.1-.35-3.5 1.3a11.6 11.6 0 0 0-6 0C5.35 1.5 4.25 1.85 4.25 1.85a5.4 5.4 0 0 0-.15 3.8A5.4 5.4 0 0 0 2.6 10.6c0 5.1 3 6.26 6 6.6a4.8 4.8 0 0 0-1 3.24v4"/>
                  <path d="M5 21c-3.1 0-5-2-5-2"/>
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ryhnixull"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors flex items-center gap-2"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}



