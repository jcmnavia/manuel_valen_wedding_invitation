'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { PolaroidFrame } from '@/components/shared/PolaroidFrame'
import type { StoryMilestone as Milestone } from '@/content/story'

type Props = {
  milestone: Milestone
  index: number
  reverse?: boolean
}

// Per-milestone accent, drawn from the wedding palette (deepened where needed
// so the small eyebrow text clears WCAG AA on ivory). Esmeralda · Naranjado ·
// Wine · Sage-deep — one distinct color per beat.
const accentByIndex = ['#2C6B33', '#A6531F', '#7B3540', '#5F7A6B']

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * One milestone: a B&W polaroid on one side, the text on the other (sides
 * alternate via `reverse`). Both simply fade in and rise gently when scrolled
 * into view — calm and editorial, no sideways slides or per-photo directions.
 */
export function StoryMilestone({ milestone, index, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const accent = accentByIndex[index] ?? '#7B3540'

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full max-w-3xl mx-auto py-12 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Photo — fades in and rises gently */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: EASE }}
        className="relative shrink-0"
        style={{ rotate: `${milestone.rotation}deg` }}
      >
        <PolaroidFrame
          src={milestone.photo}
          alt={milestone.title}
          caption={milestone.caption}
          rotation={0}
          tapeColor={milestone.tapeColor}
          orientation={milestone.orientation}
          grayscale
        />
      </motion.div>

      {/* Text — fades in and rises gently, a beat after the photo */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
        className="max-w-md text-center md:text-left"
      >
        <p
          className="font-display tracking-[0.4em] text-sm uppercase mb-3"
          style={{ color: accent }}
        >
          {milestone.year}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-5 leading-tight">
          {milestone.title}
        </h3>
        <div
          className="mb-5 h-px w-16 origin-left"
          style={{ backgroundColor: accent, opacity: 0.6 }}
        />
        <time dateTime={milestone.year} className="sr-only">
          {milestone.year}
        </time>
        <p className="text-lg leading-relaxed text-ink-soft italic">
          {milestone.body}
        </p>
      </motion.article>
    </div>
  )
}
