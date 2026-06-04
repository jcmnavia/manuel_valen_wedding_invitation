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
  boardUrl?: string
}

const PINIT_SRC = 'https://assets.pinterest.com/js/pinit.js'

// Valentina's "Vestuario Mujer" board — guest outfit inspiration.
const DEFAULT_BOARD =
  'https://www.pinterest.com/valentinafonnegra/vestuario-mujer/'

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

export function PinterestBoard({ boardUrl = DEFAULT_BOARD }: Props) {
  useEffect(() => {
    let cancelled = false
    ensurePinit().then(() => {
      if (cancelled) return
      // pinit.js parses [data-pin-do] anchors; build() re-scans after mount /
      // client-side navigation so the embed renders reliably.
      window.PinUtils?.build()
    })
    return () => {
      cancelled = true
    }
  }, [boardUrl])

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-ink-soft italic mb-6 text-center max-w-md">
        Inspiración para tu atuendo — guarda tus ideas favoritas en nuestro
        tablero de Pinterest.
      </p>

      <div className="pinterest-embed mt-10 w-full flex justify-center">
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

      {/*
        Pinterest builds the widget with timestamped class names
        (PIN_<ts>_hd / _ft). Hide the header (avatar + author + board name) and
        the "Follow on Pinterest" footer so the embed shows only the pins.
        [class*="_hd"] / [class*="_ft"] match regardless of the timestamp prefix.
      */}
      <style>{`
        .pinterest-embed [class*="_hd"] { display: none !important; }
        .pinterest-embed [class*="_ft"] { display: none !important; }
      `}</style>
    </div>
  )
}
