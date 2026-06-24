/**
 * Photos for the home "Nos casamos!" carousel.
 *
 * Files live in /public/photos/carousel as 01.jpeg … 13.jpeg — the array order
 * IS the slideshow order. To reorder or drop one, rename the files (or edit this
 * list). All are rendered object-cover, so portrait and landscape both fill the
 * frame (landscapes crop).
 */
export type CarouselPhoto = {
  src: string
  alt: string
}

const COUNT = 8

export const carouselPhotos: readonly CarouselPhoto[] = Array.from(
  { length: COUNT },
  (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      src: `/photos/carousel/${n}.jpeg`,
      alt: `Valentina y Manuel — foto ${i + 1}`,
    }
  },
)
