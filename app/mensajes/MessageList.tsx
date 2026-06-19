'use client'

import Masonry from 'react-masonry-css'
import type { GuestMessage } from '@/lib/supabase'

/**
 * The wall of messages as a dynamic masonry collage (react-masonry-css):
 * 3 columns on desktop, 2 on tablet, 1 on mobile, balanced left-to-right.
 * Each note gets a subtle deterministic rotation + alternating warm tone so the
 * wall reads like handwritten cards pinned to a board, not a rigid grid.
 */

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  520: 1,
}

// Deterministic per-index variety (no Math.random → SSR and client agree).
const rotations = [-2.2, 1.6, -1.2, 2.1, -1.8, 1.1, -0.8, 2.4]
const tones = [
  'bg-cream/60 border-sage/40',
  'bg-ivory border-wine/15',
  'bg-cream/45 border-sage/30',
  'bg-ivory border-sage/30',
]

export function MessageList({ messages }: { messages: GuestMessage[] }) {
  if (messages.length === 0) {
    return (
      <p className="text-center text-ink-soft italic mt-4">
        Aún no hay mensajes. Sé el primero en dejar unas palabras.
      </p>
    )
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className="mv-masonry"
        columnClassName="mv-masonry-col"
      >
        {messages.map((m, i) => (
          <figure
            key={m.id}
            style={{ rotate: `${rotations[i % rotations.length]}deg` }}
            className={`mb-7 ${tones[i % tones.length]} border rounded-sm px-6 py-6 shadow-[0_14px_30px_-18px_rgba(31,26,20,0.28)] transition-transform duration-300 hover:rotate-0 hover:shadow-[0_20px_44px_-18px_rgba(31,26,20,0.34)]`}
          >
            <blockquote className="font-serif italic text-lg text-ink leading-relaxed">
              {m.body}
            </blockquote>
            <figcaption className="mt-4 font-display text-2xl text-wine text-right">
              {m.name}
            </figcaption>
          </figure>
        ))}
      </Masonry>

      {/* react-masonry-css needs flex column styling; scoped here. */}
      <style>{`
        .mv-masonry {
          display: flex;
          width: auto;
          margin-left: -1.5rem; /* offset the column gutter */
        }
        .mv-masonry-col {
          padding-left: 1.5rem;
          background-clip: padding-box;
        }
      `}</style>
    </>
  )
}
