import { NavBar } from '@/components/shared/NavBar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { GoogleVenueMap } from '@/components/ubicacion/GoogleVenueMap'
import { wedding } from '@/content/wedding'

export const metadata = {
  title: 'Ubicación · Valentina & Manuel',
}

export default function UbicacionPage() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-gold uppercase">
            Dónde celebrar
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-wine uppercase mt-6">
            Ubicación
          </h1>
          <p className="font-display text-3xl text-ink-soft mt-4">
            {wedding.venue.name}
          </p>
          <p className="text-ink-soft italic mt-2">
            {wedding.venue.address} · {wedding.region}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        {/* Ceremony + reception share the same venue — one card, both times */}
        <section className="mb-20 max-w-xl mx-auto">
          <article className="relative bg-cream/60 border border-sage/40 rounded-sm p-8 md:p-10 text-center shadow-[0_18px_40px_-20px_rgba(31,26,20,0.25)]">
            <p className="font-display tracking-[0.4em] text-xs text-gold uppercase">
              Ceremonia y Recepción
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-4 mb-3">
              {wedding.venue.name}
            </h2>
            <p className="text-ink-soft italic">
              {wedding.venue.address} · {wedding.region}
            </p>
            <div className="mt-6 flex items-center justify-center gap-8">
              <div>
                <p className="font-display tracking-[0.3em] text-[11px] text-gold uppercase mb-1">
                  Ceremonia
                </p>
                <p className="font-display tracking-[0.3em] text-sm text-ink uppercase">
                  {wedding.ceremony.time} h
                </p>
              </div>
              <div className="h-8 w-px bg-sage/40" />
              <div>
                <p className="font-display tracking-[0.3em] text-[11px] text-gold uppercase mb-1">
                  Recepción
                </p>
                <p className="font-display tracking-[0.3em] text-sm text-ink uppercase">
                  {wedding.reception.time} h
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="mb-20">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-8">
            En el mapa
          </h2>
          <GoogleVenueMap />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
