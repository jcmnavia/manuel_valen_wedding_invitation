'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { PolaroidFrame } from '@/components/shared/PolaroidFrame'
import type { StoryMilestone as Milestone } from '@/content/story'

type Props = {
  milestone: Milestone
  reverse?: boolean
}

export function StoryMilestone({ milestone, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: milestone.rotation - 6 }}
        animate={inView ? { opacity: 1, y: 0, rotate: milestone.rotation } : {}}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <PolaroidFrame
          src={milestone.photo}
          alt={milestone.title}
          caption={milestone.caption}
          rotation={0}
          tapeColor={milestone.tapeColor}
        />
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="max-w-md text-center md:text-left"
      >
        <p className="font-display tracking-[0.4em] text-sm text-gold mb-2">
          {milestone.year}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
          {milestone.title}
        </h3>
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
