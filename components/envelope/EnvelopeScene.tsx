'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MonogramSeal } from './MonogramSeal'
import { WeddingCarousel } from './WeddingCarousel'
import { StoryIntro } from './StoryIntro'
import { InvitationReveal } from './InvitationReveal'
import { NavBar } from '@/components/shared/NavBar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BackgroundIcons } from '@/components/shared/BackgroundIcons'
import { PhotoGallery } from '@/components/shared/PhotoGallery'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'

// ONE flat cream shared by the seal stage, the carousel wrapper and the story
// block — every section is the exact same solid color, so there is no gradient
// edge or boundary that can read as a seam anywhere from the top of the page
// down to the carousel. #F5EFE3 is the `ivory` token.
//
// (Earlier versions used a radial vignette on the seal stage; even faded to
// transparent, the glow's soft edge ring still read as a faint horizontal line
// against the flat cream. A single flat fill removes the seam entirely — the
// seal PNG carries its own shadow, so it still sits well on plain cream.)
const CREAM_BASE = '#F5EFE3'
const SEAL_BG = CREAM_BASE

/**
 * Opening scene: the wax-seal / monogram holds, then fades and lifts away as the
 * page scrolls, handing off into the full-screen "Nos casamos!" carousel below.
 *
 * NOTE: two things used to live here and were removed from the page (code
 * preserved): the flying-envelope flight (commented block at the bottom of this
 * file) and a story-intro text overlay that the seal handed off to. The seal now
 * simply fades on scroll; the carousel section is what follows.
 */
export function EnvelopeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const monogramRef = useRef<HTMLDivElement | null>(null)
  const carouselFadeRef = useRef<HTMLDivElement | null>(null)
  const [navVisible, setNavVisible] = useState(false)

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !stageRef.current ||
        !monogramRef.current ||
        !carouselFadeRef.current
      )
        return

      if (prefersReducedMotion()) {
        // No motion: hide the seal, show the carousel, reveal the nav.
        gsap.set(monogramRef.current, { display: 'none' })
        gsap.set(carouselFadeRef.current, { opacity: 1 })
        setNavVisible(true)
        return
      }

      const stage = stageRef.current
      const monogram = monogramRef.current as HTMLElement
      const carouselFade = carouselFadeRef.current as HTMLElement

      // Initial state — seal shown, carousel content hidden (it FADES in over the
      // stage's cream base, never slides).
      gsap.set(monogram, { opacity: 1, y: 0 })
      gsap.set(carouselFade, { opacity: 0 })

      // ONE short pin: seal fades out, carousel fades in — both in this single
      // pinned stage, so the carousel appears almost immediately (no second pin,
      // no scroll-travel between seal and carousel). A short pin (+=60%) gives
      // the cross-fade room without dragging it out.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (st) => setNavVisible(st.progress > 0.5),
        },
      })

      // 0.00–0.45 — seal fades out + lifts away immediately.
      tl.to(monogram, { opacity: 0, y: -40, duration: 0.45, ease: 'power2.out' }, 0)
      // 0.35–1.00 — carousel fades in over the cream (overlaps the seal's tail
      // so there's no empty beat between them).
      tl.fromTo(
        carouselFade,
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: 'power1.inOut' },
        0.35,
      )

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="relative">
      {/* PINNED OPENER STAGE — one full-viewport, pinned section that holds BOTH
          the wax seal and the carousel stacked on the same solid cream base. On
          scroll the seal fades out and the carousel fades in IN PLACE within this
          single pin — so the carousel appears almost immediately, with no second
          pin and no scroll-travel between the two. */}
      <section
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ background: CREAM_BASE }}
      >
        {/* SEAL — fades + lifts away on scroll */}
        <MonogramSeal ref={monogramRef} />

        {/* CAROUSEL — absolutely fills the stage, fades in over the cream base
            (the base never fades, so the photo composites over solid cream).
            Starts opacity-0 in the markup so it can't flash over the seal on the
            very first paint (before GSAP runs after hydration). GSAP fades it in
            on scroll; the reduced-motion branch reveals it via gsap.set. */}
        <div ref={carouselFadeRef} className="absolute inset-0 opacity-0">
          <WeddingCarousel />
        </div>
      </section>

      {/* STORY INTRO + INVITATION (scrolls below the opener) */}
      <div className="relative bg-ivory">
        <div className="paper-texture absolute inset-0 opacity-30 pointer-events-none" />
        {/* scattered party/wedding line icons — the global PaperBackground sits
            behind this opaque bg-ivory wrapper, so re-render the pattern here so
            the home content matches the other pages. */}
        <BackgroundIcons />

        <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-8">
          <StoryIntro />
        </div>

        {/* A few of us — breaks up the text before the invitation */}
        <div className="relative max-w-4xl mx-auto px-6 py-10">
          <PhotoGallery />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <InvitationReveal />
        </div>

        <SiteFooter />
      </div>

      {/* Shared nav, revealed once the seal animation nears its end */}
      <NavBar visible={navVisible} />
    </div>
  )
}

