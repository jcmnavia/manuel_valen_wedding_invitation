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
 * Two-beat scroll choreography for every milestone:
 *   Beat 1 — the title + year arrive centered and large, the only thing on
 *            screen, with an underline that draws in.
 *   Beat 2 — the title slides aside and the polaroid flies in with a distinct
 *            entrance per milestone (right / fluttering-from-upper-left / zoom /
 *            from-below), and the body copy fades in.
 */
export function StoryMilestone({ milestone, index, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const accent = accentByIndex[index] ?? '#7B3540'

  // Once the milestone is in view, give the title its moment, then "advance"
  // to slide it aside and land the photo.
  const [advanced, setAdvanced] = useState(false)
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => setAdvanced(true), 850)
    return () => clearTimeout(id)
  }, [inView])

  // Different photo entrance per milestone — the lively part.
  const photoVariants = [
    // 0 — beginning: slides in from the right with a slight rotate
    {
      initial: { opacity: 0, x: 80, y: 20, rotate: milestone.rotation - 8 },
      animate: { opacity: 1, x: 0, y: 0, rotate: milestone.rotation },
    },
    // 1 — journey: drifts down from the top-left, like a postcard fluttering down
    {
      initial: { opacity: 0, x: -50, y: -60, rotate: milestone.rotation + 12 },
      animate: { opacity: 1, x: 0, y: 0, rotate: milestone.rotation },
    },
    // 2 — the "sí": zooms in from the centre with a big scale
    {
      initial: { opacity: 0, scale: 0.4, rotate: milestone.rotation - 4 },
      animate: { opacity: 1, scale: 1, rotate: milestone.rotation },
    },
    // 3 — present: rises up from below
    {
      initial: { opacity: 0, y: 80, rotate: milestone.rotation - 6 },
      animate: { opacity: 1, y: 0, rotate: milestone.rotation },
    },
  ]
  const photoMotion = photoVariants[index] ?? photoVariants[0]

  // Title slide direction depends on which side the photo goes.
  const titleSlide = reverse ? 60 : -60

  return (
    <div
      ref={ref}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-16"
    >
      {/* ---- BEAT 1: centered title card ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <motion.div
          animate={
            advanced
              ? { x: titleSlide, scale: 0.7, opacity: 0 }
              : { x: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.0, ease: EASE }}
          className="text-center pointer-events-auto"
        >
          <p
            className="font-display tracking-[0.5em] text-sm uppercase mb-3"
            style={{ color: accent }}
          >
            {milestone.year}
          </p>
          <h3 className="font-display text-5xl md:text-7xl text-ink leading-tight">
            {milestone.title}
          </h3>
          {/* Decorative underline that draws in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
            className="mx-auto mt-6 h-px w-24 origin-center"
            style={{ backgroundColor: accent }}
          />
        </motion.div>
      </motion.div>

      {/* ---- BEAT 2: photo + body, sliding into the now-vacated stage ---- */}
      <div
        className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full max-w-3xl ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
        style={{ minHeight: 360 }}
      >
        {/* Photo */}
        <motion.div
          initial={photoMotion.initial}
          animate={advanced ? photoMotion.animate : photoMotion.initial}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative shrink-0"
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

        {/* Body copy */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={advanced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          className="max-w-md text-center md:text-left"
        >
          <p
            className="font-display tracking-[0.4em] text-xs uppercase mb-2"
            style={{ color: accent }}
          >
            {milestone.year}
          </p>
          <h4 className="font-display text-2xl md:text-3xl text-ink mb-4">
            {milestone.title}
          </h4>
          <time dateTime={milestone.year} className="sr-only">
            {milestone.year}
          </time>
          <p className="text-lg leading-relaxed text-ink-soft italic">
            {milestone.body}
          </p>
        </motion.article>
      </div>
    </div>
  )
}
