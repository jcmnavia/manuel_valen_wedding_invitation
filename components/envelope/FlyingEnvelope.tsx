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
          className="absolute inset-0 overflow-hidden rounded-[3px]"
          style={{
            transform: 'rotateY(180deg)',
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

            {/* OPEN-V RECESS — the lifted flap rotates up out of view, so paint
                its footprint here: a downward triangle (apex low-centre, like
                the closed flap) that's softly shaded with a defined edge, so the
                open envelope clearly reads the V opening even though the
                physical flap has clipped away above. */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="fly-vshade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(31,20,10,0.16)" />
                  <stop offset="100%" stopColor="rgba(31,20,10,0)" />
                </linearGradient>
              </defs>
              {/* the triangular flap footprint (top edge full width, apex ~60%) */}
              <path d="M 0 0 L 50 60 L 100 0 Z" fill="url(#fly-vshade)" />
              {/* the two V edges, drawn crisply */}
              <path
                d="M 0 0 L 50 60 L 100 0"
                fill="none"
                stroke="rgba(31,20,10,0.28)"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* lower body of the back (below the flap V) */}
          <div
            className="absolute inset-0"
            style={{
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

          {/* THE V FLAP — downward triangle covering the top ~60%, hinged on the
              top edge; lifts open. (The "V shape" that opens.) */}
          <div
            data-envelope-flap-wrap
            className="absolute inset-x-0 top-0"
            style={{ height: '60%', transformStyle: 'preserve-3d' }}
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
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  // strong fold shadow along the top (the hinge once flipped),
                  // plus a soft shade toward the point for depth.
                  boxShadow:
                    'inset 0 3px 8px rgba(31,20,10,0.28), inset 0 -1px 0 rgba(255,250,232,0.4)',
                }}
              >
                {/* the two diagonal edges of the V, drawn so the triangle reads */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  <path
                    d="M 0 0 L 50 100 L 100 0"
                    fill="none"
                    stroke="rgba(31,20,10,0.22)"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* WAX SEAL — child of the flap, lifts with it (placeholder) */}
              <div
                data-fly-seal
                className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: '-14%', width: '26%' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-auto" aria-hidden="true">
                  <defs>
                    <radialGradient id="fly-wax" cx="42%" cy="36%" r="70%">
                      <stop offset="0%" stopColor="#C58874" />
                      <stop offset="55%" stopColor="#9B5240" />
                      <stop offset="100%" stopColor="#5E2730" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="44" fill="url(#fly-wax)" />
                  <text
                    x="50"
                    y="62"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontSize="30"
                    fill="#7A3324"
                  >
                    M&amp;V
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* LETTER inside — emerges by moving, then scales to full page. Parked
              low behind the flap; z-index keeps it under the flap until it rises. */}
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
  )
})
