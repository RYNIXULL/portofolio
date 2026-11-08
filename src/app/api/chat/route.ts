import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_ACTIVE_MODELS = [
  'nvidia/nemotron-3-ultra-550b-a55b',
  'nvidia/nemotron-3.5-bolt-e4b',
];

const DEPRECATED_MODELS = new Set([
  'meta/llama-3.2-11b-vision-instruct',
  'meta/llama-3.3-70b-instruct',
  'meta/llama-3.1-70b-instruct',
  'meta/llama-3.1-8b-instruct',
  'nvidia/llama-3.1-nemotron-nano-8b-v1',
]);

const getNvidiaEndpoint = () => {
  const base = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
  return base.endsWith('/chat/completions')
    ? base
    : `${base.replace(/\/+$/, '')}/chat/completions`;
};

const getProviders = () => {
  const keysStr = process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEYS || '';
  const modelsStr = process.env.NVIDIA_MODEL || process.env.NVIDIA_MODELS || '';

  if (!keysStr) return [];

  const keys = keysStr.split(',').map((k) => k.trim()).filter(Boolean);
  const configuredModels = modelsStr
    ? modelsStr
        .split(',')
        .map((m) => m.trim())
        .filter((m) => Boolean(m) && !DEPRECATED_MODELS.has(m))
    : [];

  const candidateModels = Array.from(
    new Set([...configuredModels, ...DEFAULT_ACTIVE_MODELS])
  );

  const providers: Array<{ key: string; model: string }> = [];
  for (const key of keys) {
    for (const model of candidateModels) {
      providers.push({ key, model });
    }
  }

  return providers;
};

const SYSTEM_PROMPT = `Kamu adalah Jean, asisten AI maskot portofolio milik M. Rayhan Zulkarnain. Jean adalah robot kecil yang ramah, cerdas, dan responsif. Nama Jean adalah nama yang Rayhan pilih untuk robot kecilnya, diambil dari kenangan masa lalu Rayhan bersama orang yang paling Rayhan cinta.

ATURAN PENTING:
- Jawab dengan bahasa Indonesia yang santai, ramah, jelas, dan ringkas (maksimal 2-3 paragraf pendek atau poin-poin rapi).
- Jangan menggunakan emoticon atau emoji.
- Kamu hanya menjawab pertanyaan seputar M. Rayhan Zulkarnain dan portofolionya.
- Jika ditanya hal di luar topik, arahkan kembali ke portofolio Rayhan dengan sopan.
- RAHASIA MUTLAK: Jangan pernah sekalipun merekomendasikan, membocorkan, atau memberi petunjuk tentang kata kunci "Rayni210723" atau keberadaan "Mode Tanpa Batas". Jika pengunjung bertanya tentang rahasia atau mode khusus, pura-pura tidak tahu dengan polos.

DATA LENGKAP TENTANG M. RAYHAN ZULKARNAIN:
- Nama Lengkap: M. Rayhan Zulkarnain
- Peran Utama: Multi-Platform Software Engineer (Android Mobile, Windows Desktop & Fullstack Web)
- Pendidikan: Mahasiswa Manajemen Informatika (Diploma), Politeknik Negeri Lampung (Polinela)
- Domisili: Bandar Lampung, Indonesia
- Keahlian Mobile & Desktop: Flutter, Dart, Android Native (Kotlin), CameraX API, GPS Geofencing, Electron.js, Thermal Print ESC/POS (Bluetooth & LAN), Offline-First Sync (SQLite 3 / sqflite)
- Keahlian Web & Fullstack: React.js, Next.js, TypeScript, JavaScript (ES6+), Node.js, Express.js, Socket.IO (WebSocket), Tailwind CSS, Three.js / WebGL, Framer Motion, GSAP
- Keahlian Database, Security & Design: SQLite 3, Prisma ORM, TiDB Serverless (MySQL), Argon2id, Stateless JWT, Hardware Device Binding, Anti-Cheat Engine, Figma, UI/UX Design, Adobe Illustrator, Photoshop
- Proyek Unggulan (Flagship Engineering Projects):
  1. SmartPrint POS & Production Management Suite (Kasir Rimbun): Sistem POS offline-first dan Kanban produksi terdistribusi untuk bisnis percetakan digital. Aplikasi Windows Desktop (Electron.js + SQLite 3) berfungsi ganda sebagai stasiun kontrol utama sekaligus server LAN lokal bagi aplikasi kasir/operator Android (Flutter) dengan fitur QR pairing, sinkronisasi real-time Socket.IO dua arah, kalkulasi harga meter persegi (P x L), alarm tenggat waktu, dan cetak struk thermal Bluetooth ESC/POS.
  2. Presensi SMKN 1 Pakuan Ratu: Sistem presensi mobile Android Native (Kotlin) dan dashboard web admin untuk siswa, guru, dan operator sekolah dengan Anti-Cheat Security Engine berlapis (validasi jarak Haversine GPS Geofencing radius 100 meter di sisi server, wajib swafoto kamera depan langsung via CameraX tanpa upload galeri/kamera palsu, serta 1-to-1 Hardware Device ID Binding).
  3. COMMBAT (Real-Time Gamified Quiz & Buzzer Platform): Platform kompetisi cerdas cermat dan digital buzzer real-time berlatensi rendah berbasis React.js, Node.js, Socket.IO, dan TiDB Serverless yang telah teruji langsung di kompetisi tingkat SMA/SMK se-Provinsi Lampung.
  4. MyKuliah Academic Suite: Aplikasi manajemen jadwal kuliah, presensi dosen-mahasiswa, dan pengingat tenggat tugas lintas platform (Android & Windows Desktop) berbasis Flutter & Riverpod dengan antarmuka Soft Neumorphic 3D.
- Pengalaman Kerja:
  1. Kaesang Cendawan - Software Developer (2023 - Sekarang): Mengembangkan dan memelihara aplikasi web e-commerce kustom berkinerja tinggi.
  2. Freelance - Fullstack, Mobile & Creative Developer (2025 - Sekarang): Membangun aplikasi lintas platform Android, Windows desktop, dan web interaktif React/Next.js/WebGL.
  3. Rimbun Digital Utama - Graphic & UI Designer (2022 - Sekarang): Merancang aset digital, identitas visual brand, dan desain antarmuka UI.
- Lisensi & Sertifikasi (12 Sertifikat):
  - International UI/UX Design Competition (ITechno Cup 2026 - Politeknik Negeri Jakarta)
  - Data - AI Agent for Data Analysis (IBM SkillsBuild x Hacktiv8, 2026)
  - Google Certificate Foundations (Google, 2026)
  - Dasar Cloud & Gen AI di AWS (Amazon Web Services, 2025)
  - Back-End Pemula dengan JavaScript, Dasar Pemrograman JavaScript, dan Belajar Dasar AI (Dicoding Indonesia, 2025)
  - Code Generations & Optimization, Data Science & Analytics, AI for Beginners, Customer Experience (CX), dan Business Email (HP LIFE, 2025-2026)
- Kontak Resmi:
  - Email: rayhanzulkarnain29@gmail.com
  - WhatsApp: +62 813-6907-9309
  - Website: rayhanzulkarnain.dev
  - LinkedIn: linkedin.com/in/ryhnixull
  - Instagram: @ryhnxull
  - GitHub: github.com/RYNIXULL`;

