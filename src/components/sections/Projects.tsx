"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import FadeIn from "@/components/animations/FadeIn";
import SectionReveal from "@/components/animations/SectionReveal";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  ExternalLink,
  FolderGit2,
  Smartphone,
  Monitor,
  Globe,
  CheckCircle2,
  Laptop,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DeviceType = "mobile" | "desktop" | "cross-platform" | "web";

interface ProjectSpec {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  deviceType: DeviceType;
  windowTitle?: string;
  image: string;
  secondaryImage?: string;
  images: string[];
  captions?: string[];
  color: string;
  accentColor: string;
  link?: string;
  github?: string;
  description: string;
  features: string[];
  tech: string[];
  specs: ProjectSpec[];
}

const projects: Project[] = [
  {
    id: "catat-eza",
    title: "Catat Eza POS",
    category: "Windows Desktop & Multi-Store POS",
    deviceType: "desktop",
    windowTitle: "Catat Eza POS v2.4 - Dashboard Owner & Multi-Store",
    image: "/projects/catat-eza/01_dashboard.png",
    images: [
      "/projects/catat-eza/01_dashboard.png",
      "/projects/catat-eza/02_pos.png",
      "/projects/catat-eza/03_inventory.png",
      "/projects/catat-eza/04_branches.png",
      "/projects/catat-eza/05_reports.png",
      "/projects/catat-eza/06_employees.png",
    ],
    captions: [
      "Dashboard Analitik & Ringkasan Penjualan Cabang",
      "Modul Kasir POS Kilat & Barcode Scanner Responsif",
      "Manajemen Master Data Produk & Inventaris Stok",
      "Multi-Store Cabang & Mutasi Transfer Antar-Toko",
      "Laporan Finansial Arus Kas & Ekspor Data Excel",
      "Role-Based Access Control (RBAC) Owner & Kasir",
    ],
    color: "from-accent-cyan/25 to-blue-600/10",
    accentColor: "accent-cyan",
    link: "https://frontend-two-puce-39.vercel.app",
    github: "https://github.com/RYNIXULL/catat-eza",
    description:
      "Sistem Aplikasi Kasir & Manajemen Toko Multi-Cabang untuk retail UMKM Catat Eza (Bapak Ipin / Lentera Dahayu). Dirancang sebagai aplikasi desktop Windows dengan sinkronisasi cloud real-time, scanner barcode kamera responsif, mutasi inventaris antar-cabang, serta pembukuan arus kas harian terotomatisasi.",
    features: [
      "Modul Kasir POS Kilat: Transaksi kasir ultra-cepat, pencarian barcode responsif, integrasi multi-metode pembayaran (Tunai, QRIS, Transfer Bank), dan cetak struk thermal nota otomatis.",
      "Multi-Store & Cabang Toko: Arsitektur Multi-Store Isolation untuk mengelola cabang pusat dan cabang regional, transfer mutasi stok antar-cabang, dan katalog produk varian.",
      "Pembukuan Finansial & Kas: Catatan kas masuk dan kas keluar harian tiap cabang, analitik grafik tren omzet, penghitungan margin laba/rugi, serta ekspor laporan ke Excel (.xlsx).",
      "Role-Based Access Control (RBAC): Hak akses terpisah secara ketat antara Owner (akses kontrol penuh multi-cabang) dan Kasir (terisolasi pada cabang yang ditugaskan).",
    ],
    tech: ["Electron", "React.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "SQLite / PostgreSQL", "Node.js", "Express.js", "Vercel"],
    specs: [
      { label: "Platform Target", value: "Windows 10/11 x64 (Desktop Client)" },
      { label: "Arsitektur", value: "Electron Desktop + Cloud Sync REST API" },
      { label: "Database", value: "SQLite (Local Offline) & PostgreSQL (Cloud)" },
      { label: "Status Produksi", value: "Live Operasional UMKM Lentera Dahayu" },
    ],
  },
  {
    id: "kasir-pintar-desktop",
    title: "Kasir Pintar Desktop",
    category: "Windows Desktop Server & POS",
    deviceType: "desktop",
    windowTitle: "Kasir Rimbun Desktop v3.1 - Kanban Server Produksi",
    image: "/kasir-pintar-1.png",
    images: [
      "/kasir-pintar-1.png",
      "/kasir-pintar-2.png",
      "/kasir-pintar-3.png",
      "/kasir-pintar-4.png",
      "/kasir-pintar-5.png",
      "/kasir-pintar-6.png",
      "/kasir-pintar-7.png",
      "/kasir-pintar-8.png",
      "/kasir-pintar-9.png",
    ],
    captions: [
      "Kanban Board Produksi Cetak Real-Time & Antrean Order",
      "Kasir POS Kalkulator Cetak Meteran & Satuan Rim/Pcs",
      "Detail Antrean Pesanan & Status Deadline Alert",
      "Formulir Input Pesanan Percetakan Cepat",
      "Master Data Produk & Konfigurasi Tarif Cetak",
      "Pengaturan Port Printer Thermal ESC/POS",
      "Pairing Instan QR Code ke Mobile Android",
      "Audit Log Aktivitas Kasir & Operator",
      "Status Service Server Lokal SQLite & WebSocket",
    ],
    color: "from-accent-cyan/25 to-accent-purple/10",
    accentColor: "accent-cyan",
    github: "https://github.com/RYNIXULL/kasir-pintar",
    description:
      "Sistem Point of Sales (POS) sekaligus Manajemen Antrean Produksi berskala industrial untuk bisnis Percetakan/Digital Printing Pak Nanang (Kasir Rimbun). Aplikasi Desktop ini bertindak ganda sebagai Server Lokal offline-first (membawa embedded SQLite 3 & Socket.IO server) dan Papan Kontrol Produksi utama.",
    features: [
      "Kanban Production Board: Papan produksi drag-and-drop interaktif untuk memonitor siklus pesanan di tiap tahap (Pending, Printing, Finishing, Ready, hingga Completed).",
      "Kalkulator Cetak Meter Persegi: Perhitungan otomatis harga cetak berdasarkan dimensi Panjang x Lebar (meter persegi) maupun produk cetak satuan (Pcs, Rim, Buku).",
      "Zero-Config QR Code Pairing: Menghasilkan kode QR dinamis di layar komputer untuk pairing instan ke aplikasi Android kasir/operator tanpa input manual IP.",
      "Offline-First Local Server: Berjalan mulus di jaringan lokal (LAN/Wi-Fi) tanpa ketergantungan koneksi internet publik, dilengkapi silent printing ke printer thermal.",
      "Smart Priority & Deadline Alert: Peringatan visual otomatis warna merah saat pesanan mendekati batas waktu pengerjaan.",
    ],
    tech: ["Electron", "React.js", "TypeScript", "Tailwind CSS", "SQLite 3", "Prisma ORM", "Express.js", "Socket.IO", "Vite"],
    specs: [
      { label: "Platform Target", value: "Windows 10/11 x64 (Dual Server & Client)" },
      { label: "Local Server", value: "Embedded Node.js + Socket.IO Server" },
      { label: "Database", value: "Embedded SQLite 3 via Prisma ORM" },
      { label: "Status Produksi", value: "Live Operasional Percetakan Kasir Rimbun" },
    ],
  },
  {
    id: "smartprint-mobile",
    title: "SmartPrint Mobile (Android)",
    category: "Android Mobile POS & Operator App",
    deviceType: "mobile",
    windowTitle: "SmartPrint Mobile v2.0",
    image: "/projects/smartprint-mobile/02_kasir_screen.png",
    secondaryImage: "/projects/smartprint-mobile/01_alarm_dashboard.png",
    images: [
      "/projects/smartprint-mobile/02_kasir_screen.png",
      "/projects/smartprint-mobile/01_alarm_dashboard.png",
      "/projects/smartprint-mobile/03_pesanan_screen.png",
      "/projects/smartprint-mobile/05_katalog_produk.png",
      "/projects/smartprint-mobile/04_pengaturan_screen.png",
    ],
    captions: [
      "Mobile POS Kasir Kilat & Kalkulator Meter Persegi",
      "Dashboard Antrean & Background Deadline Alarm",
      "Detail Pesanan Cetak & Status Tahapan Produksi",
      "Katalog Produk Cetak & Harga Offline-First",
      "Konfigurasi Printer Bluetooth Thermal & Server LAN",
    ],
    color: "from-accent-purple/30 to-accent-cyan/15",
    accentColor: "accent-purple",
    github: "https://github.com/RYNIXULL/kasir-pintar",
    description:
      "Aplikasi mobile Android portabel untuk kasir dan operator produksi percetakan digital printing Pak Nanang (Kasir Rimbun). Terhubung secara real-time via WebSocket ke server desktop lokal, dilengkapi sistem alarm tenggat waktu otomatis, pencetakan struk thermal Bluetooth, dan offline-first local SQLite sync.",
    features: [
      "Mobile POS Kasir Kilat: Pembuatan pesanan cetak langsung dari smartphone, otomatis menghitung harga per meter persegi (Panjang x Lebar) dan barang satuan.",
      "Two-Way Real-time Sync: Sinkronisasi instan via Socket.IO ke komputer kasir desktop, transaksi dari HP langsung tampil di Kanban Production Board.",
      "Local Offline-First SQLite: Seluruh katalog produk dan antrean tersimpan di database lokal HP, transaksi tetap berjalan lancar saat koneksi Wi-Fi terputus.",
      "Background Deadline Alarm: Evaluasi alarm tenggat waktu pesanan di latar belakang (background service) dengan nada dering khusus saat order mendekati batas waktu.",
      "Bluetooth & Wi-Fi Thermal Print: Konfigurasi printer thermal ESC/POS via Bluetooth maupun koneksi jaringan Wi-Fi untuk cetak nota instan.",
      "Katalog Master Data Offline: Kelola produk, ubah harga, atau atur potongan harga reseller langsung dari genggaman.",
    ],
    tech: ["Flutter", "Dart", "Android", "SQLite (sqflite)", "Riverpod", "Socket.IO Client", "Bluetooth ESC/POS", "Background Service"],
    specs: [
      { label: "Platform Target", value: "Android Mobile (Smartphone & Tablet)" },
      { label: "Sinkronisasi", value: "WebSocket Socket.IO ke Server Desktop LAN" },
      { label: "Penyimpanan Lokal", value: "sqflite Embedded Database" },
      { label: "Perangkat Keras", value: "Printer Thermal ESC/POS Bluetooth" },
    ],
  },
  {
    id: "presensi-smkn1",
    title: "Presensi SMKN 1 Pakuan Ratu",
    category: "Android Mobile App & Web Dashboard",
    deviceType: "mobile",
    windowTitle: "Presensi SMKN 1 Pakuan Ratu v2.5",
    image: "/projects/jadwal/siswa_01_dashboard.png",
    secondaryImage: "/projects/jadwal/siswa_03_camera_live.png",
    images: [
      "/projects/jadwal/siswa_01_dashboard.png",
      "/projects/jadwal/siswa_03_camera_live.png",
      "/projects/jadwal/siswa_03_absen_kamera_gps.png",
      "/projects/jadwal/siswa_04_jadwal.png",
      "/projects/jadwal/siswa_06_pengajuan_izin.png",
      "/projects/jadwal/operator_01_dashboard.png",
      "/projects/jadwal/operator_04_device_approval.png",
      "/projects/jadwal/operator_09_schedules.png",
      "/projects/jadwal/operator_10_rekap.png",
      "/projects/jadwal/guru_01_dashboard.png",
      "/projects/jadwal/guru_03_koreksi_presensi.png",
      "/projects/jadwal/guru_05_leave_approval.png",
    ],
    captions: [
      "Dashboard Siswa: Jadwal Pelajaran & Status Hadir",
      "Presensi Live Selfie CameraX (Anti-Mock Camera)",
      "Verifikasi Geofencing Server-Side Algoritma Haversine",
      "Jadwal Pelajaran Otomatis & Sesi Masuk/Pulang",
      "Pengajuan Izin Sakit Disertai Lampiran Foto Dokter",
      "Dashboard Web Operator: Statistik Presensi Real-Time",
      "Approval Hardware Device Binding (Kunci Perangkat HP)",
      "Manajemen Sesi Jam Pelajaran & Aturan Hadir",
      "Rekapitulasi Presensi Siswa & Guru (Ekspor Excel)",
      "Dashboard Guru: Validasi Kehadiran Kelas Harian",
      "Koreksi Presensi Real-Time & Penyesuaian Status",
      "Verifikasi Pengajuan Izin Siswa oleh Wali Kelas",
    ],
    color: "from-accent-purple/30 to-accent-glow/15",
    accentColor: "accent-purple",
    description:
      "Sistem aplikasi absensi dan jadwal presensi berbasis Android dengan mesin Anti-Cheat tingkat tinggi untuk SMKN 1 Pakuan Ratu. Menggabungkan verifikasi lokasi geofencing GPS server-side algoritma Haversine, validasi wajah CameraX live selfie (tanpa akses galeri), dan pengikatan ID perangkat keras (Hardware Device Binding).",
    features: [
      "Server-Side Geofencing Haversine: Jarak diverifikasi langsung oleh backend dengan formula Haversine (radius batas 100m dari titik koordinat sekolah), memblokir manipulasi Fake GPS.",
      "CameraX Live Selfie Only: Presensi wajib menggunakan kamera depan secara live dengan deteksi kamera asli untuk mengeliminasi manipulasi foto atau mock camera.",
      "Hardware Device Binding: Setiap akun siswa dan guru hanya dapat aktif pada 1 (satu) ID perangkat keras yang telah disetujui Operator. Percobaan login dari HP lain otomatis terkunci.",
      "Jadwal & Sesi Pelajaran: Penjadwalan mata pelajaran otomatis, pembukaan sesi jam masuk dan pulang, serta cron scheduler yang otomatis menandai Alpa untuk sesi yang kedaluwarsa.",
      "Leave Approval & Bukti Sakit: Modul pengajuan izin dan sakit disertai lampiran foto surat keterangan dokter yang diverifikasi langsung oleh guru.",
    ],
    tech: ["Android Native", "Kotlin", "CameraX", "GPS Geolocation", "Node.js", "TypeScript", "Express.js", "Prisma ORM", "Argon2id", "JWT Stateless", "Caddy"],
    specs: [
      { label: "Platform Mobile", value: "Android Native (Kotlin + CameraX)" },
      { label: "Platform Web Admin", value: "React.js + Tailwind CSS" },
      { label: "Keamanan Geofencing", value: "Server-side Haversine Formula" },
      { label: "Status Produksi", value: "Live Digunakan SMKN 1 Pakuan Ratu" },
    ],
  },
  {
    id: "mykuliah",
    title: "MyKuliah",
    category: "Android & Windows Cross-Platform App",
    deviceType: "cross-platform",
    windowTitle: "MyKuliah Academic Suite",
    image: "/projects/mykuliah/preview_home_mahasiswa.png",
    secondaryImage: "/projects/mykuliah/preview_desktop.png",
    images: [
      "/projects/mykuliah/preview_home_mahasiswa.png",
      "/projects/mykuliah/preview_desktop.png",
      "/projects/mykuliah/preview_detail_with_actions.png",
      "/projects/mykuliah/preview_mahasiswa_absensi_tab.png",
      "/projects/mykuliah/preview_mahasiswa_tugas_tab.png",
      "/projects/mykuliah/preview_dosen_accounts_schedule.png",
      "/projects/mykuliah/preview_dosen_validasi_absensi.png",
    ],
    captions: [
      "Home Mahasiswa: Auto Day & Dynamic 'Now' Indicator",
      "Tampilan Cross-Platform Desktop Windows Suite",
      "Detail Jadwal Kuliah, Ruang, dan Dosen Pengampu",
      "Tab Presensi Mahasiswa & Verifikasi Kehadiran",
      "Manajemen Penugasan Kuliah & Deadline Countdown",
      "Portal Dosen: Pengelolaan Jadwal Mengajar",
      "Validasi Kehadiran Mahasiswa oleh Dosen",
    ],
    color: "from-accent-cyan/30 to-accent-purple/15",
    accentColor: "accent-cyan",
    github: "https://github.com/RYNIXULL/mykuliah",
    description:
      "Aplikasi monitoring jadwal mata kuliah dan manajemen akademik mahasiswa multi-platform (Android & Windows) dengan pendekatan desain Clean Soft Neumorphism yang lembut, modern, dan tactile.",
    features: [
      "Auto Day Selector: Deteksi otomatis hari aktif berdasarkan jam perangkat, langsung mengarahkan ke jadwal kuliah hari ini tanpa navigasi manual.",
      "Dynamic Class Indicator: Penanda visual 'Now' yang menyala secara otomatis pada mata kuliah yang jamnya sedang berlangsung.",
      "Multi-Role Academic Portal: Tab terpisah untuk Mahasiswa (cek jadwal, absensi, kumpul tugas) dan Dosen (validasi kehadiran, buat penugasan, jadwal mengajar).",
      "Clean Soft Neumorphic UI: Desain tactile 3D lembut dengan double-drop shadow halus yang nyaman di mata untuk pemakaian sehari-hari.",
      "Cross-Platform Support: Berjalan mulus di smartphone Android maupun desktop Windows.",
    ],
    tech: ["Flutter", "Dart", "Android", "Windows Desktop", "Neumorphism", "Local State Management", "Intl"],
    specs: [
      { label: "Dukungan Platform", value: "Android Mobile & Windows Desktop" },
      { label: "Gaya Desain", value: "Clean Soft Neumorphism (Tactile 3D)" },
      { label: "Multi-Role", value: "Mahasiswa, Dosen, dan Admin Akademik" },
      { label: "State Engine", value: "Riverpod & Local Reactive State" },
    ],
  },
  {
    id: "commbat",
    title: "COMMBAT",
    category: "Fullstack Web App & Real-Time Engine",
    deviceType: "web",
    windowTitle: "https://commbat-live.app - Interactive Quiz & Buzzer",
    image: "/commbat-1.png",
    images: ["/commbat-1.png", "/commbat-2.png", "/commbat-3.png", "/commbat-4.png", "/commbat-5.png"],
    captions: [
      "Tampilan Layar Ujian & Babak Cerdas Cermat Real-Time",
      "Interactive Digital Buzzer System Latensi Rendah",
      "Live Dynamic Leaderboard Skor & Peringkat Otomatis",
      "Modul Spin Wheel Interaktif Acak Soal / Peserta",
      "Dashboard Panitia & Pengawasan Anti-Cheat Ujian",
    ],
    color: "from-accent-purple/30 to-accent-cyan/15",
    accentColor: "accent-purple",
    description:
      "COMMBAT adalah sebuah platform kuis dan ujian interaktif berbasis gamifikasi yang dirancang secara khusus untuk memfasilitasi perlombaan cerdas cermat secara real-time. Sistem ini dibangun menggunakan arsitektur Client-Server modern dengan memanfaatkan teknologi WebSocket untuk sinkronisasi data instan antara panel administrator dan layar peserta. Skalabilitas dan keandalan sistem ini telah dibuktikan melalui pengujian dan penggunaan secara langsung pada ajang perlombaan tingkat Sekolah Menengah Atas (SMA) se-Provinsi Lampung.",
    features: [
      "Real-Time Synchronization: Menggunakan Socket.IO untuk komunikasi dua arah dengan latensi rendah, memastikan seluruh peserta menerima soal, hitung mundur, dan instruksi pada milidetik yang sama.",
      "Interactive Buzzer System: Modul bel rebutan digital terpusat yang memproses respon peserta untuk menentukan peserta tercepat secara presisi tinggi pada sesi adu cepat.",
      "Live Leaderboard: Sistem pemeringkatan komprehensif yang memperbarui skor dan posisi peserta secara seketika berdasarkan hasil jawaban.",
      "Anti-Cheat Mechanism: Sistem keamanan dan pengawasan aktif yang mencegah kecurangan selama ujian, mendeteksi apabila peserta mencoba berpindah aplikasi atau keluar dari layar penuh.",
      "Dynamic Spin Wheel: Modul roda putar interaktif untuk pengacakan peserta atau soal yang dioptimalkan kinerjanya.",
      "Administrator Dashboard: Panel kontrol terpusat yang memberikan wewenang penuh kepada panitia untuk mengelola soal, mengatur babak, menyesuaikan skor, dan memantau status perangkat peserta.",
    ],
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Socket.IO", "TiDB Serverless", "Vercel", "Cloudflare Tunnels"],
    specs: [
      { label: "Target Perangkat", value: "Web Responsive (Mobile Peserta & Desktop Admin)" },
      { label: "Sinkronisasi Real-Time", value: "WebSocket Full-Duplex (Socket.IO)" },
      { label: "Database Cloud", value: "TiDB Serverless Distributed SQL" },
      { label: "Validasi Lapangan", value: "Lomba Cerdas Cermat SMA se-Provinsi Lampung" },
    ],
  },
  {
    id: "galaxy-hand-gesture",
    title: "Galaxy Hand Gesture",
    category: "Interactive 3D WebGL",
    deviceType: "web",
    windowTitle: "https://galaxy-hand-gesture.vercel.app - 3D Particle Physics",
    image: "/Galaxy Hand Gesture.png",
    images: ["/Galaxy Hand Gesture.png"],
    captions: ["Simulasi Partikel Galaksi Interaktif via Hand Gesture Tracking"],
    color: "from-accent-cyan/30 to-blue-500/15",
    accentColor: "accent-cyan",
    link: "https://galaxy-hand-gesture.vercel.app/",
    description:
      "Eksperimen interaktif 3D WebGL yang menggabungkan pelacakan gestur tangan via Computer Vision kamera untuk memanipulasi simulasi partikel galaksi secara real-time.",
    features: [
      "Computer Vision Tracking: Deteksi posisi 21 landmark sendi tangan menggunakan MediaPipe Hands secara real-time dari kamera webcam.",
      "High-Performance Particle Physics: Simulasi puluhan ribu partikel galaksi spiral yang berotasi dinamis mengikuti koordinat spasial tangan.",
      "GPU Shader Acceleration: Optimasi pipeline GLSL custom shader untuk performa 60 FPS stabil di browser modern.",
    ],
    tech: ["Three.js", "WebGL", "MediaPipe", "JavaScript", "GLSL"],
    specs: [
      { label: "Graphic Pipeline", value: "Three.js & GLSL Custom Particle Shader" },
      { label: "Vision Model", value: "MediaPipe Hands (21 Spatial Landmarks)" },
      { label: "Platform Target", value: "Modern Web Browser with WebGL" },
      { label: "Status", value: "Live Interactive Experience" },
    ],
  },
];

/* ─── Device Mockup Components ─── */

function DevicePhoneFrame({
  src,
  alt,
  className = "",
  size = "md",
}: {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heightClass =
    size === "sm"
      ? "h-[220px] aspect-[9/19.5]"
      : size === "lg"
      ? "h-[420px] sm:h-[480px] md:h-[540px] aspect-[9/19.5]"
      : "h-[270px] sm:h-[310px] md:h-[350px] aspect-[9/19.5]";

  const radiusClass =
    size === "sm" ? "rounded-[1.6rem]" : size === "lg" ? "rounded-[2.8rem]" : "rounded-[2.3rem]";
  const borderClass =
    size === "sm" ? "border-[3px]" : size === "lg" ? "border-[6px]" : "border-[4px] md:border-[5px]";

  return (
    <div
      className={`relative ${heightClass} ${radiusClass} ${borderClass} border-[#252932] bg-[#0c0d11] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(226,232,240,0.12)] overflow-hidden flex flex-col flex-shrink-0 ${className}`}
    >
      {/* Side button accents */}
      <div className="absolute -left-[5px] top-12 w-[3px] h-6 bg-[#252932] rounded-l" />
      <div className="absolute -left-[5px] top-20 w-[3px] h-6 bg-[#252932] rounded-l" />
      <div className="absolute -right-[5px] top-16 w-[3px] h-9 bg-[#252932] rounded-r" />

      {/* Screen Frame */}
      <div className="relative w-full h-full overflow-hidden bg-black flex flex-col">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
          <div className="w-14 sm:w-16 h-3 bg-black rounded-full border border-white/10 flex items-center justify-end px-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1b2234]" />
          </div>
        </div>

        {/* Screen Image with object-cover and top-alignment */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top select-none"
          loading="lazy"
        />

        {/* Gloss sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-14 h-1 bg-white/40 rounded-full pointer-events-none" />
      </div>
    </div>
  );
}

function DeviceDesktopFrame({
  src,
  alt,
  windowTitle = "Desktop Application",
  platformTag = "Windows x64",
  className = "",
  size = "md",
}: {
  src: string;
  alt: string;
  windowTitle?: string;
  platformTag?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const containerClass =
    size === "lg"
      ? "w-full max-w-4xl aspect-[16/10] rounded-2xl"
      : "w-[94%] sm:w-[90%] max-w-[620px] aspect-[16/10] rounded-2xl";

  return (
    <div
      className={`relative ${containerClass} border border-white/20 bg-[#121419] shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_35px_rgba(226,232,240,0.12)] overflow-hidden flex flex-col flex-shrink-0 ${className}`}
    >
      {/* Title Bar */}
      <div className="h-8 md:h-9 bg-[#1a1c23] border-b border-white/10 px-3.5 flex items-center justify-between select-none flex-shrink-0 z-20">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20" />
        </div>

        {/* Window Title / URL Pill */}
        <div className="max-w-[60%] truncate px-3 py-0.5 rounded-full bg-black/40 border border-white/10 text-[10px] md:text-xs font-mono text-foreground/75 flex items-center gap-1.5">
          <Monitor className="w-2.5 h-2.5 text-accent-cyan flex-shrink-0" />
          <span className="truncate">{windowTitle}</span>
        </div>

        {/* Platform Badge */}
        <span className="text-[10px] font-mono text-accent-cyan/80 bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/20 hidden sm:inline">
          {platformTag}
        </span>
      </div>

      {/* Screen Area */}
      <div className="relative w-full flex-1 overflow-hidden bg-black/90">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top select-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

/* ─── Main Projects Component ─── */

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync active card index while user is scrolling/swiping
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.75;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(newIndex, 0), projects.length - 1));
  }, []);

  const scrollToProject = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".project-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const scrollLeft = () => {
    const nextIndex = Math.max(activeCardIndex - 1, 0);
    scrollToProject(nextIndex);
  };

  const scrollRight = () => {
    const nextIndex = Math.min(activeCardIndex + 1, projects.length - 1);
    scrollToProject(nextIndex);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll and reset image index when modal opens
  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedProject]);

  // Keyboard navigation (Escape to close, Left/Right for gallery)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? selectedProject.images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const galleryImages = selectedProject?.images || (selectedProject ? [selectedProject.image] : []);
  const galleryCaptions = selectedProject?.captions || [];

  const nextImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  return (
    <SectionReveal id="projects" variant="panoramic" className="w-full bg-transparent relative py-32 flex flex-col justify-center min-h-[90vh]">
      {/* ─── Header & Controls Bar ─── */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan backdrop-blur-md mb-4 shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>Featured Creations</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Selected <span className="text-foreground/40">Works.</span>
              </h2>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-mono text-foreground/75">
                <span className="text-accent-cyan font-bold">0{activeCardIndex + 1}</span>
                <span>/</span>
                <span>0{projects.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  disabled={activeCardIndex === 0}
                  aria-label="Previous project"
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md border border-white/15 text-foreground transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  disabled={activeCardIndex === projects.length - 1}
                  aria-label="Next project"
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md border border-white/15 text-foreground transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ─── Horizontal Swipe Track with Realistic Device Mockups ─── */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory px-6 md:px-16 gap-6 md:gap-10 pb-10 hide-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, idx) => {
          const isCurrent = activeCardIndex === idx;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0.7, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="project-card w-[90vw] sm:w-[78vw] lg:w-[62vw] max-w-[880px] flex-shrink-0 snap-center h-[540px] md:h-[620px] relative will-change-transform"
            >
              <div
                onClick={() => handleProjectClick(project)}
                className={`w-full h-full relative group rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shadow-2xl flex flex-col justify-between bg-[#0e1015]/90 backdrop-blur-2xl ${
                  isCurrent
                    ? "border-accent-cyan/40 shadow-[0_15px_45px_rgba(226,232,240,0.18)]"
                    : "border-white/15 hover:border-white/35"
                }`}
              >
                {/* ─── Stage Top: Interactive Device Showcase ─── */}
                <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-white/[0.04] to-transparent">
                  {/* Ambient Colored Radial Spotlight Glow */}
                  <div
                    className={`absolute w-72 h-72 rounded-full bg-gradient-to-tr ${project.color} blur-3xl opacity-50 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700 pointer-events-none`}
                  />

                  {/* Top Floating Badge Bar */}
                  <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/20 text-accent-cyan shadow-sm flex items-center gap-2">
                      {project.deviceType === "mobile" ? (
                        <Smartphone className="w-3 h-3" />
                      ) : project.deviceType === "cross-platform" ? (
                        <Laptop className="w-3 h-3" />
                      ) : project.deviceType === "desktop" ? (
                        <Monitor className="w-3 h-3" />
                      ) : (
                        <Globe className="w-3 h-3" />
                      )}
                      <span>{project.category}</span>
                    </span>

                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.08] backdrop-blur-md border border-white/15 text-foreground/80 group-hover:border-accent-cyan/50 transition-colors">
                      Demo Showcase
                    </span>
                  </div>

                  {/* Device Representation Based on Project Type */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center pt-8">
                    {project.deviceType === "mobile" ? (
                      /* Mobile Phone Showcase with Angled Secondary Screen for Depth */
                      <div className="relative flex items-center justify-center">
                        {/* Secondary Tilted Phone in Background */}
                        {project.secondaryImage && (
                          <div className="absolute -translate-x-14 sm:-translate-x-20 translate-y-3 rotate-[-8deg] opacity-40 blur-[0.5px] scale-90 group-hover:rotate-[-12deg] group-hover:-translate-x-24 transition-all duration-700 hidden sm:block pointer-events-none">
                            <DevicePhoneFrame
                              src={project.secondaryImage}
                              alt={`${project.title} secondary`}
                              size="sm"
                            />
                          </div>
                        )}

                        {/* Primary Central Phone in Foreground */}
                        <div className="relative z-10 group-hover:-translate-y-2 group-hover:scale-[1.03] transition-transform duration-500">
                          <DevicePhoneFrame
                            src={project.image}
                            alt={project.title}
                            size="md"
                          />
                        </div>
                      </div>
                    ) : project.deviceType === "cross-platform" ? (
                      /* Cross-Platform Showcase: Desktop Window Behind + Phone in Foreground */
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Desktop Screen in Background */}
                        <div className="absolute w-[82%] max-w-[480px] aspect-[16/10] rounded-xl border border-white/20 bg-[#14161b] opacity-60 blur-[0.5px] -translate-x-12 sm:-translate-x-16 -translate-y-2 group-hover:opacity-85 group-hover:-translate-y-4 transition-all duration-700 overflow-hidden shadow-2xl">
                          <img
                            src={project.secondaryImage || project.image}
                            alt="Desktop preview"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Mobile Phone in Foreground */}
                        <div className="relative z-10 translate-x-16 sm:translate-x-24 translate-y-3 group-hover:scale-105 group-hover:translate-x-28 transition-transform duration-500">
                          <DevicePhoneFrame
                            src={project.image}
                            alt={project.title}
                            size="md"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Desktop or Web Browser Window Frame */
                      <div className="w-full flex items-center justify-center group-hover:-translate-y-2 group-hover:scale-[1.02] transition-transform duration-500">
                        <DeviceDesktopFrame
                          src={project.image}
                          alt={project.title}
                          windowTitle={project.windowTitle}
                          platformTag={project.deviceType === "desktop" ? "Windows x64" : "Web Engine"}
                          size="md"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* ─── Bottom Panel: Glassmorphic Project Info & CTA ─── */}
                <div className="p-5 sm:p-7 bg-gradient-to-t from-black via-black/90 to-black/50 backdrop-blur-2xl border-t border-white/10 z-20">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-accent-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/75 font-light line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                      <div className="px-4 py-2 rounded-full text-xs font-semibold text-foreground bg-white/10 group-hover:bg-accent-cyan group-hover:text-black backdrop-blur-md border border-white/20 group-hover:border-accent-cyan transition-all flex items-center gap-2 shadow-lg active:scale-95">
                        <span>Buka Detail & Demo</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Tech stack pills preview */}
                  {project.tech && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5 opacity-90">
                      {project.tech.slice(0, 5).map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.08] backdrop-blur-md text-foreground/80 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-foreground/60">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Pagination Dots Indicator (Accessible 44px hit targets) ─── */}
      <div className="flex justify-center items-center gap-1 mt-4">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => scrollToProject(i)}
            aria-label={`Pindah ke proyek ${i + 1}: ${p.title}`}
            className="p-2 min-h-[44px] min-w-[36px] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            <span
              className={`transition-all duration-300 rounded-full block ${
                i === activeCardIndex
                  ? "w-8 h-2 bg-accent-cyan shadow-[0_0_10px_rgba(226,232,240,0.7)]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ─── Project Details Portal Modal (Escapes Stacking Context & Full Scroll Guarantee) ─── */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div
                className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden bg-black/85 backdrop-blur-2xl"
                data-lenis-prevent
                style={{ overscrollBehavior: "contain" }}
              >
                {/* Backdrop Click to Close */}
                <div
                  className="fixed inset-0 -z-10 cursor-pointer"
                  onClick={() => setSelectedProject(null)}
                />

                {/* ─── Top Floating Sticky Header ─── */}
                <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3 max-w-[70%]">
                    <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 hidden sm:inline-flex items-center gap-1.5">
                      {selectedProject.deviceType === "mobile" ? (
                        <Smartphone size={13} />
                      ) : (
                        <Monitor size={13} />
                      )}
                      <span>{selectedProject.category}</span>
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white truncate">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-foreground/60 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/10">
                      <span>Screen</span>
                      <span className="text-accent-cyan font-bold">0{currentImageIndex + 1}</span>
                      <span>/</span>
                      <span>0{galleryImages.length}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Tutup jendela detail proyek"
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 transition-all cursor-pointer shadow-md"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </header>

                {/* ─── Scrollable Modal Body (With Ample pb-44 so user can scroll way past the bottom) ─── */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-44 flex flex-col">
                  {/* Interactive Showcase Stage */}
                  <div className="relative w-full rounded-3xl bg-[#0f1115]/95 border border-white/15 p-4 sm:p-8 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[560px] mb-6">
                    {/* Ambient Glow */}
                    <div
                      className={`absolute w-96 h-96 rounded-full bg-gradient-to-tr ${selectedProject.color} blur-3xl opacity-40 pointer-events-none`}
                    />

                    {/* Active Screenshot in Dedicated Device Chassis */}
                    {(() => {
                      const currentImg = galleryImages[currentImageIndex] || "";
                      const isScreenDesktop =
                        currentImg.includes("operator") ||
                        currentImg.includes("preview_desktop") ||
                        selectedProject.deviceType === "desktop" ||
                        selectedProject.deviceType === "web";

                      return (
                        <div className="relative z-10 w-full flex items-center justify-center">
                          {isScreenDesktop ? (
                            <DeviceDesktopFrame
                              src={currentImg}
                              alt={`${selectedProject.title} screen ${currentImageIndex + 1}`}
                              windowTitle={
                                currentImg.includes("operator")
                                  ? "SMKN 1 Pakuan Ratu - Web Admin & Operator Panel"
                                  : selectedProject.windowTitle
                              }
                              platformTag={
                                currentImg.includes("operator")
                                  ? "Web Admin Panel"
                                  : selectedProject.deviceType === "desktop"
                                  ? "Windows x64"
                                  : "Web Platform"
                              }
                              size="lg"
                            />
                          ) : (
                            <DevicePhoneFrame
                              src={currentImg}
                              alt={`${selectedProject.title} screen ${currentImageIndex + 1}`}
                              size="lg"
                            />
                          )}
                        </div>
                      );
                    })()}

                    {/* Gallery Prev / Next Arrows */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          aria-label="Screenshot sebelumnya"
                          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/70 hover:bg-black/90 active:scale-95 text-white border border-white/20 backdrop-blur-xl transition-all shadow-xl z-20 cursor-pointer"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          type="button"
                          onClick={nextImage}
                          aria-label="Screenshot selanjutnya"
                          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/70 hover:bg-black/90 active:scale-95 text-white border border-white/20 backdrop-blur-xl transition-all shadow-xl z-20 cursor-pointer"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Active Screen Caption Pill */}
                    {galleryCaptions[currentImageIndex] && (
                      <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-foreground/80 text-center max-w-xl z-10">
                        {galleryCaptions[currentImageIndex]}
                      </div>
                    )}
                  </div>

                  {/* ─── Thumbnail Preview Strip ─── */}
                  {galleryImages.length > 1 && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                          Pilih Layar & Fitur ({galleryImages.length} Screenshots)
                        </span>
                        <span className="text-xs font-mono text-accent-cyan">
                          Gunakan panah keyboard ← / →
                        </span>
                      </div>

                      <div className="flex items-center gap-3 overflow-x-auto pb-2 px-1 hide-scrollbar">
                        {galleryImages.map((img, i) => {
                          const isActive = i === currentImageIndex;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setCurrentImageIndex(i)}
                              aria-label={`Lihat screenshot ${i + 1}`}
                              className={`relative flex-shrink-0 w-24 sm:w-32 md:w-36 aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                                isActive
                                  ? "border-accent-cyan ring-2 ring-accent-cyan/60 scale-105 shadow-[0_0_15px_rgba(226,232,240,0.4)]"
                                  : "border-white/15 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                                <span className="text-[10px] font-mono text-white/90 font-bold">
                                  0{i + 1}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ─── Detailed Specifications & Features Grid ─── */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left 2-Cols: Overview & Fitur Lengkap */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Overview Box */}
                      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                          <span>Deskripsi Arsitektur & Proyek</span>
                        </h3>
                        <p className="text-foreground/85 leading-relaxed text-base font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Key Features Box */}
                      {selectedProject.features && (
                        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-lg">
                          <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <span>Fitur-Fitur Utama</span>
                          </h3>
                          <ul className="space-y-4">
                            {selectedProject.features.map((feature, i) => {
                              const [title, ...rest] = feature.split(": ");
                              const desc = rest.join(": ");
                              return (
                                <li key={i} className="flex items-start gap-3">
                                  <CheckCircle2
                                    size={18}
                                    className="text-accent-cyan mt-1 flex-shrink-0"
                                  />
                                  <div className="text-sm md:text-base leading-relaxed">
                                    <span className="font-semibold text-white">{title}: </span>
                                    <span className="text-foreground/80 font-light">{desc}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right 1-Col: Tech Stack, Specs, and Links */}
                    <div className="space-y-6">
                      {/* Tech Stack Box */}
                      {selectedProject.tech && (
                        <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg">
                          <h3 className="text-lg font-bold mb-3 text-white">Teknologi Digunakan</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tech.map((t, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-xs font-mono font-medium border border-accent-cyan/25"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technical Specs Box */}
                      {selectedProject.specs && (
                        <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg space-y-3">
                          <h3 className="text-lg font-bold mb-2 text-white">Spesifikasi Sistem</h3>
                          {selectedProject.specs.map((spec, i) => (
                            <div
                              key={i}
                              className="flex flex-col pb-2.5 border-b border-white/10 last:border-b-0 last:pb-0"
                            >
                              <span className="text-[11px] font-mono uppercase text-foreground/50">
                                {spec.label}
                              </span>
                              <span className="text-xs sm:text-sm font-medium text-white/90">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action CTA Buttons */}
                      <div className="space-y-3 pt-2">
                        {selectedProject.link && (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 bg-accent-cyan text-black font-semibold rounded-2xl flex items-center justify-center hover:bg-accent-cyan/90 transition-all shadow-[0_0_25px_rgba(226,232,240,0.4)] active:scale-95 cursor-pointer text-sm"
                          >
                            <span>Buka Live Demo Website</span>
                            <ExternalLink size={16} className="ml-2" />
                          </a>
                        )}

                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold rounded-2xl flex items-center justify-center border border-white/20 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                          >
                            <span>Lihat Source Code di GitHub</span>
                            <FolderGit2 size={16} className="ml-2 text-accent-cyan" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </SectionReveal>
  );
}
