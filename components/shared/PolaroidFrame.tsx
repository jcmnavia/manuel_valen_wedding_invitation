import Image from 'next/image'

type Orientation = 'square' | 'portrait' | 'landscape'

type Props = {
  src: string
  alt: string
  caption: string
  rotation?: number
  tapeColor?: 'cream' | 'gold'
  orientation?: Orientation
  className?: string
  priority?: boolean
  /** Render the photo in black & white instead of the warm sepia tone. */
  grayscale?: boolean
}

const tapeStyles: Record<NonNullable<Props['tapeColor']>, string> = {
  cream: 'bg-[rgba(236,227,207,0.85)]',
  // "gold" tape retoned to soft Eucalipto sage to match the wedding palette
  gold: 'bg-[rgba(139,165,151,0.55)]',
}

/**
 * Inner photo dimensions per orientation. The cream Polaroid board (p-3 / pb-12)
 * frames whatever size we give it, so the whole frame grows with the photo.
 */
const frameSize: Record<Orientation, { w: number; h: number; sizes: string }> = {
  square: { w: 260, h: 260, sizes: '260px' },
  portrait: { w: 264, h: 344, sizes: '264px' },
  landscape: { w: 332, h: 236, sizes: '332px' },
}

export function PolaroidFrame({
  src,
  alt,
  caption,
  rotation = 0,
  tapeColor = 'cream',
  orientation = 'square',
  className = '',
  priority = false,
  grayscale = false,
}: Props) {
  const { w, h, sizes } = frameSize[orientation]

  // Softened B&W for the history photos (80% desaturation, gentler contrast so
  // blacks/whites aren't stark); warm sepia everywhere else.
  const photoFilter = grayscale
    ? 'grayscale-[0.8] contrast-[0.96] brightness-[1.0]'
    : 'sepia-[.35] contrast-[1.05] brightness-[0.96]'

  return (
    <figure
      className={`relative inline-block bg-[#FBF6EA] p-3 pb-12 shadow-[0_18px_40px_-16px_rgba(31,26,20,0.35),0_4px_12px_-2px_rgba(31,26,20,0.15)] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 ${tapeStyles[tapeColor]} skew-y-[-2deg] opacity-90`}
      />
      <div
        className="relative overflow-hidden"
        style={{ width: w, height: h, maxWidth: '100%' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${photoFilter}`}
        />
      </div>
      <figcaption className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  )
}
