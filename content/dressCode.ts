export const dressCode = {
  title: 'Código de Vestimenta',
  formality: 'Formal — Black Tie',
  intro:
    'Queremos que esta noche sea inolvidable. Te pedimos vestirte para la ocasión: ellos en traje oscuro o smoking; ellas en vestido largo o de cóctel elegante.',
  recommendedPalette: [
    { name: 'Palo de rosa', hex: '#D8B4B0' },
    { name: 'Wine', hex: '#7B3540' },
    { name: 'Durazno', hex: '#F0C090' },
    { name: 'Naranjado', hex: '#C8682E' },
    { name: 'Eucalipto', hex: '#8BA597' },
    { name: 'Esmeralda', hex: '#2C6B33' },
  ],
  avoid: [
    'Blanco',
    'Marfil',
    'Beige muy claro',
    'Wine',
    'Esmeralda',
    'Azul petróleo',
  ],
  notes: 'Tacones cómodos recomendados — parte del jardín es de césped.',
} as const

export type DressCode = typeof dressCode
