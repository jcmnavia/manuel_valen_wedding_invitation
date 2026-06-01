'use client'

import { forwardRef, ReactNode } from 'react'
import { WaxSeal } from './WaxSeal'

type Props = {
  children?: ReactNode
}

/**
 * Full-bleed envelope: the entire viewport IS the envelope.
 *
 * Layer order (bottom → top):
 *   1. Page background paper (cream + grain) — always visible at edges
 *   2. Inner liner: revealed once the flap rotates open
 *   3. Envelope front: bottom half body with shadow at flap seam
 *   4. Decorative seams + postmark + return-address text
 *   5. Top flap: a true triangle that rotates 180° on the top edge
 *   6. Wax seal sitting on the flap-meets-front line
 */
export const Envelope = forwardRef<HTMLDivElement, Props>(function Envelope(
  { children },
  ref,
) {
  return (
    <div
      ref={ref}
      data-envelope
      className="absolute inset-0"
      style={{ perspective: '2400px', perspectiveOrigin: '50% 30%' }}
    >
      {/* ENVELOPE BACK — fills the entire viewport so the envelope IS the page.
          This is the back of the envelope (the side opposite the flap). */}
      <div
        data-envelope-back
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #E8D9B8 0%, #DDC9A0 45%, #CCB682 100%)',
        }}
      >
        {/* Grain on the back paper */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="back-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="17"
            />
            <feColorMatrix
              values="0 0 0 0 0.22
                      0 0 0 0 0.18
                      0 0 0 0 0.12
                      0 0 0 0.18 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#back-grain)" />
        </svg>
        {/* Soft vignette on the back paper */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 35%, rgba(31,26,20,0.22) 100%)',
          }}
        />
      </div>

      {/* INNER LINER — visible only after the flap opens */}
      <div
        data-envelope-inside
        className="absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, #F7F1E4 0%, #E8DCBE 55%, #C9B58A 100%)',
        }}
      >
        {/* Liner diamond pattern, very low opacity */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <defs>
            <pattern
              id="liner"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 48 24 L 24 48 L 0 24 Z"
                fill="none"
                stroke="#5C4A2C"
                strokeWidth="0.6"
              />
              <circle cx="24" cy="24" r="1" fill="#5C4A2C" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#liner)" />
        </svg>
      </div>

      {/* ENVELOPE FRONT — bottom 62% of viewport (the part with the address) */}
      <div
        data-envelope-front
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(168deg, #EFE2C2 0%, #E5D5AE 38%, #DAC79A 72%, #CBB682 100%)',
          clipPath: 'polygon(0 38%, 100% 38%, 100% 100%, 0 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,250,235,0.5), inset 0 -2px 0 rgba(31,26,20,0.06)',
        }}
      >
        {/* Paper texture overlay baked into the envelope front */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="env-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95"
              numOctaves="2"
              seed="9"
            />
            <feColorMatrix
              values="0 0 0 0 0.20
                      0 0 0 0 0.16
                      0 0 0 0 0.10
                      0 0 0 0.18 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#env-grain)" />
        </svg>

        {/* Diagonal seam shadow where the flap rests (when closed) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-12"
          style={{
            background:
              'linear-gradient(180deg, rgba(31,26,20,0.18) 0%, rgba(31,26,20,0) 100%)',
          }}
        />

        {/* Side seam lines from corners meeting at the flap-fold */}
        <svg
          viewBox="0 0 100 62"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Front body diagonal creases */}
          <path
            d="M 0 0 L 50 38 L 100 0"
            fill="none"
            stroke="rgba(31,26,20,0.16)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 62 L 50 38 L 100 62"
            fill="none"
            stroke="rgba(31,26,20,0.14)"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* "Address" — calligraphic recipient line, lower-center */}
        <div
          data-envelope-address
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none select-none"
          style={{ bottom: 'clamp(80px, 14vh, 160px)' }}
        >
          <p className="font-display tracking-[0.5em] text-[10px] md:text-xs text-ink-soft uppercase">
            Para
          </p>
          <p className="font-script text-5xl md:text-7xl text-ink mt-2 leading-none">
            Nuestros Invitados
          </p>
          <div className="mt-4 mx-auto w-24 h-px bg-gold/50" />
          <p className="font-display tracking-[0.4em] text-[10px] md:text-xs text-ink-soft uppercase mt-4">
            14 · XI · 2026
          </p>
        </div>

        {/* Postmark in upper-right corner */}
        <div
          aria-hidden="true"
          className="absolute right-6 md:right-12 top-[18%] opacity-70"
        >
          <svg viewBox="0 0 120 120" width="80" height="80" className="md:w-[110px] md:h-[110px]">
            <g fill="none" stroke="#7A2421" strokeWidth="1.2" opacity="0.6">
              <circle cx="60" cy="60" r="54" strokeDasharray="2 3" />
              <circle cx="60" cy="60" r="46" />
              <text
                x="60"
                y="36"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="9"
                fill="#7A2421"
                stroke="none"
                letterSpacing="2"
              >
                LIMA · PERÚ
              </text>
              <text
                x="60"
                y="92"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="9"
                fill="#7A2421"
                stroke="none"
                letterSpacing="2"
              >
                M &amp; V · MMXXVI
              </text>
              <path d="M 26 60 L 94 60" />
              <text
                x="60"
                y="64"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="11"
                fill="#7A2421"
                stroke="none"
                letterSpacing="3"
              >
                14·11
              </text>
            </g>
          </svg>
        </div>

        {/* Return-address ghost in upper-left corner */}
        <div className="absolute left-6 md:left-12 top-[14%] text-ink-soft/55 pointer-events-none">
          <p className="font-display tracking-[0.3em] text-[9px] md:text-[10px] uppercase">
            Remitente
          </p>
          <p className="font-script text-xl md:text-2xl mt-1">
            M &amp; V
          </p>
          <p className="text-[10px] md:text-xs italic mt-1">Lima · 2026</p>
        </div>
      </div>

      {/* TOP FLAP — fills the upper 62% of the viewport, hinged on top edge */}
      <div
        data-envelope-flap-wrap
        className="absolute inset-x-0 top-0 h-[62%]"
        style={{ perspective: '2400px', perspectiveOrigin: '50% 0%' }}
      >
        <div
          data-envelope-flap
          className="absolute inset-0 origin-top"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* OUTSIDE of the flap */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #EBDDB8 0%, #DECB9C 60%, #CCB67E 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              boxShadow: 'inset 0 2px 0 rgba(255,250,235,0.55)',
            }}
          >
            {/* Grain on flap outside */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-multiply"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 400 400"
            >
              <filter id="flap-grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.95"
                  numOctaves="2"
                  seed="13"
                />
                <feColorMatrix
                  values="0 0 0 0 0.20
                          0 0 0 0 0.16
                          0 0 0 0 0.10
                          0 0 0 0.16 0"
                />
              </filter>
              <rect width="400" height="400" filter="url(#flap-grain)" />
            </svg>
            {/* Slight gradient that darkens toward the fold */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(31,26,20,0.16) 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />
          </div>

          {/* INSIDE of the flap (visible once rotated past 90°). */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #F4E9CC 0%, #E2D2A8 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset 0 2px 0 rgba(255,250,235,0.6)',
            }}
          />

          {/*
           * WAX SEAL — placed INSIDE the flap so it inherits the flap's
           * rotateX during the opening cinematic. The seal lifts up with
           * the flap as if glued to it (which is exactly how a sealed
           * envelope works in real life: lifting the flap brings the
           * wax with it).
           *
           * Positioned at the bottom tip of the flap triangle.
           */}
          <div
            data-envelope-seal
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              /* Bottom tip of the flap triangle is at 100% of the flap's
                 height; the seal is half-on-flap, half-overhanging downward. */
              bottom: 'calc(-1 * clamp(90px, 13vw, 140px))',
              width: 'clamp(180px, 26vw, 280px)',
              height: 'clamp(180px, 26vw, 280px)',
              /* Lift toward viewer in 3D so the seal sits ON the flap, not in it */
              transform: 'translateZ(2px)',
            }}
          >
            <WaxSeal size={280} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Slot for any inner content */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  )
})
