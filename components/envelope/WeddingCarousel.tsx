'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { carouselPhotos } from '@/content/carousel'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'

/**
 * Full-viewport "Nos casamos!" section that replaces the old story timeline.
 *
 *  - Mobile: a full-screen auto cross-fading photo carousel with the headline
 *    overlaid (a soft scrim keeps it legible over any photo).
 *  - Desktop: a 50 / 50 split — the carousel fills the left half, a solid
 *    Eucalipto (sage) panel on the right carries the headline.
 *
 * The carousel cross-fades one photo at a time on a ~4s loop. Under
 * prefers-reduced-motion it holds a single static photo (no auto-advance).
 */

const SLIDE_MS = 4000

function PhotoCarousel({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setAnimate(false)
      return
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % carouselPhotos.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [])

  // NOTE: the caller supplies position + size (the `fill` images need a sized
  // positioning context). Mobile passes `absolute inset-0`; desktop passes
  // `relative` + explicit width/height. We deliberately don't hardcode
  // `position` here so the caller's class isn't fighting a base `relative`.
  //
  // Base is cream (NOT a dark ink) so that while the whole section cross-fades
  // in over the cream page, this base doesn't tint the cream darker than the
  // seal stage above — which was reading as a seam at the carousel's start. The
  // object-cover photos fully cover this base once they're opaque.
  return (
    <div className={`overflow-hidden bg-ivory ${className}`}>
      {carouselPhotos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          // Left half on desktop, full width on mobile.
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={i === 0}
          className={`object-cover ${
            animate ? 'transition-opacity duration-1000 ease-in-out' : ''
          } ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}

function Headline({ className = '' }: { className?: string }) {
  return (
    <h2
      className={`font-display leading-none text-6xl sm:text-7xl md:text-8xl ${className}`}
    >
      Nos casamos!
    </h2>
  )
}

export function WeddingCarousel() {
  return (
    <section
      aria-label="Nos casamos"
      className="relative w-full h-[100svh] md:flex"
    >
      {/* ---------- MOBILE: full-screen carousel + overlaid headline ---------- */}
      <div className="md:hidden relative w-full h-full">
        <PhotoCarousel className="absolute inset-0" />
        {/* Legibility scrim — a soft radial pool centred on the headline only,
            kept light so it barely tints the cream while the section cross-fades
            in (a full-height dark gradient here read as a vignette/seam). The
            headline's own drop-shadow carries the rest of the contrast. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(31,26,20,0.35)_0%,rgba(31,26,20,0)_70%)] pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Headline className="text-ivory text-center drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]" />
        </div>
      </div>

      {/* ---------- DESKTOP: left carousel | right Eucalipto panel ---------- */}
      <PhotoCarousel className="relative hidden md:block md:w-1/2 md:h-full" />
      <div className="hidden md:flex md:w-1/2 md:h-full bg-sage items-center justify-center px-10">
        <Headline className="text-ivory text-center" />
      </div>
    </section>
  )
}
