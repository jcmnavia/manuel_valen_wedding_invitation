import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { VenueCard } from '@/components/ubicacion/VenueCard'
import { GoogleVenueMap } from '@/components/ubicacion/GoogleVenueMap'
import { wedding } from '@/content/wedding'

export const metadata = {
  title: 'Ubicación · Manuel & Valentina',
}

const venueQuery = encodeURIComponent(wedding.venue.mapsQuery)
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${venueQuery}`

const arrivalSteps = [
  {
    from: 'Desde El Poblado',
    detail:
      'Toma la Av. Las Vegas o la Av. El Poblado hacia el sur hasta Envigado. Sube por la Loma de El Escobero (Cra. 27B / Calle 36 Sur) y continúa el ascenso siguiendo las indicaciones hacia Fábula. Unos 25–35 minutos según el tráfico.',
  },
  {
    from: 'Desde el centro de Medellín',
    detail:
      'Toma la Regional sentido sur, sal hacia Envigado y conéctate con la Loma de El Escobero. Sube la loma hasta llegar al recinto. Calcula 35–45 minutos.',
  },
  {
    from: 'Desde el Aeropuerto José María Córdova (Rionegro)',
    detail:
      'Toma la vía Las Palmas sentido Medellín y desvía hacia Envigado / El Escobero. El trayecto toma aproximadamente 45–55 minutos.',
  },
]

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
            {wedding.venue.name}
          </p>
          <p className="text-ink-soft italic mt-2">
            {wedding.venue.address} · {wedding.region}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        {/* Ceremony + reception are the same venue, different times */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <VenueCard
            label="Ceremonia"
            name={wedding.ceremony.name}
            address={wedding.ceremony.address}
            time={wedding.ceremony.time}
            mapsHref={directionsHref}
          />
          <VenueCard
            label="Recepción"
            name={wedding.reception.name}
            address={wedding.reception.address}
            time={wedding.reception.time}
            mapsHref={directionsHref}
          />
        </section>

        <section className="mb-20">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-8">
            En el mapa
          </h2>
          <GoogleVenueMap />
        </section>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={1} />
        </div>

        {/* Turn-by-turn arrival guidance */}
        <section className="max-w-2xl mx-auto">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Cómo llegar
          </h2>
          <ul className="space-y-8">
            {arrivalSteps.map((step) => (
              <li key={step.from} className="text-center md:text-left">
                <p className="font-display tracking-[0.25em] text-sm text-ink uppercase mb-2">
                  {step.from}
                </p>
                <p className="text-ink-soft leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gold text-ivory hover:bg-gold-dim transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
            >
              Abrir indicaciones en Google Maps
            </a>
          </div>
        </section>

        <section className="mt-20 text-center max-w-xl mx-auto">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase mb-4">
            Recomendaciones
          </h2>
          <p className="text-ink-soft italic leading-relaxed">
            El lugar está en lo alto de la loma, así que el clima puede ser fresco
            al caer la tarde — trae un abrigo ligero. Hay zona de parqueo en el
            recinto. La vía de subida es estrecha en algunos tramos; te
            recomendamos salir con tiempo y, si puedes, compartir vehículo.
          </p>
        </section>
      </main>
    </>
  )
}
