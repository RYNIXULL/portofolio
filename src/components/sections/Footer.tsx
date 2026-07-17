"use client";

import React from "react";
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative z-10 border-t border-border bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Section */}
          <FadeIn delay={0.1} direction="up" className="order-2 md:order-1 text-center md:text-left">
            <p className="text-foreground/60 text-sm font-light">
              &copy; {currentYear} <span className="font-semibold text-foreground/80">M Rayhan Zulkarnain</span>. All rights reserved.
            </p>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={0.2} direction="up" className="order-1 md:order-2 flex items-center gap-5">
            <a href="https://github.com/RYNIXULL" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/m-rayhan-zulkarnain" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com/rayhanzulkarnain_" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="mailto:rayhanzulkarnain@example.com" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </FadeIn>

          {/* Back to Top */}
          <FadeIn delay={0.3} direction="up" className="order-3">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-accent-cyan transition-colors group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </FadeIn>
          
        </div>
      </div>
    </footer>
  );
}
