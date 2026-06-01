import Link from 'next/link'

type Props = {
  label: string
  name: string
  address: string
  time: string
  mapsHref: string
}

export function VenueCard({ label, name, address, time, mapsHref }: Props) {
  return (
    <article className="relative bg-cream/60 border border-gold/30 rounded-sm p-8 md:p-10 text-center shadow-[0_18px_40px_-20px_rgba(31,26,20,0.25)]">
      <p className="font-display tracking-[0.4em] text-xs text-gold uppercase">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-ink mt-4 mb-3">
        {name}
      </h2>
      <p className="text-ink-soft italic">{address}</p>
      <p className="font-display tracking-[0.3em] text-sm text-ink mt-6 uppercase">
        {time} h
      </p>
      <Link
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 px-6 py-3 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.25em] text-xs uppercase"
      >
        Cómo llegar
      </Link>
    </article>
  )
}
