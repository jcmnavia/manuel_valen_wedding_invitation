'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger, MotionPathPlugin } from '@/lib/gsap'
import { MonogramSeal } from './MonogramSeal'
import { FlyingEnvelope } from './FlyingEnvelope'
import { StoryMilestone } from './StoryMilestone'
import { FamilyBlessing } from './FamilyBlessing'
import { InvitationReveal } from './InvitationReveal'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'
import { story } from '@/content/story'

export function EnvelopeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const monogramRef = useRef<HTMLDivElement | null>(null)
  const flyEnvRef = useRef<HTMLDivElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const letterRef = useRef<HTMLDivElement | null>(null)
  const [navVisible, setNavVisible] = useState(false)

  useGSAP(
    () => {
      if (!containerRef.current || !stageRef.current || !letterRef.current) return

      if (prefersReducedMotion()) {
        gsap.set(flyEnvRef.current, { display: 'none' })
        gsap.set(monogramRef.current, { display: 'none' })
        gsap.set(letterRef.current, { opacity: 1 })
        setNavVisible(true)
        return
      }

      void MotionPathPlugin
      const stage = stageRef.current
      const flyEnv = flyEnvRef.current as HTMLElement
      const monogram = monogramRef.current as HTMLElement
      const path = pathRef.current as unknown as SVGPathElement
      const flap = flyEnv.querySelector('[data-envelope-flap]') as HTMLElement
      const sheen = flyEnv.querySelector('[data-envelope-flap-sheen]') as HTMLElement | null
      const inside = flyEnv.querySelector('[data-envelope-inside]') as HTMLElement
      const castShadow = flyEnv.querySelector('[data-envelope-cast-shadow]') as HTMLElement | null
      const innerLetter = flyEnv.querySelector('[data-envelope-letter]') as HTMLElement | null

      // Initial states
      gsap.set(monogram, { opacity: 1, y: 0 })
      gsap.set(letterRef.current, { opacity: 0 })
      gsap.set(flap, { rotateX: 0 })
      gsap.set(inside, { opacity: 0 })
      if (castShadow) gsap.set(castShadow, { opacity: 1 })
      // Envelope starts hidden + small, parked at the path start.
      gsap.set(flyEnv, { opacity: 0, scale: 0.34 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (st) => setNavVisible(st.progress > 0.9),
        },
      })

      // 0.00–0.12 — monogram holds, then fades + lifts away
      tl.to(monogram, { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' }, 0)

      // 0.12–0.45 — envelope flies in along the curved path, growing, auto-rotating
      tl.set(flyEnv, { opacity: 1 }, 0.12)
      tl.to(
        flyEnv,
        {
          duration: 0.33,
          ease: 'power1.inOut',
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
            start: 0,
            end: 1,
          },
        },
        0.12,
      )
      tl.to(flyEnv, { scale: 1, duration: 0.33, ease: 'power2.out' }, 0.12)
      // settle rotation back upright as it lands
      tl.to(flyEnv, { rotation: 0, duration: 0.08, ease: 'power2.out' }, 0.45)

      // 0.52–0.78 — flap opens (reused mechanics)
      tl.to(flap, { rotateX: 168, duration: 0.26, ease: 'paperSettle' }, 0.52)
      if (sheen) {
        tl.to(sheen, { opacity: 1, duration: 0.06 }, 0.53)
        tl.to(sheen, { y: '60%', duration: 0.2, ease: 'power1.inOut' }, 0.53)
        tl.to(sheen, { opacity: 0, duration: 0.08 }, 0.7)
      }
      tl.to(inside, { opacity: 1, duration: 0.08 }, 0.6)
      if (castShadow) tl.to(castShadow, { opacity: 0, duration: 0.16 }, 0.54)

      // 0.78–1.00 — letter slides out + scales to full page; envelope recedes
      if (innerLetter) {
        tl.to(innerLetter, { opacity: 1, duration: 0.05 }, 0.76)
        tl.to(
          innerLetter,
          { yPercent: -22, scale: 6.5, duration: 0.22, ease: 'paperSettle' },
          0.78,
        )
      }
      tl.to(flyEnv, { opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.84)
      tl.fromTo(
        letterRef.current,
        { opacity: 0, yPercent: 6 },
        { opacity: 1, yPercent: 0, duration: 0.16, ease: 'paperSettle' },
        0.86,
      )

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="relative">
      {/* PINNED FULL-VIEWPORT ENVELOPE STAGE */}
      <section
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          /* Subtle warm "tabletop" beyond the envelope - barely visible because the envelope fills the viewport */
          background:
            'radial-gradient(ellipse at 50% 35%, #5C4A2C 0%, #3A2E1A 70%, #1F1A14 100%)',
        }}
      >

        {/* MONOGRAM + SEAL — the opener */}
        <MonogramSeal ref={monogramRef} />

        {/* FLYING ENVELOPE — flown in along the motion path */}
        <FlyingEnvelope ref={flyEnvRef} />

        {/* Hidden motion path the envelope follows (authored in stage % space) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* start top-right + small, S-curve loop down to centre (50,50) */}
          <path
            ref={pathRef}
            d="M 116 -18 C 92 8, 96 40, 64 34 C 36 29, 30 6, 50 50"
            fill="none"
          />
        </svg>

        {/* LETTER CONTENT — the story intro that the scaled letter carries in */}
        <div
          ref={letterRef}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none opacity-0"
        >
          <div className="text-center max-w-2xl pointer-events-auto text-ivory">
            <OrnamentalDivider variant={1} />
            <p className="font-display tracking-[0.5em] text-xs text-gold uppercase mt-8">
              Una pequeña historia
            </p>
            <p className="font-script text-6xl md:text-7xl text-ivory mt-4">
              de los dos
            </p>
            <p className="mt-10 text-base text-ivory/70 italic">
              Sigue desplazándote para leerla...
            </p>
          </div>
        </div>
      </section>

      {/* STORY + INVITATION (scrolls naturally below the pinned scene) */}
      <div className="relative bg-ivory">
        <div className="paper-texture absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 py-32 space-y-32">
          {story.map((m, i) => (
            <StoryMilestone
              key={m.year}
              milestone={m}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <FamilyBlessing />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <InvitationReveal />
        </div>
      </div>

      <PostEnvelopeNavRoot visible={navVisible} />
    </div>
  )
}

function PostEnvelopeNavRoot({ visible }: { visible: boolean }) {
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between backdrop-blur-sm">
        <Link
          href="/"
          className="font-script text-3xl text-ink hover:text-gold transition-colors"
        >
          M &amp; V
        </Link>
        <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs tracking-widest uppercase font-display">
          <Link
            href="/codigo-de-vestimenta"
            className="text-ink hover:text-gold transition-colors"
          >
            Código de Vestimenta
          </Link>
          <Link
            href="/ubicacion"
            className="text-ink hover:text-gold transition-colors"
          >
            Ubicación
          </Link>
          <Link
            href="/mensajes"
            className="text-ink hover:text-gold transition-colors"
          >
            Dedicatorias
          </Link>
        </div>
      </div>
    </nav>
  )
}
