export const dressCode = {
  title: 'Código de Vestimenta',
  formality: 'Formal — Black Tie',
  intro:
    'Queremos que esta noche sea inolvidable. Te pedimos vestirte para la ocasión: ellos en traje oscuro o smoking; ellas en vestido largo o de cóctel elegante.',
  recommendedPalette: [
    { name: 'Esmeralda', hex: '#1F4D3D' },
    { name: 'Rosa empolvado', hex: '#C9A6A1' },
    { name: 'Crema', hex: '#ECE3CF' },
    { name: 'Carbón', hex: '#2E2A26' },
    { name: 'Oro envejecido', hex: '#B08D57' },
  ],
  avoid: ['Blanco', 'Marfil', 'Beige muy claro'],
  notes: 'Tacones cómodos recomendados — parte del jardín es de césped.',
} as const

export type DressCode = typeof dressCode
