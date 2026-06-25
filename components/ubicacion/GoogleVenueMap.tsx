import { wedding } from '@/content/wedding'

/**
 * Google Maps embed for the venue. Uses the keyless embed endpoint
 * (`output=embed`), which resolves the pin from a text query — more reliable
 * than raw coordinates for a named venue. Framed and sepia-toned to match the
 * heirloom look of the rest of the site.
 */
const query = encodeURIComponent(wedding.venue.mapsQuery)
const embedSrc = `https://www.google.com/maps?q=${query}&z=15&output=embed`
const openHref = `https://www.google.com/maps/search/?api=1&query=${query}`

export function GoogleVenueMap() {
  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-sm border border-sage/40 shadow-[0_18px_40px_-20px_rgba(31,26,20,0.3)]">
        <iframe
          title={`Mapa de ${wedding.venue.name}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full h-[420px] md:h-[460px] block"
          style={{
            border: 0,
            // Warm the Google map slightly so it sits in the palette
            filter: 'sepia(0.28) saturate(0.85) contrast(1.02)',
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center">
        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-wine text-ivory hover:bg-wine-deep transition-colors duration-500 font-display tracking-[0.25em] text-xs uppercase"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Ver en Google Maps
        </a>
      </div>
    </div>
  )
}
