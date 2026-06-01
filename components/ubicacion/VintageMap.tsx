'use client'

import { useEffect, useRef } from 'react'
import { wedding } from '@/content/wedding'

const LEAFLET_CSS_HREF =
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'

function ensureLeafletCss() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`link[data-leaflet-css]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = LEAFLET_CSS_HREF
  link.setAttribute('data-leaflet-css', 'true')
  document.head.appendChild(link)
}

export function VintageMap() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    ensureLeafletCss()

    let map: import('leaflet').Map | null = null
    let cancelled = false

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !ref.current) return

      map = L.map(ref.current, {
        center: wedding.ceremony.coords,
        zoom: 14,
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      const dropIcon = L.divIcon({
        className: 'vintage-pin',
        html: '<span class="vintage-pin-dot"></span>',
        iconSize: [24, 30],
        iconAnchor: [12, 28],
      })

      L.marker(wedding.ceremony.coords, { icon: dropIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${wedding.ceremony.name}</strong><br/>${wedding.ceremony.address}`,
        )

      const sameVenue =
        wedding.reception.coords[0] === wedding.ceremony.coords[0] &&
        wedding.reception.coords[1] === wedding.ceremony.coords[1]

      if (!sameVenue) {
        L.marker(wedding.reception.coords, { icon: dropIcon })
          .addTo(map)
          .bindPopup(
            `<strong>${wedding.reception.name}</strong><br/>${wedding.reception.address}`,
          )
      }
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className="w-full h-[420px] rounded-sm border border-gold/30 overflow-hidden"
        aria-label="Mapa de la ceremonia y recepción"
        role="region"
      />
      <style>{`
        .leaflet-container {
          filter: sepia(0.45) saturate(0.7) contrast(1.05) hue-rotate(-8deg);
          font-family: var(--font-serif);
          background: #ECE3CF;
        }
        .vintage-pin { position: relative; }
        .vintage-pin-dot {
          display: block;
          width: 16px; height: 16px;
          background: #8C2E2A;
          border: 2px solid #F5EFE3;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          margin-left: 4px;
        }
      `}</style>
      <p className="text-xs text-ink-soft italic text-center mt-3">
        Si no puedes ver el mapa,{' '}
        <a
          className="underline decoration-gold"
          href={`https://maps.google.com/?q=${wedding.ceremony.coords[0]},${wedding.ceremony.coords[1]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          ábrelo en Google Maps
        </a>
        .
      </p>
    </div>
  )
}
