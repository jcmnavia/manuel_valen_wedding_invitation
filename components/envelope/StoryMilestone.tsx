'use client'

import { useRef, useState, useEffect } from 'react'
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
 * Two-beat milestone (calm version):
 *   Beat 1 — the title (year + heading + accent rule) fades in first, on its own.
 *   Beat 2 — a beat later the polaroid and the body copy fade in and rise.
 *
 * The title leading was the original sequence; this keeps it, but without the
 * old sideways slides / per-photo fly-in directions — everything just fades and
 * rises gently. Photo + text sit side by side; sides alternate via `reverse`.
 */
export function StoryMilestone({ milestone, index, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const accent = accentByIndex[index] ?? '#7B3540'

  // Once the milestone is in view, give the title its moment, then "advance"
  // to reveal the photo + body.
  const [advanced, setAdvanced] = useState(false)
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => setAdvanced(true), 850)
    return () => clearTimeout(id)
  }, [inView])

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full max-w-3xl mx-auto py-12 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Photo — appears in beat 2 (after the title), fading in and rising */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={advanced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
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

      {/* Text block */}
      <div className="max-w-md text-center md:text-left">
        {/* Beat 1 — the title leads, on its own */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
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
        </motion.div>

        {/* Beat 2 — the body copy fades in with the photo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={advanced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <time dateTime={milestone.year} className="sr-only">
            {milestone.year}
          </time>
          <p className="text-lg leading-relaxed text-ink-soft italic">
            {milestone.body}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
