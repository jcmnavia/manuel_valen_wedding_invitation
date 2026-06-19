'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    PinUtils?: { build: () => void }
  }
}

type Props = {
  /**
   * Full URL of the Pinterest board to embed, e.g.
   * "https://www.pinterest.com/usuario/mi-tablero/".
   */
  boardUrl: string
  /** Visible label above the board (e.g. "Ellas" / "Ellos"). */
  label?: string
}

const PINIT_SRC = 'https://assets.pinterest.com/js/pinit.js'

function ensurePinit(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve()
    if (window.PinUtils) return resolve()
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-pinit]',
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = PINIT_SRC
    s.async = true
    s.defer = true
    s.setAttribute('data-pinit', 'true')
    s.addEventListener('load', () => resolve(), { once: true })
    document.body.appendChild(s)
  })
}

export function PinterestBoard({ boardUrl, label }: Props) {
  useEffect(() => {
    let cancelled = false
    ensurePinit().then(() => {
      if (cancelled) return
      // pinit.js parses [data-pin-do] anchors; build() re-scans after mount /
      // client-side navigation so every embed on the page renders reliably.
      window.PinUtils?.build()
    })
    return () => {
      cancelled = true
    }
  }, [boardUrl])

  return (
    <div className="flex w-full flex-col items-center">
      {label && (
        <p className="font-display text-2xl md:text-3xl text-ink-soft mb-6 text-center">
          {label}
        </p>
      )}

      <div className="pinterest-embed w-full flex justify-center">
        {/* Pinterest transforms this anchor into the board embed */}
        <a
          data-pin-do="embedBoard"
          data-pin-board-width="800"
          data-pin-scale-height="440"
          data-pin-scale-width="115"
          href={boardUrl}
          className="text-gold underline decoration-gold/60"
        >
          Ver el tablero en Pinterest
        </a>
      </div>
    </div>
  )
}

/**
 * Pinterest builds each widget with timestamped class names
 * (PIN_<ts>_hd / _bd / _ft). We:
 *   - hide the header (_hd: avatar + author + board name) and the
 *     "Follow on Pinterest" footer (_ft) so only the pins show;
 *   - cap the body (_bd, the scroll window) to a sensible height with its own
 *     scrollbar, so the board stays compact instead of running the full grid
 *     height. `overscroll-behavior: contain` means the wheel scrolls the board
 *     while the cursor is over it, then hands off to the PAGE at the board's
 *     top/bottom edge — so it never traps the page scroll.
 * [class*="_x"] matches regardless of the timestamp prefix. Render ONCE per page.
 */
export function PinterestEmbedStyles() {
  return (
    <style>{`
      .pinterest-embed [class*="_hd"] { display: none !important; }
      .pinterest-embed [class*="_ft"] { display: none !important; }
      .pinterest-embed [class*="_bd"] {
        height: 70vh !important;
        max-height: 640px !important;
        overflow-y: auto !important;
        overscroll-behavior: contain;
      }
    `}</style>
  )
}
