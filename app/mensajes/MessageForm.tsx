'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitMessage, type SubmitState } from './actions'

const initialState: SubmitState = { status: 'idle' }

export function MessageForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(
    submitMessage,
    initialState,
  )
  const formRef = useRef<HTMLFormElement | null>(null)

  // Clear the fields after a successful submit so the next guest starts fresh,
  // and notify the parent (e.g. a modal can close itself).
  useEffect(() => {
    if (state.status === 'ok') {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state, onSuccess])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="w-full max-w-xl mx-auto text-left"
      noValidate
    >
      {/* Honeypot: hidden from real users, catches bots that fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="apodo">No llenar este campo</label>
        <input
          id="apodo"
          name="apodo"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label
        htmlFor="name"
        className="block font-display tracking-[0.3em] text-xs text-wine uppercase mb-2"
      >
        Tu nombre
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        maxLength={80}
        autoComplete="name"
        placeholder="Cómo te firmamos"
        className="w-full bg-ivory border border-sage/50 rounded-sm px-4 py-3 text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/40 transition-colors"
      />

      <label
        htmlFor="body"
        className="block font-display tracking-[0.3em] text-xs text-wine uppercase mt-6 mb-2"
      >
        Tu mensaje
      </label>
      <textarea
        id="body"
        name="body"
        required
        maxLength={500}
        rows={4}
        placeholder="Unas palabras para Manuel y Valentina…"
        className="w-full bg-ivory border border-sage/50 rounded-sm px-4 py-3 text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/40 transition-colors resize-y leading-relaxed"
      />

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-10 py-4 bg-wine text-ivory hover:bg-wine-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          {isPending ? 'Enviando…' : 'Firmar'}
        </button>

        {state.status === 'ok' && (
          <p className="font-script text-2xl text-wine">
            ¡Gracias por tus palabras!
          </p>
        )}
        {state.status === 'error' && state.error && (
          <p className="text-sm text-wine-deep italic" role="alert">
            {state.error}
          </p>
        )}
      </div>
    </form>
  )
}
