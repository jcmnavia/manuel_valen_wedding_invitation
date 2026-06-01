'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { fireConfettiCombo } from '@/lib/confetti'

type Props = { playing: boolean }

const sparkleSeeds = Array.from({ length: 14 }, (_, i) => {
  const seed = (i + 1) * 7919
  return {
    leftPct: (seed % 80) + 10,
    topPct: ((seed * 13) % 80) + 10,
    delay: ((seed * 7) % 120) / 100,
    duration: 1.0 + ((seed * 11) % 80) / 100,
    size: 14 + ((seed * 17) % 18),
  }
})

/**
 * The "proposal" climax: SVG sparkle stars pop around the photo, plus a
 * canvas-confetti gold burst with ring/sparkle emojis. The biggest visual
 * moment of the story.
 */
export function SparkleBurst({ playing }: Props) {
  useEffect(() => {
    if (!playing) return
    // Fire the canvas confetti once when this milestone first enters
    void fireConfettiCombo('gold-burst', 'gold-rings')
  }, [playing])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible z-10"
    >
      {/* Gold halo behind the section */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(242, 216, 152, 0.35) 0%, rgba(242, 216, 152, 0) 60%)',
          filter: 'blur(20px)',
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={playing ? { opacity: [0, 1, 0.6, 0], scale: [0.4, 1, 1.1, 1.2] } : {}}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      />

      {/* SVG sparkles */}
      {sparkleSeeds.map((s, i) => (
        <motion.svg
          key={i}
          width={s.size}
          height={s.size}
          viewBox="-12 -12 24 24"
          className="absolute"
          style={{ left: `${s.leftPct}%`, top: `${s.topPct}%` }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            playing
              ? {
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.4],
                  rotate: [0, 180],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            ease: 'easeOut',
            repeat: playing ? 2 : 0,
            repeatDelay: 0.4,
          }}
        >
          <path
            d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"
            fill="#F2D898"
            stroke="#C2A35A"
            strokeWidth="0.5"
          />
        </motion.svg>
      ))}
    </div>
  )
}
