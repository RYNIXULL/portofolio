'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { MascotState } from '@/hooks/useMascotState'

interface MascotControllerProps {
  onHappy: () => void
  onTyping: () => void
  onStopTyping: () => void
  currentState: MascotState
}

// Selectors that trigger happy state
const HAPPY_SELECTORS = [
  '[data-mascot-happy]',
  '.project-card',
  '.btn-primary',
  '.cta-button',
  'a[href*="github"]',
  'a[href*="project"]',
  'button[data-project]',
]

const INPUT_SELECTORS = ['input[type="text"]', 'input[type="email"]', 'textarea']

export function MascotController({
  onHappy,
  onTyping,
  onStopTyping,
  currentState,
}: MascotControllerProps) {
  const happyElementsRef = useRef<Element[]>([])
  const inputElementsRef = useRef<Element[]>([])
  const activeHoverRef = useRef(false)

  const findElements = useCallback(() => {
    const happy: Element[] = []
    HAPPY_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => happy.push(el))
    })
    happyElementsRef.current = happy

    const inputs: Element[] = []
    INPUT_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => inputs.push(el))
    })
    inputElementsRef.current = inputs
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!activeHoverRef.current) {
      activeHoverRef.current = true
      onHappy()
    }
  }, [onHappy])

  const handleMouseLeave = useCallback(() => {
    activeHoverRef.current = false
  }, [])

  const handleFocus = useCallback(() => {
    onTyping()
  }, [onTyping])

  const handleBlur = useCallback(() => {
    onStopTyping()
  }, [onStopTyping])

  const attachListeners = useCallback(() => {
    findElements()

    happyElementsRef.current.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    inputElementsRef.current.forEach((el) => {
      el.addEventListener('focus', handleFocus)
      el.addEventListener('blur', handleBlur)
    })
  }, [findElements, handleMouseEnter, handleMouseLeave, handleFocus, handleBlur])

  const detachListeners = useCallback(() => {
    happyElementsRef.current.forEach((el) => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    })

    inputElementsRef.current.forEach((el) => {
      el.removeEventListener('focus', handleFocus)
      el.removeEventListener('blur', handleBlur)
    })
  }, [handleMouseEnter, handleMouseLeave, handleFocus, handleBlur])

  useEffect(() => {
    // Initial attachment after DOM is ready
    const timer = setTimeout(attachListeners, 500)

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      detachListeners()
      attachListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      detachListeners()
    }
  }, [attachListeners, detachListeners])

  // Listen for custom events from app
  useEffect(() => {
    const handleCustomHappy = () => onHappy()
    window.addEventListener('raybot:happy', handleCustomHappy)
    return () => window.removeEventListener('raybot:happy', handleCustomHappy)
  }, [onHappy])

  return null
}

// Utility: dispatch happy event from anywhere in the app
export const triggerRaybotHappy = () => {
  window.dispatchEvent(new CustomEvent('raybot:happy'))
}