/* ===========================================================================
 * REMOVED: FLYING-ENVELOPE OPENER (code preserved for restoration)
 * ---------------------------------------------------------------------------
 * The block below is the ORIGINAL full opener: the seal handed off to a flying
 * envelope that rose along a motion path, did a 3D flip, opened its flap, and
 * had the letter emerge from inside it before scaling up to carry the intro.
 *
 * To restore it:
 *   1. Add back the imports:
 *        import { MotionPathPlugin } from '@/lib/gsap'
 *        import { FlyingEnvelope } from './FlyingEnvelope'
 *   2. Add back the ref:  const flyEnvRef = useRef<HTMLDivElement | null>(null)
 *   3. Add back the path ref: const pathRef = useRef<SVGPathElement | null>(null)
 *   4. Replace the trimmed useGSAP body with the ORIGINAL TIMELINE below and the
 *      stage `end` with '+=560%'.
 *   5. Re-add <FlyingEnvelope ref={flyEnvRef} /> and the motion-path <svg> inside
 *      the <section>, and the reduced-motion `gsap.set(flyEnvRef.current, …)`.
 *
 * --- ORIGINAL reduced-motion branch ---
 *   if (prefersReducedMotion()) {
 *     gsap.set(flyEnvRef.current, { display: 'none' })
 *     gsap.set(monogramRef.current, { display: 'none' })
 *     gsap.set(letterRef.current, { opacity: 1 })
 *     setNavVisible(true)
 *     return
 *   }
 *
 * --- ORIGINAL TIMELINE (full envelope flight) ---
 *   void MotionPathPlugin
 *   const stage = stageRef.current
 *   const flyEnv = flyEnvRef.current as HTMLElement
 *   const monogram = monogramRef.current as HTMLElement
 *   const path = pathRef.current as unknown as SVGPathElement
 *   const flap = flyEnv.querySelector('[data-envelope-flap]') as HTMLElement
 *   const sheen = flyEnv.querySelector('[data-envelope-flap-sheen]') as HTMLElement | null
 *   const inside = flyEnv.querySelector('[data-envelope-inside]') as HTMLElement
 *   const castShadow = flyEnv.querySelector('[data-envelope-cast-shadow]') as HTMLElement | null
 *   const innerLetter = flyEnv.querySelector('[data-envelope-letter]') as HTMLElement | null
 *   const clip = flyEnv.querySelector('[data-letter-clip]') as HTMLElement | null
 *   const letterDepth = flyEnv.querySelector('[data-letter-depth]') as HTMLElement | null
 *   const tumble = flyEnv.querySelector('[data-fly-tumble]') as HTMLElement | null
 *   const frontFace = flyEnv.querySelector('[data-env-front-plain]') as HTMLElement | null
 *   const backFace = flyEnv.querySelector('[data-env-clip]') as HTMLElement | null
 *
 *   gsap.set(monogram, { opacity: 1, y: 0 })
 *   gsap.set(letterRef.current, { opacity: 0 })
 *   gsap.set(flap, { rotateX: 0 })
 *   gsap.set(inside, { opacity: 0 })
 *   if (castShadow) gsap.set(castShadow, { opacity: 1 })
 *   gsap.set(flyEnv, { opacity: 0, scale: 0.72 })
 *   if (innerLetter) gsap.set(innerLetter, { opacity: 1, yPercent: 40, zIndex: 1 })
 *
 *   const tl = gsap.timeline({
 *     scrollTrigger: {
 *       trigger: stage,
 *       start: 'top top',
 *       end: '+=560%',
 *       pin: true,
 *       scrub: 0.6,
 *       anticipatePin: 1,
 *       onUpdate: (st) => setNavVisible(st.progress > 0.9),
 *     },
 *   })
 *
 *   // 0.00–0.12 — monogram holds, then fades + lifts away
 *   tl.to(monogram, { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' }, 0)
 *
 *   tl.to(flyEnv, { opacity: 1, duration: 0.05, ease: 'power1.out' }, 0.08)
 *   tl.to(
 *     flyEnv,
 *     {
 *       duration: 0.56,
 *       ease: 'power1.inOut',
 *       motionPath: {
 *         path,
 *         align: path,
 *         alignOrigin: [0.5, 0.5],
 *         autoRotate: false,
 *         start: 0,
 *         end: 1,
 *       },
 *     },
 *     0.1,
 *   )
 *   tl.to(flyEnv, { scale: 1, duration: 0.56, ease: 'power1.inOut' }, 0.1)
 *
 *   if (tumble) {
 *     gsap.set(tumble, { rotateY: 0, rotateZ: 4 })
 *     tl.to(tumble, { rotateY: 180, duration: 0.18, ease: 'power2.inOut' }, 0.46)
 *     tl.to(tumble, { rotateZ: 0, duration: 0.18, ease: 'power2.out' }, 0.46)
 *   }
 *
 *   if (frontFace) gsap.set(frontFace, { opacity: 1 })
 *   if (backFace) gsap.set(backFace, { opacity: 0 })
 *   if (frontFace) tl.set(frontFace, { opacity: 0 }, 0.55)
 *   if (backFace) tl.set(backFace, { opacity: 1 }, 0.55)
 *
 *   tl.to(flap, { rotateX: 180, duration: 0.12, ease: 'paperSettle' }, 0.68)
 *   if (sheen) {
 *     tl.to(sheen, { opacity: 1, duration: 0.04 }, 0.69)
 *     tl.to(sheen, { y: '60%', duration: 0.1, ease: 'power1.inOut' }, 0.69)
 *     tl.to(sheen, { opacity: 0, duration: 0.05 }, 0.78)
 *   }
 *   tl.to(inside, { opacity: 1, duration: 0.05 }, 0.74)
 *   if (castShadow) tl.to(castShadow, { opacity: 0, duration: 0.1 }, 0.69)
 *
 *   if (innerLetter) {
 *     tl.set(innerLetter, { zIndex: 50 }, 0.8)
 *     if (letterDepth) tl.set(letterDepth, { z: 80 }, 0.8)
 *     if (clip)
 *       tl.set(clip, { overflow: 'visible', clipPath: 'inset(-300% 0% 60% 0%)' }, 0.8)
 *
 *     tl.to(innerLetter, { yPercent: -88, duration: 0.1, ease: 'power2.out' }, 0.8)
 *
 *     if (clip) tl.set(clip, { clipPath: 'none' }, 0.9)
 *     tl.to(innerLetter, { yPercent: -12, duration: 0.05, ease: 'power2.inOut' }, 0.9)
 *     tl.to(innerLetter, { yPercent: -4, scale: 7, duration: 0.06, ease: 'paperSettle' }, 0.95)
 *   }
 *   tl.to(flyEnv, { opacity: 0, duration: 0.06, ease: 'power2.in' }, 0.97)
 *   tl.fromTo(
 *     letterRef.current,
 *     { opacity: 0, yPercent: 4 },
 *     { opacity: 1, yPercent: 0, duration: 0.04, ease: 'paperSettle' },
 *     0.96,
 *   )
 *
 *   return () => {
 *     ScrollTrigger.getAll().forEach((t) => t.kill())
 *   }
 *
 * --- ORIGINAL <section> CHILDREN (between MonogramSeal and the intro div) ---
 *   <FlyingEnvelope ref={flyEnvRef} />
 *
 *   <svg
 *     className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
 *     viewBox="0 0 100 100"
 *     preserveAspectRatio="none"
 *     aria-hidden="true"
 *   >
 *     <path ref={pathRef} d="M 50 108 L 50 50" fill="none" />
 *   </svg>
 * ======================================================================== */
