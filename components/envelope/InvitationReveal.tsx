'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, type Easing } from 'motion/react'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { PolaroidFrame } from '@/components/shared/PolaroidFrame'
import { Countdown } from './Countdown'
import { wedding } from '@/content/wedding'

export function InvitationReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const ease: Easing = [0.22, 1, 0.36, 1]
  const transition = (delay: number) => ({
    duration: 1.2,
    ease,
    delay,
  })

  return (
    <section
      ref={ref}
      data-invitation
      className="relative flex flex-col items-center text-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(0)}
      >
        <OrnamentalDivider variant={2} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.15)}
        className="font-display tracking-[0.5em] text-sm text-gold mt-8 mb-8 uppercase"
      >
        Tenemos el honor de invitarte
      </motion.p>

      {/* Hero keepsake — the couple, the ring, the heart of the reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 24 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={transition(0.25)}
        className="mb-10"
      >
        <PolaroidFrame
          src="/photos/couple-hero.jpg"
          alt={`${wedding.groomName} y ${wedding.brideName}`}
          caption="Nosotros"
          rotation={-2}
          tapeColor="gold"
          orientation="portrait"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.45)}
        className="font-script text-7xl md:text-9xl text-ink leading-none"
      >
        {wedding.brideName}
      </motion.h1>

      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(0.6)}
        className="font-display text-3xl text-gold my-4"
      >
        &amp;
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.75)}
        className="font-script text-7xl md:text-9xl text-ink leading-none"
      >
        {wedding.groomName}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(1.0)}
        className="mt-12 mb-8"
      >
        <OrnamentalDivider variant={1} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.15)}
        className="font-display tracking-[0.6em] text-2xl md:text-3xl text-ink uppercase"
      >
        {wedding.dateRoman}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.3)}
        className="mt-3 text-lg text-ink-soft italic"
      >
        {wedding.dateDisplay}
      </motion.p>

      {/* Countdown to the big day */}
      <div className="mt-14">
        <Countdown />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.45)}
        className="mt-16"
      >
        <p className="font-display tracking-[0.3em] text-sm text-gold uppercase mb-1">
          Ceremonia
        </p>
        <p className="text-xl text-ink">{wedding.ceremony.name}</p>
        <p className="text-base text-ink-soft italic">{wedding.ceremony.address}</p>
        <p className="text-base text-ink mt-1">{wedding.ceremony.time} h</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.7)}
        className="mt-16 flex flex-col md:flex-row gap-4"
      >
        <Link
          href="/codigo-de-vestimenta"
          className="group relative px-8 py-4 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Código de Vestimenta
        </Link>
        <Link
          href="/ubicacion"
          className="group relative px-8 py-4 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Ubicación
        </Link>
        <Link
          href="/mensajes"
          className="group relative px-8 py-4 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Mensajes
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(2.0)}
        className="mt-16 font-script text-3xl text-ink-soft"
      >
        Con amor, M &amp; V
      </motion.p>
    </section>
  )
}
