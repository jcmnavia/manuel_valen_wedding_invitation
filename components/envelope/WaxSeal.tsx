'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
  size?: number
}

/**
 * Terracotta wax seal — built to look like a real photograph of pressed wax.
 *
 * Technical approach:
 *
 *   1. SILHOUETTE: a single irregular path with 28 anchors. The thickness
 *      bumps are PART of the path geometry, not separate circles glued to
 *      the side. The path is then noise-displaced via feDisplacementMap so
 *      the edge has natural microscopic irregularity.
 *
 *   2. SUBSURFACE MOTTLING: two layers of feTurbulence at different scales,
 *      tinted toward warm shadow color, composited into the wax body.
 *      Produces the irregular "wax pool" coloring instead of a smooth gradient.
 *
 *   3. FORM LIGHTING: a soft top-light radial PLUS a stronger 3D dome
 *      shading via stacked gradients (NOT a specular sheen — matte wax).
 *
 *   4. RIM TREATMENT: thin top-light edge along the upper perimeter
 *      (where overhead light catches the rim), thin shadow along the lower
 *      perimeter (where the wax recedes into the paper).
 *
 *   5. DEBOSSED ELEMENTS (wreath + monogram): each carved element rendered
 *      with TRUE bevel via a custom SVG filter (`#deboss`). The filter
 *      creates:
 *        - A dark inner cavity (the recess floor)
 *        - An upper-left highlight (light catching the inner wall)
 *        - A lower-right deeper shadow (away from light)
 *      The result reads as a physical depression, not a painted line.
 *
 * The seal stays intact and lifts up with the envelope flap during the
 * cinematic; it never cracks.
 */
