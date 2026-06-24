import type { SVGProps } from 'react'

/**
 * Hand-drawn line glyph for the scattered background pattern. Phosphor (the
 * icon set used for everything else) has no clean line "wedding rings", so this
 * fills the "anillos" slot. Drawn on a 24×24 viewBox with a thin stroke so it
 * sits with Phosphor's "thin" weight. Accepts `size` + standard SVG props.
 */

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number | string }

function base({ size = 24, ...props }: GlyphProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

/** Two interlocking wedding rings (anillos). */
export function RingsGlyph(props: GlyphProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="15" r="6" />
      <circle cx="15" cy="15" r="6" />
      {/* little solitaire diamond on the right ring */}
      <path d="M15 9 l1.6 1.8 -1.6 1.8 -1.6 -1.8 z" />
    </svg>
  )
}

