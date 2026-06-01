'use client'

import { motion } from 'motion/react'

type Props = { playing: boolean }

const PETAL_COUNT = 14
const PETAL_PATH =
  'M 0 -10 C 5 -8, 7 -2, 5 5 C 2 8, -2 8, -5 5 C -7 -2, -5 -8, 0 -10 Z'

const petalSeeds = Array.from({ length: PETAL_COUNT }, (_, i) => {
  // Deterministic pseudo-randoms so SSR + CSR match
  const seed = (i + 1) * 7919
  return {
    leftPct: (seed % 100),
    delay: ((seed * 13) % 400) / 100, // 0–4s
    duration: 5 + ((seed * 17) % 400) / 100, // 5–9s
    rotate: ((seed * 23) % 720) - 360,
    drift: ((seed * 19) % 80) - 40,
    hue: ['#7A934A', '#B3A062', '#7F7547', '#9C8A4E'][seed % 4],
    size: 14 + ((seed * 11) % 14),
  }
})

/**
 * Soft falling petals + faint rain streaks for the Cusco / first-trip moment.
 */
export function FallingPetals({ playing }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-10"
    >
      {/* Rain streaks — barely visible vertical lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const x = (i * 13 + 5) % 100
          return (
            <motion.line
              key={i}
              x1={x}
              y1={-10}
              x2={x - 1}
              y2={110}
              stroke="rgba(140, 155, 175, 0.18)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={playing ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
              transition={{
                duration: 3,
                delay: i * 0.18,
                repeat: playing ? Infinity : 0,
                ease: 'linear',
              }}
            />
          )
        })}
      </svg>

      {/* Petals */}
      {petalSeeds.map((p, i) => (
        <motion.svg
          key={i}
          width={p.size}
          height={p.size}
          viewBox="-10 -10 20 20"
          className="absolute"
          style={{ left: `${p.leftPct}%`, top: -20 }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={
            playing
              ? {
                  y: ['0%', '120vh'],
                  x: [0, p.drift, -p.drift / 2, p.drift / 3, 0],
                  opacity: [0, 0.9, 0.9, 0.7, 0],
                  rotate: [0, p.rotate],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            repeat: playing ? Infinity : 0,
            repeatDelay: 1,
          }}
        >
          <path d={PETAL_PATH} fill={p.hue} opacity="0.85" />
        </motion.svg>
      ))}
    </div>
  )
}
