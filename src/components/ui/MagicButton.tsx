import React from "react";
import { cn } from "@/lib/utils";

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function MagicButton({ children, className, ...props }: MagicButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-slate-50 group",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00f0ff_0%,#8a2be2_50%,#00f0ff_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-8 py-1 text-sm font-medium text-foreground backdrop-blur-3xl gap-3 transition-colors group-hover:bg-background/80">
        {children}
      </span>
    </button>
  );
}
