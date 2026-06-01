import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { PaletteSwatches } from '@/components/dress-code/PaletteSwatches'
import { AvoidColors } from '@/components/dress-code/AvoidColors'
import { AttireSilhouettes } from '@/components/dress-code/AttireSilhouettes'
import { dressCode } from '@/content/dressCode'

export const metadata = {
  title: 'Código de Vestimenta · Manuel & Valentina',
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
          <p className="font-script text-3xl text-ink-soft mt-4">
            {dressCode.formality}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <p className="text-center text-lg leading-relaxed text-ink-soft max-w-xl mx-auto italic mb-20">
          {dressCode.intro}
        </p>

        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Paleta sugerida
          </h2>
          <PaletteSwatches />
        </section>

        <div className="flex justify-center mb-24">
          <OrnamentalDivider variant={1} />
        </div>

        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Colores a evitar
          </h2>
          <AvoidColors />
        </section>

        <div className="flex justify-center mb-20">
          <OrnamentalDivider variant={2} />
        </div>

        <section className="mb-16">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            La etiqueta
          </h2>
          <AttireSilhouettes />
        </section>

        <p className="text-center text-base text-ink-soft italic max-w-md mx-auto">
          {dressCode.notes}
        </p>
      </main>
    </>
  )
}
