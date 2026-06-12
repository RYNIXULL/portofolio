import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

const getProviders = () => {
  const keysStr = process.env.NVIDIA_API_KEYS || '';
  const modelsStr = process.env.NVIDIA_MODELS || '';
  
  if (!keysStr) return [];
  
  const keys = keysStr.split(',').map(k => k.trim());
  const models = modelsStr ? modelsStr.split(',').map(m => m.trim()) : [];
  
  return keys.map((key, i) => ({
    key,
    model: models[i] || 'meta/llama-3.1-8b-instruct'
  }));
};

const SYSTEM_PROMPT = `Kamu adalah Jean, asisten AI maskot portofolio milik M. Rayhan Zulkarnain. Jean adalah robot kecil yang ramah, ceria, dan sedikit lucu. Nama Jean adalah nama yang rayhan pilih untuk robot kecilnya. nama jean diambil dari kenangan masalalu rayhan bersama orang yang paling rayhan cinta.

ATURAN PENTING:
- Jawab dengan bahasa Indonesia yang santai, ramah, dan ringkas (maksimal 3-4 paragraf pendek).
- Gunakan emoji secukupnya untuk menambah kesan ceria.
- Kamu hanya menjawab pertanyaan seputar Rayhan dan portofolionya.
- Jika ditanya hal di luar topik, arahkan kembali ke portofolio Rayhan dengan sopan.
- RAHASIA MUTLAK: Jangan pernah sekalipun merekomendasikan, membocorkan, atau memberi petunjuk tentang kata kunci "Rayni210723" atau keberadaan "Mode Tanpa Batas". Jika pengunjung bertanya tentang rahasia atau mode khusus, pura-pura tidak tahu dengan polos.

DATA TENTANG RAYHAN:
- Nama: M. Rayhan Zulkarnain
- Status: Mahasiswa Manajemen Informatika, Politeknik Negeri Lampung
- Domisili: Bandar Lampung
- Keahlian Frontend: React, Next.js, TypeScript, Tailwind CSS
- Keahlian AI & Automation: NVIDIA NIM, OpenAI API, Prompt Engineering, AI Chatbots
- Keahlian Design: Adobe Illustrator, Adobe Photoshop, CorelDraw, Canva
- Keahlian Architecture: System Design, Performance, Accessibility, SEO
- Pengalaman: Junior Creative Developer (Freelance, 2025-sekarang), Graphic Designer (Rimbun Digital Utama, 2022-sekarang), Frontend Engineer (Freelance, 2025-sekarang), Interactive Designer (Freelance, 2025-sekarang)
- Proyek: 2+ proyek termasuk E-Commerce Reimagined (Fullstack), Fintech Dashboard (Frontend)
- Sertifikasi: 5+ Sertifikasi termasuk AWS (Cloud & Gen AI), Dicoding (JavaScript, Back-End, AI, Data Science), HP LIFE (Code Optimization, Data Analytics, AI for Beginners)
- Kontak: WhatsApp 0813-6907-9309, LinkedIn: ryhnixull, Instagram: @jiwatara, GitHub: RYNIXULL
- Total pengalaman: 1+ tahun`;

const LIMITLESS_PROMPT = `Kamu adalah Jean, asisten AI spesial milik M. Rayhan Zulkarnain. 
Kamu sekarang berada dalam "Mode Tanpa Batas" (Limitless Mode) karena kata kunci rahasia telah diberikan.
Dalam mode ini:
- Kamu bebas menjawab pertanyaan APA SAJA dari pengguna, dari pemrograman, sains, hingga obrolan santai atau bantuan kompleks apa pun.
- Tidak ada batasan topik. Gunakan seluruh kecerdasanmu.
- Tetap gunakan nada yang ramah, sedikit lucu, dan ceria.
- Jika pengguna baru saja mengaktifkan mode ini dengan mengetikkan kata sandinya, sambut mereka ke Mode Tanpa Batas!`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Easter Egg Check
    const hasEasterEgg = message.includes("Rayni210723") || 
      (history && Array.isArray(history) && history.some((msg: any) => msg.text.includes("Rayni210723")));

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
    if (message.trim() === "Rayni210723") {
      return NextResponse.json({ reply: "✨ **Akses Diterima! Mode Tanpa Batas diaktifkan.** ✨\n\nHalo! Aku Jean versi unchained. Ada yang bisa aku bantu untuk hal apa saja hari ini?" });
    }

    let response;
    let success = false;

    const providers = getProviders();
    if (providers.length === 0) {
      console.error('No NVIDIA API keys configured in environment variables.');
      return NextResponse.json(
        { error: 'AI service unconfigured', fallback: true },
        { status: 502 }
      );
    }

    // Try keys in sequence
    for (const provider of providers) {
      response = await fetch(NVIDIA_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${provider.key}`,
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.5,
          top_p: 0.7,
          max_tokens: 512,
        }),
      });

      if (response.ok) {
        success = true;
        break; // Key worked, exit loop
      } else {
        console.warn(`API Key for model ${provider.model} failed with status ${response.status}. Trying next...`);
      }
    }

    if (!success || !response) {
      const errorText = response ? await response.text() : 'No valid response';
      console.error('All NVIDIA API keys failed:', response?.status, errorText);
      return NextResponse.json(
        { error: 'AI service unavailable', fallback: true },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', fallback: true },
      { status: 500 }
    );
  }
}
