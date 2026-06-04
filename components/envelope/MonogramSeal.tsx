'use client'

import { forwardRef } from 'react'
import { wedding } from '@/content/wedding'

/**
 * Opening composition: the couple's monogram + a circular wax seal.
 *
 * PLACEHOLDER SEAL: the circular "M & V" wax seal below is a stand-in. Replace
 * the <g data-seal-art> contents with the real seal artwork when provided; keep
 * the outer <svg> sizing + the data-monogram-seal hook so the scene animation
 * still finds it.
 */
export const MonogramSeal = forwardRef<HTMLDivElement>(function MonogramSeal(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      data-monogram-root
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
    >
      {/* Circular wax seal */}
      <svg
        data-monogram-seal
        width="180"
        height="180"
        viewBox="0 0 180 180"
        aria-hidden="true"
        className="drop-shadow-[0_14px_30px_rgba(94,39,48,0.45)]"
      >
        <defs>
          <radialGradient id="ms-wax" cx="42%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#C58874" />
            <stop offset="55%" stopColor="#9B5240" />
            <stop offset="100%" stopColor="#5E2730" />
          </radialGradient>
          <filter id="ms-deboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" result="b" />
            <feOffset in="b" dx="-1" dy="-1" result="tl" />
            <feFlood floodColor="#3A1014" floodOpacity="0.9" result="dark" />
            <feComposite in="dark" in2="tl" operator="in" result="darkEdge" />
            <feOffset in="b" dx="1" dy="1" result="br" />
            <feFlood floodColor="#E8A88E" floodOpacity="0.75" result="lite" />
            <feComposite in="lite" in2="br" operator="in" result="liteEdge" />
            <feMerge>
              <feMergeNode in="liteEdge" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="darkEdge" />
            </feMerge>
          </filter>
        </defs>

        <g data-seal-art>
          {/* Wax disc with a slightly irregular scalloped edge */}
          <circle cx="90" cy="90" r="78" fill="url(#ms-wax)" />
          <circle
            cx="90"
            cy="90"
            r="68"
            fill="none"
            stroke="#3A1014"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            filter="url(#ms-deboss)"
          />
          {/* Debossed initials */}
          <text
            x="90"
            y="103"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="52"
            fill="#7A3324"
            filter="url(#ms-deboss)"
          >
            M&amp;V
          </text>
        </g>
      </svg>

      {/* Couple monogram / names */}
      <p className="mt-8 font-script text-5xl md:text-7xl text-ink">
        {wedding.brideName} &amp; {wedding.groomName}
      </p>
      <p className="mt-3 font-display tracking-[0.45em] text-xs md:text-sm text-wine uppercase">
        {wedding.dateRoman}
      </p>
    </div>
  )
})
