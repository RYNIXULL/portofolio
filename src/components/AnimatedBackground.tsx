"use client";

import React from 'react';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-slate-950 w-full ${className}`}>
      {/* Background container */}
      <div className="absolute inset-0">
        {/* Base dark layer */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        </div>
        
        {/* Animated aurora waves */}
        <div className="absolute inset-0">
          {/* Wave 1 */}
          <div 
            className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse 800px 600px at 50% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              animation: 'aurora1 12s ease-in-out infinite alternate'
            }}
          ></div>
          
          {/* Wave 2 */}
          <div 
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse 600px 400px at 80% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
              animation: 'aurora2 10s ease-in-out infinite alternate-reverse'
            }}
          ></div>
          
          {/* Wave 3 */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse 700px 500px at 20% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              animation: 'aurora3 14s ease-in-out infinite alternate'
            }}
          ></div>
          
          {/* Wave 4 */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse 900px 300px at 60% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
              animation: 'aurora4 11s ease-in-out infinite alternate-reverse'
            }}
          ></div>
        </div>
        
        {/* Overlay grid for premium texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Overlay gradient for depth mapping */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* CSS Keyframes Animations */}
      <style>{`
        @keyframes aurora1 {
          0% { transform: translateX(-100px) translateY(-50px) rotate(0deg) scale(1); }
          50% { transform: translateX(50px) translateY(30px) rotate(18deg) scale(1.1); }
          100% { transform: translateX(100px) translateY(-30px) rotate(36deg) scale(0.9); }
        }
        
        @keyframes aurora2 {
          0% { transform: translateX(80px) translateY(40px) rotate(45deg) scale(0.8); }
          50% { transform: translateX(-30px) translateY(-20px) rotate(60deg) scale(1.2); }
          100% { transform: translateX(-80px) translateY(60px) rotate(80deg) scale(0.9); }
        }
        
        @keyframes aurora3 {
          0% { transform: translateX(-50px) translateY(20px) rotate(90deg) scale(1.1); }
          50% { transform: translateX(70px) translateY(-40px) rotate(120deg) scale(0.8); }
          100% { transform: translateX(-20px) translateY(50px) rotate(150deg) scale(1.0); }
        }
        
        @keyframes aurora4 {
          0% { transform: translateX(30px) translateY(-20px) rotate(135deg) scale(0.9); }
          50% { transform: translateX(-60px) translateY(10px) rotate(160deg) scale(1.1); }
          100% { transform: translateX(40px) translateY(-60px) rotate(180deg) scale(0.8); }
        }
      `}</style>
    </div>
  );
};
