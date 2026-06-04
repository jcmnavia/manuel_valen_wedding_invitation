'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { wedding } from '@/content/wedding'

type Remaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

const TARGET = wedding.date.getTime()

function computeRemaining(now: number): Remaining {
  const diff = TARGET - now
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  }
}

const UNITS: { key: keyof Omit<Remaining, 'done'>; label: string }[] = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
]

/**
 * Minimalist, editorial countdown to the wedding date.
 *
 * SSR-safety: the server has no "now", so it renders dashes ("—"). The live
 * numbers appear only after mount, which keeps the server and first client
 * paint identical and avoids a hydration mismatch. The reveal fade-in is
 * driven by useInView so it animates in with the rest of the invitation.
 */
export function Countdown() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  // null until mounted → renders the stable placeholder for SSR + first paint.
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  useEffect(() => {
    setRemaining(computeRemaining(Date.now()))
    const id = setInterval(() => {
      setRemaining(computeRemaining(Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (remaining?.done) {
    return (
      <div ref={ref} className="flex flex-col items-center">
        <p className="font-script text-5xl md:text-6xl text-gold">
          ¡Hoy es el gran día!
        </p>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <p className="font-display tracking-[0.45em] text-[11px] md:text-xs text-gold-dim uppercase mb-7">
        Faltan
      </p>

      <div className="flex items-start justify-center">
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="flex items-start">
            <div className="flex flex-col items-center w-[68px] md:w-[96px]">
              <span className="font-serif font-bold text-5xl md:text-7xl text-ink leading-none tabular-nums">
                {remaining
                  ? String(remaining[unit.key]).padStart(2, '0')
                  : '—'}
              </span>
              <span className="font-display font-medium tracking-[0.3em] text-[10px] md:text-xs text-ink uppercase mt-3">
                {unit.label}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span
                aria-hidden="true"
                className="font-serif font-semibold text-3xl md:text-5xl text-gold/70 leading-none mx-1 md:mx-2 mt-2 md:mt-3 select-none"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 mx-auto w-16 h-px bg-sage/60" />
    </motion.div>
  )
}
