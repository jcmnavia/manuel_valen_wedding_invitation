'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

type Props = {
  variant?: 1 | 2
  className?: string
  animate?: boolean
}

export function OrnamentalDivider({
  variant = 1,
  className = '',
  animate = true,
}: Props) {
  const ref = useRef<SVGSVGElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const shouldAnimate = animate && inView

  const paths1 = (
    <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
      <motion.path
        d="M8 12 L140 12"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.path
        d="M180 12 L312 12"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.circle
        cx={160}
        cy={12}
        r={4}
        initial={{ scale: 0 }}
        animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{ transformOrigin: '160px 12px' }}
      />
      <motion.path
        d="M148 12 Q160 4 172 12"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
      <motion.path
        d="M148 12 Q160 20 172 12"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </g>
  )

  const paths2 = (
    <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
      <motion.path
        d="M10 16 C 60 4, 100 28, 160 16 C 220 4, 260 28, 310 16"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.circle
        cx={160}
        cy={16}
        r={2.5}
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        style={{ transformOrigin: '160px 16px' }}
      />
    </g>
  )

  const viewBox = variant === 1 ? '0 0 320 24' : '0 0 320 32'

  return (
    <svg
      ref={ref}
      role="presentation"
      aria-hidden="true"
      viewBox={viewBox}
      className={`text-gold ${className}`}
      width={320}
      height={variant === 1 ? 24 : 32}
    >
      {variant === 1 ? paths1 : paths2}
    </svg>
  )
}
