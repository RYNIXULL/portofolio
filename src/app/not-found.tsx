"use client";

import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { MagicButton } from "@/components/ui/MagicButton";
import { ArrowLeft, Rocket } from "lucide-react";
import HoverTiltCard from "@/components/animations/HoverTiltCard";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100svh] w-full bg-transparent text-foreground relative z-10 px-6">
      <FadeIn delay={0.2} direction="down">
        <div className="w-24 h-24 mb-8 mx-auto flex items-center justify-center bg-accent-cyan/10 rounded-full border border-accent-cyan/30">
          <Rocket size={40} className="text-accent-cyan" />
        </div>
      </FadeIn>

      <FadeIn delay={0.4} direction="up" className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Lost in Space!
        </h2>
        <p className="text-foreground/70 text-lg md:text-xl font-light mb-12">
          Oops, you&apos;ve ventured too far into the galaxy. Jean says this page doesn&apos;t exist!
        </p>
      </FadeIn>

      <FadeIn delay={0.6} direction="up">
        <HoverTiltCard tiltAmount={10} className="rounded-full inline-block">
          <Link href="/">
            <MagicButton>
              <span className="group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={18} />
              </span>
              <span className="text-base">Return to Base</span>
            </MagicButton>
          </Link>
        </HoverTiltCard>
      </FadeIn>
    </main>
  );
}
