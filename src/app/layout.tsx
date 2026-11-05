import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rayhanzulkarnain.dev'),
  title: {
    default: "M Rayhan Zulkarnain | Developer",
    template: "%s | M Rayhan Zulkarnain"
  },
  description: "Portfolio of M Rayhan Zulkarnain, a Developer specializing in frontend, fullstack, and highly interactive web experiences.",
  keywords: ["M Rayhan Zulkarnain", "Rayhan Zulkarnain", "Developer", "Frontend Engineer", "Fullstack Developer", "Portfolio", "Indonesia", "Web Developer"],
  openGraph: {
    title: "M Rayhan Zulkarnain | Developer",
    description: "Portfolio of M Rayhan Zulkarnain, a Developer specializing in frontend, fullstack, and highly interactive web experiences.",
    url: 'https://www.rayhanzulkarnain.dev',
    siteName: 'M Rayhan Zulkarnain Portfolio',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "M Rayhan Zulkarnain",
    url: "https://www.rayhanzulkarnain.dev",
    jobTitle: "Developer",
    sameAs: [
      "https://github.com/RYNIXULL",
      "https://linkedin.com/in/m-rayhan-zulkarnain"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-foreground selection:text-background overflow-x-hidden">
        {/* WCAG Skip-to-content Link for Keyboard Navigation */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2.5 focus:bg-accent-cyan focus:text-black focus:font-semibold focus:text-xs focus:rounded-full focus:shadow-2xl focus:outline-none"
        >
          Skip to main content
        </a>
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
