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
      const seal = flyEnv.querySelector('[data-fly-seal]') as HTMLElement | null
      const clip = flyEnv.querySelector('[data-env-clip]') as HTMLElement | null
      const tumble = flyEnv.querySelector('[data-fly-tumble]') as HTMLElement | null

      // Initial states
      gsap.set(monogram, { opacity: 1, y: 0 })
      gsap.set(letterRef.current, { opacity: 0 })
      gsap.set(flap, { rotateX: 0 })
      gsap.set(inside, { opacity: 0 })
      if (castShadow) gsap.set(castShadow, { opacity: 1 })
      // Envelope starts BELOW the viewport (path begins off-screen at y=128) at
      // a readable size, so it rises up into view instead of popping in. A tiny
      // fade at the very start (while still off-screen) avoids any hard edge.
      gsap.set(flyEnv, { opacity: 0, scale: 0.62 })
      // The letter starts fully opaque but tucked low inside the envelope and
      // clipped by it — it EMERGES by moving, never by fading.
      if (innerLetter) gsap.set(innerLetter, { opacity: 1, yPercent: 60 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=560%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (st) => setNavVisible(st.progress > 0.9),
        },
      })

      // 0.00–0.12 — monogram holds, then fades + lifts away
      tl.to(monogram, { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' }, 0)

      // 0.10–0.66 — the envelope GLIDES the long cinematic path. This is the
      // bulk of the scroll now (≈0.56 of the timeline, ~4× the old flight). It
      // travels the whole S, easing slow→fast→slow.
      //
      // NO autoRotate: it made the envelope face the path tangent, which on a
      // Gentle fade-in at the very start while it is still below the viewport,
      // so it has fully appeared by the time it crests the bottom edge.
      tl.to(flyEnv, { opacity: 1, duration: 0.06, ease: 'power1.out' }, 0.1)
      tl.to(
        flyEnv,
        {
          duration: 0.56,
          ease: 'power1.inOut',
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0,
            end: 1,
          },
        },
        0.1,
      )
      // Grow from very tiny (far) to full over the whole flight.
      tl.to(flyEnv, { scale: 1, duration: 0.56, ease: 'power1.inOut' }, 0.1)

      // THE 3D FLIP — held to the END of the rise. The envelope spends most of
      // the climb showing its PLAIN FRONT (address) tilted ~4° to the right;
      // then, in the last stretch as it reaches centre, it flips on Y (0 → 180°)
      // to reveal the V-BACK and the tilt straightens to level. So you read the
      // front for a while, and it "turns" right at the end onto the back.
      if (tumble) {
        gsap.set(tumble, { rotateY: 0, rotateZ: 4 })
        // flip happens late — roughly the final third of the flight
        tl.to(
          tumble,
          { rotateY: 180, duration: 0.18, ease: 'power2.inOut' },
          0.46,
        )
        tl.to(
          tumble,
          { rotateZ: 0, duration: 0.18, ease: 'power2.out' },
          0.46,
        )
      }

      // 0.68–0.80 — flap opens fully to 180° once the envelope has landed: the
      // triangle folds flat back over its top edge (a clean open lid). The wax
      // seal rides up briefly then fades before the flip shows its back.
      tl.to(flap, { rotateX: 180, duration: 0.12, ease: 'paperSettle' }, 0.68)
      if (seal) tl.to(seal, { opacity: 0, duration: 0.05, ease: 'power1.in' }, 0.71)
      if (sheen) {
        tl.to(sheen, { opacity: 1, duration: 0.04 }, 0.69)
        tl.to(sheen, { y: '60%', duration: 0.1, ease: 'power1.inOut' }, 0.69)
        tl.to(sheen, { opacity: 0, duration: 0.05 }, 0.78)
      }
      tl.to(inside, { opacity: 1, duration: 0.05 }, 0.74)
      if (castShadow) tl.to(castShadow, { opacity: 0, duration: 0.1 }, 0.69)

      // 0.82–1.00 — the LETTER EMERGES BY MOVING (no opacity). Parked low and
      // CLIPPED by the envelope (data-env-clip overflow:hidden), so it's hidden.
      //   1) rises UP into the envelope's mouth (peeks above the front), then
      //   2) a small settle DOWN, then
      //   3) the clip is switched off and it grows to fill the page.
      if (innerLetter) {
        // 1) up into the opening (clipped → emerges from the mouth, not midair)
        tl.to(
          innerLetter,
          { yPercent: 2, duration: 0.08, ease: 'power2.out' },
          0.82,
        )
        // 2) small down-settle (the up-then-down gesture)
        tl.to(
          innerLetter,
          { yPercent: 12, duration: 0.04, ease: 'power1.inOut' },
          0.9,
        )
        // 3) unclip + raise above everything, then grow to full page
        if (clip) tl.set(clip, { overflow: 'visible' }, 0.94)
        tl.set(innerLetter, { zIndex: 50 }, 0.94)
        tl.to(
          innerLetter,
          { yPercent: -4, scale: 7, duration: 0.1, ease: 'paperSettle' },
          0.94,
        )
      }
      tl.to(flyEnv, { opacity: 0, duration: 0.06, ease: 'power2.in' }, 0.97)
      // The story intro TEXT settles onto the now-full-page letter (text fading
      // in is fine — it's content appearing on the paper, not the paper itself).
      tl.fromTo(
        letterRef.current,
        { opacity: 0, yPercent: 4 },
        { opacity: 1, yPercent: 0, duration: 0.04, ease: 'paperSettle' },
        0.96,
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
          /* Same cream/ivory as the story below, with a barely-there warm
             vignette so the centered envelope keeps a hint of depth. */
          background:
            'radial-gradient(ellipse at 50% 42%, #F7F1E5 0%, #F5EFE3 55%, #ECE3CF 100%)',
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
          {/* A simple, dignified rise: a straight line from the bottom-centre
              up to the centre (50,50). The drama is the 3D flip during the rise,
              not the path. Fully on-screen on any viewport. */}
          <path
            ref={pathRef}
            d="M 50 128 L 50 50"
            fill="none"
          />
        </svg>

        {/* LETTER CONTENT — the story intro that the scaled letter carries in */}
        <div
          ref={letterRef}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none opacity-0"
        >
          <div className="text-center max-w-2xl pointer-events-auto text-ink">
            <OrnamentalDivider variant={1} />
            <p className="font-display tracking-[0.5em] text-xs text-wine uppercase mt-8">
              Una pequeña historia
            </p>
            <p className="font-script text-6xl md:text-7xl text-ink mt-4">
              de los dos
            </p>
            <p className="mt-10 text-base text-ink-soft italic">
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
