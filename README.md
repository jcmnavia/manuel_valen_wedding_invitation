# Manuel & Valentina — Wedding Site

A romantic-vintage wedding website with a scroll-driven envelope-opening cinematic. Spanish-language, three pages, deployed on Vercel.

## Stack

- **Next.js 16** (App Router) on Vercel
- **GSAP 3 + ScrollTrigger** for the home-page pinned scroll cinematic (free for commercial use as of April 2025)
- **Motion** (Framer Motion v12) for UI micro-interactions
- **Lenis** for buttery smooth scroll
- **Tailwind CSS v4** with a custom palette (ivory, ink, gold leaf, wax red)
- **TypeScript** (strict)
- **Leaflet + OpenStreetMap** with a sepia filter for the vintage venue map
- Fonts via `next/font/google`: Cormorant Garamond (body), Italiana (display), Mrs Saint Delafield (script)

## Pages

| Route | Purpose |
|---|---|
| `/` | Envelope cinematic → couple story → invitation reveal |
| `/codigo-de-vestimenta` | Dress code: palette, colors to avoid, attire silhouettes |
| `/ubicacion` | Ceremony & reception venues + sepia map |

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content

All copy lives in typed modules under `content/`:

- `content/wedding.ts` — names, date, ceremony/reception venues, coordinates
- `content/story.ts` — relationship milestones (year, title, body, polaroid, caption, rotation)
- `content/dressCode.ts` — palette, colors to avoid, notes

Replace polaroid photos in `public/photos/polaroid-{1..4}.jpg` (keep filenames). They get a sepia/contrast filter applied at render time, so any vintage-leaning photo works.

## Deploying

```bash
npm i -g vercel        # one-time
vercel login
vercel deploy          # preview deploy
vercel deploy --prod   # production
```

## Accessibility

- `lang="es"` on `<html>`
- `prefers-reduced-motion: reduce` is honored — Lenis is disabled, the envelope is shown already open, scroll-pinned animations are skipped, all content remains reachable as a normal scroll page
- Decorative SVGs are `aria-hidden`
- Map has a "Abrir en Google Maps" fallback link
- Color contrast: ink-on-ivory ≥ 7:1

## File structure

```
app/                          # Next App Router pages
  layout.tsx                  # html, fonts, providers
  page.tsx                    # home (envelope)
  codigo-de-vestimenta/
  ubicacion/
components/
  envelope/                   # the cinematic
  shared/                     # NavBar, PaperBackground, OrnamentalDivider, PolaroidFrame
  dress-code/
  ubicacion/
  motion/                     # SmoothScrollProvider
content/                      # typed content modules
lib/
  gsap.ts                     # registers ScrollTrigger
  prefersReducedMotion.ts
public/
  textures/                   # paper grain SVG
  ornaments/                  # divider SVGs
  photos/                     # placeholder polaroids
docs/superpowers/
  specs/                      # design doc
  plans/                      # implementation plan
```
