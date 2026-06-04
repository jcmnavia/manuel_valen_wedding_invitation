'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Envelope } from './Envelope'
import { StoryMilestone } from './StoryMilestone'
import { FamilyBlessing } from './FamilyBlessing'
import { InvitationReveal } from './InvitationReveal'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'
import { story } from '@/content/story'

export function EnvelopeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const envelopeWrapRef = useRef<HTMLDivElement | null>(null)
  const envelopeRef = useRef<HTMLDivElement | null>(null)
  const hintRef = useRef<HTMLDivElement | null>(null)
  const letterRef = useRef<HTMLDivElement | null>(null)
  const [navVisible, setNavVisible] = useState(false)

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !stageRef.current ||
        !envelopeRef.current ||
        !letterRef.current
      )
        return

      const reduced = prefersReducedMotion()

      if (reduced) {
        gsap.set(envelopeWrapRef.current, { opacity: 0, display: 'none' })
        gsap.set(letterRef.current, { opacity: 1, y: 0 })
        setNavVisible(true)
        return
      }

      const envelope = envelopeRef.current
      const flap = envelope.querySelector('[data-envelope-flap]') as HTMLElement
      const flapWrap = envelope.querySelector(
        '[data-envelope-flap-wrap]',
      ) as HTMLElement
      const inside = envelope.querySelector(
        '[data-envelope-inside]',
      ) as HTMLElement
      const front = envelope.querySelector(
        '[data-envelope-front]',
      ) as HTMLElement
      const address = envelope.querySelector(
        '[data-envelope-address]',
      ) as HTMLElement
      const castShadow = envelope.querySelector(
        '[data-envelope-cast-shadow]',
      ) as HTMLElement | null
      const innerLetter = envelope.querySelector(
        '[data-envelope-letter]',
      ) as HTMLElement | null
      const sheen = envelope.querySelector(
        '[data-envelope-flap-sheen]',
      ) as HTMLElement | null

      // Initial states — envelope is closed and visible on load
      gsap.set(envelope, { opacity: 1 })
      gsap.set(hintRef.current, { opacity: 0, y: 8 })
      gsap.set(letterRef.current, { opacity: 0 })
      gsap.set(flap, { rotateX: 0 })
      gsap.set(inside, { opacity: 0 })
      if (castShadow) gsap.set(castShadow, { opacity: 1 })
      if (innerLetter) {
        // Start the letter tucked inside the envelope, hidden behind the flap
        gsap.set(innerLetter, {
          opacity: 0,
          y: '40%',
        })
      }

      // Non-scroll intro: hint fades in after a beat
      gsap.to(hintRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
        delay: 0.9,
      })

      // Master scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (st) => {
            setNavVisible(st.progress > 0.85)
          },
        },
      })

      // 0.00 – 0.06 — Hint fades out as user starts scrolling
      tl.to(hintRef.current, { opacity: 0, duration: 0.06 }, 0)

      // 0.00 – 0.12 — Lean in: subtle scale on the whole envelope
      tl.to(envelope, { scale: 1.02, duration: 0.12, ease: 'none' }, 0)

      // 0.12 – 0.55 — FLAP LIFTS OPEN TOWARD THE USER.
      //
      // rotateX POSITIVE rotates the top edge out toward the viewer (opens
      // forward). It hinges on its top edge (origin-top). We stop at 168° —
      // a few degrees short of dead-flat — so a sliver of thickness stays
      // visible and it never reads as a flat sticker. ONE clean rotateX with
      // the paper-settle ease; no scaleX/scaleY squish (that read as the
      // triangle squishing, not paper bending). The bend is sold instead by
      // the moving sheen below + the receding shadow.
      tl.to(
        flap,
        {
          rotateX: 168,
          duration: 0.43,
          ease: 'paperSettle',
        },
        0.12,
      )

      // Light catches the bending surface: a bright band sweeps down the flap
      // and fades, mid-open. transform + opacity only (GPU-composited).
      if (sheen) {
        tl.to(sheen, { opacity: 1, duration: 0.1, ease: 'power1.out' }, 0.14)
        tl.to(
          sheen,
          { y: '60%', duration: 0.34, ease: 'power1.inOut' },
          0.14,
        )
        tl.to(sheen, { opacity: 0, duration: 0.12, ease: 'power1.in' }, 0.4)
      }

      // Cast shadow on the body recedes as the flap rotates up — fade by
      // OPACITY only (animating clip-path/scaleY forces re-rasterization).
      if (castShadow) {
        tl.to(
          castShadow,
          {
            opacity: 0,
            duration: 0.28,
            ease: 'power2.out',
          },
          0.14,
        )
      }

      // Inner liner becomes visible as the flap clears past ~30°
      tl.to(inside, { opacity: 1, duration: 0.12 }, 0.22)

      // Letter inside peeks up after the flap clears ~45°
      if (innerLetter) {
        tl.to(
          innerLetter,
          {
            opacity: 1,
            y: '15%',
            duration: 0.18,
            ease: 'power2.out',
          },
          0.30,
        )
      }

      // 0.55 – 0.78 — Envelope dissolves; the letter completes its slide-up
      tl.to(front, { y: 160, opacity: 0, duration: 0.22 }, 0.55)
      tl.to(address, { opacity: 0, duration: 0.10 }, 0.55)
      tl.to(flapWrap, { opacity: 0, duration: 0.14, y: -100 }, 0.62)

      if (innerLetter) {
        tl.to(
          innerLetter,
          {
            y: '-30%',
            opacity: 0,
            duration: 0.20,
            ease: 'power2.in',
          },
          0.58,
        )
      }

      // 0.65 – 0.85 — Story-letter content emerges
      tl.to(letterRef.current, { opacity: 1, duration: 0.15 }, 0.65)

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

        {/* Envelope IS the page */}
        <div ref={envelopeWrapRef} className="absolute inset-0">
          <Envelope ref={envelopeRef} />
        </div>

        {/* Scroll hint at the very bottom */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/80 pointer-events-none z-30"
        >
          <p className="font-display tracking-[0.5em] text-[10px] uppercase">
            Desliza para abrir
          </p>
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            className="animate-bounce"
            aria-hidden="true"
          >
            <path
              d="M8 2 V 18 M2 12 L 8 18 L 14 12"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* LETTER CONTENT — revealed once envelope dissolves */}
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
