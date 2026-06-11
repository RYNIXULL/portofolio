import { useState, useEffect } from "react";

export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollProgress;
}
