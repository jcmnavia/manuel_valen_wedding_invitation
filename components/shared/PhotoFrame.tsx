'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, type Easing } from 'motion/react'

const ease: Easing = [0.22, 1, 0.36, 1]

type Props = {
  src: string
  alt: string
  /** Aspect ratio of the frame, e.g. "3/4" (portrait) or "4/3" (landscape). */
  ratio?: string
  /** Responsive sizes hint for next/image. */
  sizes?: string
  priority?: boolean
  className?: string
  /** Stagger the fade-in (seconds) when several sit in a row. */
  delay?: number
}

/**
 * A single couple photo — borderless, with rounded corners and a soft shadow
 * (no polaroid). A barely-there warm overlay keeps the photos sitting in the
 * cream palette. Fades + lifts gently into view to match the rest of the site.
 */
export function PhotoFrame({
  src,
  alt,
  ratio = '3/4',
  sizes = '(min-width: 768px) 360px, 90vw',
  priority = false,
  className = '',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease, delay }}
      className={`relative overflow-hidden rounded-md shadow-[0_18px_40px_-18px_rgba(31,26,20,0.35)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {/* barely-there warm wash so the photo sits in the palette */}
      <div className="pointer-events-none absolute inset-0 bg-wine/5 mix-blend-multiply" />
    </motion.div>
  )
}
