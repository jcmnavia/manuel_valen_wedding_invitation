'use server'

import { revalidatePath } from 'next/cache'
import { getSupabase } from '@/lib/supabase'

export type SubmitState = {
  // `idle` is the initial state before any submit; ok/error reflect the result.
  status: 'idle' | 'ok' | 'error'
  error?: string
}

const NAME_MAX = 80
const BODY_MAX = 500

/**
 * Server Action: insert one guest message.
 *
 * - Honeypot (`apodo`): if filled, a bot did it — return success without writing.
 * - Validates name (1–80) and body (1–500) after trim.
 * - Inserts via the server-side (service-role) Supabase client.
 * - Revalidates /mensajes so the new message shows on the next render.
 *
 * Returns a typed result consumed by the form via useActionState. The form also
 * works without JS (native POST) thanks to progressive enhancement.
 */
export async function submitMessage(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  // Honeypot — real users never see or fill this field.
  const honeypot = (formData.get('apodo') as string | null)?.trim()
  if (honeypot) {
    return { status: 'ok' }
  }

  const name = ((formData.get('name') as string | null) ?? '').trim()
  const body = ((formData.get('body') as string | null) ?? '').trim()

  if (!name || !body) {
    return { status: 'error', error: 'Escribe tu nombre y un mensaje.' }
  }
  if (name.length > NAME_MAX) {
    return { status: 'error', error: `El nombre es demasiado largo (máx. ${NAME_MAX}).` }
  }
  if (body.length > BODY_MAX) {
    return { status: 'error', error: `El mensaje es demasiado largo (máx. ${BODY_MAX}).` }
  }

  const supabase = getSupabase()
  if (!supabase) {
    return {
      status: 'error',
      error: 'El muro no está disponible por ahora. Inténtalo más tarde.',
    }
  }

  const { error } = await supabase.from('messages').insert({ name, body })
  if (error) {
    return {
      status: 'error',
      error: 'No pudimos guardar tu mensaje. Inténtalo de nuevo.',
    }
  }

  revalidatePath('/mensajes')
  return { status: 'ok' }
}
