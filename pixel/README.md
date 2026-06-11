# Raybot — Pixel Mascot System

Tiny pixel-art companion untuk portfolio Next.js + TypeScript kamu.
Monitor kecil dengan mata pixel, antena WiFi, dan kepribadian developer.

---

## Struktur File

```
components/mascot/
  Mascot.tsx           ← Orchestrator utama (mount ini)
  MascotSprite.tsx     ← Pure SVG pixel-art rendering
  MascotController.tsx ← DOM interaction detector
  Mascot.module.css    ← Semua animasi (pure CSS)
  index.ts             ← Barrel export

hooks/
  useMascotState.ts    ← State machine (idle/wave/happy/curious/sleep)
  useMouseTracking.ts  ← Smooth cursor lerp dengan rAF
```

---

## Instalasi

### 1. Copy files ke project kamu

```
src/
  components/
    mascot/
      Mascot.tsx
      MascotSprite.tsx
      MascotController.tsx
      Mascot.module.css
      index.ts
  hooks/
    useMascotState.ts
    useMouseTracking.ts
```

### 2. Mount di layout root

```tsx
// app/layout.tsx
import { Mascot } from '@/components/mascot'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <Mascot />   {/* ← tambahkan ini */}
      </body>
    </html>
  )
}
```

### 3. Trigger happy dari mana saja

```tsx
// Cara 1: data attribute (auto-detected)
<button data-mascot-happy>View Project</button>

// Cara 2: custom event
import { triggerRaybotHappy } from '@/components/mascot'

<button onMouseEnter={triggerRaybotHappy}>
  Projects
</button>

// Cara 3: dari useEffect
useEffect(() => {
  window.dispatchEvent(new CustomEvent('raybot:happy'))
}, [])
```

### 4. Tambah class ke project cards (auto happy trigger)

```tsx
// Raybot otomatis detect elemen dengan class ini:
<div className="project-card">...</div>
<button className="btn-primary">...</button>
<a className="cta-button" href="...">...</a>
```

---

## Perilaku Otomatis

| Trigger | State | Efek |
|---------|-------|------|
| Website pertama dibuka | `wave` | Raybot muncul + lambaikan tangan |
| Hover project card / button | `happy` | Bounce + ♥ particles |
| User scroll | `walking` | Kaki animasi berjalan |
| Scroll berhenti | `curious` | Tilt kepala + lihat sekeliling |
| Diam > 30 detik | `sleep` | Drooping + Z Z Z particles |
| Typing di input | `typing` | Arms ke depan |
| Periodic | `idle` | Symbol `> _` `</ ` `{}` muncul |
| Semua aktivitas | - | Cursor pupil following |

---

## Performance

- **0 heavy libraries** — tidak ada Three.js, GSAP, Canvas
- **Pure SVG** pixel art — `shapeRendering="crispEdges"` + `imageRendering: pixelated`
- **Pure CSS animations** — GPU-composited `transform` dan `filter`
- **1 rAF loop** untuk mouse tracking, dibersihkan saat unmount
- **No rerenders** pada scroll (hanya update state jika state berubah)
- **`pointer-events: none`** — tidak pernah memblokir klik user
- **`prefers-reduced-motion`** — semua animasi dimatikan otomatis
- **`will-change: transform`** hanya pada mascot layer

---

## Customization

### Ganti ukuran

```tsx
// Mobile otomatis 36px, desktop 48px
// Override di Mascot.tsx:
const spriteSize = isMobile ? 32 : 56
```

### Ganti warna glow

```tsx
// MascotSprite.tsx — line ~30:
const screenGlow = state === 'happy' ? '#ff88ff' : '#00ddff'
```

### Ganti posisi

```css
/* Mascot.module.css */
.wrapper {
  bottom: 24px;
  right: 24px; /* atau left: 24px untuk pojok kiri */
}
```

### Tambah selector untuk happy trigger

```tsx
// MascotController.tsx
const HAPPY_SELECTORS = [
  '[data-mascot-happy]',
  '.project-card',
  '.my-custom-class', // ← tambah di sini
]
```

### Ubah timeout tidur

```ts
// useMascotState.ts
const INACTIVITY_TIMEOUT = 30_000 // 30 detik → ubah sesuai kebutuhan
```

---

## TypeScript Types

```ts
import type { MascotState, MascotExpression } from '@/components/mascot'

// MascotState = 'wave' | 'idle' | 'happy' | 'curious' | 'sleep' | 'walking' | 'typing'
// MascotExpression = 'normal' | 'blink' | 'happy' | 'sleepy' | 'excited'
```

---

## Notes

- Raybot hidup di `position: fixed` pojok kanan bawah, `z-index: 9999`
- Semua event listeners di-cleanup dengan benar pada unmount
- MutationObserver digunakan agar happy triggers ter-attach ke elemen dinamis
- Particle system menggunakan fade opacity + CSS transform, bukan canvas

---

*Raybot — tiny robot companion for M. Rayhan Zulkarnain's portfolio*
