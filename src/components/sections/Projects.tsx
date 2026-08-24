"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  image: string;
  images?: string[];
  color: string;
  link?: string;
  description?: string;
  features?: string[];
  tech?: string[];
}

const projects: Project[] = [
  {
    title: "COMMBAT",
    category: "Fullstack Web App",
    image: "/commbat-1.png",
    images: ["/commbat-1.png", "/commbat-2.png", "/commbat-3.png", "/commbat-4.png", "/commbat-5.png"],
    color: "from-accent-purple/20 to-transparent",
    description: "COMMBAT adalah sebuah platform kuis dan ujian interaktif berbasis gamifikasi yang dirancang secara khusus untuk memfasilitasi perlombaan cerdas cermat secara real-time. Sistem ini dibangun menggunakan arsitektur Client-Server modern dengan memanfaatkan teknologi WebSocket untuk sinkronisasi data instan antara panel administrator dan layar peserta. Skalabilitas dan keandalan sistem ini telah dibuktikan melalui pengujian dan penggunaan secara langsung pada ajang perlombaan tingkat Sekolah Menengah Atas (SMA) se-Provinsi Lampung.",
    features: [
      "Real-Time Synchronization: Menggunakan Socket.IO untuk komunikasi dua arah dengan latensi rendah, memastikan seluruh peserta menerima soal, hitung mundur, dan instruksi pada milidetik yang sama.",
      "Interactive Buzzer System: Modul bel rebutan digital terpusat yang memproses respon peserta untuk menentukan peserta tercepat secara presisi tinggi pada sesi adu cepat.",
      "Live Leaderboard: Sistem pemeringkatan komprehensif yang memperbarui skor dan posisi peserta secara seketika berdasarkan hasil jawaban.",
      "Anti-Cheat Mechanism: Sistem keamanan dan pengawasan aktif yang mencegah kecurangan selama ujian, mendeteksi apabila peserta mencoba berpindah aplikasi atau keluar dari layar penuh.",
      "Dynamic Spin Wheel: Modul roda putar interaktif untuk pengacakan peserta atau soal yang dioptimalkan kinerjanya.",
      "Administrator Dashboard: Panel kontrol terpusat yang memberikan wewenang penuh kepada panitia untuk mengelola soal, mengatur babak, menyesuaikan skor, dan memantau status perangkat peserta."
    ],
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Socket.IO", "TiDB Serverless", "Vercel", "Cloudflare Tunnels"]
  },
  {
    title: "Kasir Pintar",
    category: "Desktop & Mobile App",
    image: "/kasir-pintar-1.png",
    images: ["/kasir-pintar-1.png", "/kasir-pintar-2.png", "/kasir-pintar-3.png", "/kasir-pintar-4.png", "/kasir-pintar-5.png", "/kasir-pintar-6.png", "/kasir-pintar-7.png", "/kasir-pintar-8.png", "/kasir-pintar-9.png"],
    color: "from-accent-cyan/20 to-transparent",
    link: "https://github.com/RYNIXULL/kasir-pintar",
    description: "Kasir Pintar (SmartPrint POS & Production Management) adalah sebuah sistem Point of Sales (POS) sekaligus Manajemen Produksi modern berskala industrial yang dirancang khusus untuk bisnis Percetakan/Digital Printing. Aplikasi ini terdiri dari dua sistem yang saling terhubung secara real-time: Aplikasi Desktop (sebagai Server & Manajemen Produksi) dan Aplikasi Mobile Android (sebagai Kasir Portabel).",
    features: [
      "Kanban Production Board: Papan produksi interaktif dengan sistem Drag & Drop untuk memantau pesanan di setiap tahap (Pending, Printing, Finishing, Ready, hingga Completed).",
      "Smart Priority System: Indikator visual otomatis (Prioritas, Urgent, dan Overdue) berdasarkan tenggat waktu (deadline) pesanan yang dibuat.",
      "Premium UI/UX: Antarmuka bergaya modern dengan elemen Glassmorphism, palet warna dinamis, dan efek micro-animations.",
      "Local Backend Server: Dibangun menggunakan Electron yang membawa embedded SQLite dan Express.js + Socket.IO server, memungkinkan aplikasi berjalan secara lokal tanpa biaya server cloud.",
      "Mobile POS (Kasir Portabel): Buat pesanan langsung dari HP. Mendukung penghitungan otomatis untuk produk dengan satuan Meter Persegi (Panjang x Lebar) maupun barang satuan (Pcs, Rim, Buku, dll).",
      "Sistem Pembayaran Dinamis: Mendukung pembayaran Lunas, DP (Uang Muka), hingga sistem Pesan Dulu (Bayar Nanti).",
      "Real-time Sync: Terhubung secara real-time ke Desktop. Transaksi kasir dari HP langsung muncul di Production Board."
    ],
    tech: ["Electron", "React.js", "Tailwind CSS", "SQLite", "Express.js", "Socket.IO", "React Native", "Android"]
  },
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
  {
    title: "Galaxy Hand Gesture",
    category: "Interactive Web",
    image: "/Galaxy Hand Gesture.png",
    color: "from-accent-cyan/20 to-transparent",
    link: "https://galaxy-hand-gesture.vercel.app/",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when modal opens/closes
  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
    }
  }, [selectedProject]);

  // Handle Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    if (project.description) {
      setSelectedProject(project);
    } else if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const galleryImages = selectedProject?.images || (selectedProject ? [selectedProject.image] : []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

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
              onClick={() => handleProjectClick(project)}
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          data-lenis-prevent
          style={{ overscrollBehavior: 'contain' }}
        >
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative min-h-screen flex items-start justify-center p-4 md:p-12">
            <div className="relative w-full max-w-5xl bg-background border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 my-8">
              
              {/* Image Gallery / Carousel */}
              <div className="relative h-64 md:h-[28rem] w-full overflow-hidden">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{
                      backgroundImage: `url('${img}')`,
                      opacity: i === currentImageIndex ? 1 : 0,
                    }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Gallery Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                    >
                      <ChevronRight size={22} />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            i === currentImageIndex
                              ? 'bg-accent-cyan scale-125 shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/50 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                >
                  <X size={24} />
                </button>

                {/* Title on image */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <p className="text-accent-cyan font-mono tracking-widest mb-2 uppercase text-sm">{selectedProject.category}</p>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{selectedProject.title}</h2>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 md:p-10 bg-white/5 backdrop-blur-md border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">Deskripsi Proyek</h3>
                      <p className="text-foreground/70 leading-relaxed text-lg">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    {selectedProject.features && (
                      <div>
                        <h3 className="text-2xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">Fitur Utama</h3>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, i) => {
                            const [title, ...rest] = feature.split(': ');
                            const desc = rest.join(': ');
                            return (
                              <li key={i} className="flex items-start">
                                <ChevronRight size={18} className="text-accent-cyan mr-3 mt-1.5 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-white">{title}: </span>
                                  <span className="text-foreground/70">{desc}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    {selectedProject.tech && (
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold mb-4 text-white/90">Teknologi</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1.5 bg-accent-cyan/10 text-accent-cyan rounded-full text-sm font-medium border border-accent-cyan/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-white text-black font-semibold rounded-xl flex items-center justify-center hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      >
                        Kunjungi Proyek
                        <ArrowUpRight size={20} className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
