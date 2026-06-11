"use client";

import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

const WA_NUMBER = "6281369079309";
const WA_MESSAGE = encodeURIComponent("Halo! Saya tertarik untuk berkolaborasi dengan kamu.");

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-transparent z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        {/* ─── Glass card ─── */}
        <div
          className="rounded-3xl p-10 md:p-16 mb-16 border border-white/25 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:border-accent-cyan/50 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] hover:shadow-[0_20px_60px_rgba(0,240,255,0.18)]"
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
            >
              <MagneticButton className="bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-cyan hover:text-background transition-colors">
                Say Hello
              </MagneticButton>
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.8}>
          <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40 font-mono">
            <p>© {new Date().getFullYear()} All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://www.instagram.com/jiwatara/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://github.com/RYNIXULL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ryhnixull"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}



