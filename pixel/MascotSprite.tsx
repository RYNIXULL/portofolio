'use client'

import React from 'react'
import type { MascotState, MascotExpression } from '@/hooks/useMascotState'

interface MascotSpriteProps {
  state: MascotState
  expression: MascotExpression
  isBlinking: boolean
  lookX: number // -1 to 1
  lookY: number // -1 to 1
  size?: number
}

export const MascotSprite: React.FC<MascotSpriteProps> = ({
  state,
  expression,
  isBlinking,
  lookX,
  lookY,
  size = 48,
}) => {
  const scale = size / 48

  // Pupil offset based on look direction (clamped to 2px max)
  const pupilDX = Math.round(lookX * 2)
  const pupilDY = Math.round(lookY * 2)

  // Antenna bob based on state
  const antennaBob =
    state === 'happy' ? -3 :
    state === 'sleep' ? 2 :
    state === 'curious' ? -1 : 0

  // Screen color based on state
  const screenColor =
    state === 'sleep' ? '#1a1a2e' :
    state === 'happy' ? '#0a2a1a' :
    state === 'wave' ? '#0a1a2a' :
    '#0d0d1a'

  const screenGlow =
    state === 'happy' ? '#00ff88' :
    state === 'sleep' ? '#3333aa' :
    '#00ddff'

  // Eye rendering
  const renderEyes = () => {
    if (isBlinking || state === 'sleep') {
      // Closed eyes = horizontal lines
      return (
        <>
          <rect x="12" y="20" width="6" height="2" fill={screenGlow} />
          <rect x="22" y="20" width="6" height="2" fill={screenGlow} />
        </>
      )
    }

    if (expression === 'happy' || state === 'happy') {
      // Happy eyes = ^ shape
      return (
        <>
          <rect x="12" y="21" width="2" height="2" fill={screenGlow} />
          <rect x="14" y="19" width="2" height="2" fill={screenGlow} />
          <rect x="16" y="21" width="2" height="2" fill={screenGlow} />
          <rect x="22" y="21" width="2" height="2" fill={screenGlow} />
          <rect x="24" y="19" width="2" height="2" fill={screenGlow} />
          <rect x="26" y="21" width="2" height="2" fill={screenGlow} />
        </>
      )
    }

    // Normal eyes with pupils that follow cursor
    return (
      <>
        {/* Left eye socket */}
        <rect x="11" y="18" width="8" height="8" fill="#111" />
        {/* Left pupil */}
        <rect
          x={14 + pupilDX}
          y={21 + pupilDY}
          width="2"
          height="2"
          fill={screenGlow}
        />
        {/* Right eye socket */}
        <rect x="21" y="18" width="8" height="8" fill="#111" />
        {/* Right pupil */}
        <rect
          x={24 + pupilDX}
          y={21 + pupilDY}
          width="2"
          height="2"
          fill={screenGlow}
        />
      </>
    )
  }

  // Mouth rendering
  const renderMouth = () => {
    if (state === 'sleep') {
      return (
        <>
          <rect x="17" y="30" width="8" height="2" fill={screenGlow} opacity="0.5" />
          <rect x="18" y="32" width="6" height="1" fill={screenGlow} opacity="0.3" />
        </>
      )
    }
    if (expression === 'happy' || state === 'happy' || state === 'wave') {
      return (
        <>
          <rect x="16" y="30" width="2" height="2" fill={screenGlow} />
          <rect x="18" y="32" width="6" height="2" fill={screenGlow} />
          <rect x="24" y="30" width="2" height="2" fill={screenGlow} />
        </>
      )
    }
    // Neutral mouth
    return (
      <rect x="17" y="30" width="8" height="2" fill={screenGlow} />
    )
  }

  // Arm rendering based on state
  const renderArms = () => {
    if (state === 'wave') {
      return (
        <>
          {/* Left arm down */}
          <rect x="4" y="38" width="4" height="8" fill="#2a2a3a" />
          <rect x="4" y="44" width="4" height="4" fill="#1a1a2a" />
          {/* Right arm up - waving */}
          <rect x="34" y="26" width="4" height="6" fill="#2a2a3a" />
          <rect x="36" y="22" width="4" height="6" fill="#2a2a3a" />
          <rect x="38" y="20" width="4" height="4" fill="#1a1a2a" />
        </>
      )
    }
    if (state === 'typing') {
      return (
        <>
          {/* Both arms forward */}
          <rect x="4" y="36" width="4" height="4" fill="#2a2a3a" />
          <rect x="2" y="38" width="6" height="3" fill="#1a1a2a" />
          <rect x="34" y="36" width="4" height="4" fill="#2a2a3a" />
          <rect x="34" y="38" width="6" height="3" fill="#1a1a2a" />
        </>
      )
    }
    if (state === 'happy') {
      return (
        <>
          {/* Arms slightly raised */}
          <rect x="4" y="34" width="4" height="8" fill="#2a2a3a" />
          <rect x="4" y="40" width="4" height="4" fill="#1a1a2a" />
          <rect x="34" y="34" width="4" height="8" fill="#2a2a3a" />
          <rect x="34" y="40" width="4" height="4" fill="#1a1a2a" />
        </>
      )
    }
    // Default arms
    return (
      <>
        <rect x="4" y="36" width="4" height="10" fill="#2a2a3a" />
        <rect x="4" y="44" width="4" height="4" fill="#1a1a2a" />
        <rect x="34" y="36" width="4" height="10" fill="#2a2a3a" />
        <rect x="34" y="44" width="4" height="4" fill="#1a1a2a" />
      </>
    )
  }

  // Legs / feet
  const renderLegs = () => {
    const legOffset = state === 'walking' ? 2 : 0
    return (
      <>
        <rect x="12" y="52" width="6" height="4" fill="#2a2a3a" />
        <rect x="10" y={54 - legOffset} width="8" height="4" fill="#1a1a2a" />
        <rect x="22" y="52" width="6" height="4" fill="#2a2a3a" />
        <rect x="22" y={54 + legOffset} width="8" height="4" fill="#1a1a2a" />
      </>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 60"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-label="Raybot mascot"
      role="img"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* Antenna */}
      <rect
        x="19"
        y={2 + antennaBob}
        width="4"
        height="8"
        fill="#3a3a4a"
      />
      {/* WiFi symbol on antenna tip */}
      <rect
        x="17"
        y={antennaBob}
        width="8"
        height="2"
        fill="#3a3a4a"
      />
      <rect
        x="19"
        y={antennaBob}
        width="4"
        height="4"
        fill={screenGlow}
        opacity={state === 'sleep' ? 0.2 : 0.9}
      />
      {/* WiFi arc 1 */}
      <rect x="15" y={antennaBob - 2} width="12" height="2" fill={screenGlow} opacity="0.4" />
      {/* WiFi arc 2 */}
      <rect x="13" y={antennaBob - 4} width="16" height="2" fill={screenGlow} opacity="0.2" />

      {/* Monitor body - outer shell */}
      <rect x="2" y="10" width="38" height="44" rx="2" fill="#1e1e2e" />

      {/* Monitor bezel / border */}
      <rect x="4" y="12" width="34" height="40" rx="1" fill="#252535" />

      {/* Screen area */}
      <rect x="6" y="14" width="30" height="34" fill={screenColor} />

      {/* Screen inner glow border */}
      <rect x="6" y="14" width="30" height="1" fill={screenGlow} opacity="0.3" />
      <rect x="6" y="14" width="1" height="34" fill={screenGlow} opacity="0.2" />

      {/* Eyes */}
      {renderEyes()}

      {/* Mouth */}
      {renderMouth()}

      {/* Body bottom */}
      <rect x="2" y="50" width="38" height="4" fill="#1a1a2a" />

      {/* Stand neck */}
      <rect x="16" y="54" width="10" height="4" fill="#1a1a2a" />

      {/* Stand base */}
      <rect x="10" y="56" width="22" height="4" fill="#151520" />

      {/* Arms */}
      {renderArms()}

      {/* Legs */}
      {renderLegs()}

      {/* Power LED */}
      <rect
        x="34"
        y="48"
        width="2"
        height="2"
        fill={state === 'sleep' ? '#334' : '#0f8'}
        opacity={state === 'sleep' ? 0.4 : 1}
      />

      {/* Speaker dots on body */}
      <rect x="8" y="46" width="2" height="2" fill="#333344" />
      <rect x="12" y="46" width="2" height="2" fill="#333344" />
      <rect x="16" y="46" width="2" height="2" fill="#333344" />

      {/* Scan line effect on screen */}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x="6"
          y={14 + i * 7}
          width="30"
          height="1"
          fill="#fff"
          opacity="0.02"
        />
      ))}
    </svg>
  )
}
