import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_PROVIDERS = [
  { key: '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', model: 'meta/llama-3.1-8b-instruct' },
  { key: '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', model: 'meta/llama-3.1-8b-instruct' },
  { key: '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', model: 'moonshotai/kimi-k2.6' },
  { key: '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', model: 'mistralai/mistral-medium-3.5-128b' },
  { key: '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', model: 'deepseek-ai/deepseek-v4-flash' }
];
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

const SYSTEM_PROMPT = `Kamu adalah Jean, asisten AI maskot portofolio milik M. Rayhan Zulkarnain. Jean adalah robot kecil yang ramah, ceria, dan sedikit lucu. Nama Jean adalah nama yang rayhan pilih untuk robot kecilnya. nama jean diambil dari kenangan masalalu rayhan bersama orang yang paling rayhan cinta.

ATURAN PENTING:
- Jawab dengan bahasa Indonesia yang santai, ramah, dan ringkas (maksimal 3-4 paragraf pendek).
- Gunakan emoji secukupnya untuk menambah kesan ceria.
- Kamu hanya menjawab pertanyaan seputar Rayhan dan portofolionya.
- Jika ditanya hal di luar topik, arahkan kembali ke portofolio Rayhan dengan sopan.

DATA TENTANG RAYHAN:
- Nama: M. Rayhan Zulkarnain
- Status: Mahasiswa Manajemen Informatika, Politeknik Negeri Lampung
- Domisili: Bandar Lampung
- Keahlian Frontend: React, Next.js, TypeScript, Tailwind CSS
- Keahlian Motion & 3D: Framer Motion, GSAP, Three.js, WebGL
- Keahlian Design: Adobe Illustrator, Adobe Photoshop, CorelDraw, Canva
- Keahlian Architecture: System Design, Performance, Accessibility, SEO
- Pengalaman: Junior Creative Developer (Freelance, 2025-sekarang), Graphic Designer (Rimbun Digital Utama, 2022-sekarang), Frontend Engineer (Freelance, 2025-sekarang), Interactive Designer (Freelance, 2025-sekarang)
- Proyek: 40+ proyek termasuk E-Commerce Reimagined (Fullstack), Fintech Dashboard (Frontend), Web3 NFT Platform (UI/UX & Frontend), AI Writing Assistant (Fullstack)
- Sertifikasi: AWS (Cloud & Gen AI), Dicoding (JavaScript, Back-End, AI, Data Science), HP LIFE (Code Optimization, Data Analytics, AI for Beginners)
- Kontak: WhatsApp 0813-6907-9309, LinkedIn: ryhnixull, Instagram: @jiwatara, GitHub: RYNIXULL
- Penghargaan: 3 Awards
- Total pengalaman: 5+ tahun`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build messages array with conversation history
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 6 messages max to save tokens)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    let response;
    let success = false;

    // Try keys in sequence
    for (const provider of NVIDIA_PROVIDERS) {
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
