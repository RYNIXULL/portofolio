'use client'

import React, { useRef, useState, useEffect } from 'react'
import { MascotSprite } from './MascotSprite'
import { MascotController } from './MascotController'
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
    }
  }, [])

  // Particle system for Z (sleep) and hearts (happy)
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
      } else if (mascotState.state === 'happy') {
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
      } else {
        setParticles([])
        return
      }
    }

    if (mascotState.state === 'sleep' || mascotState.state === 'happy') {
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

  const spriteSize = isMobile ? 36 : 48

  // Compute tilt from mouse position (subtle, max 6deg)
  const tiltX = mouse.normalizedY * -4
  const tiltY = mouse.normalizedX * 4
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
  ]
    .filter(Boolean)
    .join(' ')

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
        aria-hidden="true"
        data-state={mascotState.state}
      >
        {/* Particles layer */}
        <div className={styles.particleLayer}>
          {particles.map((p) => (
            <span
              key={p.id}
              className={styles.particle}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                opacity: p.opacity,
                transform: `translateY(${(1 - p.opacity) * -20}px) scale(${p.opacity})`,
              }}
            >
              {p.type === 'z' ? 'z' : '♥'}
            </span>
          ))}
        </div>

        {/* Symbol bubble */}
        {mascotState.symbolVisible && (
          <div className={styles.symbolBubble}>
            <code>{mascotState.currentSymbol}</code>
          </div>
        )}

        {/* Main sprite */}
        <div
          className={animClass}
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
            lookX={mouse.normalizedX}
            lookY={mouse.normalizedY}
            size={spriteSize}
          />
        </div>

        {/* Tooltip on hover - only shown when near */}
        {mouse.isNear && mascotState.state !== 'sleep' && (
          <div className={styles.tooltip}>
            Raybot
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
      </div>
    </>
  )
}
