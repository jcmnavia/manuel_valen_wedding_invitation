# Message Wall — Design Spec

Date: 2026-06-03
Status: Approved (design); pending spec review

## Goal

A public "muro de mensajes" where any wedding guest can leave a short message and
their name for Manuel & Valentina. Messages persist in a database and display on a
dedicated `/mensajes` page, styled to match the site's heirloom aesthetic.

## Decisions (locked)

- **Storage:** Supabase (Postgres). Chosen over Neon for the moderation dashboard
  (a public write surface needs an easy way to delete spam) and simple SQL access.
- **Visibility:** Messages appear immediately after posting (no approval queue).
  Moderation is manual, by deleting rows in the Supabase dashboard.
- **Placement:** A new route, `/mensajes`, with a nav link, alongside
  `/codigo-de-vestimenta` and `/ubicacion`.
- **Architecture:** Server Component for reads + Server Action for writes. The
  Supabase **service-role key stays on the server**; nothing privileged ships to
  the browser. No browser Supabase client, no realtime in v1.
- **Fields:** name + message only (a warm guestbook signature). No relationship
  tag, no displayed timestamp in v1 (timestamp is stored for ordering).

## Data model

Single table `public.messages`:

| column       | type          | constraints / default                  |
|--------------|---------------|----------------------------------------|
| `id`         | `uuid`        | primary key, default `gen_random_uuid()` |
| `name`       | `text`        | not null, length 1–80 (enforced app-side; DB `check` as backstop) |
| `body`       | `text`        | not null, length 1–500 (enforced app-side; DB `check` as backstop) |
| `created_at` | `timestamptz` | not null, default `now()`              |

Index: `create index messages_created_at_idx on public.messages (created_at desc);`
(supports the ordered list query).

### RLS

Row-Level Security is **enabled** on the table with **no public policies**. Because
all access goes through the server using the service-role key (which bypasses RLS),
enabling RLS with no policies means the public `anon` key cannot read or write the
table even if it were ever exposed. This is a safety backstop, not the primary
access control.

## SQL to provision (run in Supabase SQL editor)

```sql
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

alter table public.messages enable row level security;
-- No policies on purpose: only the server (service-role key) may read/write.
```

## Environment variables

| var | where | purpose |
|-----|-------|---------|
| `SUPABASE_URL` | `.env.local` + Vercel (Production/Preview) | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` + Vercel (Production/Preview) | server-only key, bypasses RLS |

Both are **server-only** (no `NEXT_PUBLIC_` prefix) so they are never bundled into
client JS. `.env.local` is already git-ignored.

The owner (user) creates the Supabase project and supplies these two values; the
agent cannot create the project. If keys are absent at build/runtime, the page must
degrade gracefully (see Error handling).

## Components & data flow

### `lib/supabase.ts`
A tiny server-only helper that constructs a Supabase client from `SUPABASE_URL` +
`SUPABASE_SERVICE_ROLE_KEY` using `@supabase/supabase-js`. Exposes a function (e.g.
`getSupabase()`) that returns the client, or `null` if env vars are missing (so
callers can degrade rather than throw). Never imported by a client component.

### Write — Server Action `app/mensajes/actions.ts` → `submitMessage(formData)`
1. Read `name`, `body`, and the honeypot field (`apodo`) from `formData`.
2. If the honeypot is non-empty → return success silently without inserting (bot).
3. Trim `name`/`body`. Validate: name 1–80, body 1–500 after trim. On failure,
   return a typed error result `{ ok: false, error: '...' }` (Spanish message).
4. Insert `{ name, body }` via the server Supabase client.
5. On DB error → return `{ ok: false, error: '...' }` (generic, Spanish).
6. On success → `revalidatePath('/mensajes')` and return `{ ok: true }`.

The action returns a small result object consumed by a client form component via
`useActionState` so the UI can show validation/thank-you states without a full
navigation. (Progressive enhancement: the form still posts and works without JS.)

### Read — `app/mensajes/page.tsx` (Server Component)
- Calls `getSupabase()`; if null, render the page with the form and an inline
  "comments temporarily unavailable" note (still let users see the page).
- Otherwise `select id, name, body, created_at from messages order by created_at
  desc limit 200`.
- Render the wall from the result. Empty result → friendly empty state.

### Form — `app/mensajes/MessageForm.tsx` (Client Component)
- `'use client'`, uses `useActionState(submitMessage, initialState)`.
- Fields: `name` (input, maxLength 80), `body` (textarea, maxLength 500), a visually
  hidden honeypot input named `apodo` (`tabindex=-1`, `autocomplete=off`,
  aria-hidden), and a submit button "Firmar".
- Shows inline validation errors and a thank-you confirmation on `{ ok: true }`,
  then resets the fields.
- Disabled/pending state while the action runs, driven by the `isPending` flag
  from `useActionState` (single source of truth; no separate `useFormStatus`).

### Wall — `app/mensajes/MessageList.tsx` (Server Component, presentational)
- Receives the messages array, renders each as a guestbook note: cream background,
  1px sage border, the name as a wine label or script, the body in italic Cormorant
  ink. Slight visual variety acceptable but no per-item DB timestamp shown in v1.

## Styling (heirloom system)

Matches existing pages: ivory canvas, Italiana display heading "Mensajes", wine
eyebrow + sage `OrnamentalDivider`, wine primary button, italic ink body. Reuse
`NavBar`, `OrnamentalDivider`. Reduced-motion safe (no scroll-pinned animation on
this page; simple `useInView` fades at most).

## Navigation

Add `{ href: '/mensajes', label: 'Mensajes' }` to:
- `components/shared/NavBar.tsx` (the `links` array used on subpages), and
- `components/envelope/EnvelopeScene.tsx` (`PostEnvelopeNavRoot`, the post-envelope
  home nav) for consistency.

## Anti-spam (v1, invisible)

- Honeypot field (`apodo`): drop submissions that fill it.
- Length caps (client `maxLength` + server validation + DB `check`).
- Trim whitespace; reject empty after trim.

Explicitly **out of scope for v1**: CAPTCHA, rate limiting, profanity filter,
approval queue. Can be added later if abuse appears. If we later add rate limiting,
Upstash Redis (Vercel Marketplace) is the natural fit.

## Error handling

- Missing env (no Supabase): page renders, form is shown but the action returns a
  friendly "no disponible por ahora" error; the list area shows an unavailable note.
  No crash, no 500.
- DB insert error: action returns a generic Spanish error; form stays filled so the
  guest can retry.
- Validation error: inline Spanish messages under the relevant field.
- All copy in Spanish, tú-form, consistent with the rest of the site.

## Testing / verification

- Local: set `.env.local`, run dev, submit a message, confirm it appears after
  revalidate; confirm honeypot path drops a filled-honeypot submission; confirm
  length validation rejects over-long input; confirm empty-state with no rows.
- `npm run build` passes (types + prerender). `/mensajes` is dynamic (DB-backed),
  not statically prerendered — verify it builds as a dynamic route without error.
- Graceful degradation: temporarily unset env, confirm page still renders.

## Dependencies

Add `@supabase/supabase-js`. (Note: `leaflet` remains in package.json from the
retired VintageMap; unrelated to this work, left as-is.)

## Out of scope

Realtime updates, likes/reactions, editing/deleting from the UI, pagination beyond
the 200-row cap, email notifications, RSVP. These are not part of v1.
