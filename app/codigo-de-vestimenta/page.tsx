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
  title: 'Código de Vestimenta · Valentina & Manuel',
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
          <h1 className="font-display text-5xl md:text-7xl text-ink mt-6">
            {dressCode.title}
          </h1>
          <p className="font-display text-3xl text-ink-soft mt-4">
            {dressCode.formality}
          </p>
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

        {/* 3 & 4 — Inspiración: Ellas, then Ellos. Each board carries its own
            allowed-color palette above it. */}
        <section className="mb-16">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-4">
            Inspiración
          </h2>
          <p className="text-xs text-ink-soft italic mb-12 text-center max-w-md mx-auto">
            Inspiración para tu atuendo — guarda tus ideas favoritas en nuestros
            tableros de Pinterest.
          </p>

          <PinterestEmbedStyles />
          <div className="space-y-24">
            {dressCode.inspirationBoards.map((board) => (
              <div key={board.url} className="flex w-full flex-col items-center">
                {/* allowed-color palette for this group, above its board */}
                <div className="mb-12 w-full">
                  <ColorPalette colors={board.palette} />
                </div>
                <PinterestBoard boardUrl={board.url} label={board.label} />
              </div>
            ))}
          </div>
        </section>

        <p className="mt-16 text-center text-base text-ink-soft italic max-w-md mx-auto">
          {dressCode.notes}
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
