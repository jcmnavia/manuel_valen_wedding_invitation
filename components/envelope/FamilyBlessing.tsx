'use client'

import { useRef } from 'react'
import { motion, useInView, type Easing } from 'motion/react'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { wedding } from '@/content/wedding'

const ease: Easing = [0.22, 1, 0.36, 1]

function ParentGroup({
  label,
  names,
  delay,
  inView,
}: {
  label: string
  names: readonly string[]
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease, delay }}
      className="text-center"
    >
      <p className="font-display tracking-[0.4em] text-xs md:text-sm text-wine uppercase mb-4">
        {label}
      </p>
      {names.map((name) => (
        <p
          key={name}
          className="font-serif italic text-lg md:text-xl text-ink leading-relaxed"
        >
          {name}
        </p>
      ))}
    </motion.div>
  )
}

/**
 * "Con la bendición de Dios y de nuestros padres" — both sets of parents,
 * novia first, separated by an ornamental flourish. Heirloom palette: wine
 * eyebrow labels, italic ink names, sage dividers.
 */
export function FamilyBlessing() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center text-center px-6 py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease }}
        className="font-display text-2xl md:text-3xl text-ink uppercase tracking-[0.18em] leading-relaxed max-w-md mb-14"
      >
        Con la bendición de Dios
        <br />y de nuestros padres
      </motion.h2>

      <ParentGroup
        label={wedding.family.novia.label}
        names={wedding.family.novia.names}
        delay={0.2}
        inView={inView}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="my-12"
      >
        <OrnamentalDivider variant={2} />
      </motion.div>

      <ParentGroup
        label={wedding.family.novio.label}
        names={wedding.family.novio.names}
        delay={0.6}
        inView={inView}
      />
    </section>
  )
}
