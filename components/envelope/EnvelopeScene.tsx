'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Envelope } from './Envelope'
import { StoryMilestone } from './StoryMilestone'
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
      const inside = envelope.querySelector('[data-envelope-inside]') as HTMLElement
      const seal = envelope.querySelector('[data-envelope-seal]') as HTMLElement
      const waxBlob = envelope.querySelector(
        '[data-wax-blob]',
      ) as SVGPathElement | null
      const monogram = envelope.querySelector(
        '[data-wax-monogram]',
      ) as SVGGElement | null
      const fissure = envelope.querySelector(
        '[data-wax-fissure]',
      ) as SVGPathElement | null
      const fragGroup = envelope.querySelector(
        '[data-wax-fragments]',
      ) as SVGGElement | null
      const frags = envelope.querySelectorAll(
        '[data-wax-frag]',
      ) as NodeListOf<SVGPathElement>

      // Initial visible states (envelope shown, sealed, glowing)
      gsap.set(envelope, { opacity: 1, scale: 0.96, y: 0 })
      gsap.set(hintRef.current, { opacity: 0, y: 8 })
      gsap.set(letterRef.current, { opacity: 0 })
      gsap.set(flap, { rotateX: 0 })
      gsap.set(inside, { opacity: 0 })

      // Non-scroll intro: envelope settles + hint blinks in
      gsap
        .timeline({ delay: 0.1 })
        .to(envelope, {
          scale: 1.0,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(
          hintRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4',
        )

      // Scroll-driven cinematic timeline
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

      // 0.00 – 0.08 — Hint fades out as user begins to scroll
      tl.to(hintRef.current, { opacity: 0, duration: 0.08 }, 0)

      // 0.00 – 0.12 — Camera leans in: envelope grows, seal glows
      tl.to(envelope, { scale: 1.06, duration: 0.12, ease: 'none' }, 0)
      tl.to(
        seal,
        {
          filter: 'drop-shadow(0 8px 22px rgba(140,46,42,0.55))',
          duration: 0.1,
        },
        0,
      )

      // 0.12 – 0.22 — Crack the seal
      if (fissure) {
        tl.to(
          fissure,
          { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' },
          0.12,
        )
      }
      if (fragGroup) {
        tl.to(fragGroup, { opacity: 1, duration: 0.01 }, 0.2)
      }
      if (waxBlob) {
        tl.to(waxBlob, { opacity: 0, duration: 0.02 }, 0.2)
      }
      if (monogram) {
        tl.to(monogram, { opacity: 0, duration: 0.02 }, 0.2)
      }
      frags.forEach((f, i) => {
        const dir = i === 0 ? -1 : i === 1 ? 0 : 1
        tl.to(
          f,
          {
            x: dir * (50 + i * 14),
            y: 90 + i * 18,
            rotation: dir * (30 + i * 12),
            opacity: 0,
            duration: 0.1,
            ease: 'power2.in',
          },
          0.2 + i * 0.012,
        )
      })

      // 0.22 – 0.45 — Open the flap (3D rotateX)
      tl.to(
        flap,
        {
          rotateX: -172,
          duration: 0.22,
          transformOrigin: 'top center',
          ease: 'power2.inOut',
        },
        0.22,
      )
      tl.to(inside, { opacity: 1, duration: 0.06 }, 0.28)

      // 0.48 – 0.7 — Envelope fades while letter content emerges
      tl.to(envelope, { y: -80, scale: 0.82, duration: 0.18 }, 0.48)
        .to(envelope, { opacity: 0, duration: 0.12 }, 0.58)
        .to(letterRef.current, { opacity: 1, duration: 0.1 }, 0.58)

      // 0.65 – 1.0 — Hold letter visible; user continues scrolling and the pin
      // releases. The Lenis-driven scroll moves to the next sections below.
      // Reveal nav after pin progress crosses 0.85.

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Pinned envelope stage */}
      <section
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Envelope layer */}
        <div
          ref={envelopeWrapRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Envelope ref={envelopeRef} />
        </div>

        {/* Hint */}
        <div
          ref={hintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-soft pointer-events-none"
        >
          <p className="font-display tracking-[0.4em] text-xs uppercase">
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

        {/* Letter content (revealed once envelope fades) */}
        <div
          ref={letterRef}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none opacity-0"
        >
          <div className="text-center max-w-2xl pointer-events-auto">
            <OrnamentalDivider variant={1} />
            <p className="font-display tracking-[0.5em] text-sm text-gold uppercase mt-8">
              Una pequeña historia
            </p>
            <p className="font-script text-5xl text-ink mt-3">de los dos</p>
            <p className="mt-8 text-base text-ink-soft italic">
              Sigue desplazándote para leerla...
            </p>
          </div>
        </div>
      </section>

      {/* Story & invitation flow below the pinned scene */}
      <div className="relative bg-ivory">
        <div className="paper-texture absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 space-y-32">
          {story.map((m, i) => (
            <StoryMilestone
              key={m.year}
              milestone={m}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <InvitationReveal />
        </div>
      </div>

      {/* Floating nav appears once envelope is open */}
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
        </div>
      </div>
    </nav>
  )
}
