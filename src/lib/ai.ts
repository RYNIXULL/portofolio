/**
 * Jean AI Assistant Service
 * Uses NVIDIA Llama 3.1 via Next.js API route (server-side).
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
  // NVIDIA LLAMA 3.1 API (via Next.js server-side route)
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
    return 'Halo! Saya **Jean**, asisten AI portofolio **M. Rayhan Zulkarnain**. Saya bisa membantu menjawab pertanyaanmu seputar keterampilan, proyek, sertifikasi, atau cara menghubungi Rayhan. Ada yang ingin kamu ketahui? 🤖✨';
  }

  // 2. WHO IS RAYHAN / ABOUT
  if (
    matches(cleanQuestion, ['siapa', 'who', 'tentang', 'about', 'profil', 'profile', 'biodata', 'pemilik', 'owner', 'rayhan'])
  ) {
    return '**M. Rayhan Zulkarnain** adalah mahasiswa Manajemen Informatika di **Politeknik Negeri Lampung** yang saat ini sedang mendalami pengembangan perangkat lunak (software development).\n\nSebagai developer, Rayhan sangat menyukai eksplorasi teknologi baru dan memanfaatkan AI untuk membangun solusi digital yang interaktif, berkinerja tinggi, dan indah secara visual. Saat ini dia berdomisili di **Bandar Lampung**. 📍';
  }

  // 3. SKILLS / CAPABILITIES
  if (
    matches(cleanQuestion, ['skill', 'keahlian', 'kemampuan', 'bisa apa', 'arsenal', 'tech', 'stack', 'teknologi', 'bahasa', 'programming', 'coding', 'framework', 'design', 'desain'])
  ) {
    return 'Berikut adalah keahlian teknis (**Technical Arsenal**) yang dikuasai Rayhan:\n\n' +
      '• 🌐 **Frontend**: React, Next.js, TypeScript, Tailwind CSS\n' +
      '• 🤖 **AI & Automation**: NVIDIA NIM, OpenAI API, Prompt Engineering, AI Chatbots\n' +
      '• 🎨 **Graphic Design**: Adobe Illustrator, Adobe Photoshop, CorelDraw, Canva\n' +
      '• 🏗️ **Architecture**: System Design, Performance, Accessibility, SEO\n\n' +
      'Rayhan sangat fokus pada perpaduan estetika visual dan performa yang mulus! 💻🔥';
  }

  // 4. PROJECTS / FEATURED WORK
  if (
    matches(cleanQuestion, ['project', 'proyek', 'portofolio', 'karya', 'buat apa', 'bikin apa', 'hasil', 'work', 'featured'])
  ) {
    return 'Rayhan telah mengerjakan beberapa proyek pilihan. Beberapa proyek pilihan yang ditampilkan di portofolio ini adalah:\n\n' +
      '1. 🛒 **E-Commerce Reimagined** (Fullstack development dengan desain modern)\n' +
      '2. 📊 **Fintech Dashboard** (Frontend interaktif untuk visualisasi data keuangan)\n\n' +
      'Kamu bisa melihat kartunya langsung di bagian **Featured Work** pada website ini! 🚀';
  }

  // 5. EXPERIENCE / JOURNEY
  if (
    matches(cleanQuestion, ['pengalaman', 'kerja', 'experience', 'karir', 'career', 'sejarah', 'journey', 'magang', 'freelance'])
  ) {
    return 'Perjalanan profesional Rayhan mencakup beberapa peran berikut:\n\n' +
      '• 💻 **Junior Creative Developer (Freelance - 2025 s.d. Sekarang)**: Fokus pada WebGL dan pembuatan website interaktif berkinerja tinggi.\n' +
      '• 🎨 **Graphic Designer (Rimbun Digital Utama - 2022 s.d. Sekarang)**: Membuat aset digital, identitas brand, dan layout visual.\n' +
      '• 🚀 **Frontend Engineer (Freelance - 2025 s.d. Sekarang)**: Membangun aplikasi React yang terukur dan mengoptimalkan performa web.\n' +
      '• 📐 **Interactive Designer (Freelance - 2025 s.d. Sekarang)**: Mendesain landing page interaktif dengan fokus pada tipografi dan animasi.';
  }

  // 6. CERTIFICATES / LICENSES
  if (
    matches(cleanQuestion, ['sertif', 'certif', 'sertifikasi', 'lisensi', 'aws', 'dicoding', 'penghargaan', 'award'])
  ) {
    return 'Rayhan memiliki sertifikasi resmi di bidang cloud, programming, dan AI, di antaranya:\n\n' +
      '• ☁️ **AWS**: Dasar Cloud & Gen AI di AWS\n' +
      '• ☕ **Dicoding (JavaScript/Backend)**: Dasar Pemrograman JavaScript, Back-End Pemula dengan JavaScript\n' +
      '• 🤖 **Dicoding (AI/Data)**: AI for Beginners, Belajar Dasar AI, Code Generations & Optimization, Data Science & Analytics\n' +
      '• 📧 **Lainnya**: Business Email, Customer Experience (CX) untuk kesuksesan bisnis\n\n' +
      'Kredensial lengkap berupa file PDF bisa diakses langsung pada bagian **Licenses & Certifications** di bawah! 🏆';
  }

  // 7. CONTACT / MEDSOS
  if (
    matches(cleanQuestion, ['kontak', 'contact', 'wa', 'whatsapp', 'nomor', 'email', 'hubungi', 'instagram', 'linkedin', 'github', 'sosmed', 'sosial media', 'ig', 'tele'])
  ) {
    return 'Kamu bisa langsung menghubungi atau terhubung dengan Rayhan melalui saluran berikut:\n\n' +
      '• 💬 **WhatsApp**: [Say Hello (0813-6907-9309)](https://wa.me/6281369079309?text=Halo!%20Saya%20tertarik%20untuk%20berkolaborasi%20dengan%20kamu.)\n' +
      '• 👔 **LinkedIn**: [LinkedIn Rayhan](https://www.linkedin.com/in/ryhnixull)\n' +
      '• 📸 **Instagram**: [@jiwatara](https://www.instagram.com/jiwatara/)\n' +
      '• 🐙 **GitHub**: [RYNIXULL](https://github.com/RYNIXULL)\n\n' +
      'Silakan hubungi salah satu kontak di atas, Rayhan akan sangat senang berkolaborasi denganmu! 💬🤝';
  }

  // 8. JAWABAN LAIN / MOCK FUN RESPONSES
  if (matches(cleanQuestion, ['terima kasih', 'thanks', 'makasih', 'suwun', 'thank you'])) {
    return 'Sama-sama! Senang bisa membantu. Jika ada hal lain yang ingin kamu tanyakan tentang Rayhan, ketik saja ya! 🤖💙';
  }
  
  if (matches(cleanQuestion, ['kocak', 'lucu', 'haha', 'wkwk', 'hehe'])) {
    return 'Hehe, terima kasih! Sebagai Jean, saya diprogram untuk ramah dan sedikit ceria. 😄 Ada lagi yang bisa saya bantu tentang portofolio Rayhan?';
  }

  // Default response
  return 'Saya mengerti pertanyaanmu! Namun, sebagai Jean, saya diprogram khusus untuk menjawab pertanyaan seputar **M. Rayhan Zulkarnain** (seperti keterampilan, proyek, sertifikasi, dan kontaknya).\n\nCobalah tanyakan sesuatu seperti:\n' +
    '• *"Apa saja skill Rayhan?"*\n' +
    '• *"Proyek apa saja yang sudah dibuat?"*\n' +
    '• *"Bagaimana cara menghubungi Rayhan?"*';
}

/**
 * Helper utility to match keywords
 */
function matches(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw));
}
