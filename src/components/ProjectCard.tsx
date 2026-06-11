"use client";

import React, { useState } from "react";
import { ExternalLink, Heart } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  likes: number;
}

interface ProjectCardProps {
  project: ProjectProps;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(project.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleLike = () => {
    if (isDebouncing) return;
    setIsDebouncing(true);
    
    // Optimistic update
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

    // Simulate debounce & backend API call
    setTimeout(() => {
      setIsDebouncing(false);
    }, 1000);
  };

  return (
    <motion.div
      className={`relative w-full max-w-sm cursor-pointer rounded-2xl p-4 transition-colors ${className}`}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glow Effect Backdrop */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Main Card Surface */}
      <motion.div
        className="relative z-10 h-full overflow-hidden rounded-xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Project Image */}
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-white/10 dark:border-slate-800/50">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          
          {/* Overlay Actions */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-110"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <button
              onClick={handleLike}
              className="group flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-slate-600 backdrop-blur-md transition-colors hover:bg-white/40 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Heart
                className={`h-4 w-4 transition-transform ${
                  isLiked ? "fill-red-500 text-red-500" : "group-hover:scale-110"
                }`}
              />
              <span className="text-sm font-medium">{likes}</span>
            </button>
          </div>
          
          <p className="text-sm text-slate-600 line-clamp-2 dark:text-slate-300">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200/50 bg-slate-100/50 px-2.5 py-1 text-xs font-medium text-slate-600 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
