import { NavBar } from '@/components/shared/NavBar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import {
  PinterestBoard,
  PinterestEmbedStyles,
} from '@/components/dress-code/PinterestBoard'
import { AvoidColors } from '@/components/dress-code/AvoidColors'
import { ColorPalette } from '@/components/dress-code/ColorPalette'
import { AttireSilhouettes } from '@/components/dress-code/AttireSilhouettes'
import { dressCode } from '@/content/dressCode'

export const metadata = {
  title: 'Código de Vestuario · Valentina & Manuel',
}

export default function DressCodePage() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-gold uppercase">
            Para la ocasión
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-wine uppercase mt-6">
            {dressCode.title}
          </h1>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <p className="text-center text-lg leading-relaxed text-ink-soft max-w-xl mx-auto italic mb-20">
          {dressCode.intro}
        </p>

        {/* 1 — Colores a evitar */}
        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Colores a evitar
          </h2>
          <AvoidColors />
        </section>

        <div className="flex justify-center mb-20">
          <OrnamentalDivider variant={2} />
        </div>

        {/* 2 — La etiqueta (animated silhouettes) */}
        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            La etiqueta
          </h2>
          <AttireSilhouettes />
        </section>

        <div className="flex justify-center mb-20">
          <OrnamentalDivider variant={2} />
        </div>

        {/* Colores sugeridos: Ellas, then Ellos. Each board carries its own
            suggested-color palette above it. */}
        <section className="mb-16">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-12">
            Colores sugeridos
          </h2>

          <PinterestEmbedStyles />
          <div className="space-y-24">
            {dressCode.inspirationBoards.map((board) => (
              <div key={board.url} className="flex w-full flex-col items-center">
                {/* group label (Ellas / Ellos), then its palette, then the board */}
                <p className="font-display text-2xl md:text-3xl text-ink-soft mb-8 text-center">
                  {board.label}
                </p>
                <div className="mb-12 w-full">
                  <ColorPalette colors={board.palette} />
                </div>
                <PinterestBoard boardUrl={board.url} />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        {/* Recomendaciones */}
        <section className="text-center max-w-xl mx-auto">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase mb-6">
            Recomendaciones
          </h2>
          <p className="text-base md:text-lg text-ink-soft italic leading-relaxed">
            {dressCode.notes}
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
