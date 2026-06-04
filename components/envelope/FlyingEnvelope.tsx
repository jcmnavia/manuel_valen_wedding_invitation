'use client'

import { forwardRef } from 'react'

/**
 * Contained envelope with two real 3D faces, flown + flipped by the scene:
 *
 *   NEAR face (`data-env-front-plain`) — the PLAIN FRONT: parchment + the
 *   "Para Nuestros Invitados" address. This is what shows while the envelope
 *   flies up from the bottom (tilted slightly).
 *
 *   FAR face (`data-env-clip`, rotateY 180) — the V-BACK: the triangular flap
 *   that opens, its inner liner, the wax seal, and the letter inside. After the
 *   flight's rotateY(180) flip, this face is toward the viewer, and the flap
 *   opens here and the letter emerges.
 *
 * Both faces use backface-visibility:hidden so they never bleed through each
 * other. The aspect is locked 3:2 via the padding-top trick.
 */
export const FlyingEnvelope = forwardRef<HTMLDivElement>(function FlyingEnvelope(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      data-fly-envelope
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: 'min(80vw, 460px)',
        perspective: '1600px',
        perspectiveOrigin: '50% 0%',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity',
      }}
    >
      {/* TUMBLER — the scene rotates this in 3D. preserve-3d keeps the two faces
          as real planes so the flip shows front then back. */}
      <div
        data-fly-tumble
        className="relative w-full"
        style={{ paddingTop: '66%', transformStyle: 'preserve-3d' }}
      >
        {/* ── NEAR FACE: the PLAIN FRONT (address) ───────────────────────── */}
        <div
          data-env-front-plain
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(155deg, #F1E4C4 0%, #E6D3A8 55%, #D2BB86 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            boxShadow:
              '0 30px 60px -24px rgba(31,20,10,0.55), inset 0 1px 0 rgba(255,250,232,0.5)',
          }}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center px-6">
            <p className="font-script text-2xl md:text-3xl text-ink/80 leading-none">
              Para Nuestros Invitados
            </p>
            <div className="mx-auto mt-2 h-px w-20 bg-wine/40" />
          </div>
        </div>

        {/* ── FAR FACE: the V-BACK with the openable flap ────────────────── */}
        {/* rotateY(180) places it on the far side; after the flight flip it
            faces the viewer. data-env-clip toggles overflow for the letter. */}
        <div
          data-env-clip
          className="absolute inset-0 rounded-[3px]"
          style={{
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* body parchment of the back */}
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden"
            style={{
              backgroundImage:
                "url('/textures/paper-grain.svg'), linear-gradient(150deg, #ECDCB6 0%, #DDC99B 55%, #C9B17E 100%)",
              backgroundSize: '300px 300px, cover',
              backgroundBlendMode: 'multiply, normal',
              boxShadow:
                '0 30px 60px -24px rgba(31,20,10,0.55), inset 0 1px 0 rgba(255,250,232,0.45)',
            }}
          />

          {/* INNER LINER — revealed once the flap opens */}
          <div
            data-envelope-inside
            className="absolute inset-0 opacity-0 overflow-hidden rounded-[3px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 35%, #F6EFD4 0%, #E4D5AC 55%, #CDB98C 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 60%)',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.10]"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 400 400"
            >
              <defs>
                <pattern id="fly-liner" width="46" height="46" patternUnits="userSpaceOnUse">
                  <path d="M 23 0 L 46 23 L 23 46 L 0 23 Z" fill="none" stroke="#5C4A2C" strokeWidth="0.6" />
                  <circle cx="23" cy="23" r="1" fill="#5C4A2C" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#fly-liner)" />
            </svg>
          </div>

          {/* lower body of the back (below the flap V). z-index 3 so it sits in
              FRONT of the resting letter (z1) and hides its lower half while
              closed — the letter is only revealed when it rises out. */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              backgroundImage:
                "url('/textures/paper-grain.svg'), linear-gradient(165deg, #E7D4AC 0%, #D8C394 60%, #C6AD78 100%)",
              backgroundSize: '300px 300px, cover',
              backgroundBlendMode: 'multiply, normal',
              clipPath: 'polygon(0 40%, 100% 40%, 100% 100%, 0 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,250,232,0.35)',
            }}
          />

          {/* the two bottom-fold diagonals of the envelope back */}
          <svg
            viewBox="0 0 100 66"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <path
              d="M 0 66 L 50 44 L 100 66"
              fill="none"
              stroke="rgba(31,20,10,0.14)"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* CAST SHADOW from the closed flap onto the body */}
          <div
            data-envelope-cast-shadow
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: '40%',
              height: '12%',
              background:
                'linear-gradient(180deg, rgba(31,20,10,0.20) 0%, rgba(31,20,10,0.06) 60%, rgba(31,20,10,0) 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* THE FLAP — a downward "V" triangle when closed; it flips up on
              rotateX to stand above the envelope as an inverted "A". A
              drop-shadow gives it depth / shade behind it once open. */}
          <div
            data-envelope-flap-wrap
            className="absolute inset-x-0 top-0"
            style={{ height: '60%', transformStyle: 'preserve-3d', zIndex: 3 }}
          >
            <div
              data-envelope-flap
              className="absolute inset-0 origin-top"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* OUTSIDE face of the flap */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('/textures/paper-grain.svg'), linear-gradient(178deg, #EEDFB8 0%, #E0CFA1 55%, #CFB880 100%)",
                  backgroundSize: '300px 300px, cover',
                  backgroundBlendMode: 'multiply, normal',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow:
                    'inset 0 2px 0 rgba(255,250,232,0.55), inset 0 -1px 0 rgba(31,20,10,0.1)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 55% at 28% 22%, rgba(255,250,232,0.16) 0%, rgba(255,250,232,0) 60%), radial-gradient(ellipse 70% 60% at 70% 95%, rgba(31,20,10,0.30) 0%, rgba(31,20,10,0) 60%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />
                <div
                  data-envelope-flap-sheen
                  className="absolute inset-0 opacity-0"
                  style={{
                    background:
                      'linear-gradient(178deg, rgba(255,252,240,0) 0%, rgba(255,252,240,0.55) 48%, rgba(255,252,240,0) 64%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transform: 'translateY(-40%)',
                    willChange: 'transform, opacity',
                    mixBlendMode: 'screen',
                  }}
                />
              </div>

              {/* INSIDE face (visible after rotation past 90° — this is the
                  flat-open V). Deliberately DARKER/warmer than the inner liner
                  so the open flap stays visible (doesn't blend in) when folded
                  flat, with a fold shadow at the hinge + a defined V edge. */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('/textures/paper-grain.svg'), linear-gradient(180deg, #D9C496 0%, #C7B07E 100%)",
                  backgroundSize: '300px 300px, cover',
                  backgroundBlendMode: 'multiply, normal',
                  // UPWARD triangle (apex at top) so the open flap reads as an
                  // inverted "A" standing above the envelope, not a downward V.
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow:
                    'inset 0 -3px 8px rgba(31,20,10,0.22), inset 0 1px 0 rgba(255,250,232,0.4)',
                }}
              >
                {/* the two edges of the A */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  <path
                    d="M 0 100 L 50 0 L 100 100"
                    fill="none"
                    stroke="rgba(31,20,10,0.22)"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* LETTER DEPTH — a preserve-3d wrapper the scene pushes FORWARD in Z
              (translateZ) as the letter emerges, so the flat letter renders in
              FRONT of the rotated open "A" flap in real 3D space (z-index alone
              can't beat the 3D depth of the rotated flap). At rest translateZ is
              0, so the letter sits at the back-face plane (hidden by the flap). */}
          <div
            data-letter-depth
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* LETTER CLIP — a flat clip box that contains the letter to the
                envelope bounds. The scene opens/releases this clip during the
                emerge so only the part out of the mouth shows. */}
            <div
              data-letter-clip
              className="absolute inset-0 overflow-hidden rounded-[3px]"
            >
              {/* LETTER inside — emerges by moving, then scales to full page. */}
              <div
                data-envelope-letter
                className="absolute left-1/2 top-[14%] -translate-x-1/2"
                style={{
                  zIndex: 1,
                  width: '86%',
                  height: '78%',
                  background:
                    'linear-gradient(170deg, #FBF6E8 0%, #F4ECD6 60%, #ECDFC0 100%)',
                  boxShadow:
                    '0 -4px 18px -8px rgba(31,20,10,0.35), inset 0 1px 0 rgba(255,253,245,0.6)',
                  borderTop: '1px solid rgba(255,253,245,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
