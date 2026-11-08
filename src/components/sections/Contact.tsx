"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import { MagicButton } from "@/components/ui/MagicButton";
import Signature from "@/Signature";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { MessageSquare, ArrowUpRight, Mail } from "lucide-react";

const WA_NUMBER = "6281369079309";
const WA_MESSAGE = encodeURIComponent("Halo! Saya tertarik untuk berkolaborasi dengan kamu.");

export default function Contact() {
  return (
    <SectionReveal id="contact" variant="radiant" className="py-32 relative bg-transparent z-10 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        {/* ─── Ultra-Glassmorphism Invitation Card ─── */}
        <HoverTiltCard tiltAmount={4} className="rounded-3xl">
          <div className="rounded-3xl p-8 sm:p-14 md:p-16 mb-16 border border-white/20 transition-all duration-500 bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:border-accent-cyan/40 hover:shadow-[0_25px_70px_rgba(226,232,240,0.15)] relative overflow-hidden">
            {/* Ambient Lighting Gradients */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-6 shadow-sm">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.08]">
                Let&apos;s build <br />
                <span className="text-foreground/45">something great.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-base sm:text-lg md:text-xl text-foreground/75 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                Saya selalu terbuka untuk diskusi proyek baru, kolaborasi kreatif, atau peluang pengembangan perangkat lunak. Kirimkan pesan sekarang!
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <MagicButton>
                  <span className="text-base sm:text-lg flex items-center gap-2">
                    <span>Start A Conversation</span>
                    <ArrowUpRight size={18} />
                  </span>
                </MagicButton>
              </a>
            </FadeIn>
          </div>
        </HoverTiltCard>

        {/* ─── Signature ─── */}
        <div className="flex justify-center mt-6 mb-16">
          <Signature />
        </div>

        {/* ─── Footer Details & Social Media Badges ─── */}
        <FadeIn delay={0.5}>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-foreground/50">
            <p>© {new Date().getFullYear()} M. Rayhan Zulkarnain. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:rayhanzulkarnain29@gmail.com"
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 border border-white/15 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all flex items-center gap-2 cursor-pointer"
                aria-label="Kirim email ke rayhanzulkarnain29@gmail.com"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
              <a
                href="https://www.instagram.com/ryhnxull/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 border border-white/15 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all flex items-center gap-2 cursor-pointer"
                aria-label="Kunjungi profil Instagram @ryhnxull"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://github.com/RYNIXULL"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 border border-white/15 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all flex items-center gap-2 cursor-pointer"
                aria-label="Kunjungi profil GitHub RYNIXULL"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.6a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.15-3.8s-1.1-.35-3.5 1.3a11.6 11.6 0 0 0-6 0C5.35 1.5 4.25 1.85 4.25 1.85a5.4 5.4 0 0 0-.15 3.8A5.4 5.4 0 0 0 2.6 10.6c0 5.1 3 6.26 6 6.6a4.8 4.8 0 0 0-1 3.24v4"/>
                  <path d="M5 21c-3.1 0-5-2-5-2"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ryhnixull"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 border border-white/15 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all flex items-center gap-2 cursor-pointer"
                aria-label="Kunjungi profil LinkedIn M Rayhan Zulkarnain"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionReveal>
  );
}
