'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
  size?: number
}

/**
 * Champagne-gold wax seal with two interlocked wedding rings.
 *
 * 3D realism strategy:
 *   - Strong directional lighting (top-left, ~30° elevation)
 *   - Rings drawn 3-layer: deep shadow + main stroke + highlight stroke,
 *     so they read as carved depressions in the wax, not flat painted lines
 *   - Diamond drawn with facet lines and a central specular sparkle
 *   - Edge has 8 "thickness bumps" — small dome highlights at irregular
 *     positions along the perimeter, sells the molten-pooled thickness
 *   - Surface carries small divots (dark spots) and crystalline sparkles
 *   - Two layered drop shadows: a tight contact shadow + a soft ambient
 *
 * The seal is always intact: it lifts up with the envelope flap during
 * the cinematic; it does not crack or shatter.
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
        {/* Main fill — directional light from upper-left, ~30° */}
        <radialGradient id="gold-fill" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FBEFC4" />
          <stop offset="14%" stopColor="#F2D898" />
          <stop offset="40%" stopColor="#D4B36C" />
          <stop offset="68%" stopColor="#9D7A3A" />
          <stop offset="88%" stopColor="#6B4E20" />
          <stop offset="100%" stopColor="#3D2A10" />
        </radialGradient>

        {/* Sharp specular highlight in the upper-left quadrant */}
        <radialGradient id="gold-specular" cx="28%" cy="22%" r="22%">
          <stop offset="0%" stopColor="rgba(255,252,235,0.95)" />
          <stop offset="35%" stopColor="rgba(255,250,220,0.4)" />
          <stop offset="100%" stopColor="rgba(255,250,220,0)" />
        </radialGradient>

        {/* Secondary softer sheen reaching across the upper half */}
        <radialGradient id="gold-sheen" cx="42%" cy="32%" r="48%">
          <stop offset="0%" stopColor="rgba(255,240,200,0.55)" />
          <stop offset="55%" stopColor="rgba(255,240,200,0.08)" />
          <stop offset="100%" stopColor="rgba(255,240,200,0)" />
        </radialGradient>

        {/* Bottom-right warm bounce light — implies a surface reflecting back */}
        <radialGradient id="gold-bounce" cx="76%" cy="80%" r="36%">
          <stop offset="0%" stopColor="rgba(255,170,80,0.30)" />
          <stop offset="100%" stopColor="rgba(255,170,80,0)" />
        </radialGradient>

        {/* Hard rim darkening to create the dome silhouette */}
        <radialGradient id="gold-rim" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="rgba(0,0,0,0)" />
          <stop offset="88%" stopColor="rgba(48,30,8,0.42)" />
          <stop offset="98%" stopColor="rgba(28,16,2,0.78)" />
          <stop offset="100%" stopColor="rgba(14,6,0,0.95)" />
        </radialGradient>

        {/* Small high-intensity sparkles */}
        <radialGradient id="spark-tiny" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,240,1)" />
          <stop offset="40%" stopColor="rgba(255,250,210,0.55)" />
          <stop offset="100%" stopColor="rgba(255,250,210,0)" />
        </radialGradient>

        {/* Fine surface grain — heavier than before for tactile feel */}
        <filter id="gold-grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves="3"
            seed="29"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.34 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Wider "vein" texture — simulates cooled-wax stress patterns */}
        <filter id="gold-veins" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.035"
            numOctaves="2"
            seed="11"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.42 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Two-layer shadow: tight contact + soft ambient */}
        <filter id="gold-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" result="contact" />
          <feComponentTransfer result="contactOut">
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>

          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="10" result="ambient" />
          <feComponentTransfer result="ambientOut">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>

          <feMerge>
            <feMergeNode in="ambientOut" />
            <feMergeNode in="contactOut" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* IRREGULAR MOLTEN OUTLINE — 24-point bezier with hand-tuned drips.
            More pronounced lobes than before. */}
        <clipPath id="gold-clip">
          <path
            d="
              M 120 12
              C 134 8, 154 14, 168 22
              C 182 22, 198 30, 206 46
              C 218 54, 226 70, 226 88
              C 234 100, 232 118, 226 130
              C 230 144, 222 162, 212 170
              C 208 188, 192 200, 178 204
              C 170 218, 152 224, 138 222
              C 124 230, 106 226, 96 220
              C 80 224, 64 216, 56 204
              C 40 200, 28 188, 22 174
              C 8 168, 4 152, 6 138
              C 0 122, 4 104, 14 92
              C 12 76, 22 60, 34 54
              C 40 38, 56 28, 72 28
              C 84 16, 102 10, 120 12
              Z
            "
          />
        </clipPath>

        {/* Same path as a usable reference for the rim stroke */}
        <path
          id="gold-perimeter"
          d="
            M 120 12
            C 134 8, 154 14, 168 22
            C 182 22, 198 30, 206 46
            C 218 54, 226 70, 226 88
            C 234 100, 232 118, 226 130
            C 230 144, 222 162, 212 170
            C 208 188, 192 200, 178 204
            C 170 218, 152 224, 138 222
            C 124 230, 106 226, 96 220
            C 80 224, 64 216, 56 204
            C 40 200, 28 188, 22 174
            C 8 168, 4 152, 6 138
            C 0 122, 4 104, 14 92
            C 12 76, 22 60, 34 54
            C 40 38, 56 28, 72 28
            C 84 16, 102 10, 120 12
            Z
          "
        />
      </defs>

      {/* ====== SHADOW + BODY ====== */}
      <g data-wax-body filter="url(#gold-shadow)">
        {/* Clipped wax body — stacking gradients and textures */}
        <g clipPath="url(#gold-clip)">
          {/* 1. Base fill */}
          <rect width="240" height="240" fill="url(#gold-fill)" />
          {/* 2. Warm bottom-right bounce */}
          <rect width="240" height="240" fill="url(#gold-bounce)" />
          {/* 3. Rim darkening (the dome silhouette) */}
          <rect width="240" height="240" fill="url(#gold-rim)" />
          {/* 4. Heavy surface grain */}
          <rect
            width="240"
            height="240"
            fill="#6B4E20"
            filter="url(#gold-grain)"
            opacity="0.50"
          />
          {/* 5. Wider vein texture */}
          <rect
            width="240"
            height="240"
            fill="#3D2A10"
            filter="url(#gold-veins)"
            opacity="0.18"
          />

          {/* 6. Surface divots — tiny dark spots scattered for tactile feel */}
          {[
            [56, 92],
            [88, 168],
            [148, 80],
            [178, 142],
            [104, 200],
            [196, 96],
            [42, 144],
            [124, 156],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx={i % 2 ? 2.2 : 1.6}
              ry={i % 2 ? 1.2 : 0.9}
              fill="rgba(40,24,4,0.4)"
            />
          ))}

          {/* 7. Soft sheen over the upper half */}
          <rect width="240" height="240" fill="url(#gold-sheen)" />

          {/* 8. Tight specular highlight in the upper-left */}
          <rect width="240" height="240" fill="url(#gold-specular)" />

          {/* 9. Crystalline sparkles — small bright dots over the dome */}
          {[
            [50, 64, 5],
            [80, 50, 3.2],
            [130, 58, 4],
            [60, 110, 3.5],
            [104, 92, 2.4],
            [170, 110, 3],
            [156, 178, 3.4],
            [82, 188, 2.6],
            [190, 60, 2.2],
            [38, 96, 2],
            [144, 196, 2.8],
          ].map(([x, y, r], i) => (
            <circle
              key={`s${i}`}
              cx={x}
              cy={y}
              r={r}
              fill="url(#spark-tiny)"
            />
          ))}
        </g>

        {/* ====== RIM EDGE LIGHTING ====== */}
        {/* Outer bright edge — where the dome catches light along the perimeter */}
        <use
          href="#gold-perimeter"
          fill="none"
          stroke="rgba(255,230,170,0.65)"
          strokeWidth="1.8"
        />
        {/* Inner shadow line just inside the rim */}
        <use
          href="#gold-perimeter"
          fill="none"
          stroke="rgba(50,30,8,0.55)"
          strokeWidth="2.6"
          transform="translate(0 2.5)"
          opacity="0.55"
        />

        {/* "Thickness bumps" — small dome highlights at irregular spots
            on the perimeter. Sells the molten pool's irregular thickness. */}
        {[
          { x: 190, y: 36, r: 6 },
          { x: 220, y: 100, r: 5 },
          { x: 212, y: 174, r: 7 },
          { x: 156, y: 220, r: 5 },
          { x: 76, y: 224, r: 6 },
          { x: 28, y: 184, r: 5 },
          { x: 8, y: 122, r: 6 },
          { x: 28, y: 64, r: 5 },
          { x: 88, y: 18, r: 6 },
        ].map((b, i) => (
          <g key={`b${i}`}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="url(#gold-fill)" />
            <circle cx={b.x} cy={b.y} r={b.r} fill="url(#gold-rim)" />
            <circle
              cx={b.x - b.r * 0.35}
              cy={b.y - b.r * 0.35}
              r={b.r * 0.45}
              fill="rgba(255,245,210,0.6)"
            />
          </g>
        ))}

        {/* ====== ENGRAVED WEDDING RINGS — CARVED INTO THE WAX ======
            Drawn in three layers per ring (shadow + main + highlight) to
            sell the recessed-engraving look. The interlock works by
            drawing the right ring FIRST (full), then the left ring on top
            (so left wins at the upper crossover), then re-drawing a small
            arc of the right ring's lower-left so it crosses in FRONT of
            the left ring at the bottom crossover.

            Rings sized cleanly: rx=ry=34 (round circles, easier to read).
            Left center: (98, 130). Right center: (142, 130). Center spacing 44px. */}

        {/* ----- RIGHT RING — full circle, drawn first so it sits behind ----- */}
        {/* shadow */}
        <circle
          cx="143"
          cy="131.4"
          r="34"
          fill="none"
          stroke="#1A0F06"
          strokeWidth="5"
          opacity="0.55"
        />
        {/* main carve */}
        <circle
          cx="142"
          cy="130"
          r="34"
          fill="none"
          stroke="#3A2614"
          strokeWidth="4.5"
          opacity="0.95"
        />
        {/* upper-left highlight on right ring */}
        <g
          fill="none"
          stroke="rgba(255,240,190,0.7)"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M 124 110 A 34 34 0 0 1 162 104" />
        </g>

        {/* ----- LEFT RING — full circle, drawn on top so it crosses over right ring at top ----- */}
        {/* shadow */}
        <circle
          cx="99"
          cy="131.4"
          r="34"
          fill="none"
          stroke="#1A0F06"
          strokeWidth="5"
          opacity="0.6"
        />
        {/* main carve */}
        <circle
          cx="98"
          cy="130"
          r="34"
          fill="none"
          stroke="#3A2614"
          strokeWidth="4.5"
          opacity="0.95"
        />
        {/* upper-left highlight on left ring */}
        <g
          fill="none"
          stroke="rgba(255,240,190,0.75)"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M 78 110 A 34 34 0 0 1 116 104" />
        </g>

        {/* ----- RIGHT RING — front arc, drawn LAST so it crosses IN FRONT of
            the left ring at the BOTTOM. This is the segment of the right ring
            from roughly the 7 o'clock to the 10 o'clock position (lower-left
            quadrant) — that's where it should pass in front of the left ring. */}
        {/* shadow */}
        <path
          d="M 119 152 A 34 34 0 0 1 109 117"
          fill="none"
          stroke="#1A0F06"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.6"
          transform="translate(1 1.4)"
        />
        {/* main carve */}
        <path
          d="M 119 152 A 34 34 0 0 1 109 117"
          fill="none"
          stroke="#3A2614"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* highlight along that arc */}
        <path
          d="M 114 145 A 34 34 0 0 1 110 124"
          fill="none"
          stroke="rgba(255,240,190,0.6)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* ====== DIAMOND SOLITAIRE on the left ring (sits at the top of left ring, y = 130 - 34 = 96) ====== */}
        <g transform="translate(98 92)">
          {/* prong setting shadow */}
          <path
            d="M -8 6 L 8 6 L 6 0 L -6 0 Z"
            fill="#22150A"
            opacity="0.7"
            transform="translate(0.8 1)"
          />
          {/* prong setting */}
          <path d="M -8 5 L 8 5 L 6 -1 L -6 -1 Z" fill="#3A2614" />
          {/* setting top highlight */}
          <path
            d="M -7 5 L 7 5 L 6 4 L -6 4 Z"
            fill="rgba(255,238,180,0.45)"
          />

          {/* diamond outline with facets */}
          <path
            d="M -7 -1 L 0 -13 L 7 -1 L 4 2 L -4 2 Z"
            fill="#1A0F06"
            stroke="rgba(255,240,200,0.4)"
            strokeWidth="0.6"
          />
          {/* internal facet lines */}
          <g
            fill="none"
            stroke="rgba(255,240,200,0.45)"
            strokeWidth="0.5"
            strokeLinecap="round"
          >
            <path d="M -7 -1 L 0 2" />
            <path d="M 7 -1 L 0 2" />
            <path d="M -7 -1 L 0 -7" />
            <path d="M 7 -1 L 0 -7" />
            <path d="M 0 -13 L 0 -7" />
          </g>
          {/* central sparkle on the stone */}
          <circle cx="0" cy="-5" r="1.8" fill="url(#spark-tiny)" />
          {/* tiny cross-sparkle */}
          <g
            stroke="rgba(255,255,240,0.95)"
            strokeWidth="0.4"
            strokeLinecap="round"
          >
            <line x1="0" y1="-9" x2="0" y2="-2" />
            <line x1="-3.5" y1="-5" x2="3.5" y2="-5" />
          </g>

          {/* prong dots (4 small prongs) */}
          {[
            [-5.5, -2],
            [5.5, -2],
            [-3.5, -11],
            [3.5, -11],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.9" fill="#3A2614" />
          ))}
        </g>

        {/* Final overall sheen sweep across upper-left of the dome */}
        <path
          clipPath="url(#gold-clip)"
          d="M 20 50 Q 80 22, 150 30 Q 110 56, 80 78 Q 46 90, 20 50 Z"
          fill="rgba(255,240,200,0.25)"
        />

        {/* Tiny lower-right drip blob — sells the molten character */}
        <g>
          <circle
            cx="216"
            cy="186"
            r="7"
            fill="url(#gold-fill)"
          />
          <circle cx="216" cy="186" r="7" fill="url(#gold-rim)" />
          <circle
            cx="213"
            cy="183"
            r="2.4"
            fill="rgba(255,245,210,0.7)"
          />
        </g>
      </g>
    </svg>
  )
})
