'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { wedding } from '@/content/wedding'

/**
 * Opening composition: the couple's real wax seal + their monogram.
 *
 * The seal is the photographed terracotta-wine wax stamp ("Valentina & Manuel"
 * arched over a V|M monogram in a laurel wreath). The data-monogram-seal hook is
 * kept on the wrapper so the scene animation still finds it.
 */
export const MonogramSeal = forwardRef<HTMLDivElement>(function MonogramSeal(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      data-monogram-root
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
    >
      {/* Real wax seal. The PNG carries its own soft shadow + sheen; a gentle
          extra drop-shadow lets it sit on the cream without looking pasted. */}
      <div
        data-monogram-seal
        className="relative h-44 w-44 md:h-52 md:w-52 drop-shadow-[0_18px_34px_rgba(94,39,48,0.32)]"
      >
        <Image
          src="/ornaments/monogram wax seal.png"
          alt="Sello de cera de Valentina y Manuel"
          fill
          sizes="(min-width: 768px) 208px, 176px"
          className="object-contain"
          priority
        />
      </div>

      {/* Couple monogram / names */}
      <p className="mt-8 font-script text-5xl md:text-7xl text-ink">
        {wedding.brideName} &amp; {wedding.groomName}
      </p>
      <p className="mt-3 font-display tracking-[0.45em] text-xs md:text-sm text-wine uppercase">
        {wedding.dateRoman}
      </p>
    </div>
  )
})
