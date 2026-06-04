export type StoryMilestone = {
  /** Short eyebrow label (a chapter marker, not a literal date). */
  year: string
  title: string
  body: string
  rotation: number
  tapeColor: 'cream' | 'gold'
  photo: string
  /** Square = 1:1, portrait = taller, landscape = wider. Drives the Polaroid frame. */
  orientation: 'square' | 'portrait' | 'landscape'
  caption: string
}

export const story: readonly StoryMilestone[] = [
  {
    year: 'El comienzo',
    title: 'Así empezó',
    body: 'Caminando sin rumbo, riéndonos de nada en particular. Bastó una tarde para saber que queríamos muchas más. Desde entonces, cualquier camino es mejor si lo recorremos juntos.',
    rotation: -2.5,
    tapeColor: 'cream',
    photo: '/photos/story-walking.jpg',
    orientation: 'portrait',
    caption: 'Donde todo empezó',
  },
  {
    year: 'Nuestro mundo',
    title: 'De la mano',
    body: 'Aprendimos a mirar hacia arriba juntos: los árboles, el cielo, lo que viene. Espalda con espalda, sosteniéndonos, descubrimos que el mundo es más grande de a dos.',
    rotation: 1.8,
    tapeColor: 'gold',
    photo: '/photos/story-canopy.jpg',
    orientation: 'landscape',
    caption: 'Mirando hacia adelante',
  },
  {
    year: 'El sí',
    title: 'Dijimos que sí',
    body: 'Con los pies en la arena y el mar de testigo, una rodilla en el suelo y un anillo lo dijeron todo. No hizo falta un gran discurso: solo nosotros, ese sí, y la certeza de toda una vida por delante.',
    rotation: -1.2,
    tapeColor: 'cream',
    photo: '/photos/proposal.jpeg',
    orientation: 'portrait',
    caption: 'Y dijimos que sí',
  },
  {
    year: 'Y ahora...',
    title: 'Lo que viene',
    body: 'Hoy empieza el capítulo más esperado, y queremos vivirlo contigo. Acompáñanos a celebrar el amor que nos trajo hasta aquí y a decir, juntos: para siempre.',
    rotation: 2.0,
    tapeColor: 'gold',
    photo: '/photos/story-gaze.jpg',
    orientation: 'portrait',
    caption: 'Para siempre',
  },
] as const
