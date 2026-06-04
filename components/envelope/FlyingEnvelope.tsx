'use client'

import { forwardRef } from 'react'

/**
 * Contained Harry-Potter-inspired envelope (aged parchment + wax seal +
 * calligraphy address), sized as a centered object — NOT full-bleed. Reuses the
 * rebuilt two-faced flap mechanics. The scene positions/scales/flies it and
 * runs the open timeline against the data- hooks below.
 *
 * Aspect is locked 3:2 via the padding-top trick on the inner box so it scales
 * cleanly at any width the scene gives the root.
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
      {/* TUMBLER — the scene rotates this in 3D (rotateX/Y/Z) during the flight
          so the envelope tumbles realistically at the turns. preserve-3d keeps
          its children (the front box + the rear face) as real planes in space. */}
      <div
        data-fly-tumble
        className="relative w-full"
        style={{ paddingTop: '66%', transformStyle: 'preserve-3d' }}
      >
        {/* REAR FACE — the back of the envelope (seen when it flips past 90°).
            Parchment with the closed-flap V-seam. rotateY(180) places it on the
            far side; backface-visibility:hidden so front and back never bleed. */}
        <div
          data-envelope-rear
          aria-hidden="true"
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(150deg, #ECDCB6 0%, #DDC99B 55%, #C9B17E 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            boxShadow:
              '0 30px 60px -24px rgba(31,20,10,0.55), inset 0 1px 0 rgba(255,250,232,0.45)',
          }}
        >
          {/* flap seam: two diagonals from the top corners meeting low-centre,
              plus the bottom-fold lines — the classic envelope back. */}
          <svg
            viewBox="0 0 100 66"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M 0 0 L 50 40 L 100 0 M 0 66 L 50 40 L 100 66"
              fill="none"
              stroke="rgba(31,20,10,0.16)"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 0 0 L 50 38 L 100 0"
              fill="rgba(31,20,10,0.05)"
              stroke="none"
            />
          </svg>
        </div>

        {/* FRONT BOX — everything that faces the viewer when closed. Sits on the
            near side; backface-visibility:hidden so when the envelope flips the
            seal/address vanish and the rear face shows instead. data-env-clip
            lets the scene toggle overflow for the letter emerge/scale phase. */}
        <div
          data-env-clip
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
        {/* BACK / body of the envelope (parchment) */}
        <div
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(155deg, #F1E4C4 0%, #E6D3A8 55%, #D2BB86 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            boxShadow:
              '0 30px 60px -24px rgba(31,20,10,0.55), inset 0 1px 0 rgba(255,250,232,0.5)',
          }}
        />

        {/* INNER LINER (revealed once the flap opens) */}
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

        {/* FRONT of the envelope (lower V) with calligraphy address + emblem.
            z-index 2 so it covers the letter while the letter is parked low. */}
        <div
          data-envelope-front
          className="absolute inset-0"
          style={{
            zIndex: 2,
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(165deg, #EFE0BD 0%, #E0CD9F 60%, #CDB682 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            clipPath: 'polygon(0 40%, 100% 40%, 100% 100%, 0 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,250,232,0.4)',
          }}
        >
          <div className="absolute inset-x-0 bottom-[14%] text-center px-6">
            <p className="font-script text-2xl md:text-3xl text-ink/80 leading-none">
              Para Nuestros Invitados
            </p>
            <div className="mx-auto mt-2 h-px w-20 bg-wine/40" />
          </div>
        </div>

        {/* CAST SHADOW from the closed flap onto the front */}
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

        {/* TOP FLAP — clipped triangle, hinged on the top edge */}
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
            {/* OUTSIDE face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('/textures/paper-grain.svg'), linear-gradient(178deg, #F1E2BE 0%, #E3D2A6 55%, #D2BC84 100%)",
                backgroundSize: '300px 300px, cover',
                backgroundBlendMode: 'multiply, normal',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow:
                  'inset 0 2px 0 rgba(255,250,232,0.6), inset 0 -1px 0 rgba(31,20,10,0.08)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 55% at 28% 22%, rgba(255,250,232,0.18) 0%, rgba(255,250,232,0) 60%), radial-gradient(ellipse 70% 60% at 70% 95%, rgba(31,20,10,0.30) 0%, rgba(31,20,10,0) 60%)',
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

            {/* INSIDE face (visible after rotation past 90°) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #F4ECCC 0%, #E2D2A8 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow:
                  'inset 0 2px 0 rgba(255,250,232,0.65), inset 0 -2px 8px rgba(31,20,10,0.10)',
              }}
            />

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

        {/* LETTER inside — slides out + scales to full page (scene-driven).
            Starts opaque; the scene parks it low (behind the front) so it
            EMERGES by moving up, never by fading. */}
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
