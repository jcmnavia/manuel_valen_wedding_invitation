export type StoryMilestone = {
  year: string
  title: string
  body: string
  rotation: number
  tapeColor: 'cream' | 'gold'
  photo: string
  caption: string
}

export const story: readonly StoryMilestone[] = [
  {
    year: '2019',
    title: 'Cómo nos conocimos',
    body: 'Una tarde de octubre en una cafetería de Barranco. Ella pidió un café cargado; él, un té de jazmín. Hablamos hasta que cerraron.',
    rotation: -2.5,
    tapeColor: 'cream',
    photo: '/photos/polaroid-1.jpg',
    caption: 'Octubre, 2019',
  },
  {
    year: '2021',
    title: 'El primer viaje',
    body: 'Cusco. Lluvia inesperada en Machu Picchu, un paraguas compartido, y una promesa silenciosa de no soltarnos la mano.',
    rotation: 1.8,
    tapeColor: 'gold',
    photo: '/photos/polaroid-2.jpg',
    caption: 'Cusco · 2021',
  },
  {
    year: '2024',
    title: 'La propuesta',
    body: 'Diciembre en Paracas. El sol se ponía sobre el mar cuando Manuel sacó la cajita. Valentina lloró antes de que él dijera una palabra.',
    rotation: -1.2,
    tapeColor: 'cream',
    photo: '/photos/polaroid-3.jpg',
    caption: 'Paracas · 2024',
  },
  {
    year: '2026',
    title: 'Y ahora...',
    body: 'Queremos celebrar este nuevo capítulo contigo. Acompáñanos a decir: para siempre.',
    rotation: 2.0,
    tapeColor: 'gold',
    photo: '/photos/polaroid-4.jpg',
    caption: 'Para siempre',
  },
] as const
