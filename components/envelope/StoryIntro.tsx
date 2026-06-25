'use client'

import { useRef } from 'react'
import { motion, useInView, type Easing } from 'motion/react'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { storyIntro } from '@/content/storyIntro'

const ease: Easing = [0.22, 1, 0.36, 1]

/**
 * The couple's "16 años" narrative, shown right below the carousel. Quiet
 * editorial prose with a single minimal sage divider at the top — no per-
 * paragraph ornaments, by design. Paragraphs fade up as they enter view.
 */
export function StoryIntro() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center text-center"
    >
      {/* the single, minimal ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease }}
        className="mb-14"
      >
        <OrnamentalDivider variant={2} />
      </motion.div>

      <div className="space-y-7 max-w-xl">
        {storyIntro.paragraphs.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease, delay: 0.15 + i * 0.12 }}
            className={
              i === 0
                ? 'font-serif text-xl md:text-2xl text-esmeralda leading-relaxed'
                : 'font-serif text-base md:text-lg text-ink-soft leading-relaxed'
            }
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  )
}
