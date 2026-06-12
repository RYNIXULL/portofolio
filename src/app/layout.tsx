import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/animations/SmoothScroll";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import { Mascot } from "@/components/mascot";

import GalaxyBackground from "@/components/3d/GalaxyBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Rayhan Zulkarnain",
  description: "A futuristic, elegant, dark-mode-first portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background text-foreground`}>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-foreground selection:text-background overflow-x-hidden">
        <SmoothScrolling>
          <Loader />
          <CustomCursor />
          <Navigation />
          <Mascot />
          <GalaxyBackground />
          <div className="galaxy-aurora galaxy-aurora-1" />
          <div className="galaxy-aurora galaxy-aurora-2" />
          <div className="galaxy-aurora galaxy-aurora-3" />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
