import { NavBar } from '@/components/shared/NavBar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { getSupabase, type GuestMessage } from '@/lib/supabase'
import { MessageList } from './MessageList'
import { MessageWallClient } from './MessageWallClient'

export const metadata = {
  title: 'Dedicatorias · Valentina & Manuel',
}

// DB-backed: always render fresh, never statically prerender at build time.
export const dynamic = 'force-dynamic'

async function loadMessages(): Promise<{ messages: GuestMessage[]; available: boolean }> {
  const supabase = getSupabase()
  if (!supabase) return { messages: [], available: false }

  const { data, error } = await supabase
    .from('messages')
    .select('id, name, body, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return { messages: [], available: false }
  return { messages: (data ?? []) as GuestMessage[], available: true }
}

export default async function MensajesPage() {
  const { messages, available } = await loadMessages()

  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-wine uppercase">
            Déjanos unas palabras
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ink mt-6">
            Dedicatorias
          </h1>
          <p className="font-script text-3xl text-ink-soft mt-4">
            para los novios
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <p className="text-center text-lg leading-relaxed text-ink-soft max-w-xl mx-auto italic mb-16">
          Tu cariño, un consejo o un buen deseo: estas son las palabras que
          familiares y amigos le dejan a Valentina y Manuel.
        </p>

        {/* The wall leads the page */}
        <section>
          <MessageList messages={messages} />
          {!available && (
            <p className="mt-6 text-center text-sm text-ink-soft italic">
              El muro de mensajes estará disponible muy pronto.
            </p>
          )}
        </section>
      </main>

      <SiteFooter />

      {/* Floating "Dejar un mensaje" button + form modal */}
      <MessageWallClient />
    </>
  )
}
