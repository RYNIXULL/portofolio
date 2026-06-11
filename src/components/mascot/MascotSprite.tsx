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
  isNear?: boolean
}

export const MascotSprite: React.FC<MascotSpriteProps> = ({
  state,
  expression,
  isBlinking,
  lookX,
  lookY,
  size = 48,
  isNear = false,
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
    state === 'sleep' ? '#0a0a1a' :
    state === 'happy' ? '#021a0f' :
    state === 'wave' ? '#020f1a' :
    state === 'blush' ? '#1f050e' : // Dark deep pink-red for blush
    state === 'angry' ? '#1c0202' : // Dark deep red for angry
    '#05050f'

  const screenGlow =
    state === 'happy' ? '#00ffaa' :
    state === 'sleep' ? '#5c5cff' :
    state === 'blush' ? '#ff4785' : // Vibrant neon hot pink
    state === 'angry' ? '#ff2a2a' : // Vibrant neon red
    '#00f0ff'

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

    if (expression === 'blush' || state === 'blush') {
      // Blush eyes = > < shape + diagonal slashes /// on cheeks
      return (
        <>
          {/* Left eye > */}
          <rect x="12" y="19" width="2" height="2" fill={screenGlow} />
          <rect x="14" y="21" width="2" height="2" fill={screenGlow} />
          <rect x="12" y="23" width="2" height="2" fill={screenGlow} />
          
          {/* Right eye < */}
          <rect x="26" y="19" width="2" height="2" fill={screenGlow} />
          <rect x="24" y="21" width="2" height="2" fill={screenGlow} />
          <rect x="26" y="23" width="2" height="2" fill={screenGlow} />

          {/* Slashes "///" in the middle */}
          <rect x="16" y="26" width="1" height="2" fill={screenGlow} />
          <rect x="17" y="24" width="1" height="2" fill={screenGlow} />

          <rect x="19" y="26" width="1" height="2" fill={screenGlow} />
          <rect x="20" y="24" width="1" height="2" fill={screenGlow} />

          <rect x="22" y="26" width="1" height="2" fill={screenGlow} />
          <rect x="23" y="24" width="1" height="2" fill={screenGlow} />
        </>
      )
    }

    if (expression === 'angry' || state === 'angry') {
      // Angry slanted eyes
      return (
        <>
          {/* Left eye slanted \ */}
          <rect x="11" y="19" width="3" height="2" fill={screenGlow} />
          <rect x="13" y="21" width="3" height="2" fill={screenGlow} />
          <rect x="15" y="23" width="3" height="2" fill={screenGlow} />

          {/* Right eye slanted / */}
          <rect x="26" y="19" width="3" height="2" fill={screenGlow} />
          <rect x="24" y="21" width="3" height="2" fill={screenGlow} />
          <rect x="22" y="23" width="3" height="2" fill={screenGlow} />
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
    if (expression === 'blush' || state === 'blush') {
      // Small happy curved mouth
      return (
        <>
          <rect x="18" y="32" width="4" height="2" fill={screenGlow} />
          <rect x="17" y="30" width="2" height="2" fill={screenGlow} />
          <rect x="21" y="30" width="2" height="2" fill={screenGlow} />
        </>
      )
    }
    if (expression === 'angry' || state === 'angry') {
      // Upside down angry mouth /\
      return (
        <>
          <rect x="17" y="32" width="2" height="2" fill={screenGlow} />
          <rect x="19" y="30" width="4" height="2" fill={screenGlow} />
          <rect x="23" y="32" width="2" height="2" fill={screenGlow} />
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

  // Arm rendering based on state and cursor position
  const renderArms = () => {
    if (state === 'sleep') {
      return (
        <>
          {/* Limp arms hanging straight down */}
          <rect x="4" y="38" width="4" height="10" fill="#94a3b8" opacity="0.6" />
          <rect x="4" y="48" width="4" height="4" fill="#cbd5e1" opacity="0.6" />
          <rect x="34" y="38" width="4" height="10" fill="#94a3b8" opacity="0.6" />
          <rect x="34" y="48" width="4" height="4" fill="#cbd5e1" opacity="0.6" />
        </>
      )
    }

    if (state === 'wave') {
      return (
        <>
          {/* Left arm down */}
          <rect x="4" y="38" width="4" height="8" fill="#94a3b8" />
          <rect x="4" y="46" width="4" height="4" fill="#cbd5e1" />
          {/* Right arm up - waving */}
          <rect x="34" y="26" width="4" height="6" fill="#94a3b8" />
          <rect x="36" y="22" width="4" height="6" fill="#94a3b8" />
          <rect x="38" y="18" width="4" height="4" fill="#cbd5e1" />
        </>
      )
    }

    if (state === 'typing') {
      return (
        <>
          {/* Both arms forward */}
          <rect x="4" y="36" width="4" height="4" fill="#94a3b8" />
          <rect x="2" y="38" width="6" height="3" fill="#cbd5e1" />
          <rect x="34" y="36" width="4" height="4" fill="#94a3b8" />
          <rect x="34" y="38" width="6" height="3" fill="#cbd5e1" />
        </>
      )
    }

    if (state === 'happy') {
      return (
        <>
          {/* Excited raised arms */}
          <rect x="4" y="28" width="4" height="8" fill="#94a3b8" />
          <rect x="4" y="24" width="4" height="4" fill="#cbd5e1" />
          <rect x="34" y="28" width="4" height="8" fill="#94a3b8" />
          <rect x="34" y="24" width="4" height="4" fill="#cbd5e1" />
        </>
      )
    }

    if (state === 'blush') {
      return (
        <>
          {/* Left arm bending inwards */}
          <rect x="4" y="36" width="6" height="4" fill="#94a3b8" />
          <rect x="10" y="36" width="6" height="4" fill="#cbd5e1" /> {/* finger pointing in */}
          
          {/* Right arm bending inwards */}
          <rect x="32" y="36" width="6" height="4" fill="#94a3b8" />
          <rect x="26" y="36" width="6" height="4" fill="#cbd5e1" /> {/* finger pointing in */}
        </>
      )
    }

    if (state === 'angry') {
      return (
        <>
          {/* Left arm: elbow bends out, hand on hip */}
          <rect x="2" y="34" width="4" height="4" fill="#94a3b8" />
          <rect x="0" y="36" width="4" height="6" fill="#94a3b8" />
          <rect x="2" y="40" width="4" height="4" fill="#cbd5e1" />

          {/* Right arm: elbow bends out, hand on hip */}
          <rect x="36" y="34" width="4" height="4" fill="#94a3b8" />
          <rect x="38" y="36" width="4" height="6" fill="#94a3b8" />
          <rect x="36" y="40" width="4" height="4" fill="#cbd5e1" />
        </>
      )
    }

    // --- INTERACTIVE / DYNAMIC POSES ---
    // Arms follow or point to cursor when active
    const pointLeft = lookX < -0.3
    const pointRight = lookX > 0.3
    const pointUp = lookY < -0.35

    return (
      <>
        {/* Left arm */}
        {pointLeft ? (
          <>
            {/* Point left-up */}
            <rect x="0" y="32" width="4" height="6" fill="#94a3b8" />
            <rect x="0" y="28" width="4" height="4" fill="#cbd5e1" />
          </>
        ) : pointUp ? (
          <>
            {/* Reach left-up */}
            <rect x="4" y="28" width="4" height="8" fill="#94a3b8" />
            <rect x="4" y="24" width="4" height="4" fill="#cbd5e1" />
          </>
        ) : (
          <>
            {/* Default Left arm down */}
            <rect x="4" y="36" width="4" height="10" fill="#94a3b8" />
            <rect x="4" y="44" width="4" height="4" fill="#cbd5e1" />
          </>
        )}

        {/* Right arm */}
        {pointRight ? (
          <>
            {/* Point right-up */}
            <rect x="38" y="32" width="4" height="6" fill="#94a3b8" />
            <rect x="38" y="28" width="4" height="4" fill="#cbd5e1" />
          </>
        ) : pointUp ? (
          <>
            {/* Reach right-up */}
            <rect x="34" y="28" width="4" height="8" fill="#94a3b8" />
            <rect x="34" y="24" width="4" height="4" fill="#cbd5e1" />
          </>
        ) : (
          <>
            {/* Default Right arm down */}
            <rect x="34" y="36" width="4" height="10" fill="#94a3b8" />
            <rect x="34" y="44" width="4" height="4" fill="#cbd5e1" />
          </>
        )}
      </>
    )
  }

  // Legs / feet
  const renderLegs = () => {
    if (state === 'sleep') {
      return (
        <>
          {/* Sitting down legs, pointing forward (cozy rest pose) */}
          <rect x="12" y="52" width="6" height="4" fill="#94a3b8" opacity="0.8" />
          <rect x="8" y="52" width="4" height="4" fill="#cbd5e1" opacity="0.8" />
          <rect x="24" y="52" width="6" height="4" fill="#94a3b8" opacity="0.8" />
          <rect x="30" y="52" width="4" height="4" fill="#cbd5e1" opacity="0.8" />
        </>
      )
    }

    if (state === 'walking') {
      // Bouncing walking leg cycle
      return (
        <>
          {/* Left leg up, right leg down */}
          <rect x="12" y="50" width="6" height="4" fill="#94a3b8" />
          <rect x="10" y="50" width="8" height="4" fill="#cbd5e1" />
          <rect x="24" y="54" width="6" height="4" fill="#94a3b8" />
          <rect x="24" y="56" width="8" height="4" fill="#cbd5e1" />
        </>
      )
    }

    // Default standing legs
    return (
      <>
        <rect x="12" y="52" width="6" height="4" fill="#94a3b8" />
        <rect x="10" y="54" width="8" height="4" fill="#cbd5e1" />
        <rect x="22" y="52" width="6" height="4" fill="#94a3b8" />
        <rect x="22" y="54" width="8" height="4" fill="#cbd5e1" />
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
      aria-label="Jean mascot"
      role="img"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* Antenna */}
      <rect
        x="19"
        y={2 + antennaBob}
        width="4"
        height="8"
        fill="#94a3b8"
      />
      {/* WiFi symbol on antenna tip */}
      <rect
        x="17"
        y={antennaBob}
        width="8"
        height="2"
        fill="#94a3b8"
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
      <rect x="2" y="10" width="38" height="44" rx="2" fill="#e2e8f0" />

      {/* Monitor bezel / border */}
      <rect x="4" y="12" width="34" height="40" rx="1" fill="#cbd5e1" />

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
      <rect x="2" y="50" width="38" height="4" fill="#cbd5e1" />

      {/* Stand neck */}
      <rect x="16" y="54" width="10" height="4" fill="#94a3b8" />

      {/* Stand base */}
      <rect x="10" y="56" width="22" height="4" fill="#64748b" />

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
      <rect x="8" y="46" width="2" height="2" fill="#94a3b8" />
      <rect x="12" y="46" width="2" height="2" fill="#94a3b8" />
      <rect x="16" y="46" width="2" height="2" fill="#94a3b8" />

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
