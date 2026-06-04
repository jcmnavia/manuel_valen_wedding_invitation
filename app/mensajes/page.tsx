import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { getSupabase, type GuestMessage } from '@/lib/supabase'
import { MessageForm } from './MessageForm'
import { MessageList } from './MessageList'

export const metadata = {
  title: 'Mensajes · Manuel & Valentina',
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
            Mensajes
          </h1>
          <p className="font-script text-3xl text-ink-soft mt-4">
            para los novios
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <p className="text-center text-lg leading-relaxed text-ink-soft max-w-xl mx-auto italic mb-12">
          Tu cariño, un consejo o un buen deseo: deja aquí unas palabras que
          Manuel y Valentina guardarán para siempre.
        </p>

        <section className="mb-20">
          <MessageForm />
          {!available && (
            <p className="mt-6 text-center text-sm text-ink-soft italic">
              El muro de mensajes estará disponible muy pronto.
            </p>
          )}
        </section>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={1} />
        </div>

        <section>
          <h2 className="font-display tracking-[0.4em] text-xs text-wine uppercase text-center mb-10">
            Lo que nos han dejado
          </h2>
          <MessageList messages={messages} />
        </section>
      </main>
    </>
  )
}