export const WaxSeal = forwardRef<SVGSVGElement, Props>(function WaxSeal(
  { className = '', size = 280 },
  ref,
) {
  // Vertical-oval irregular pool: 28-anchor path with intentional bumps
  // built into the silhouette itself. Center near (140, 160), radii ~125x150.
  const pool = `
    M 140 12
    Q 162 12, 182 22
    Q 198 26, 210 38
    Q 224 46, 234 64
    Q 250 76, 254 96
    Q 264 116, 260 138
    Q 272 158, 262 180
    Q 264 202, 252 220
    Q 248 244, 228 256
    Q 214 274, 192 282
    Q 174 296, 152 296
    Q 130 304, 110 296
    Q 88 298, 70 286
    Q 50 282, 38 264
    Q 22 256, 14 238
    Q 4 222, 6 200
    Q -4 180, 4 158
    Q -2 138, 8 118
    Q 6 96, 18 78
    Q 22 56, 40 44
    Q 50 28, 70 22
    Q 88 10, 110 14
    Q 124 8, 140 12
    Z
  `

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 320"
      width={size * (280 / 320)}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        {/* ===== COLOR + LIGHTING GRADIENTS ===== */}

        {/* Base wax color — strong top-to-bottom form light */}
        <radialGradient id="wax-base" cx="50%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#C58874" />
          <stop offset="30%" stopColor="#B16952" />
          <stop offset="62%" stopColor="#94503D" />
          <stop offset="85%" stopColor="#73382A" />
          <stop offset="100%" stopColor="#5A2A1F" />
        </radialGradient>

        {/* Upper warm catch-light — diffuse, no specular */}
        <radialGradient id="wax-toplight" cx="50%" cy="18%" r="48%">
          <stop offset="0%" stopColor="rgba(230,180,150,0.42)" />
          <stop offset="65%" stopColor="rgba(230,180,150,0.05)" />
          <stop offset="100%" stopColor="rgba(230,180,150,0)" />
        </radialGradient>

        {/* Subsurface warmth — implies wax glows slightly from within */}
        <radialGradient id="wax-subsurface" cx="50%" cy="55%" r="42%">
          <stop offset="0%" stopColor="rgba(220,120,90,0.18)" />
          <stop offset="100%" stopColor="rgba(220,120,90,0)" />
        </radialGradient>

        {/* Rim falloff — deep shadow at the very edge */}
        <radialGradient id="wax-rim" cx="50%" cy="50%" r="50%">
          <stop offset="74%" stopColor="rgba(0,0,0,0)" />
          <stop offset="90%" stopColor="rgba(40,16,8,0.40)" />
          <stop offset="100%" stopColor="rgba(20,6,2,0.78)" />
        </radialGradient>

        {/* ===== SURFACE TEXTURE FILTERS ===== */}

        {/* Larger irregular mottling — the "wax pool" coloring */}
        <filter id="mottle-coarse" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="2"
            seed="7"
            result="t"
          />
          <feColorMatrix
            in="t"
            values="0 0 0 0 0.36
                    0 0 0 0 0.18
                    0 0 0 0 0.12
                    0 0 0 0.32 0"
          />
        </filter>

        {/* Finer grain — the wax's tactile micro-surface */}
        <filter id="mottle-fine" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="29"
            result="t"
          />
          <feColorMatrix
            in="t"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.18 0"
          />
        </filter>

        {/* Edge displacement — distorts the silhouette so it isn't a clean
            mathematical curve. Applied to a copy of the pool path. */}
        <filter
          id="edge-distort"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="13"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ===== BEVEL FILTER FOR DEBOSSED ELEMENTS =====
            Creates the optical illusion of a depression carved into the
            wax. Light from upper-left:
              - The UPPER-LEFT lip of the depression casts a SHADOW into
                the recess (the lip blocks the light from reaching the
                upper-left inner wall). → darker upper-left.
              - The LOWER-RIGHT inner wall is the one that actually
                catches direct light coming over the upper-left lip.
                → lighter lower-right.
              - The floor of the recess sits in mid-tone shadow.

            This is the OPPOSITE of an embossed (raised) element.
            For a raised object: highlight top-left, shadow bottom-right.
            For a recessed object: shadow top-left, highlight bottom-right. */}
        <filter id="deboss" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" result="blur" />

          {/* DEEP SHADOW on the TOP-LEFT inner edge (the lip blocks light) */}
          <feOffset in="blur" dx="-1.4" dy="-1.4" result="topLeftOffset" />
          <feFlood
            floodColor="#180502"
            floodOpacity="0.95"
            result="shadowFlood"
          />
          <feComposite
            in="shadowFlood"
            in2="topLeftOffset"
            operator="in"
            result="topLeftShadow"
          />

          {/* WARM HIGHLIGHT on the BOTTOM-RIGHT inner wall (catches light) */}
          <feOffset in="blur" dx="1.2" dy="1.2" result="bottomRightOffset" />
          <feFlood
            floodColor="#E8A88E"
            floodOpacity="0.80"
            result="lightFlood"
          />
          <feComposite
            in="lightFlood"
            in2="bottomRightOffset"
            operator="in"
            result="bottomRightLight"
          />

          {/* RECESS FLOOR — solid dark fill */}
          <feFlood
            floodColor="#3A0E04"
            floodOpacity="0.88"
            result="floorFlood"
          />
          <feComposite
            in="floorFlood"
            in2="SourceAlpha"
            operator="in"
            result="floor"
          />

          {/* Stack: bottom-right highlight first (subtle base layer),
              then dark floor, then top-left shadow on top */}
          <feMerge>
            <feMergeNode in="bottomRightLight" />
            <feMergeNode in="floor" />
            <feMergeNode in="topLeftShadow" />
          </feMerge>
        </filter>

        {/* Soft contact shadow under the entire seal */}
        <filter id="seal-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b1" />
          <feOffset in="b1" dx="1" dy="4" result="o1" />
          <feComponentTransfer in="o1" result="contact">
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>

          <feGaussianBlur in="SourceAlpha" stdDeviation="11" result="b2" />
          <feOffset in="b2" dx="2" dy="14" result="o2" />
          <feComponentTransfer in="o2" result="ambient">
            <feFuncA type="linear" slope="0.32" />
          </feComponentTransfer>

          <feMerge>
            <feMergeNode in="ambient" />
            <feMergeNode in="contact" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ===== POOL PATH DEFINITION ===== */}
        <path id="pool-path" d={pool} />
        <clipPath id="pool-clip">
          <use href="#pool-path" />
        </clipPath>
      </defs>

      {/* ====== ENTIRE SEAL GROUP — gets the soft drop shadow ====== */}
      <g data-wax-body filter="url(#seal-shadow)">
        {/*
         * Render the wax body. We use ONE clipped group with all surface
         * layers stacked, then the silhouette is "distorted" via a wrapper
         * filter that displaces the edge.
         */}
        <g filter="url(#edge-distort)">
          <g clipPath="url(#pool-clip)">
            {/* 1. Base color */}
            <rect width="280" height="320" fill="url(#wax-base)" />

            {/* 2. Subsurface warmth */}
            <rect width="280" height="320" fill="url(#wax-subsurface)" />

            {/* 3. Coarse mottling — layer 1, darker patches */}
            <rect
              width="280"
              height="320"
              filter="url(#mottle-coarse)"
              opacity="0.7"
            />

            {/* 4. Fine grain */}
            <rect
              width="280"
              height="320"
              filter="url(#mottle-fine)"
              opacity="0.6"
            />

            {/* 5. Rim darkening */}
            <rect width="280" height="320" fill="url(#wax-rim)" />

            {/* 6. Top-light catch */}
            <rect width="280" height="320" fill="url(#wax-toplight)" />

            {/* 7. Subtle vertical streaking — wax pours slightly downward */}
            <rect
              width="280"
              height="320"
              fill="url(#wax-base)"
              opacity="0.0"
            />
          </g>

          {/* Rim edge highlight along upper perimeter — a thin top-light line */}
          <use
            href="#pool-path"
            fill="none"
            stroke="rgba(230,170,140,0.55)"
            strokeWidth="1.2"
            transform="translate(-0.3 -0.8)"
            opacity="0.85"
          />
          {/* Rim shadow along lower perimeter */}
          <use
            href="#pool-path"
            fill="none"
            stroke="rgba(20,6,2,0.55)"
            strokeWidth="2.4"
            transform="translate(0.6 1.6)"
            opacity="0.7"
          />
        </g>

        {/* ===========================================================
            DEBOSSED BOTANICAL WREATH
            Drawn AFTER the body so it sits on the surface. Each element
            passes through the #deboss filter to produce a real-looking
            depression.
            =========================================================== */}

        {/* === LEFT VINE === */}
        <g filter="url(#deboss)">
          {/* Main curving stem */}
          <path
            d="M 80 100 Q 48 165 84 240"
            fill="none"
            stroke="black"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Leaves — larger, fewer, well-spaced. Each leaf is an
              almond shape with a strong central vein. */}
          {[
            { x: 70, y: 116, r: -45, scale: 1.0 },
            { x: 56, y: 142, r: -10, scale: 1.1 },
            { x: 50, y: 170, r: 18, scale: 1.15 },
            { x: 60, y: 198, r: 48, scale: 1.05 },
            { x: 80, y: 222, r: 70, scale: 1.0 },
            { x: 94, y: 130, r: -78, scale: 0.85 },
            { x: 86, y: 216, r: 85, scale: 0.8 },
          ].map((leaf, i) => (
            <g
              key={`L${i}`}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.scale})`}
            >
              {/* leaf body — proper almond */}
              <path
                d="M 0 0 Q 7 -6 16 -4 Q 22 0 16 5 Q 7 6 0 0 Z"
                fill="black"
              />
              {/* central vein — recessed deeper */}
              <path
                d="M 1 0.5 Q 8 -1 15 -1.5"
                fill="none"
                stroke="black"
                strokeWidth="0.8"
              />
            </g>
          ))}

          {/* Berry cluster — three small berries grouped */}
          {[
            [44, 156],
            [50, 162],
            [56, 156],
          ].map(([cx, cy], i) => (
            <circle key={`bL${i}`} cx={cx} cy={cy} r="2.4" fill="black" />
          ))}
        </g>

        {/* === RIGHT VINE (mirrored) === */}
        <g filter="url(#deboss)" transform="translate(280 0) scale(-1 1)">
          <path
            d="M 80 100 Q 48 165 84 240"
            fill="none"
            stroke="black"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {[
            { x: 70, y: 116, r: -45, scale: 1.0 },
            { x: 56, y: 142, r: -10, scale: 1.1 },
            { x: 50, y: 170, r: 18, scale: 1.15 },
            { x: 60, y: 198, r: 48, scale: 1.05 },
            { x: 80, y: 222, r: 70, scale: 1.0 },
            { x: 94, y: 130, r: -78, scale: 0.85 },
            { x: 86, y: 216, r: 85, scale: 0.8 },
          ].map((leaf, i) => (
            <g
              key={`R${i}`}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.scale})`}
            >
              <path
                d="M 0 0 Q 7 -6 16 -4 Q 22 0 16 5 Q 7 6 0 0 Z"
                fill="black"
              />
              <path
                d="M 1 0.5 Q 8 -1 15 -1.5"
                fill="none"
                stroke="black"
                strokeWidth="0.8"
              />
            </g>
          ))}
          {[
            [44, 156],
            [50, 162],
            [56, 156],
          ].map(([cx, cy], i) => (
            <circle key={`bR${i}`} cx={cx} cy={cy} r="2.4" fill="black" />
          ))}
        </g>

        {/* === TOP SPRIG — small 3-leaf bud, not a cross === */}
        <g filter="url(#deboss)" transform="translate(140 78)">
          {/* central leaf pointing up */}
          <path
            d="M 0 0 Q -2 -8 0 -16 Q 2 -8 0 0 Z"
            fill="black"
          />
          {/* left tiny leaf */}
          <g transform="translate(-2 -4) rotate(-55)">
            <path
              d="M 0 0 Q 4 -3 10 -2 Q 12 0 10 3 Q 4 3 0 0 Z"
              fill="black"
            />
          </g>
          {/* right tiny leaf */}
          <g transform="translate(2 -4) rotate(55) scale(-1 1)">
            <path
              d="M 0 0 Q 4 -3 10 -2 Q 12 0 10 3 Q 4 3 0 0 Z"
              fill="black"
            />
          </g>
        </g>

        {/* === BOTTOM SPRIG — small 3-leaf bud, mirrored === */}
        <g filter="url(#deboss)" transform="translate(140 245)">
          <path
            d="M 0 0 Q -2 8 0 16 Q 2 8 0 0 Z"
            fill="black"
          />
          <g transform="translate(-2 4) rotate(55)">
            <path
              d="M 0 0 Q 4 -3 10 -2 Q 12 0 10 3 Q 4 3 0 0 Z"
              fill="black"
            />
          </g>
          <g transform="translate(2 4) rotate(-55) scale(-1 1)">
            <path
              d="M 0 0 Q 4 -3 10 -2 Q 12 0 10 3 Q 4 3 0 0 Z"
              fill="black"
            />
          </g>
        </g>

        {/* ===========================================================
            DEBOSSED M&V MONOGRAM
            Proper serif letterforms in solid black, passed through
            #deboss filter to render as recessed letters.
            =========================================================== */}
        <g filter="url(#deboss)" data-monogram>
          {/*
            M letterform — drawn as a single filled path for proper
            serif anatomy. Vertical strokes thicker than the diagonals
            for traditional didone proportions.
          */}
          <path
            d="
              M 75 130
              L 75 200
              L 86 200
              L 86 148
              L 109 192
              L 113 192
              L 136 148
              L 136 200
              L 147 200
              L 147 130
              L 134 130
              L 111 178
              L 88 130
              Z
              M 70 128 L 91 128 L 91 132 L 70 132 Z
              M 131 128 L 152 128 L 152 132 L 131 132 Z
              M 70 198 L 91 198 L 91 202 L 70 202 Z
              M 131 198 L 152 198 L 152 202 L 131 202 Z
            "
            fill="black"
          />

          {/* Ampersand — small italic & between the letters */}
          <path
            d="
              M 162 170
              C 158 164, 160 156, 168 156
              C 174 156, 176 162, 172 168
              L 178 178
              C 180 176, 182 174, 184 174
              L 184 178
              C 182 180, 180 184, 174 184
              C 168 184, 162 178, 162 172
              Z
            "
            fill="black"
          />

          {/*
            V letterform — drawn as a single filled path with serifs
            on the top, none on the bottom (V points to its bottom).
          */}
          <path
            d="
              M 188 130
              L 209 200
              L 217 200
              L 238 130
              L 226 130
              L 213 188
              L 200 130
              Z
              M 184 128 L 205 128 L 205 132 L 184 132 Z
              M 221 128 L 242 128 L 242 132 L 221 132 Z
            "
            fill="black"
          />
        </g>

        {/* ===========================================================
            Final touch: a single small drip blob at lower-right.
            Drawn AFTER the body so it overlaps the silhouette and
            looks like real overflow.
            =========================================================== */}
        <g filter="url(#edge-distort)">
          <ellipse
            cx="240"
            cy="266"
            rx="11"
            ry="13"
            fill="url(#wax-base)"
          />
          <ellipse cx="240" cy="266" rx="11" ry="13" fill="url(#wax-rim)" />
          <ellipse
            cx="236"
            cy="262"
            rx="3.5"
            ry="4"
            fill="rgba(230,170,140,0.35)"
          />
        </g>
      </g>
    </svg>
  )
})
