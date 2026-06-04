import type { GuestMessage } from '@/lib/supabase'

/**
 * The wall of messages, rendered server-side. Each message is a guestbook note:
 * cream card, sage hairline border, the name as a script signature, the body in
 * italic ink. A masonry-ish column layout keeps it from feeling like a rigid grid.
 */
export function MessageList({ messages }: { messages: GuestMessage[] }) {
  if (messages.length === 0) {
    return (
      <p className="text-center text-ink-soft italic mt-4">
        Aún no hay mensajes. Sé el primero en dejar unas palabras.
      </p>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 gap-6 [column-fill:_balance]">
      {messages.map((m) => (
        <figure
          key={m.id}
          className="mb-6 break-inside-avoid bg-cream/60 border border-sage/40 rounded-sm px-6 py-6 shadow-[0_14px_30px_-18px_rgba(31,26,20,0.25)]"
        >
          <blockquote className="font-serif italic text-lg text-ink leading-relaxed">
            {m.body}
          </blockquote>
          <figcaption className="mt-4 font-script text-2xl text-wine text-right">
            {m.name}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
