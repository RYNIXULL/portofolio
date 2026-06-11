"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5s loading duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              PORTOFOLIO
            </motion.div>
          </div>
          
          <motion.div
            className="mt-8 h-[2px] w-48 bg-border overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-foreground"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
