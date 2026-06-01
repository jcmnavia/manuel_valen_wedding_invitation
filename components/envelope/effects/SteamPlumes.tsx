'use client'

import { motion } from 'motion/react'

type Props = { playing: boolean }

/**
 * Three slow-rising steam wisps for the café-meeting milestone.
 * Soft, atmospheric — sells the warmth of a coffee shop.
 */
export function SteamPlumes({ playing }: Props) {
  const plumes = [
    { x: -120, delay: 0.0, curve: 'M 0 60 Q 12 40 -6 22 Q 8 4 0 -16' },
    { x: 0, delay: 0.6, curve: 'M 0 60 Q -10 40 6 24 Q -8 6 0 -14' },
    { x: 120, delay: 1.1, curve: 'M 0 60 Q 10 42 -4 24 Q 6 4 0 -16' },
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1/2 z-10"
      style={{ width: 360, height: 160 }}
    >
      {plumes.map((p, i) => (
        <motion.svg
          key={i}
          width="40"
          height="160"
          viewBox="-20 -40 40 120"
          className="absolute bottom-0"
          style={{ left: '50%', transform: `translateX(${p.x - 20}px)` }}
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={
            playing
              ? {
                  opacity: [0, 0.55, 0.4, 0],
                  y: [30, -10, -50, -90],
                  scale: [0.7, 1, 1.15, 1.4],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 4.2,
            delay: p.delay,
            ease: 'easeOut',
            repeat: playing ? Infinity : 0,
            repeatDelay: 0.5,
          }}
        >
          <path
            d={p.curve}
            fill="none"
            stroke="rgba(170, 145, 110, 0.7)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  )
}
