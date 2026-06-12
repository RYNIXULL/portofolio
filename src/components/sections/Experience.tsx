"use client";

import FadeIn from "@/components/animations/FadeIn";

const experiences = [
  {
    year: "2025 - Present",
    role: "Junior Creative Developer",
    company: "Freelance",
    description: "Specializing in WebGL and highly interactive web experiences for premium brands.",
  },
  {
    year: "2022 - Present",
    role: "Graphic Designer",
    company: "Rimbun Digital Utama",
    description: "Creating digital assets, brand identities, and visually stunning layouts for digital mediums.",
  },
  {
    year: "2025 - Present",
    role: "Frontend Engineer",
    company: "Freelance",
    description: "Built scalable React applications. Improved performance metrics across flagship products.",
  },
  {
    year: "2025 - Present",
    role: "Interactive Designer",
    company: "Freelance",
    description: "Designed and developed custom portfolios and landing pages with a focus on animation and typography.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative bg-transparent z-10 overflow-hidden">
      {/* ─── Ambient CSS blobs — pure GPU, zero JS overhead ─── */}
      <div className="exp-blob exp-blob-1" />
      <div className="exp-blob exp-blob-2" />
      <div className="exp-blob exp-blob-3" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20">
            Professional <span className="text-foreground/40">Journey.</span>
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <FadeIn key={idx} delay={0.2 * idx} direction="up">
              <div
                className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 group rounded-2xl p-6 md:p-8 border border-white/15 transition-all duration-300 hover:border-accent-cyan/50 hover:scale-[1.015] hover:-translate-y-1 bg-white/[0.06] hover:bg-white/[0.10]"
              >
                <div className="col-span-1 text-foreground/70 font-bold text-lg pt-1 group-hover:text-accent-cyan transition-colors">
                  {exp.year}
                </div>
                <div className="col-span-3">
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent-cyan transition-colors">
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-foreground/85 mb-4">{exp.company}</h4>
                  <p className="text-foreground/75 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



