"use client";

import FadeIn from "@/components/animations/FadeIn";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { ExternalLink, Award, FileText } from "lucide-react";

const certificates = [
  { title: "Code Generations & Optimization", file: "Code Generations and Optimization - M.Rayhan Zulkarnain.pdf", issuer: "HP LIFE" },
  { title: "Data Science & Analytics", file: "Data Science & Analytics.pdf", issuer: "HP LIFE" },
  { title: "AI for Beginners", file: "AI for Beginners.pdf", issuer: "HP LIFE" },
  { title: "Customer Experience (CX)", file: "Customer Experience (CX) for Business Success.pdf", issuer: "HP LIFE" },
  { title: "Business Email", file: "Business Email.pdf", issuer: "HP LIFE" },
  { title: "Belajar Dasar AI", file: "sertif modul 1.pdf", issuer: "Dicoding" },
  { title: "Dasar Cloud & Gen AI di AWS", file: "sertif modul 2.pdf", issuer: "AWS" },
  { title: "Dasar Pemrograman JavaScript", file: "sertif modul 3.pdf", issuer: "Dicoding" },
  { title: "Back-End Pemula dengan JavaScript", file: "sertif modul 4.pdf", issuer: "Dicoding" },
  { title: "Google Certificate", file: "GGLG26070264.pdf", issuer: "Google" },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-32 relative bg-transparent z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Licenses & <span className="text-foreground/40">Certifications.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <FadeIn key={idx} delay={0.08 * idx} direction="up">
              <HoverTiltCard tiltAmount={5}>
                <a
                  href={`/sertif/${cert.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div
                    className="h-full rounded-xl p-6 transition-all duration-300 group flex flex-col relative border border-white/15 hover:border-accent-cyan/50 bg-white/[0.06] hover:bg-white/[0.10] min-h-[200px]"
                  >
                    {/* Icon area */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent-cyan/10 border border-accent-cyan/20 group-hover:bg-accent-cyan/20 transition-colors">
                        <Award size={22} className="text-accent-cyan" />
                      </div>
                      <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest group-hover:text-accent-cyan/60 transition-colors">
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-accent-cyan transition-colors leading-snug flex-1">
                      {cert.title}
                    </h3>

                    {/* Footer */}
                    <div className="mt-5 flex items-center text-sm font-mono text-foreground/50 group-hover:text-accent-cyan transition-colors">
                      <FileText size={13} className="mr-2" />
                      <span className="uppercase tracking-wider">View Credential</span>
                      <ExternalLink size={12} className="ml-auto" />
                    </div>
                  </div>
                </a>
              </HoverTiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



