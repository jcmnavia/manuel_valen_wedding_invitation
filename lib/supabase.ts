import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client built from the service-role key.
 *
 * The service-role key bypasses Row-Level Security and must NEVER reach the
 * browser — the `server-only` import above makes bundling this into client code
 * a build error. Returns `null` when the env vars are absent so callers can
 * degrade gracefully (render the page, show an "unavailable" note) instead of
 * throwing.
 */
let cached: SupabaseClient | null | undefined

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached

  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    cached = null
    return cached
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

export type GuestMessage = {
  id: string
  name: string
  body: string
  created_at: string
}
