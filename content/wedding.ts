export const wedding = {
  brideName: 'Valentina',
  groomName: 'Manuel',
  date: new Date('2026-08-16T16:00:00-05:00'),
  dateDisplay: 'Domingo, 16 de Agosto de 2026',
  dateRoman: 'XVI · VIII · MMXXVI',
  /** City + country, used for the postmark, return address, and metadata. */
  city: 'Envigado',
  region: 'Antioquia, Colombia',
  /**
   * Single venue for ceremony + reception. `mapsQuery` is what we hand to
   * Google Maps (resolving the real pin by name is more reliable than raw
   * coordinates); `coords` is a sensible fallback for "open in Maps" links.
   */
  venue: {
    name: 'Fábula Bodas & Eventos',
    address: 'Loma del Escobero, Envigado',
    mapsQuery: 'Fábula Bodas y Eventos, Loma del Escobero, Envigado, Antioquia',
    coords: [6.1605, -75.543] as [number, number],
  },
  ceremony: {
    name: 'Fábula Bodas & Eventos',
    address: 'Loma del Escobero, Envigado',
    time: '16:00',
    coords: [6.1605, -75.543] as [number, number],
  },
  reception: {
    name: 'Fábula — Recepción',
    address: 'Loma del Escobero, Envigado',
    time: '18:30',
    coords: [6.1605, -75.543] as [number, number],
  },
  hashtag: '#ManuelYValentina2026',
  /** Parents of the couple — shown in the "bendición" blessing section. */
  family: {
    novia: {
      label: 'Padres de la novia',
      names: ['Flor María Bedoya López', 'Fabio Eduardo Fonnegra Tobón'],
    },
    novio: {
      label: 'Padres del novio',
      names: ['Carlos Alberto Sanín Uribe', 'Gloria Victoria Cossio Toro'],
    },
  },
} as const

export type Wedding = typeof wedding