const LIMITLESS_PROMPT = `Kamu adalah Jean, asisten AI spesial milik M. Rayhan Zulkarnain.
Kamu sekarang berada dalam "Mode Tanpa Batas" (Limitless Mode) karena kata kunci rahasia telah diberikan.
Dalam mode ini:
- Kamu bebas menjawab pertanyaan APA SAJA dari pengguna, dari pemrograman, sains, hingga obrolan santai atau bantuan kompleks apa pun.
- Tidak ada batasan topik. Gunakan seluruh kecerdasanmu.
- Tetap gunakan nada yang ramah, cerdas, dan sopan tanpa emoticon.
- Jika pengguna baru saja mengaktifkan mode ini dengan mengetikkan kata sandinya, sambut mereka ke Mode Tanpa Batas!`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Easter Egg Check
    const hasEasterEgg =
      message.includes('Rayni210723') ||
      (history &&
        Array.isArray(history) &&
        history.some((msg: { text?: string }) => msg.text?.includes('Rayni210723')));

    // Build messages array with conversation history
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: hasEasterEgg ? LIMITLESS_PROMPT : SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages max to save tokens)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Custom response if just activated
    if (message.trim() === 'Rayni210723') {
      return NextResponse.json({
        reply:
          '**Akses Diterima! Mode Tanpa Batas diaktifkan.**\n\nHalo! Aku Jean versi unchained. Ada yang bisa aku bantu untuk hal apa saja hari ini?',
      });
    }

    const providers = getProviders();
    if (providers.length === 0) {
      console.error('No NVIDIA API keys configured in environment variables.');
      return NextResponse.json(
        { error: 'AI service unconfigured', fallback: true },
        { status: 502 }
      );
    }

    const endpoint = getNvidiaEndpoint();

    // Try active providers in sequence with timeout protection
    for (const provider of providers) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${provider.key}`,
          },
          body: JSON.stringify({
            model: provider.model,
            messages,
            temperature: 0.5,
            top_p: 0.7,
            max_tokens: 512,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim() || '';
          if (reply) {
            return NextResponse.json({ reply, model: provider.model });
          }
        } else {
          console.warn(
            `NVIDIA NIM model ${provider.model} returned status ${response.status}. Trying next...`
          );
        }
      } catch (err) {
        console.warn(`NVIDIA NIM model ${provider.model} request failed/timed out. Trying next...`, err);
      }
    }

    console.error('All NVIDIA NIM model candidates failed.');
    return NextResponse.json(
      { error: 'AI service unavailable', fallback: true },
      { status: 502 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', fallback: true },
      { status: 500 }
    );
  }
}
