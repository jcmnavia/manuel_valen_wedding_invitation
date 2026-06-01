import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { VenueCard } from '@/components/ubicacion/VenueCard'
import { VintageMap } from '@/components/ubicacion/VintageMap'
import { wedding } from '@/content/wedding'

export const metadata = {
  title: 'Ubicación · Manuel & Valentina',
}

const ceremoniaMaps = `https://maps.google.com/?q=${wedding.ceremony.coords[0]},${wedding.ceremony.coords[1]}`
const recepcionMaps = `https://maps.google.com/?q=${wedding.reception.coords[0]},${wedding.reception.coords[1]}`

export default function UbicacionPage() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-gold uppercase">
            Dónde celebrar
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ink mt-6">
            Ubicación
          </h1>
          <p className="font-script text-3xl text-ink-soft mt-4">
            {wedding.ceremony.name}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <VenueCard
            label="Ceremonia"
            name={wedding.ceremony.name}
            address={wedding.ceremony.address}
            time={wedding.ceremony.time}
            mapsHref={ceremoniaMaps}
          />
          <VenueCard
            label="Recepción"
            name={wedding.reception.name}
            address={wedding.reception.address}
            time={wedding.reception.time}
            mapsHref={recepcionMaps}
          />
        </section>

        <section>
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-8">
            En el mapa
          </h2>
          <VintageMap />
        </section>

        <section className="mt-20 text-center max-w-xl mx-auto">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase mb-4">
            Recomendaciones
          </h2>
          <p className="text-ink-soft italic leading-relaxed">
            Hay estacionamiento disponible en el lugar. Para quienes vengan desde el
            centro, recomendamos salir con al menos 60 minutos de anticipación.
          </p>
        </section>
      </main>
    </>
  )
}
