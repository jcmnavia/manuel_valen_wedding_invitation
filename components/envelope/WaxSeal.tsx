'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
  size?: number
}

/**
 * Terracotta wax seal with botanical wreath and debossed M&V monogram.
 *
 * Visual reference: a matte, dusty-rose / terracotta wax seal (not metallic
 * gold, not glossy red). Vertical-oval pool with irregular molten edges.
 * The design is debossed (recessed) into the wax: a botanical wreath
 * surrounds the center field, where the M&V monogram is carved in serif.
 *
 * Critical realism choices:
 *   - Matte surface, not glossy: NO bright specular, NO crystalline sparkles.
 *   - Form lighting only: slightly lighter at top, slightly darker at bottom.
 *   - Debossed elements use two SVG layers: a dark interior (the recess
 *     bottom) + a thin light edge along the upper rim of the recess (where
 *     overhead light catches the wall of the depression). No painted strokes.
 *   - Edge thickness bumps and a small drip create the molten-pool silhouette.
 *
 * The seal stays intact and lifts up with the envelope flap during the
 * cinematic; it never cracks.
 */
export const WaxSeal = forwardRef<SVGSVGElement, Props>(function WaxSeal(
  { className = '', size = 260 },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 220 260"
      width={size * (220 / 260)}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        {/* Main matte terracotta — form lighting from above.
            Lighter at top, deeper at bottom. NO specular highlight. */}
        <linearGradient id="terracotta-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#C58974" />
          <stop offset="35%" stopColor="#B86F58" />
          <stop offset="70%" stopColor="#9C5642" />
          <stop offset="100%" stopColor="#7A3F2E" />
        </linearGradient>

        {/* Subtle horizontal warmth — slight bounce light on the right */}
        <linearGradient id="terracotta-side" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.06)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(255,180,140,0.06)" />
        </linearGradient>

        {/* Soft form-light on the upper third — diffuse, no hard sheen */}
        <radialGradient id="terracotta-toplight" cx="50%" cy="20%" r="55%">
          <stop offset="0%" stopColor="rgba(220,160,130,0.32)" />
          <stop offset="60%" stopColor="rgba(220,160,130,0.08)" />
          <stop offset="100%" stopColor="rgba(220,160,130,0)" />
        </radialGradient>

        {/* Rim darkening — the edge of the wax pool falls away into shadow */}
        <radialGradient id="terracotta-rim" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="rgba(0,0,0,0)" />
          <stop offset="92%" stopColor="rgba(50,20,10,0.30)" />
          <stop offset="100%" stopColor="rgba(36,12,4,0.55)" />
        </radialGradient>

        {/* Fine paper-pressed grain — barely visible micro-texture */}
        <filter id="terracotta-grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="2"
            seed="41"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.14 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Soft diffuse drop shadow — contact only, not hard */}
        <filter
          id="terracotta-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="1" dy="4" result="contact" />
          <feComponentTransfer result="contactOut">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>

          <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
          <feOffset dx="1" dy="10" result="ambient" />
          <feComponentTransfer result="ambientOut">
            <feFuncA type="linear" slope="0.30" />
          </feComponentTransfer>

          <feMerge>
            <feMergeNode in="ambientOut" />
            <feMergeNode in="contactOut" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/*
         * IRREGULAR VERTICAL OVAL — a wax pool taller than wide, with
         * thickness bumps and a slight asymmetric overflow. 16 anchor
         * points walking around a center near (110, 130) with vertical
         * radius ~115 and horizontal radius ~95.
         */}
        <clipPath id="terracotta-clip">
          <path
            d="
              M 110 18
              C 130 16, 152 22, 168 36
              C 184 50, 198 70, 202 92
              C 208 116, 204 142, 196 168
              C 192 192, 178 218, 158 234
              C 140 246, 118 250, 100 246
              C 78 246, 56 234, 42 216
              C 26 198, 16 174, 14 148
              C 10 124, 16 100, 26 78
              C 36 56, 52 38, 72 28
              C 84 22, 96 18, 110 18
              Z
            "
          />
        </clipPath>

        <path
          id="terracotta-perimeter"
          d="
            M 110 18
            C 130 16, 152 22, 168 36
            C 184 50, 198 70, 202 92
            C 208 116, 204 142, 196 168
            C 192 192, 178 218, 158 234
            C 140 246, 118 250, 100 246
            C 78 246, 56 234, 42 216
            C 26 198, 16 174, 14 148
            C 10 124, 16 100, 26 78
            C 36 56, 52 38, 72 28
            C 84 22, 96 18, 110 18
            Z
          "
        />
      </defs>

      {/* ====== BODY ====== */}
      <g data-wax-body filter="url(#terracotta-shadow)">
        {/* Clipped wax body */}
        <g clipPath="url(#terracotta-clip)">
          {/* 1. Base terracotta fill */}
          <rect width="220" height="260" fill="url(#terracotta-fill)" />
          {/* 2. Side bounce light */}
          <rect width="220" height="260" fill="url(#terracotta-side)" />
          {/* 3. Rim darkening */}
          <rect width="220" height="260" fill="url(#terracotta-rim)" />
          {/* 4. Fine grain */}
          <rect
            width="220"
            height="260"
            fill="#5C2818"
            filter="url(#terracotta-grain)"
            opacity="0.45"
          />
          {/* 5. Soft top-light */}
          <rect width="220" height="260" fill="url(#terracotta-toplight)" />
        </g>

        {/* Rim edge highlight — thin top-light line along the perimeter */}
        <use
          href="#terracotta-perimeter"
          fill="none"
          stroke="rgba(220,170,140,0.42)"
          strokeWidth="1.3"
          transform="translate(-0.4 -0.7)"
        />
        {/* Rim shadow line — bottom-edge darkening */}
        <use
          href="#terracotta-perimeter"
          fill="none"
          stroke="rgba(40,14,4,0.5)"
          strokeWidth="2.2"
          transform="translate(0.5 1.4)"
          opacity="0.6"
        />

        {/* Edge thickness bumps — small molten lobes around the perimeter */}
        {[
          { x: 180, y: 40, r: 7 },
          { x: 204, y: 100, r: 5 },
          { x: 200, y: 178, r: 7 },
          { x: 168, y: 234, r: 6 },
          { x: 82, y: 248, r: 7 },
          { x: 30, y: 220, r: 5 },
          { x: 12, y: 156, r: 6 },
          { x: 18, y: 90, r: 6 },
          { x: 58, y: 30, r: 6 },
        ].map((b, i) => (
          <g key={`b${i}`}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="url(#terracotta-fill)" />
            <circle cx={b.x} cy={b.y} r={b.r} fill="url(#terracotta-rim)" />
            {/* Subtle top-light catch on each bump */}
            <circle
              cx={b.x - b.r * 0.25}
              cy={b.y - b.r * 0.45}
              r={b.r * 0.35}
              fill="rgba(220,170,140,0.32)"
            />
          </g>
        ))}

        {/*
         * ================================================================
         * DEBOSSED BOTANICAL WREATH
         * Two mirrored vining stems with small leaves and tiny berries.
         * Drawn with two layers:
         *   (a) "shadow" — dark interior of the recess
         *   (b) "edge" — thin light line on the upper-left edge of each
         *       recessed element (where overhead light catches the wall)
         * No painted outlines — physical depth via tonal contrast.
         * ================================================================
         */}

        {/* === LEFT VINE === */}
        <g>
          {/* Main curving stem — shadow */}
          <path
            d="M 60 78 Q 36 130 60 200"
            fill="none"
            stroke="rgba(60,24,12,0.42)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Stem highlight */}
          <path
            d="M 59 78 Q 35 130 59 200"
            fill="none"
            stroke="rgba(220,170,140,0.38)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />

          {/* Leaves on left vine — each pair: shadow + highlight */}
          {[
            { x: 50, y: 90, r: -42, sx: 1 },
            { x: 42, y: 112, r: -18, sx: 1 },
            { x: 38, y: 138, r: 6, sx: 1 },
            { x: 38, y: 164, r: 30, sx: 1 },
            { x: 46, y: 186, r: 52, sx: 1 },
            { x: 60, y: 110, r: -60, sx: -1 },
            { x: 52, y: 168, r: 60, sx: -1 },
          ].map((leaf, i) => (
            <g
              key={`lL${i}`}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.sx} 1)`}
            >
              {/* leaf shadow — full leaf body recess */}
              <path
                d="M 0 0 Q 4 -3 9 -2 Q 12 0 9 3 Q 4 4 0 0 Z"
                fill="rgba(60,24,12,0.5)"
              />
              {/* leaf highlight along upper-left edge */}
              <path
                d="M 0 0 Q 3 -3 8 -2"
                fill="none"
                stroke="rgba(220,170,140,0.55)"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              {/* central vein */}
              <path
                d="M 1 1 Q 4 0 8 -1"
                fill="none"
                stroke="rgba(60,24,12,0.4)"
                strokeWidth="0.4"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Berry cluster on left vine */}
          {[
            [38, 124],
            [42, 130],
            [46, 124],
          ].map(([cx, cy], i) => (
            <g key={`bL${i}`}>
              <circle cx={cx} cy={cy} r="1.6" fill="rgba(60,24,12,0.55)" />
              <circle
                cx={cx - 0.4}
                cy={cy - 0.6}
                r="0.7"
                fill="rgba(220,170,140,0.5)"
              />
            </g>
          ))}
        </g>

        {/* === RIGHT VINE (mirrored) === */}
        <g transform="translate(220 0) scale(-1 1)">
          <path
            d="M 60 78 Q 36 130 60 200"
            fill="none"
            stroke="rgba(60,24,12,0.42)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 59 78 Q 35 130 59 200"
            fill="none"
            stroke="rgba(220,170,140,0.38)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />

          {[
            { x: 50, y: 90, r: -42, sx: 1 },
            { x: 42, y: 112, r: -18, sx: 1 },
            { x: 38, y: 138, r: 6, sx: 1 },
            { x: 38, y: 164, r: 30, sx: 1 },
            { x: 46, y: 186, r: 52, sx: 1 },
            { x: 60, y: 110, r: -60, sx: -1 },
            { x: 52, y: 168, r: 60, sx: -1 },
          ].map((leaf, i) => (
            <g
              key={`lR${i}`}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.sx} 1)`}
            >
              <path
                d="M 0 0 Q 4 -3 9 -2 Q 12 0 9 3 Q 4 4 0 0 Z"
                fill="rgba(60,24,12,0.5)"
              />
              <path
                d="M 0 0 Q 3 -3 8 -2"
                fill="none"
                stroke="rgba(220,170,140,0.55)"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              <path
                d="M 1 1 Q 4 0 8 -1"
                fill="none"
                stroke="rgba(60,24,12,0.4)"
                strokeWidth="0.4"
                strokeLinecap="round"
              />
            </g>
          ))}

          {[
            [38, 124],
            [42, 130],
            [46, 124],
          ].map(([cx, cy], i) => (
            <g key={`bR${i}`}>
              <circle cx={cx} cy={cy} r="1.6" fill="rgba(60,24,12,0.55)" />
              <circle
                cx={cx - 0.4}
                cy={cy - 0.6}
                r="0.7"
                fill="rgba(220,170,140,0.5)"
              />
            </g>
          ))}
        </g>

        {/* === TOP JOIN — small sprig where the two vines meet === */}
        <g transform="translate(110 64)">
          {/* central tiny leaf */}
          <path
            d="M 0 0 Q 0 -6 0 -10 Q -3 -6 0 0 Z"
            fill="rgba(60,24,12,0.5)"
          />
          <path
            d="M 0 0 Q 0 -6 0 -10"
            fill="none"
            stroke="rgba(220,170,140,0.5)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          {/* left tiny leaf */}
          <g transform="translate(-6 4) rotate(-45)">
            <path
              d="M 0 0 Q 3 -2 7 -1 Q 9 0 7 2 Q 3 3 0 0 Z"
              fill="rgba(60,24,12,0.5)"
            />
            <path
              d="M 0 0 Q 3 -2 7 -1"
              fill="none"
              stroke="rgba(220,170,140,0.5)"
              strokeWidth="0.6"
            />
          </g>
          {/* right tiny leaf */}
          <g transform="translate(6 4) rotate(45) scale(-1 1)">
            <path
              d="M 0 0 Q 3 -2 7 -1 Q 9 0 7 2 Q 3 3 0 0 Z"
              fill="rgba(60,24,12,0.5)"
            />
            <path
              d="M 0 0 Q 3 -2 7 -1"
              fill="none"
              stroke="rgba(220,170,140,0.5)"
              strokeWidth="0.6"
            />
          </g>
        </g>

        {/* === BOTTOM JOIN — small sprig where the two vines meet === */}
        <g transform="translate(110 210)">
          {/* central tiny leaf, pointing down */}
          <path
            d="M 0 0 Q 0 6 0 10 Q -3 6 0 0 Z"
            fill="rgba(60,24,12,0.5)"
          />
          <path
            d="M 0 0 Q 0 6 0 10"
            fill="none"
            stroke="rgba(220,170,140,0.5)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          {/* left tiny leaf */}
          <g transform="translate(-6 -4) rotate(45)">
            <path
              d="M 0 0 Q 3 -2 7 -1 Q 9 0 7 2 Q 3 3 0 0 Z"
              fill="rgba(60,24,12,0.5)"
            />
            <path
              d="M 0 0 Q 3 -2 7 -1"
              fill="none"
              stroke="rgba(220,170,140,0.5)"
              strokeWidth="0.6"
            />
          </g>
          {/* right tiny leaf */}
          <g transform="translate(6 -4) rotate(-45) scale(-1 1)">
            <path
              d="M 0 0 Q 3 -2 7 -1 Q 9 0 7 2 Q 3 3 0 0 Z"
              fill="rgba(60,24,12,0.5)"
            />
            <path
              d="M 0 0 Q 3 -2 7 -1"
              fill="none"
              stroke="rgba(220,170,140,0.5)"
              strokeWidth="0.6"
            />
          </g>
        </g>

        {/*
         * ================================================================
         * DEBOSSED M&V MONOGRAM
         * Serif capital letters carved into the center field.
         * Two-layer approach again: dark interior (recess bottom)
         * + thin highlight along the upper-left edge of each stroke.
         * Letters use SVG paths for proper serif anatomy.
         * ================================================================
         */}
        <g data-monogram>
          {/* SHADOW LAYER — dark interior of carved letters */}
          <g
            fill="rgba(50,16,4,0.62)"
            stroke="rgba(50,16,4,0.62)"
            strokeWidth="0.4"
            strokeLinejoin="round"
          >
            {/* M */}
            <path
              d="M 68 108 L 68 162 L 74 162 L 74 122 L 90 154 L 92 154 L 108 122 L 108 162 L 114 162 L 114 108 L 106 108 L 91 144 L 76 108 Z"
            />
            {/* Serifs on M (top and bottom) */}
            <rect x="62" y="106" width="18" height="3" />
            <rect x="102" y="106" width="18" height="3" />
            <rect x="62" y="161" width="18" height="3" />
            <rect x="102" y="161" width="18" height="3" />

            {/* Ampersand — simple serif ornament between letters */}
            <path
              d="M 124 138 Q 128 130 134 132 Q 138 134 136 138 Q 132 142 128 144 Q 134 148 138 144 Q 142 140 144 144"
              fill="none"
              stroke="rgba(50,16,4,0.62)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* V */}
            <path
              d="M 150 108 L 168 162 L 174 162 L 192 108 L 184 108 L 171 152 L 158 108 Z"
            />
            {/* Serifs on V (top only — V has no bottom serif) */}
            <rect x="144" y="106" width="18" height="3" />
            <rect x="180" y="106" width="18" height="3" />
          </g>

          {/* HIGHLIGHT LAYER — thin top-light on upper-left edge of each stroke,
              creates the optical illusion of recessed depth */}
          <g
            fill="rgba(220,170,140,0.42)"
            stroke="rgba(220,170,140,0.42)"
            strokeWidth="0.4"
          >
            {/* M highlight — left edge of left vertical + top of strokes */}
            <path d="M 68 108 L 68 162 L 70 162 L 70 110 Z" />
            <path d="M 102 162 L 104 162 L 104 120 L 102 124 Z" />
            <rect x="62" y="106" width="18" height="1" />
            <rect x="102" y="106" width="18" height="1" />

            {/* V highlight */}
            <path d="M 150 108 L 153 108 L 169 156 L 168 162 Z" />
            <rect x="144" y="106" width="18" height="1" />
            <rect x="180" y="106" width="18" height="1" />
          </g>

          {/* SHADOW LAYER on bottom-right edge (the OPPOSITE side, opposite the light) */}
          <g
            fill="rgba(30,10,2,0.5)"
            stroke="rgba(30,10,2,0.5)"
            strokeWidth="0.4"
          >
            <rect x="62" y="163" width="18" height="1.2" />
            <rect x="102" y="163" width="18" height="1.2" />
            {/* V bottom point shadow */}
            <path d="M 168 162 L 174 162 L 173 160 L 169 160 Z" />
          </g>
        </g>

        {/* Tiny lower-right drip blob — sells the molten character */}
        <g>
          <ellipse
            cx="194"
            cy="226"
            rx="9"
            ry="11"
            fill="url(#terracotta-fill)"
          />
          <ellipse cx="194" cy="226" rx="9" ry="11" fill="url(#terracotta-rim)" />
          <ellipse
            cx="191"
            cy="222"
            rx="2.6"
            ry="3"
            fill="rgba(220,170,140,0.35)"
          />
        </g>
      </g>
    </svg>
  )
})
