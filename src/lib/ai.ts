/**
 * Jean AI Assistant Service
 * Uses NVIDIA NIM via Next.js API route (server-side).
 * Falls back to local keyword database if the API is unreachable.
 */

export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

/**
 * Triggers a query to the AI mascot.
 * Calls the server-side API route first, then falls back to the local database.
 */
export async function askMascot(question: string, history: ChatMessage[] = []): Promise<string> {
  const cleanQuestion = question.toLowerCase().trim();

  // =========================================================================
  // NVIDIA NIM API (via Next.js server-side route)
  // =========================================================================
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        history: history.map((m) => ({ sender: m.sender, text: m.text })),
      }),
    });

    const data = await response.json();

    // If API returned a valid reply, use it
    if (response.ok && data.reply) {
      return data.reply;
    }

    // If API explicitly told us to fallback
    if (data.fallback) {
      console.warn('AI API unavailable, using local fallback');
    }
  } catch (error) {
    console.error('Failed to reach AI API, using local fallback:', error);
  }

  // =========================================================================
  // FALLBACK DATABASE LOKAL
  // =========================================================================

  // 1. GREETINGS
  if (
    matches(cleanQuestion, ['halo', 'hello', 'hi', 'hai', 'oi', 'helo', 'pagi', 'siang', 'sore', 'malam', 'assalamualaikum'])
  ) {
    return 'Halo! Saya **Jean**, asisten AI portofolio **M. Rayhan Zulkarnain**. Saya bisa membantu menjawab pertanyaanmu seputar keahlian teknis, proyek rekayasa perangkat lunak, sertifikasi, atau cara menghubungi Rayhan. Ada yang ingin kamu ketahui?';
  }

  // 2. WHO IS RAYHAN / ABOUT
  if (
    matches(cleanQuestion, ['siapa', 'who', 'tentang', 'about', 'profil', 'profile', 'biodata', 'pemilik', 'owner', 'rayhan'])
  ) {
    return '**M. Rayhan Zulkarnain** adalah mahasiswa Manajemen Informatika di **Politeknik Negeri Lampung** yang berfokus pada rekayasa perangkat lunak lintas platform (**Multi-Platform Software Engineering**) mencakup aplikasi mobile Android, sistem desktop Windows, dan ekosistem web modern.\n\nRayhan berfokus merancang dan membangun solusi terpadu yang menjembatani desain antarmuka intuitif dengan arsitektur perangkat lunak yang solid, mulai dari sistem Point of Sale (POS) terdistribusi, presensi mobile dengan proteksi anti-curang berlapis, hingga platform interaktif berkecepatan tinggi.';
  }

  // 3. SKILLS / CAPABILITIES
  if (
    matches(cleanQuestion, ['skill', 'keahlian', 'kemampuan', 'bisa apa', 'arsenal', 'tech', 'stack', 'teknologi', 'bahasa', 'programming', 'coding', 'framework', 'design', 'desain'])
  ) {
    return 'Berikut adalah keahlian teknis (**Technical Arsenal**) yang dikuasai Rayhan:\n\n' +
      '- **Mobile & Desktop Systems**: Flutter, Dart, Android Native (Kotlin), CameraX API, GPS Geofencing, Electron.js, Thermal Print ESC/POS (Bluetooth & LAN), Offline-First Sync\n' +
      '- **Web & Fullstack Engineering**: React.js, Next.js, TypeScript, JavaScript (ES6+), Node.js, Express.js, Socket.IO (WebSocket), Tailwind CSS, Three.js / WebGL, Framer Motion, GSAP\n' +
      '- **Database, Security & Design**: SQLite 3, Prisma ORM, TiDB Serverless (MySQL), Argon2id, Stateless JWT, Hardware Device Binding, Anti-Cheat Engine, Figma, UI/UX Design';
  }

  // 4. PROJECTS / FEATURED WORK
  if (
    matches(cleanQuestion, ['project', 'proyek', 'portofolio', 'karya', 'buat apa', 'bikin apa', 'hasil', 'work', 'featured', 'pos', 'kasir', 'presensi', 'commbat', 'mykuliah'])
  ) {
    return 'Berikut adalah 4 proyek rekayasa utama (**Flagship Engineering Projects**) yang dibangun oleh Rayhan:\n\n' +
      '1. **SmartPrint POS & Production Management Suite (Kasir Rimbun)**: Sistem POS offline-first & Kanban produksi percetakan digital berbasis **Electron.js (Windows Desktop Server)** dan **Flutter (Android Mobile)** dengan sinkronisasi LAN Socket.IO dua arah dan cetak struk thermal Bluetooth/LAN.\n' +
      '2. **Presensi SMKN 1 Pakuan Ratu**: Sistem presensi mobile **Android Native (Kotlin + CameraX)** & dashboard web admin dengan Anti-Cheat Security Engine (Geofencing Haversine 100m, kamera depan langsung tanpa galeri, dan 1-to-1 Hardware Device ID Binding).\n' +
      '3. **COMMBAT**: Platform kuis interaktif & digital buzzer real-time berbasis **WebSocket (Socket.IO)** dan **TiDB Serverless** yang telah teruji di kompetisi tingkat Provinsi Lampung.\n' +
      '4. **MyKuliah Academic Suite**: Aplikasi manajemen jadwal kuliah, presensi, dan tugas cross-platform (**Android & Windows Desktop**) berbasis **Flutter & Riverpod**.';
  }

  // 5. EXPERIENCE / JOURNEY
  if (
    matches(cleanQuestion, ['pengalaman', 'kerja', 'experience', 'karir', 'career', 'sejarah', 'journey', 'magang', 'freelance'])
  ) {
    return 'Perjalanan profesional Rayhan mencakup peran berikut:\n\n' +
      '- **Kaesang Cendawan (Software Developer | 2023 - Sekarang)**: Mengembangkan dan memelihara aplikasi web e-commerce kustom dengan antarmuka responsif dan performa tinggi.\n' +
      '- **Freelance (Fullstack, Mobile & Creative Developer | 2025 - Sekarang)**: Merancang aplikasi lintas platform Android, Windows desktop, dan web interaktif React/Next.js/WebGL.\n' +
      '- **Rimbun Digital Utama (Graphic & UI Designer | 2022 - Sekarang)**: Membuat aset digital, identitas visual brand, materi pemasaran, dan tata letak UI.';
  }

  // 6. CERTIFICATES / LICENSES
  if (
    matches(cleanQuestion, ['sertif', 'certif', 'sertifikasi', 'lisensi', 'aws', 'dicoding', 'penghargaan', 'award', 'ibm', 'itechno', 'google'])
  ) {
    return 'Rayhan memiliki **12 lisensi & sertifikasi** resmi di bidang UI/UX, AI, Cloud, dan Rekayasa Perangkat Lunak:\n\n' +
      '- **ITechno Cup 2026 (PNJ)**: International UI/UX Design Competition\n' +
      '- **IBM SkillsBuild x Hacktiv8**: Data - AI Agent for Data Analysis\n' +
      '- **Google**: Google Certificate (Foundations)\n' +
      '- **Amazon Web Services (AWS)**: Dasar Cloud & Gen AI di AWS\n' +
      '- **Dicoding Indonesia**: Back-End Pemula dengan JavaScript, Dasar Pemrograman JavaScript, Belajar Dasar AI\n' +
      '- **HP LIFE**: Code Generations & Optimization, Data Science & Analytics, AI for Beginners, Customer Experience (CX), Business Email';
  }

  // 7. CONTACT / MEDSOS
  if (
    matches(cleanQuestion, ['kontak', 'contact', 'wa', 'whatsapp', 'nomor', 'email', 'hubungi', 'instagram', 'linkedin', 'github', 'sosmed', 'sosial media', 'ig', 'tele'])
  ) {
    return 'Kamu bisa langsung menghubungi atau terhubung dengan Rayhan melalui saluran resmi berikut:\n\n' +
      '- **Email**: [rayhanzulkarnain29@gmail.com](mailto:rayhanzulkarnain29@gmail.com)\n' +
      '- **WhatsApp**: [Say Hello (0813-6907-9309)](https://wa.me/6281369079309?text=Halo!%20Saya%20tertarik%20untuk%20berkolaborasi%20dengan%20kamu.)\n' +
      '- **LinkedIn**: [linkedin.com/in/ryhnixull](https://www.linkedin.com/in/ryhnixull)\n' +
      '- **Instagram**: [@ryhnxull](https://www.instagram.com/ryhnxull/)\n' +
      '- **GitHub**: [github.com/RYNIXULL](https://github.com/RYNIXULL)';
  }

  // 8. JAWABAN LAIN / MOCK FUN RESPONSES
  if (matches(cleanQuestion, ['terima kasih', 'thanks', 'makasih', 'suwun', 'thank you'])) {
    return 'Sama-sama! Senang bisa membantu. Jika ada hal lain yang ingin kamu tanyakan tentang Rayhan, ketik saja ya!';
  }

  if (matches(cleanQuestion, ['kocak', 'lucu', 'haha', 'wkwk', 'hehe'])) {
    return 'Terima kasih! Sebagai Jean, saya diprogram untuk ramah dan responsif. Ada lagi yang bisa saya bantu tentang portofolio Rayhan?';
  }

  // Default response
  return 'Saya mengerti pertanyaanmu! Namun, sebagai Jean, saya diprogram khusus untuk menjawab pertanyaan seputar **M. Rayhan Zulkarnain** (seperti keahlian teknis, proyek unggulan, sertifikasi, dan kontaknya).\n\nCobalah tanyakan sesuatu seperti:\n' +
    '• "Proyek apa saja yang sudah dibuat Rayhan?"\n' +
    '• "Apa saja keahlian teknis Rayhan?"\n' +
    '• "Bagaimana cara menghubungi Rayhan?"';
}

/**
 * Helper utility to match keywords
 */
function matches(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw));
}
