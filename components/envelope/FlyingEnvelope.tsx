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
      {/* 3:2 aspect box */}
      <div className="relative w-full" style={{ paddingTop: '66%' }}>
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

        {/* FRONT of the envelope (lower V) with calligraphy address + emblem */}
        <div
          data-envelope-front
          className="absolute inset-0"
          style={{
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

        {/* LETTER inside — slides out + scales to full page (scene-driven) */}
        <div
          data-envelope-letter
          className="absolute left-1/2 top-[14%] -translate-x-1/2 opacity-0"
          style={{
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
  )
})
