import { useEffect, useRef, useCallback } from 'react'

export interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  isNear: boolean
}

const LERP_SPEED = 0.08
const NEAR_THRESHOLD = 180

export function useMouseTracking(mascotRef: React.RefObject<HTMLElement | null>) {
  const positionRef = useRef<MousePosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0, isNear: false,
  })

  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef<number | null>(null)
  const mounted = useRef(true)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    if (!mounted.current) return
    currentX.current = lerp(currentX.current, targetX.current, LERP_SPEED)
    currentY.current = lerp(currentY.current, targetY.current, LERP_SPEED)
    const mascotEl = mascotRef.current
    if (mascotEl) {
      const rect = mascotEl.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = currentX.current - cx
      const dy = currentY.current - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      // Write directly to ref instead of calling setState
      positionRef.current = {
        x: currentX.current, y: currentY.current,
        normalizedX: Math.max(-1, Math.min(1, dx / 120)),
        normalizedY: Math.max(-1, Math.min(1, dy / 120)),
        isNear: dist < NEAR_THRESHOLD,
      }
    }
    rafId.current = requestAnimationFrame(animate)
  }, [mascotRef])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { targetX.current = e.clientX; targetY.current = e.clientY }
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) { targetX.current = e.touches[0].clientX; targetY.current = e.touches[0].clientY }
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    rafId.current = requestAnimationFrame(animate)
    return () => {
      mounted.current = false
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  return positionRef
}
