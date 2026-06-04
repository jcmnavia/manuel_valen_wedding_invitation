'use client'

import { forwardRef, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

/**
 * Full-bleed paper envelope with 3D-realistic mechanics.
 *
 * Layer stack (bottom → top):
 *   1. ENVELOPE BACK — fills the viewport. Cream paper with grain + fibers.
 *   2. LETTER INSIDE — a sheet of writing paper that sits "in" the envelope.
 *      Animated by EnvelopeScene to slide up out of the envelope as the
 *      flap opens.
 *   3. ENVELOPE FRONT — lower 62% of viewport, with grain, address text,
 *      postmark, and return-address corners.
 *   4. CAST SHADOW from the closed flap onto the front body — a soft
 *      gradient strip across the flap-meets-body seam. Animated to fade
 *      out as the flap rotates.
 *   5. INNER LINER — the inside of the flap, with a diamond pattern.
 *      Becomes visible only when the flap has rotated past 90°.
 *   6. TOP FLAP — clipped triangle on the upper 62%, rotates on top edge.
 *      Has a paper-thickness highlight at the bottom edge (the fold).
 *   7. WAX SEAL — inside the flap so it rides up with it.
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
      style={{ perspective: '2800px', perspectiveOrigin: '50% 35%' }}
    >
      {/* ============================================================
          1. ENVELOPE BACK — fills the entire viewport
          ============================================================ */}
      <div
        data-envelope-back
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #ECDDB8 0%, #DECB9F 50%, #C8B07E 100%)',
        }}
      >
        {/* Heavier grain on the back paper */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-55 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="back-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.92"
              numOctaves="3"
              seed="17"
            />
            <feColorMatrix
              values="0 0 0 0 0.20
                      0 0 0 0 0.16
                      0 0 0 0 0.10
                      0 0 0 0.22 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#back-grain)" />
        </svg>

        {/* Paper fibers — horizontal streaks */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="fibers">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.4"
              numOctaves="1"
              seed="7"
            />
            <feColorMatrix
              values="0 0 0 0 0.22
                      0 0 0 0 0.16
                      0 0 0 0 0.08
                      0 0 0 0.4 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#fibers)" />
        </svg>

        {/* Directional vignette — light from upper-left */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 28% 22%, rgba(255,250,230,0.12) 0%, rgba(255,250,230,0) 50%), radial-gradient(ellipse at 70% 75%, rgba(31,20,10,0.18) 0%, rgba(31,20,10,0) 60%)',
          }}
        />
      </div>

      {/* ============================================================
          2. LETTER INSIDE — sits in the envelope, peeks/slides out
          ============================================================ */}
      <div
        data-envelope-letter
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '24%',
          width: 'min(74vw, 700px)',
          height: '50vh',
          background:
            'linear-gradient(170deg, #FBF6E8 0%, #F2E8D0 60%, #E6D8B8 100%)',
          boxShadow:
            '0 -4px 18px -8px rgba(31,20,10,0.35), 0 -2px 6px -1px rgba(31,20,10,0.25), inset 0 1px 0 rgba(255,253,245,0.6), inset 0 -1px 0 rgba(31,20,10,0.06)',
          borderTop: '1px solid rgba(255,253,245,0.6)',
          opacity: 0,
          transform: 'translate3d(-50%, 40%, 0)',
        }}
      >
        {/* Subtle ruled lines on the writing paper */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-12 w-full h-full pointer-events-none opacity-25"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1="6%"
              y1={i * 32 + 8}
              x2="94%"
              y2={i * 32 + 8}
              stroke="#B89E70"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          ))}
        </svg>

        {/* Decorative monogram header on the letter */}
        <div className="absolute inset-x-0 top-6 text-center">
          <p
            className="font-script text-3xl text-ink-soft opacity-60"
            style={{ letterSpacing: '0.05em' }}
          >
            M &amp; V
          </p>
        </div>

        {/* Paper grain on the letter */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-35 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
        >
          <filter id="letter-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              seed="33"
            />
            <feColorMatrix
              values="0 0 0 0 0.22
                      0 0 0 0 0.18
                      0 0 0 0 0.12
                      0 0 0 0.20 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#letter-grain)" />
        </svg>
      </div>

      {/* ============================================================
          3. ENVELOPE FRONT — lower 62%
          ============================================================ */}
      <div
        data-envelope-front
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(170deg, #F3E7C8 0%, #E5D5AE 38%, #D9C798 72%, #C7B47C 100%)',
          clipPath: 'polygon(0 38%, 100% 38%, 100% 100%, 0 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,250,232,0.6), inset 0 -2px 0 rgba(31,20,10,0.10)',
        }}
      >
        {/* Heavier paper grain */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-55 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="env-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.92"
              numOctaves="3"
              seed="9"
            />
            <feColorMatrix
              values="0 0 0 0 0.20
                      0 0 0 0 0.16
                      0 0 0 0 0.10
                      0 0 0 0.22 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#env-grain)" />
        </svg>

        {/* Paper fibers — same as back */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-multiply"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <filter id="env-fibers">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.4"
              numOctaves="1"
              seed="13"
            />
            <feColorMatrix
              values="0 0 0 0 0.22
                      0 0 0 0 0.16
                      0 0 0 0 0.08
                      0 0 0 0.45 0"
            />
          </filter>
          <rect width="400" height="400" filter="url(#env-fibers)" />
        </svg>

        {/* Directional lighting on the front */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 30% 28%, rgba(255,250,230,0.16) 0%, rgba(255,250,230,0) 60%), radial-gradient(ellipse 70% 50% at 75% 85%, rgba(31,20,10,0.18) 0%, rgba(31,20,10,0) 60%)',
          }}
        />

        {/* Top edge of the front body — paper thickness highlight */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 h-px"
          style={{
            top: '0',
            background:
              'linear-gradient(90deg, rgba(255,250,232,0) 0%, rgba(255,250,232,0.85) 50%, rgba(255,250,232,0) 100%)',
          }}
        />

        {/* Diagonal seam creases from the side flap folds */}
        <svg
          viewBox="0 0 100 62"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M 0 0 L 50 38 L 100 0"
            fill="none"
            stroke="rgba(31,20,10,0.20)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 62 L 50 38 L 100 62"
            fill="none"
            stroke="rgba(31,20,10,0.16)"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Recipient block */}
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
            16 · VIII · 2026
          </p>
        </div>

        {/* Postmark */}
        <div
          aria-hidden="true"
          className="absolute right-6 md:right-12 top-[18%] opacity-70"
        >
          <svg
            viewBox="0 0 120 120"
            width="80"
            height="80"
            className="md:w-[110px] md:h-[110px]"
          >
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
                ENVIGADO · CO
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
                16·08
              </text>
            </g>
          </svg>
        </div>

        {/* Return address */}
        <div className="absolute left-6 md:left-12 top-[14%] text-ink-soft/55 pointer-events-none">
          <p className="font-display tracking-[0.3em] text-[9px] md:text-[10px] uppercase">
            Remitente
          </p>
          <p className="font-script text-xl md:text-2xl mt-1">M &amp; V</p>
          <p className="text-[10px] md:text-xs italic mt-1">Envigado · 2026</p>
        </div>
      </div>

      {/* ============================================================
          4. CAST SHADOW from the closed flap onto the front body.
          Soft, diffuse, follows the triangular flap silhouette so the
          shadow falls along the V of the fold rather than a horizontal
          band. Animated to recede as the flap opens.
          ============================================================ */}
      <div
        data-envelope-cast-shadow
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: '38%',
          height: '10%',
          background:
            'linear-gradient(180deg, rgba(31,20,10,0.18) 0%, rgba(31,20,10,0.06) 60%, rgba(31,20,10,0) 100%)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
        }}
      />

      {/* ============================================================
          5. INNER LINER (back of flap surface, visible after rotation)
          ============================================================ */}
      <div
        data-envelope-inside
        className="absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, #F4ECCC 0%, #E2D2A8 55%, #C9B58A 100%)',
          /* Constrain to upper area visually */
          clipPath: 'polygon(0 0, 100% 0, 100% 62%, 0 62%)',
        }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-[0.10]"
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

      {/* ============================================================
          6. TOP FLAP — clipped triangle, rotates on top edge
          ============================================================ */}
      <div
        data-envelope-flap-wrap
        className="absolute inset-x-0 top-0 h-[62%]"
        style={{
          perspective: '2800px',
          perspectiveOrigin: '50% 0%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          data-envelope-flap
          className="absolute inset-0 origin-top"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* OUTSIDE of the flap — slightly lighter than the front body so the
              flap reads as the SAME paper folded over, not a darker piece */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(178deg, #F2E5C2 0%, #E5D4A8 55%, #D5C088 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              boxShadow:
                'inset 0 2px 0 rgba(255,250,232,0.65), inset 0 -1px 0 rgba(31,20,10,0.08)',
            }}
          >
            {/* Grain on flap outside */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-multiply"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 400 400"
            >
              <filter id="flap-grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.92"
                  numOctaves="3"
                  seed="13"
                />
                <feColorMatrix
                  values="0 0 0 0 0.20
                          0 0 0 0 0.16
                          0 0 0 0 0.10
                          0 0 0 0.20 0"
                />
              </filter>
              <rect width="400" height="400" filter="url(#flap-grain)" />
            </svg>

            {/* Paper fibers on flap */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-multiply"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 400 400"
            >
              <filter id="flap-fibers">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.012 0.4"
                  numOctaves="1"
                  seed="21"
                />
                <feColorMatrix
                  values="0 0 0 0 0.22
                          0 0 0 0 0.16
                          0 0 0 0 0.08
                          0 0 0 0.4 0"
                />
              </filter>
              <rect width="400" height="400" filter="url(#flap-fibers)" />
            </svg>

            {/* Directional lighting on flap — same upper-left source */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 28% 22%, rgba(255,250,232,0.18) 0%, rgba(255,250,232,0) 60%), radial-gradient(ellipse 70% 60% at 70% 95%, rgba(31,20,10,0.30) 0%, rgba(31,20,10,0) 60%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Paper-thickness highlight along the fold edge (bottom V of triangle) */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M 0 0 L 50 100 L 100 0"
                fill="none"
                stroke="rgba(255,250,232,0.4)"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
              {/* darker stress line just inside the fold */}
              <path
                d="M 1.5 0 L 50 97 L 98.5 0"
                fill="none"
                stroke="rgba(31,20,10,0.18)"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* INSIDE of the flap (visible after rotation past 90°) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #F4ECCC 0%, #E2D2A8 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              boxShadow:
                'inset 0 2px 0 rgba(255,250,232,0.65), inset 0 -2px 8px rgba(31,20,10,0.10)',
            }}
          />
        </div>
      </div>

      {/* Slot for any inner content */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  )
})
