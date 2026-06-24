'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, type Easing } from 'motion/react'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
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
      className="relative flex flex-col items-center text-center px-6 pt-10 pb-24"
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
        className="font-display tracking-[0.5em] text-sm text-gold mt-8 mb-12 uppercase"
      >
        Tenemos el honor de invitarte
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.3)}
        className="font-display text-7xl md:text-9xl text-wine leading-none"
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
        className="font-display text-7xl md:text-9xl text-wine leading-none"
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
        className="font-display tracking-[0.3em] text-xl md:text-2xl text-ink uppercase"
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
          Ceremonia y Recepción
        </p>
        <p className="text-xl text-ink">{wedding.ceremony.name}</p>
        <p className="text-base text-ink-soft italic">{wedding.ceremony.address}</p>
        <p className="text-base text-ink mt-1">{wedding.ceremony.time} h</p>
      </motion.div>

      {/* #8 — Gift note */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.6)}
        className="mt-14"
      >
        <p className="font-display tracking-[0.3em] text-sm text-gold uppercase mb-1">
          Regalo de bodas
        </p>
        <p className="text-xl text-ink">Lluvia de sobres</p>
      </motion.div>

      {/* #9 — RSVP request */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.75)}
        className="mt-14 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed italic"
      >
        Por favor confirma tu asistencia antes del 16 de julio en el link de la
        parte de abajo. Si no recibimos respuesta para esa fecha, entenderemos
        con cariño que no podrás acompañarnos.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.9)}
        className="mt-16 flex flex-col md:flex-row gap-4"
      >
        <Link
          href="/codigo-de-vestuario"
          className="group relative px-8 py-4 border border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Código de Vestuario
        </Link>
        <Link
          href="/ubicacion"
          className="group relative px-8 py-4 border border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Ubicación
        </Link>
        <Link
          href="/mensajes"
          className="group relative px-8 py-4 border border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Dedicatorias
        </Link>
      </motion.div>
    </section>
  )
}
