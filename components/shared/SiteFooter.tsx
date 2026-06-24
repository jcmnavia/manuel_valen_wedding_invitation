import Image from 'next/image'

/**
 * Site footer — closes every page with the couple's monogram crest (the wine
 * V|M-in-a-laurel mark). Quiet, centered, on the same cream as the rest of the
 * site.
 */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-sage/30 bg-ivory">
      <div className="paper-texture absolute inset-0 opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-2xl px-6 py-16 md:py-20 text-center">
        {/* Monogram crest */}
        <Image
          src="/ornaments/monogram.png"
          alt="Monograma de Valentina y Manuel"
          width={1024}
          height={1024}
          className="mx-auto h-24 w-auto md:h-28 opacity-90"
        />

        {/* sage hairline close */}
        <div className="mx-auto mt-8 h-px w-16 bg-sage/40" />
      </div>
    </footer>
  )
}
