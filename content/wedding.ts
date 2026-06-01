export const wedding = {
  brideName: 'Valentina',
  groomName: 'Manuel',
  date: new Date('2026-11-14T17:00:00-05:00'),
  dateDisplay: 'Sábado, 14 de Noviembre de 2026',
  dateRoman: 'XIV · XI · MMXXVI',
  ceremony: {
    name: 'Hacienda San Carlos',
    address: 'Vía Cieneguilla, Km 18, Lima',
    time: '17:00',
    coords: [-12.118, -76.866] as [number, number],
  },
  reception: {
    name: 'Hacienda San Carlos — Salón Jardín',
    address: 'Vía Cieneguilla, Km 18, Lima',
    time: '19:30',
    coords: [-12.118, -76.866] as [number, number],
  },
  hashtag: '#ManuelYValentina2026',
} as const

export type Wedding = typeof wedding
