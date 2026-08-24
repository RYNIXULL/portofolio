"use client";

import React from "react";
import { Mail, ArrowUp } from "lucide-react";
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.6a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.15-3.8s-1.1-.35-3.5 1.3a11.6 11.6 0 0 0-6 0C5.35 1.5 4.25 1.85 4.25 1.85a5.4 5.4 0 0 0-.15 3.8A5.4 5.4 0 0 0 2.6 10.6c0 5.1 3 6.26 6 6.6a4.8 4.8 0 0 0-1 3.24v4"/>
                <path d="M5 21c-3.1 0-5-2-5-2"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/ryhnixull" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ryhnxull/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent-cyan transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
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
