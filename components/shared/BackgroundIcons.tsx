// SSR-safe entry: these icon components are context-free, so they work inside a
// React Server Component (the main '@phosphor-icons/react' entry pulls in a
// client-only Context provider and crashes server rendering).
import {
  Wine,
  Martini,
  Champagne,
  Cake,
  OrangeSlice,
  Flower,
  FlowerLotus,
  Heart,
  Feather,
  Leaf,
  Sparkle,
  Diamond,
  Cherries,
  Confetti,
} from '@phosphor-icons/react/dist/ssr'
// Type-only import (erased at build) — safe to take from the main entry.
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { RingsGlyph } from './WeddingGlyphs'

/**
 * Scattered, minimalist line-icon pattern for the page background — party &
 * wedding motifs (copas, anillos, torta, pólvora, …). Phosphor's "thin" weight
 * gives a delicate, editorial line (finer + less rounded than lucide), plus one
 * hand-drawn glyph (wedding rings) that Phosphor doesn't offer.
 *
 * Placement is deterministic (a tiny seeded PRNG, computed once at module load)
 * so it looks random but is identical on server and client — no hydration
 * mismatch, and no reliance on Math.random() at render time. Rendered behind
 * everything as a fixed, non-interactive layer; mounted via PaperBackground so
 * it shows on every page.
 */

// A renderer takes a pixel size and returns the glyph at the delicate weight.
type Render = (size: number) => React.ReactNode

// Phosphor icons at the "thin" weight — the most delicate line.
const ph = (Comp: PhosphorIcon): Render => {
  const R: Render = (size) => <Comp size={size} weight="thin" />
  return R
}

// The motif set — a refined, editorial selection. Repeats are intentional: the
// most elegant / on-theme motifs (copa, champagne, flor, corazón) recur a
// little more than the accents.
const ICONS: Render[] = [
  ph(Wine),
  ph(Wine),
  ph(Martini),
  ph(Champagne),
  ph(Champagne),
  ph(Cake),
  ph(OrangeSlice),
  ph(Flower),
  ph(Flower),
  ph(FlowerLotus),
  ph(Heart),
  ph(Heart),
  ph(Feather),
  ph(Leaf),
  ph(Sparkle),
  ph(Diamond),
  ph(Cherries),
  ph(Confetti), // pólvora
  // hand-drawn wedding rings, stroke thinned to sit with Phosphor thin
  (size) => <RingsGlyph size={size} strokeWidth={0.85} />,
  (size) => <RingsGlyph size={size} strokeWidth={0.85} />,
]

// Mulberry32 — a compact, fast seeded PRNG. Deterministic → SSR-safe scatter.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Placement = {
  render: Render
  top: number
  left: number
  size: number
  rotate: number
  tint: string
  opacity: number
}

// ~34 icons spread across the viewport. A jittered grid keeps them from
// clumping or overlapping while still reading as a random scatter.
const COUNT = 34
const COLS = 5
const ROWS = 7

const PLACEMENTS: Placement[] = (() => {
  const rng = mulberry32(20260816) // wedding date as the seed — stable forever
  const out: Placement[] = []
  for (let i = 0; i < COUNT; i++) {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    // cell center + jitter within the cell
    const left = ((col + 0.5) / COLS) * 100 + (rng() - 0.5) * (100 / COLS) * 0.8
    const top = ((row + 0.5) / ROWS) * 100 + (rng() - 0.5) * (100 / ROWS) * 0.8
    out.push({
      render: ICONS[Math.floor(rng() * ICONS.length)],
      left: Math.max(2, Math.min(96, left)),
      top: Math.max(2, Math.min(97, top)),
      size: 20 + Math.round(rng() * 24), // 20–44px (thin reads fine a touch larger)
      rotate: Math.round((rng() - 0.5) * 80), // −40°…40°
      // mostly eucalipto, occasionally a wine accent
      tint: rng() < 0.22 ? '#7B3540' : '#5F7A6B',
      opacity: 0.1 + rng() * 0.05, // ~0.10–0.15 (subtle watermark)
    })
  }
  return out
})()

export function BackgroundIcons() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {PLACEMENTS.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            color: p.tint,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
          }}
        >
          {p.render(p.size)}
        </span>
      ))}
    </div>
  )
}
