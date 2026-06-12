'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { MascotSprite } from './MascotSprite'
import { MascotController } from './MascotController'
import { MascotChat } from './MascotChat'
import { MascotSound } from './mascotSound'
import { useMascotState } from '@/hooks/useMascotState'
import { useMouseTracking } from '@/hooks/useMouseTracking'
import styles from './Mascot.module.css'

interface ParticleData {
  id: number
  x: number
  y: number
  type: 'z' | 'heart' | 'symbol'
  symbol?: string
  opacity: number
}

let particleId = 0

export const Mascot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<ParticleData[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [speechBubble, setSpeechBubble] = useState<{ text: string; duration: number } | null>(null)
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clickCount = useRef(0)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastClickTime = useRef(0)

  const lastPointerPos = useRef<{ x: number; y: number } | null>(null)
  const accumulatedDistance = useRef(0)
  const rubTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showSpeech = useCallback((text: string, duration = 3000) => {
    // Avoid showing speech bubbles if chat is active
    if (isChatOpen) return
    setSpeechBubble({ text, duration })
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechBubble(null)
    }, duration)
  }, [isChatOpen])

  // Clear speech bubble when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setSpeechBubble(null)
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
    }
  }, [isChatOpen])
  const particleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const componentMounted = useRef(true)

  const mascotState = useMascotState()
  const mouse = useMouseTracking(containerRef)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      componentMounted.current = false
      window.removeEventListener('resize', checkMobile)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      if (rubTimeoutRef.current) clearTimeout(rubTimeoutRef.current)
    }
  }, [])

  // Synchronize audio and speech bubbles with mascot state
  useEffect(() => {
    if (mascotState.state === 'sleep') {
      MascotSound.play('sleep')
      showSpeech('Zzz... Aku tidur dulu ya... 😴', 3500)
    }
  }, [mascotState.state, showSpeech])

  // Context-aware interaction on mount / scroll
  useEffect(() => {
    if (!mounted) return

    // Greeting on page load
    const greetingTimer = setTimeout(() => {
      showSpeech('Halo! Kenalin, aku Jean! 👋🤖', 4000)
      MascotSound.play('happy')
    }, 1500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id === 'projects') {
              showSpeech('Lihat beberapa karya terpilih Rayhan! 🚀', 3500)
              MascotSound.play('click')
            } else if (id === 'contact') {
              showSpeech('Ayo kirim pesan ke Rayhan! 💬🤝', 4000)
              MascotSound.play('happy')
            } else if (id === 'skills') {
              showSpeech('Ini adalah keahlian teknis Rayhan! 💪🔥', 3500)
              MascotSound.play('click')
            } else if (id === 'certificates') {
              showSpeech('Sertifikat & lisensi resmi Rayhan! 🏆', 3500)
              MascotSound.play('click')
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    const sectionIds = ['projects', 'contact', 'skills', 'certificates']
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      clearTimeout(greetingTimer)
      observer.disconnect()
    }
  }, [mounted, showSpeech])

  // Particle system for Z (sleep), hearts (happy/blush), and anger symbols (angry)
  useEffect(() => {
    const addParticle = () => {
      if (!componentMounted.current) return

      if (mascotState.state === 'sleep') {
        setParticles((prev) => [
          ...prev.slice(-6),
          {
            id: particleId++,
            x: 18 + Math.random() * 12,
            y: -8 - Math.random() * 4,
            type: 'z',
            opacity: 1,
          },
        ])
        particleTimer.current = setTimeout(addParticle, 1200 + Math.random() * 800)
      } else if (mascotState.state === 'happy' || mascotState.state === 'blush') {
        setParticles((prev) => [
          ...prev.slice(-4),
          {
            id: particleId++,
            x: 10 + Math.random() * 24,
            y: -6 - Math.random() * 4,
            type: 'heart',
            opacity: 1,
          },
        ])
        particleTimer.current = setTimeout(addParticle, 300 + Math.random() * 200)
      } else if (mascotState.state === 'angry') {
        setParticles((prev) => [
          ...prev.slice(-4),
          {
            id: particleId++,
            x: 10 + Math.random() * 24,
            y: -6 - Math.random() * 4,
            type: 'symbol',
            symbol: '💢',
            opacity: 1,
          },
        ])
        particleTimer.current = setTimeout(addParticle, 400 + Math.random() * 300)
      } else {
        setParticles([])
        return
      }
    }

    if (
      mascotState.state === 'sleep' ||
      mascotState.state === 'happy' ||
      mascotState.state === 'blush' ||
      mascotState.state === 'angry'
    ) {
      particleTimer.current = setTimeout(addParticle, 400)
    } else {
      setParticles([])
    }

    return () => {
      if (particleTimer.current) clearTimeout(particleTimer.current)
    }
  }, [mascotState.state])

  // Remove aged particles
  useEffect(() => {
    if (particles.length === 0) return
    const id = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.opacity > 0).map((p) => ({ ...p, opacity: p.opacity - 0.04 })))
    }, 80)
    return () => clearTimeout(id)
  }, [particles])

  if (!mounted) return null

  const spriteSize = isMobile ? 72 : 96

  // Compute tilt from mouse position (subtle, max 6deg)
  const tiltX = mouse.current.normalizedY * -4
  const tiltY = mouse.current.normalizedX * 4
  const floatY = mascotState.floatDirection === 'up' ? -3 : 3

  // State-based animation class
  const animClass = [
    styles.mascot,
    styles[`state_${mascotState.state}`],
    mascotState.state === 'sleep' ? styles.sleeping : '',
    mascotState.state === 'happy' ? styles.bouncing : '',
    mascotState.state === 'wave' ? styles.waving : '',
    mascotState.state === 'curious' ? styles.curious : '',
    mascotState.state === 'walking' ? styles.walking : '',
    mascotState.state === 'blush' ? styles.blushing : '',
    mascotState.state === 'angry' ? styles.angry : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleMascotClick = (e: React.MouseEvent) => {
    if (mascotState.state === 'sleep') {
      MascotSound.play('happy')
      mascotState.triggerHappy()
      showSpeech('Hoamm... Aku bangun! 🤖✨', 3000)
      return
    }

    const now = Date.now()
    const timeDiff = now - lastClickTime.current
    lastClickTime.current = now

    const isRapidClick = timeDiff < 500

    if (isRapidClick) {
      clickCount.current += 1
    } else {
      clickCount.current = 1
    }

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      clickCount.current = 0
    }, 1200)

    if (clickCount.current >= 4) {
      mascotState.triggerAngry()
      MascotSound.play('angry')
      const angrySpeeches = [
        'Aduh! Jangan ketuk-ketuk terus! 😡💢',
        'Ih, sakit tau! Jangan dicolok! 😤💢',
        'Jean marah nih! Stop ketuk-ketuk! 😠',
      ]
      const randomAngry = angrySpeeches[Math.floor(Math.random() * angrySpeeches.length)]
      showSpeech(randomAngry, 3500)
      clickCount.current = 0
      return
    }

    if (!isRapidClick) {
      MascotSound.play('click')
      setIsChatOpen((prev) => !prev)
      if (!isChatOpen) {
        mascotState.triggerHappy()
      }
    } else {
      MascotSound.play('click')
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mascotState.state === 'sleep' || mascotState.state === 'angry') return

    const now = Date.now()
    const currentPos = { x: e.clientX, y: e.clientY }

    if (lastPointerPos.current) {
      const dx = currentPos.x - lastPointerPos.current.x
      const dy = currentPos.y - lastPointerPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 1.5) {
        accumulatedDistance.current += dist

        if (accumulatedDistance.current > 250) {
          if (mascotState.state !== 'blush') {
            mascotState.triggerBlush()
            MascotSound.play('blush')
            const blushSpeeches = [
              '(>///<) ',
              'E-eh... Jangan diusap terus... 👉👈',
            
            ]
            const randomBlush = blushSpeeches[Math.floor(Math.random() * blushSpeeches.length)]
            showSpeech(randomBlush, 3000)
          }
          accumulatedDistance.current = 0
        }
      }
    }

    lastPointerPos.current = currentPos

    if (rubTimeoutRef.current) clearTimeout(rubTimeoutRef.current)
    rubTimeoutRef.current = setTimeout(() => {
      accumulatedDistance.current = 0
      lastPointerPos.current = null
    }, 250)
  }

  const handlePointerLeave = () => {
    accumulatedDistance.current = 0
    lastPointerPos.current = null
    if (rubTimeoutRef.current) clearTimeout(rubTimeoutRef.current)
  }

  return (
    <>
      <MascotController
        onHappy={mascotState.triggerHappy}
        onTyping={mascotState.triggerTyping}
        onStopTyping={mascotState.stopTyping}
        currentState={mascotState.state}
      />

      <div
        ref={containerRef}
        className={styles.wrapper}
        data-state={mascotState.state}
      >
        {/* Particles layer */}
        <div className={styles.particleLayer}>
          {particles.map((p) => {
            const particleClass = [
              styles.particle,
              p.type === 'heart' || mascotState.state === 'blush' ? styles.heartParticle : '',
              p.symbol === '💢' ? styles.angryParticle : '',
            ].filter(Boolean).join(' ')

            return (
              <span
                key={p.id}
                className={particleClass}
                style={{
                  left: `${p.x}px`,
                  top: `${p.y}px`,
                  opacity: p.opacity,
                  transform: `translateY(${(1 - p.opacity) * -20}px) scale(${p.opacity})`,
                }}
              >
                {p.type === 'z' ? 'z' : p.symbol ? p.symbol : '♥'}
              </span>
            )
          })}
        </div>

        {/* Symbol bubble */}
        {mascotState.symbolVisible && (
          <div className={styles.symbolBubble}>
            <code>{mascotState.currentSymbol}</code>
          </div>
        )}

        {/* Main sprite */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isChatOpen ? 'Tutup Chat Jean' : 'Tanya Jean (AI)'}
          onClick={handleMascotClick}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              MascotSound.play('click')
              setIsChatOpen((prev) => !prev)
              if (!isChatOpen) {
                mascotState.triggerHappy()
              }
            }
          }}
          className={`${animClass} ${styles.clickableMascot}`}
          style={{
            transform: `
              translateY(${floatY}px)
              rotateX(${tiltX}deg)
              rotateY(${tiltY}deg)
            `,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <MascotSprite
            state={mascotState.state}
            expression={mascotState.expression}
            isBlinking={mascotState.isBlinking}
            lookX={mouse.current.normalizedX}
            lookY={mouse.current.normalizedY}
            size={spriteSize}
            isNear={mouse.current.isNear}
          />
        </div>

        {/* Tooltip on hover - only shown when near */}
        {mouse.current.isNear && mascotState.state !== 'sleep' && (
          <div className={styles.tooltip}>
            {isChatOpen ? 'Tutup Chat' : 'Tanya Jean'}
          </div>
        )}

        {/* Sleep indicator */}
        {mascotState.state === 'sleep' && (
          <div className={styles.sleepZone}>
            <span className={styles.zBig}>Z</span>
            <span className={styles.zMed}>z</span>
            <span className={styles.zSmall}>z</span>
          </div>
        )}

        {/* Context speech bubble */}
        {speechBubble && !isChatOpen && (
          <div className={styles.speechBubble}>
            <span>{speechBubble.text}</span>
          </div>
        )}
      </div>

      {/* AI Chat drawer - Moved outside wrapper to fix fixed-position containing block bug */}
      <MascotChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        triggerTyping={mascotState.triggerTyping}
        stopTyping={mascotState.stopTyping}
        triggerHappy={mascotState.triggerHappy}
      />
    </>
  )
}
