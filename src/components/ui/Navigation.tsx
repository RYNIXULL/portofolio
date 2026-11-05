"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Certificates", href: "/#certificates" },
  { name: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 250 &&
          window.scrollY < sectionTop + sectionHeight - 250
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ─── Top Scroll Progress Line ─── */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent-cyan via-purple-500 to-accent-cyan origin-left z-[100] shadow-[0_0_12px_rgba(0,240,255,0.7)]"
      />

      {/* ─── Floating Glassmorphic Header ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[90] pointer-events-none"
      >
        <div className="container mx-auto px-4 sm:px-6 pt-4 flex items-center justify-between">
          
          {/* Logo Brand Capsule */}
          <a
            href="#"
            aria-label="Kembali ke atas"
            className="pointer-events-auto flex items-center gap-3 px-3.5 py-2 min-h-[44px] rounded-full bg-white/[0.05] hover:bg-white/[0.10] active:scale-95 backdrop-blur-xl border border-white/15 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer group"
          >
            <img src="/sertif/logo.png" alt="Logo" className="h-7 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="hidden sm:inline text-xs font-mono tracking-wider text-foreground/80 group-hover:text-foreground">
              Rayhan.dev
            </span>
          </a>

          {/* Desktop Glass Island Navigation */}
          <nav aria-label="Navigasi Utama" className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.18)] transition-all">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "/playground" && pathname === "/playground") ||
                (pathname !== "/playground" && activeSection === link.name.toLowerCase());

              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-1.5 min-h-[36px] flex items-center text-xs font-medium tracking-wide transition-all duration-300 rounded-full cursor-pointer active:scale-95",
                    isActive
                      ? "text-accent-cyan font-semibold"
                      : "text-foreground/75 hover:text-foreground hover:bg-white/[0.06]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 shadow-[0_0_16px_rgba(0,240,255,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Contact CTA & Mobile Toggle */}
          <div className="pointer-events-auto flex items-center gap-2">
            <a
              href="/#contact"
              aria-label="Hubungi saya langsung di bagian kontak"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full text-xs font-medium bg-accent-cyan/15 hover:bg-accent-cyan/25 active:scale-95 text-accent-cyan border border-accent-cyan/40 backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.18)] cursor-pointer"
            >
              <span>Say Hello</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle Button (44x44px minimum touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-foreground transition-all active:scale-90 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Glassmorphism Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-[89] p-6 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/20 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                        : "text-foreground/80 hover:bg-white/[0.06] hover:text-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-50" />
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-white/10">
                <a
                  href="/CV-MRayhanZulkarnain.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold bg-white/10 border border-white/20 text-foreground block"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
