"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import HoverTiltCard from "@/components/animations/HoverTiltCard";
import { ExternalLink, Award, FileText, CheckCircle2 } from "lucide-react";

interface Certificate {
  title: string;
  file: string;
  issuer: string;
  category?: string;
  date?: string;
  credentialId?: string;
}

const certificates: Certificate[] = [
  {
    title: "International UI/UX Design Competition",
    file: "International UI-UX Design Competition - ITechno Cup 2026.pdf",
    issuer: "ITechno Cup",
    category: "Design Competition",
    date: "Sep 2026",
    credentialId: "1191/PL3.13/SRt/ITECHNO CUP/HIMATIK PNJ/IX/2026",
  },
  {
    title: "Data - AI Agent for Data Analysis",
    file: "Data AI Agent for Data Analysis - IBM SkillsBuild x Hacktiv8.pdf",
    issuer: "IBM x Hacktiv8",
    category: "AI & Data Engineering",
    date: "Oct 2026",
    credentialId: "14497/H8/CSR/ISUE/V/2026",
  },
  {
    title: "Google Certificate",
    file: "GGLG26070264.pdf",
    issuer: "Google",
    category: "Foundations",
    date: "Jul 2026",
    credentialId: "GGLG26070264",
  },
  {
    title: "Dasar Cloud & Gen AI di AWS",
    file: "sertif modul 2.pdf",
    issuer: "AWS",
    category: "Cloud Architecture",
    date: "2025",
  },
  {
    title: "Code Generations & Optimization",
    file: "Code Generations and Optimization - M.Rayhan Zulkarnain.pdf",
    issuer: "HP LIFE",
    category: "Software Engineering",
    date: "Nov 2025",
  },
  {
    title: "Data Science & Analytics",
    file: "Data Science & Analytics.pdf",
    issuer: "HP LIFE",
    category: "Analytics",
    date: "2026",
  },
  {
    title: "Back-End Pemula dengan JavaScript",
    file: "sertif modul 4.pdf",
    issuer: "Dicoding",
    category: "Backend Development",
    date: "Dec 2025",
  },
  {
    title: "Dasar Pemrograman JavaScript",
    file: "sertif modul 3.pdf",
    issuer: "Dicoding",
    category: "Web Development",
    date: "Dec 2025",
  },
  {
    title: "Belajar Dasar AI",
    file: "sertif modul 1.pdf",
    issuer: "Dicoding",
    category: "Artificial Intelligence",
    date: "Dec 2025",
  },
  {
    title: "Customer Experience (CX)",
    file: "Customer Experience (CX) for Business Success.pdf",
    issuer: "HP LIFE",
    category: "Product Management",
    date: "2026",
  },
  {
    title: "AI for Beginners",
    file: "AI for Beginners.pdf",
    issuer: "HP LIFE",
    category: "Machine Learning",
    date: "2026",
  },
  {
    title: "Business Email",
    file: "Business Email.pdf",
    issuer: "HP LIFE",
    category: "Professional Comm",
    date: "2026",
  },
];

function getIssuerBadge(issuer: string) {
  if (issuer === "ITechno Cup") {
    return { dotColor: "bg-purple-400" };
  }
  if (issuer.includes("IBM") || issuer.includes("Hacktiv8")) {
    return { dotColor: "bg-indigo-400" };
  }
  if (issuer === "Google") {
    return { dotColor: "bg-blue-400" };
  }
  if (issuer === "AWS") {
    return { dotColor: "bg-amber-400" };
  }
  if (issuer === "Dicoding") {
    return { dotColor: "bg-cyan-400" };
  }
  return { dotColor: "bg-sky-400" };
}

export default function Certificates() {
  return (
    <SectionReveal id="certificates" variant="fan" className="py-32 relative bg-transparent z-10 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <div className="text-center md:text-left mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Licenses & <span className="text-foreground/40">Certifications.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => {
            const badge = getIssuerBadge(cert.issuer);

            return (
              <FadeIn key={idx} delay={0.06 * idx} direction="up">
                <HoverTiltCard tiltAmount={6}>
                  <a
                    href={`/sertif/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka sertifikat ${cert.title} dari ${cert.issuer} (PDF)`}
                    className="block h-full cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="h-full rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between border border-white/15 hover:border-accent-cyan/40 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] min-h-[220px] relative overflow-hidden">
                      {/* Ambient hover glow */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header */}
                      <div>
                        <div className="mb-5 flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/15 group-hover:scale-105 group-hover:bg-accent-cyan/15 group-hover:border-accent-cyan/30 transition-all text-accent-cyan">
                            <Award size={20} />
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-foreground/80">
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} />
                            {cert.issuer}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-accent-cyan transition-colors leading-snug mb-2">
                          {cert.title}
                        </h3>

                        {(cert.category || cert.date) && (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-foreground/55">
                            {cert.category && <span>{cert.category}</span>}
                            {cert.category && cert.date && <span className="text-accent-cyan/60">•</span>}
                            {cert.date && <span>{cert.date}</span>}
                          </div>
                        )}
                      </div>

                      {/* Footer Link */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-foreground/50 group-hover:text-accent-cyan transition-colors">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                          <FileText size={13} />
                          <span>View PDF</span>
                        </span>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.05] group-hover:bg-accent-cyan group-hover:text-black transition-all">
                          <ExternalLink size={12} />
                        </div>
                      </div>
                    </div>
                  </a>
                </HoverTiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
