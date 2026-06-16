"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Reimagined",
    category: "Fullstack",
    image: "/E-Commerce Reimagined.png",
    color: "from-accent-cyan/20 to-transparent",
    link: "https://kaesang-cendawan-web.vercel.app/",
  },
  {
    title: "Fintech Dashboard",
    category: "Frontend",
    image: "/Fintech Dashboard.png",
    color: "from-accent-purple/20 to-transparent",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="projects" ref={containerRef} className="w-full bg-transparent relative py-32 flex flex-col justify-center min-h-[80vh]">
      <div className="pl-6 md:pl-20 z-10 pointer-events-none mb-12">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Featured <span className="text-foreground/40">Work.</span>
          </h2>
        </FadeIn>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory px-6 md:px-20 gap-6 md:gap-10 hide-scrollbar pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="project-card w-[85vw] md:w-[60vw] flex-shrink-0 snap-center h-[50vh] md:h-[70vh] relative"
          >
            <div 
              className="w-full h-full relative group rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => project.link ? window.open(project.link, '_blank', 'noopener,noreferrer') : undefined}
            >
              {/* Image / Fallback background */}
              {project.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
              ) : (
                <div className="absolute inset-0 bg-background transition-transform duration-700 group-hover:scale-105" />
              )}
              <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} mix-blend-overlay`} />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-accent-cyan text-sm font-mono tracking-widest mb-2 uppercase">
                      {project.category}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center bg-background/50 backdrop-blur-md hover:bg-foreground hover:text-background transition-colors">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



