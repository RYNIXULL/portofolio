"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled down for blur effect
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active sections
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.76, 0, 0.24, 1] }} // wait for loader
      className={cn(
        "fixed top-0 left-0 right-0 z-[90] transition-colors duration-300",
        isScrolled ? "bg-background/40 backdrop-blur-lg border-b border-border/20" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img src="/sertif/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors px-2 py-1"
            >
              {link.name}
              {((link.href === "/playground" && pathname === "/playground") || 
                (pathname !== "/playground" && activeSection === link.name.toLowerCase())) && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent-cyan"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile menu button could go here, omitting for minimalism and adding later if needed */}
      </div>
    </motion.header>
  );
}
