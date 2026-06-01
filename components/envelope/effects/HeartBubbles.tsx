'use client'

import { motion } from 'motion/react'

type Props = { playing: boolean }

const HEARTS = ['💕', '❤️', '💗', '💞', '🤍']

const bubbleSeeds = Array.from({ length: 22 }, (_, i) => {
  const seed = (i + 1) * 7919
  return {
    leftPct: (seed % 90) + 5,
    delay: ((seed * 11) % 300) / 100,
    duration: 3 + ((seed * 17) % 250) / 100,
    drift: ((seed * 19) % 100) - 50,
    size: 18 + ((seed * 13) % 22),
    isHeart: i % 3 !== 0,
    emoji: HEARTS[seed % HEARTS.length],
  }
})

/**
 * Hearts and translucent bubbles rising from the bottom of the section.
 * Closes the story on a sweet note.
 */
export function HeartBubbles({ playing }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-10"
    >
      {bubbleSeeds.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 flex items-center justify-center"
          style={{
            left: `${b.leftPct}%`,
            fontSize: b.size,
            width: b.size + 8,
            height: b.size + 8,
          }}
          initial={{ y: 60, opacity: 0, scale: 0 }}
          animate={
            playing
              ? {
                  y: ['0%', '-110vh'],
                  x: [0, b.drift / 2, -b.drift / 3, b.drift, 0],
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0, 1, 1, 1, 0.6],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: 'easeOut',
            repeat: playing ? Infinity : 0,
            repeatDelay: 0.8,
          }}
        >
          {b.isHeart ? (
            <span>{b.emoji}</span>
          ) : (
            <span
              className="block rounded-full"
              style={{
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85) 0%, rgba(255,210,210,0.45) 40%, rgba(140,46,42,0.12) 100%)',
                boxShadow:
                  'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(140,46,42,0.2)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
