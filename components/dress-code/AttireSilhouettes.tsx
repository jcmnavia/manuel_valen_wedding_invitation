'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export function AttireSilhouettes() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const drawTransition = (delay = 0) => ({
    duration: 2.2,
    delay,
    ease: 'easeInOut' as const,
  })

  return (
    <div
      ref={ref}
      className="flex justify-center items-end gap-12 md:gap-20 text-gold"
    >
      <figure className="flex flex-col items-center">
      <svg viewBox="0 0 100 220" width="120" height="240" aria-label="Smoking">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx={50}
            cy={28}
            r={14}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0)}
          />
          <motion.path
            d="M36 42 L 26 64 L 30 110 L 22 200 L 36 200 L 44 130"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.2)}
          />
          <motion.path
            d="M64 42 L 74 64 L 70 110 L 78 200 L 64 200 L 56 130"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.2)}
          />
          <motion.path
            d="M40 60 L 50 95 L 60 60"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.6)}
          />
          <motion.line
            x1={50}
            y1={62}
            x2={50}
            y2={130}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.8)}
          />
        </g>
      </svg>
        <figcaption className="mt-5 text-center">
          <span className="font-display tracking-[0.25em] text-xs text-wine uppercase">
            Hombres
          </span>
          <span className="mt-1 block text-sm text-ink">Traje formal</span>
        </figcaption>
      </figure>

      <figure className="flex flex-col items-center">
      <svg viewBox="0 0 100 220" width="120" height="240" aria-label="Vestido largo">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx={50}
            cy={26}
            r={12}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0)}
          />
          <motion.path
            d="M40 40 L 50 60 L 60 40"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.2)}
          />
          <motion.path
            d="M42 60 Q 28 130 18 210 L 82 210 Q 72 130 58 60 Z"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(0.4)}
          />
          <motion.path
            d="M28 120 Q 50 140 72 120"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={drawTransition(1.2)}
          />
        </g>
      </svg>
        <figcaption className="mt-5 text-center">
          <span className="font-display tracking-[0.25em] text-xs text-wine uppercase">
            Mujeres
          </span>
          <span className="mt-1 block text-sm text-ink">Vestido largo</span>
        </figcaption>
      </figure>
    </div>
  )
}
