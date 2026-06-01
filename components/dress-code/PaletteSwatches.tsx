'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { dressCode } from '@/content/dressCode'

export function PaletteSwatches() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10"
    >
      {dressCode.recommendedPalette.map((c, i) => (
        <motion.div
          key={c.hex}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.08,
          }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="w-24 h-24 rounded-full shadow-[0_18px_36px_-12px_rgba(31,26,20,0.35),inset_0_-6px_18px_rgba(0,0,0,0.18),inset_0_6px_12px_rgba(255,255,255,0.18)]"
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
          />
          <p className="font-display tracking-[0.2em] text-xs text-ink mt-4 uppercase">
            {c.name}
          </p>
          <p className="text-xs text-ink-soft italic mt-1">{c.hex}</p>
        </motion.div>
      ))}
    </div>
  )
}
