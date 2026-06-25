'use client'

import { PhotoFrame } from './PhotoFrame'

const photos = [
  { src: '/photos/us-01.jpeg', alt: 'Valentina y Manuel' },
  { src: '/photos/us-02.jpeg', alt: 'Valentina y Manuel' },
  { src: '/photos/us-03.jpeg', alt: 'Valentina y Manuel' },
]

/**
 * A small, three-photo gallery used to break up the home text — placed between
 * the "16 años" story and the invitation. Three portraits in a row on desktop,
 * stacked on mobile. Each fades in with a slight stagger.
 */
export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
      {photos.map((p, i) => (
        <PhotoFrame
          key={p.src}
          src={p.src}
          alt={p.alt}
          ratio="3/4"
          sizes="(min-width: 768px) 30vw, 90vw"
          delay={i * 0.12}
        />
      ))}
    </div>
  )
}
