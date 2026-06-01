'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
  size?: number
}

/**
 * Champagne-gold wax seal with two interlocked wedding rings.
 *
 * Aesthetic reference: molten gold wax with highly irregular outline (lots
 * of small drips and bumps around the edge), heavy surface texture
 * (visible micro-bubbles and stress fractures from cooling), interlocked
 * wedding rings — one with a solitaire diamond, one plain band.
 *
 * The seal is always intact: it lifts up with the envelope flap during the
 * cinematic; it does not crack or shatter.
 */
export const WaxSeal = forwardRef<SVGSVGElement, Props>(function WaxSeal(
  { className = '', size = 240 },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        {/* Base gold fill — warm champagne with darker bronze in the recesses */}
        <radialGradient id="gold-fill" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#F2D898" />
          <stop offset="20%" stopColor="#E4C57A" />
          <stop offset="55%" stopColor="#C2A35A" />
          <stop offset="82%" stopColor="#9B7B3A" />
          <stop offset="100%" stopColor="#6E5226" />
        </radialGradient>

        {/* Rim darkening — sells the dimensional dome */}
        <radialGradient id="gold-rim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="rgba(0,0,0,0)" />
          <stop offset="93%" stopColor="rgba(58,38,12,0.45)" />
          <stop offset="100%" stopColor="rgba(36,22,4,0.78)" />
        </radialGradient>

        {/* Top-left bright sheen — wet molten gold catching light */}
        <radialGradient id="gold-sheen" cx="32%" cy="26%" r="34%">
          <stop offset="0%" stopColor="rgba(255,245,210,0.85)" />
          <stop offset="50%" stopColor="rgba(255,240,200,0.18)" />
          <stop offset="100%" stopColor="rgba(255,240,200,0)" />
        </radialGradient>

        {/* Bottom-right warm bounce light */}
        <radialGradient id="gold-bounce" cx="74%" cy="76%" r="34%">
          <stop offset="0%" stopColor="rgba(255,180,90,0.22)" />
          <stop offset="100%" stopColor="rgba(255,180,90,0)" />
        </radialGradient>

        {/* SECONDARY sparkle highlights scattered across surface */}
        <radialGradient id="gold-spark-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,250,225,0.6)" />
          <stop offset="100%" stopColor="rgba(255,250,225,0)" />
        </radialGradient>

        {/* Heavy surface texture: gold needs more pronounced grain than red wax */}
        <filter id="gold-grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves="3"
            seed="23"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.28 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Stress-fracture micro-cracks: barely visible darker veins */}
        <filter id="gold-fractures" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04"
            numOctaves="2"
            seed="7"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.55 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Strong dimensional shadow under the entire seal */}
        <filter id="gold-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="0" dy="7" result="offset" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.62" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/*
         * IRREGULAR MOLTEN OUTLINE
         * The reference shows a seal whose outline is far from circular:
         * little blobs and drips around the perimeter, varying ~12-18% in
         * radius. Path uses 24 cubic anchor points walking around the
         * center (120,120) with hand-tuned radial variation. The outline
         * deliberately has small lobes protruding and small notches.
         */}
        <clipPath id="gold-clip">
          <path
            d="
              M 120 14
              C 134 12, 150 16, 162 24
              C 178 28, 192 36, 200 50
              C 212 58, 220 72, 222 88
              C 228 100, 226 116, 220 128
              C 224 142, 220 158, 210 168
              C 204 184, 192 196, 178 202
              C 168 214, 152 220, 138 220
              C 124 226, 108 224, 96 218
              C 82 220, 68 214, 58 204
              C 44 200, 32 190, 24 176
              C 14 168, 8 154, 8 138
              C 4 124, 6 108, 14 96
              C 14 80, 22 66, 34 58
              C 42 44, 56 34, 72 30
              C 84 20, 100 14, 120 14
              Z
            "
          />
        </clipPath>

        {/* Path for the perimeter "drip lip" — slightly larger blobby outline
            used only for the highlight edge */}
        <path
          id="gold-perimeter"
          d="
            M 120 14
            C 134 12, 150 16, 162 24
            C 178 28, 192 36, 200 50
            C 212 58, 220 72, 222 88
            C 228 100, 226 116, 220 128
            C 224 142, 220 158, 210 168
            C 204 184, 192 196, 178 202
            C 168 214, 152 220, 138 220
            C 124 226, 108 224, 96 218
            C 82 220, 68 214, 58 204
            C 44 200, 32 190, 24 176
            C 14 168, 8 154, 8 138
            C 4 124, 6 108, 14 96
            C 14 80, 22 66, 34 58
            C 42 44, 56 34, 72 30
            C 84 20, 100 14, 120 14
            Z
          "
        />
      </defs>

      <g data-wax-body filter="url(#gold-shadow)">
        {/* CLIPPED gold body */}
        <g clipPath="url(#gold-clip)">
          {/* Base fill */}
          <rect width="240" height="240" fill="url(#gold-fill)" />
          {/* Warm bounce light */}
          <rect width="240" height="240" fill="url(#gold-bounce)" />
          {/* Rim darkening */}
          <rect width="240" height="240" fill="url(#gold-rim)" />
          {/* Heavy grain texture */}
          <rect
            width="240"
            height="240"
            fill="#7A5A26"
            filter="url(#gold-grain)"
            opacity="0.45"
          />
          {/* Stress-fracture darker veins */}
          <rect
            width="240"
            height="240"
            fill="#4A2E0E"
            filter="url(#gold-fractures)"
            opacity="0.22"
          />
          {/* Scattered sparkle highlights */}
          <ellipse cx="62" cy="58" rx="14" ry="6" fill="url(#gold-spark-a)" />
          <ellipse cx="160" cy="74" rx="10" ry="4" fill="url(#gold-spark-a)" />
          <ellipse cx="80" cy="160" rx="8" ry="3" fill="url(#gold-spark-a)" />
          <ellipse cx="170" cy="170" rx="12" ry="5" fill="url(#gold-spark-a)" />
          {/* Top-left main sheen on top */}
          <rect width="240" height="240" fill="url(#gold-sheen)" />
        </g>

        {/* Bright rim highlight following the perimeter — thin gold edge */}
        <use
          href="#gold-perimeter"
          fill="none"
          stroke="rgba(255,235,180,0.55)"
          strokeWidth="1.4"
        />

        {/* Inner shadow line just inside the rim — adds depth */}
        <use
          href="#gold-perimeter"
          fill="none"
          stroke="rgba(60,40,10,0.35)"
          strokeWidth="2"
          transform="translate(0 2)"
          opacity="0.5"
        />

        {/*
         * TWO INTERLOCKED WEDDING RINGS
         * Drawn as two slightly oval rings, the left one with a small
         * solitaire diamond at top. The two rings overlap in the center;
         * the right ring passes BEHIND the left at the top and IN FRONT
         * at the bottom — sold by drawing the right ring twice with a
         * clipped mid-section.
         *
         * Ring stroke uses a darker brown (#3A2614) to recess into the
         * gold wax (this is how engraved seals read in real life: the
         * design is a depression that catches darker shadows).
         */}

        {/* RIGHT ring back arc — the part behind the left ring */}
        <g
          fill="none"
          stroke="#3A2614"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <ellipse cx="142" cy="128" rx="36" ry="38" opacity="0.85" />
        </g>

        {/* LEFT ring — full ellipse, sits on top at the top, behind at the bottom */}
        <g
          fill="none"
          stroke="#3A2614"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <ellipse cx="98" cy="128" rx="36" ry="38" opacity="0.92" />
          {/* Subtle inner stroke giving the band cross-section depth */}
          <ellipse
            cx="98"
            cy="128"
            rx="32"
            ry="34"
            stroke="rgba(255,235,180,0.18)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="98"
            cy="128"
            rx="40"
            ry="42"
            stroke="rgba(60,40,10,0.22)"
            strokeWidth="1"
          />
        </g>

        {/* RIGHT ring front arc — the part in front of the left ring at the bottom.
            Clipped manually to only show the lower-left portion that crosses
            in front of the left ring's lower band. */}
        <g
          fill="none"
          stroke="#3A2614"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          {/* The arc that passes in front: from roughly the 7 o'clock of the right ring
              to the 11 o'clock. Drawn as an elliptical arc path. */}
          <path
            d="M 122 152 A 36 38 0 0 1 110 100"
            opacity="0.95"
          />
          <ellipse
            cx="142"
            cy="128"
            rx="32"
            ry="34"
            stroke="rgba(255,235,180,0.18)"
            strokeWidth="1.2"
            fill="none"
          />
        </g>

        {/* DIAMOND SOLITAIRE on the left ring — small prong-set stone at top */}
        <g transform="translate(98 90)">
          {/* Prongs / base of the setting */}
          <path
            d="M -7 4 L 7 4 L 5 -1 L -5 -1 Z"
            fill="#3A2614"
            opacity="0.85"
          />
          {/* The stone — pointed top, faceted */}
          <path
            d="M -6 -1 L 0 -10 L 6 -1 L 4 1 L -4 1 Z"
            fill="#3A2614"
            opacity="0.9"
          />
          {/* Tiny highlight on the stone */}
          <path
            d="M -2 -7 L 1 -9 L 2 -4 L 0 -3 Z"
            fill="rgba(255,240,200,0.55)"
          />
          {/* Top sparkle line */}
          <path
            d="M -3 -11 L 3 -11"
            stroke="#3A2614"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Specular highlight running across the upper-left of the dome */}
        <path
          clipPath="url(#gold-clip)"
          d="M 30 50 Q 80 24, 150 32 Q 110 56, 82 76 Q 52 88, 30 50 Z"
          fill="rgba(255,235,190,0.22)"
        />

        {/* A tiny extra drip blob at lower-right, sells the molten character */}
        <circle
          cx="206"
          cy="178"
          r="6"
          fill="url(#gold-fill)"
          opacity="0.85"
        />
        <circle
          cx="206"
          cy="178"
          r="6"
          fill="url(#gold-rim)"
          opacity="0.5"
        />
      </g>
    </svg>
  )
})
