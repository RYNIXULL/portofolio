import { useState, useEffect, useRef, useCallback } from 'react'

export type MascotState =
  | 'wave'
  | 'idle'
  | 'happy'
  | 'curious'
  | 'sleep'
  | 'walking'
  | 'typing'

export type MascotExpression = 'normal' | 'blink' | 'happy' | 'sleepy' | 'excited'

export interface MascotStateData {
  state: MascotState
  expression: MascotExpression
  isBlinking: boolean
  symbolVisible: boolean
  currentSymbol: string
  floatDirection: 'up' | 'down'
}

const SYMBOLS = ['> _', '</', '{}', '[]', '//']
const INACTIVITY_TIMEOUT = 30_000
const BLINK_MIN = 2_500
const BLINK_MAX = 6_000
const SYMBOL_INTERVAL = 8_000
const WAVE_DURATION = 3_000
const HAPPY_DURATION = 2_000
const CURIOUS_DURATION = 4_000

export function useMascotState() {
  const [stateData, setStateData] = useState<MascotStateData>({
    state: 'wave',
    expression: 'normal',
    isBlinking: false,
    symbolVisible: false,
    currentSymbol: '> _',
    floatDirection: 'up',
  })

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const symbolTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevScrollY = useRef(0)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentState = useRef<MascotState>('wave')
  const symbolIndex = useRef(0)
  const isHappy = useRef(false)
  const mounted = useRef(true)

  const safeSet = useCallback((updater: (prev: MascotStateData) => MascotStateData) => {
    if (mounted.current) setStateData(updater)
  }, [])

  const transitionTo = useCallback(
    (state: MascotState, duration?: number) => {
      if (!mounted.current) return
      currentState.current = state
      safeSet((prev) => ({ ...prev, state }))
      if (duration && stateTimer.current) {
        clearTimeout(stateTimer.current)
        stateTimer.current = setTimeout(() => {
          if (mounted.current) transitionTo('idle')
        }, duration)
      }
    },
    [safeSet]
  )

  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    if (currentState.current === 'sleep') {
      transitionTo('idle')
    }
    inactivityTimer.current = setTimeout(() => {
      if (mounted.current && !isHappy.current) {
        transitionTo('sleep')
        safeSet((prev) => ({ ...prev, expression: 'sleepy' }))
      }
    }, INACTIVITY_TIMEOUT)
  }, [transitionTo, safeSet])

  const triggerBlink = useCallback(() => {
    if (!mounted.current) return
    safeSet((prev) => ({ ...prev, isBlinking: true }))
    setTimeout(() => {
      if (mounted.current) safeSet((prev) => ({ ...prev, isBlinking: false }))
    }, 150)
    const next = BLINK_MIN + Math.random() * (BLINK_MAX - BLINK_MIN)
    blinkTimer.current = setTimeout(triggerBlink, next)
  }, [safeSet])

  const triggerSymbol = useCallback(() => {
    if (!mounted.current) return
    if (currentState.current === 'idle' || currentState.current === 'typing') {
      const sym = SYMBOLS[symbolIndex.current % SYMBOLS.length]
      symbolIndex.current++
      safeSet((prev) => ({ ...prev, symbolVisible: true, currentSymbol: sym }))
      setTimeout(() => {
        if (mounted.current) safeSet((prev) => ({ ...prev, symbolVisible: false }))
      }, 1800)
    }
    symbolTimer.current = setTimeout(triggerSymbol, SYMBOL_INTERVAL + Math.random() * 4000)
  }, [safeSet])

  useEffect(() => {
    const id = setInterval(() => {
      safeSet((prev) => ({
        ...prev,
        floatDirection: prev.floatDirection === 'up' ? 'down' : 'up',
      }))
    }, 2000)
    return () => clearInterval(id)
  }, [safeSet])

  useEffect(() => {
    stateTimer.current = setTimeout(() => { transitionTo('idle') }, WAVE_DURATION)
    const blinkStart = BLINK_MIN + Math.random() * BLINK_MAX
    blinkTimer.current = setTimeout(triggerBlink, blinkStart)
    symbolTimer.current = setTimeout(triggerSymbol, SYMBOL_INTERVAL)
    resetInactivity()
    return () => {
      mounted.current = false
      ;[inactivityTimer, blinkTimer, symbolTimer, stateTimer, scrollStopTimer].forEach(
        (r) => r.current && clearTimeout(r.current)
      )
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleScroll = () => {
      resetInactivity()
      const cur = window.scrollY
      const delta = Math.abs(cur - prevScrollY.current)
      prevScrollY.current = cur
      if (delta > 5 && currentState.current !== 'sleep') {
        if (currentState.current === 'idle' && !isHappy.current) transitionTo('walking')
      }
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
      scrollStopTimer.current = setTimeout(() => {
        if (mounted.current && currentState.current === 'walking') {
          transitionTo('curious', CURIOUS_DURATION)
          safeSet((prev) => ({ ...prev, expression: 'normal' }))
        }
      }, 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [resetInactivity, transitionTo, safeSet])

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart', 'click']
    events.forEach((e) => window.addEventListener(e, resetInactivity, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, resetInactivity))
  }, [resetInactivity])

  const triggerHappy = useCallback(() => {
    isHappy.current = true
    transitionTo('happy', HAPPY_DURATION)
    safeSet((prev) => ({ ...prev, expression: 'happy' }))
    setTimeout(() => {
      isHappy.current = false
      if (mounted.current) safeSet((prev) => ({ ...prev, expression: 'normal' }))
    }, HAPPY_DURATION)
  }, [transitionTo, safeSet])

  const triggerTyping = useCallback(() => {
    if (currentState.current !== 'happy') transitionTo('typing')
  }, [transitionTo])

  const stopTyping = useCallback(() => {
    if (currentState.current === 'typing') transitionTo('idle')
  }, [transitionTo])

  return { ...stateData, triggerHappy, triggerTyping, stopTyping }
}
