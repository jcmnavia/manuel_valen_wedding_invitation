import Image from 'next/image'

type Props = {
  src: string
  alt: string
  caption: string
  rotation?: number
  tapeColor?: 'cream' | 'gold'
  className?: string
}

const tapeStyles: Record<NonNullable<Props['tapeColor']>, string> = {
  cream: 'bg-[rgba(236,227,207,0.85)]',
  gold: 'bg-[rgba(176,141,87,0.55)]',
}

export function PolaroidFrame({
  src,
  alt,
  caption,
  rotation = 0,
  tapeColor = 'cream',
  className = '',
}: Props) {
  return (
    <figure
      className={`relative inline-block bg-[#FBF6EA] p-3 pb-12 shadow-[0_18px_40px_-16px_rgba(31,26,20,0.35),0_4px_12px_-2px_rgba(31,26,20,0.15)] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 ${tapeStyles[tapeColor]} skew-y-[-2deg] opacity-90`}
      />
      <div className="relative w-[260px] h-[260px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="260px"
          className="object-cover sepia-[.35] contrast-[1.05] brightness-[0.96]"
        />
      </div>
      <figcaption className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  )
}
