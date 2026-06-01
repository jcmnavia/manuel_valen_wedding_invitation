# Manuel & Valentina — Wedding Site Design

**Date:** 2026-05-31
**Owner:** jcmnavia@gmail.com
**Status:** Approved

## Purpose

A romantic-vintage wedding website for a couple named Manuel and Valentina. The site greets visitors with an animated paper envelope sealed by a red wax stamp; as the visitor scrolls, the seal cracks, the envelope opens, a letter unfolds, the couple's story scrolls past in polaroid-illustrated milestones, and the page ends on the invitation reveal (date, venue, ceremony details) with onward navigation to two supporting pages.

The site is in Spanish, single-language, deployed on Vercel.

## Audience & Tone

- **Audience:** Wedding guests, all ages, mixed device profiles (heavy mobile share).
- **Tone:** Romantic, vintage, heirloom. Warm ivory paper, sepia photographs, gold-leaf flourishes, deep wax red.
- **Voice (Spanish):** Tú-form, intimate but elegant. No clichés.

## Scope

### In scope

- Home page (`/`) with envelope cinematic, story scroll, invitation reveal.
- Dress code page (`/codigo-de-vestimenta`).
- Location page (`/ubicacion`).
- Shared navigation bar (appears post-envelope on home, persistent on subpages).
- Spanish-only copy. Realistic placeholder content for couple, dates, venues, story milestones.
- Vercel deployment configuration.
- `prefers-reduced-motion` and accessibility compliance.
- Responsive layout: mobile (390px), tablet (768px), desktop (1280px+).

### Out of scope (for this iteration)

- RSVP form / guest management.
- Gift registry.
- Internationalization (English version).
- CMS integration (content lives in typed TypeScript modules).
- Real photos (placeholders shipped; couple supplies later).
- Custom domain configuration (done post-deploy by user).

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC for fast FCP; Vercel-native; modern routing |
| Language | TypeScript (strict) | Type-safe content modules |
| Styling | Tailwind CSS v4 | Utility-first; theme via CSS vars |
| Scroll animation | GSAP 3 + ScrollTrigger | Best-in-class pinning/scrub; 100% free as of April 2025 (Webflow acquisition) |
| UI animation | Motion (Framer Motion v12) | Declarative React state animation for non-scroll micro-interactions |
| Smooth scroll | Lenis | Industry standard; integrates cleanly with ScrollTrigger via the GSAP ticker |
| Fonts | next/font/google: Cormorant Garamond, Italiana, Mrs Saint Delafield | Zero CLS, self-hosted |
| Map | Mapbox GL JS w/ custom muted style **or** Leaflet + OSM sepia | Sepia map preserves the vintage feel. Default: Leaflet + OSM (no API key) |
| Hosting | Vercel | Per project default |
| Deployment config | `vercel.ts` (typed) | Per current Vercel best practice |

### Versions (target)

- Next.js: `^16` (latest)
- React: `^19`
- gsap: `^3.13`
- motion: `^12`
- @studio-freight/lenis: `^1.3` (or current `lenis` package)
- tailwindcss: `^4`
- Node: 24 LTS

## Visual Direction

### Palette (CSS custom properties)

```css
--ivory:    #F5EFE3   /* paper base */
--cream:    #ECE3CF   /* secondary paper */
--ink:      #1F1A14   /* primary text */
--ink-soft: #4A3F2E   /* secondary text */
--gold:     #B08D57   /* gold leaf accents */
--gold-dim: #8C6F40
--wax:      #8C2E2A   /* wax seal red */
--wax-dark: #5C1B19
--shadow:   rgba(31, 26, 20, 0.18)
```

### Typography

- **Display headlines:** Italiana — uppercase wedding-invitation feel.
- **Body:** Cormorant Garamond — warm, vintage serif, very readable.
- **Signatures only:** Mrs Saint Delafield — used sparingly for "Manuel & Valentina" closing flourishes.

### Surface

- Sticky paper-texture overlay across the whole site (low-opacity SVG noise + subtle vignette).
- All non-photo surfaces feel like cream cardstock.
- Gold-leaf SVG ornaments at section corners; never overdone.

## Architecture

### Routes

- `/` — Envelope + story + invitation reveal.
- `/codigo-de-vestimenta` — Dress code page.
- `/ubicacion` — Location page.

(Decision: Spanish-language URL slugs for guest familiarity. Dress code path uses `codigo-de-vestimenta`.)

### Shared layout

```
app/layout.tsx
  ├── <html lang="es">
  ├── PaperBackground (sticky)
  ├── SmoothScrollProvider (Lenis + GSAP ticker)
  ├── NavBar (hidden on / until envelope opens; visible on subpages)
  └── {children}
```

### Home page (`app/page.tsx`)

A single client component, `<EnvelopeScene />`, that owns the scroll-pinned timeline:

```
<EnvelopeScene>
  <Stage>                       # 100vh pinned, lives for ~5x scroll distance
    <Envelope>                  # opacity, scale, 3D flap rotation
      <WaxSeal />               # crack + fragments
    </Envelope>
    <Letter>                    # slides out and unfolds
      <LetterIntro />
      <StoryMilestone year="2019" .../>
      <StoryMilestone year="2021" .../>
      <StoryMilestone year="2024" .../>
      <StoryMilestone year="2026" .../>
      <InvitationReveal />
    </Letter>
  </Stage>
  <PostEnvelopeNav />           # appears at scroll progress > 0.85
</EnvelopeScene>
```

### Animation choreography (scroll progress 0 → 1)

| Progress | Phase | Animation |
|---|---|---|
| 0.00 – 0.05 | Arrival | Envelope `opacity 0→1`, `scale 0.85→0.92`. Hint text "↓ desliza para abrir" fades in then out by 0.10. |
| 0.05 – 0.15 | Lean-in | Envelope `scale 0.92→1.0`. Wax seal: subtle warm glow filter pulse. |
| 0.15 – 0.25 | Crack | SVG path `stroke-dashoffset` drawing the fissure across the seal. Then 3 SVG fragments translate + rotate + fade with gravity easing. Dust particles puff (4 small SVG circles, scale & opacity). |
| 0.25 – 0.40 | Open flap | Top flap rotates `rotateX(0deg → -170deg)` with `transform-origin: top`. Inner paper edge fades in. |
| 0.40 – 0.50 | Letter emerges | Folded letter translates Y from inside envelope, then unfolds: top half rotates `rotateX(-180→0)`, bottom half rotates similarly. Envelope itself fades to background. |
| 0.50 – 0.85 | Story | Letter is now the canvas. Each `<StoryMilestone>` has its own ScrollTrigger that fires as it enters; polaroid does `y: 40→0`, `rotate: -3→2`, `opacity: 0→1` with stagger. Tape strips animate width 0→100%. |
| 0.85 – 1.00 | Invitation reveal | Ornamental divider draws (`stroke-dashoffset`), names fade in word-by-word, date + venue stagger in. `PostEnvelopeNav` rises into place. |

### Reduced-motion fallback

If `(prefers-reduced-motion: reduce)`:
- No pinning, no scrubbing, no Lenis smooth scroll.
- Envelope auto-opens via a 1.2s timeline on mount.
- Story milestones use simple `IntersectionObserver`-based fade-ins (no transforms beyond opacity).
- Navigation appears immediately.

## Components

### `<EnvelopeScene />` (client)

The orchestrator. Owns the master GSAP timeline + ScrollTrigger config. Uses `useGSAP` hook from `@gsap/react` for hot-reload-safe lifecycle.

### `<WaxSeal />`

Self-contained SVG. Accepts a `state` prop: `'intact' | 'cracking' | 'broken'`. The cinematic sets state via a callback at progress thresholds; exposed for testing.

### `<StoryMilestone />`

Props: `year: string`, `title: string`, `body: string`, `photo: StaticImageData`, `rotation: number`, `caption: string`, `tapeColor?: string`. Renders polaroid + text block. Has its own internal ScrollTrigger.

### `<InvitationReveal />`

Props from `content/wedding.ts`. Renders the final letter content + reveal animation.

### `<PolaroidFrame />`

Reusable. Props: `src`, `alt`, `caption`, `rotation`, `tapeColor`. Uses `next/image`. Slight tilt; visible tape strips at top corners.

### `<NavBar />`

Renders 3 links. Has `visible` prop controlled by parent on `/`; defaults to visible on subpages. Cormorant Garamond, gold underline on hover, animated with Motion.

### `<PaperBackground />`

Fixed full-viewport SVG noise overlay + ambient vignette. Persistent across routes via root layout.

### `<SmoothScrollProvider />`

Sets up Lenis, syncs to GSAP ticker, disables itself under reduced-motion. Wraps children.

### `<OrnamentalDivider />`

3 SVG variants. `variant: 1 | 2 | 3`. Optionally `animateOnView: boolean` for stroke-draw animation.

## Content (Spanish placeholders)

All copy lives in typed modules under `content/`.

### `content/wedding.ts`

```ts
export const wedding = {
  brideName: 'Valentina',
  groomName: 'Manuel',
  date: new Date('2026-11-14T17:00:00-05:00'),
  dateDisplay: 'Sábado, 14 de Noviembre de 2026',
  dateRoman: 'XIV · XI · MMXXVI',
  ceremony: {
    name: 'Hacienda San Carlos',
    address: 'Vía Cieneguilla, Km 18, Lima',
    time: '17:00',
    coords: [-12.118, -76.866] as [number, number],
  },
  reception: {
    name: 'Hacienda San Carlos — Salón Jardín',
    address: 'Vía Cieneguilla, Km 18, Lima',
    time: '19:30',
    coords: [-12.118, -76.866] as [number, number],
  },
  hashtag: '#ManuelYValentina2026',
}
```

### `content/story.ts`

```ts
export const story = [
  {
    year: '2019',
    title: 'Cómo nos conocimos',
    body: 'Una tarde de octubre en una cafetería de Barranco. Ella pidió un café cargado; él, un té de jazmín. Hablamos hasta que cerraron.',
    rotation: -2.5,
    tapeColor: 'cream',
  },
  {
    year: '2021',
    title: 'El primer viaje',
    body: 'Cusco. Lluvia inesperada en Machu Picchu, paraguas compartido, y una promesa silenciosa de no soltar la mano del otro.',
    rotation: 1.8,
    tapeColor: 'gold',
  },
  {
    year: '2024',
    title: 'La propuesta',
    body: 'Diciembre en Paracas. El sol se ponía sobre el mar cuando Manuel sacó la cajita. Valentina lloró antes de que él dijera una palabra.',
    rotation: -1.2,
    tapeColor: 'cream',
  },
  {
    year: '2026',
    title: 'Y ahora...',
    body: 'Queremos celebrar este nuevo capítulo contigo. Acompáñanos a decir: para siempre.',
    rotation: 2.0,
    tapeColor: 'gold',
  },
] as const
```

### `content/dressCode.ts`

```ts
export const dressCode = {
  title: 'Código de Vestimenta',
  formality: 'Formal — Black Tie',
  intro: 'Queremos que esta noche sea inolvidable. Te pedimos vestirte para la ocasión.',
  recommendedPalette: [
    { name: 'Esmeralda', hex: '#1F4D3D' },
    { name: 'Rosa empolvado', hex: '#C9A6A1' },
    { name: 'Crema', hex: '#ECE3CF' },
    { name: 'Carbón', hex: '#2E2A26' },
    { name: 'Oro envejecido', hex: '#B08D57' },
  ],
  avoid: ['Blanco', 'Marfil', 'Beige claro'],
  notes: 'Tacones cómodos recomendados — parte del jardín es de césped.',
}
```

## Page Specs

### Home (`/`)

- Fixed 100vh stage with the cinematic.
- Footer ornament + small "scroll para descubrir" hint until first scroll.
- After envelope opens, two CTA cards appear at bottom: "Código de Vestimenta" and "Ubicación".

### Dress code (`/codigo-de-vestimenta`)

- Nav bar visible.
- Hero: Italiana title "Código de Vestimenta", subtitle "Formal — Black Tie".
- Body intro paragraph in Cormorant Garamond, max 60ch.
- **Recommended palette grid:** 5 circular swatches, each animates in on view (stagger 80ms), with name + hex label.
- **"Colores a evitar"** section: subtle, set apart with an ornamental divider.
- Two line-art SVG silhouettes (tuxedo, gown) drawn via `stroke-dasharray` animation on enter view.
- Notes block (tacones, jardín warning).
- Bottom nav: "Volver a la invitación" / "Ver ubicación".

### Location (`/ubicacion`)

- Nav bar visible.
- Hero: Italiana title "Ubicación", venue name in Mrs Saint Delafield as subtitle.
- Two cards side-by-side (stacked on mobile): **Ceremonia** and **Recepción**, each with venue, address, time.
- Map: Leaflet + OSM tiles with a sepia CSS filter overlay (filter: sepia(0.4) contrast(1.05)). Two pins. Custom pin SVG (small wax-red drop). No clutter, no labels beyond venue name.
- "Cómo llegar" button → links to Apple Maps and Google Maps with venue coords.
- Optional notes: parking, accommodation suggestions.

## File Structure

```
manuel-valentina/
├── app/
│   ├── layout.tsx              # html, fonts, providers
│   ├── page.tsx                # home
│   ├── globals.css             # Tailwind, CSS vars, paper texture
│   ├── codigo-de-vestimenta/
│   │   └── page.tsx
│   └── ubicacion/
│       └── page.tsx
├── components/
│   ├── envelope/
│   │   ├── EnvelopeScene.tsx        # 'use client'
│   │   ├── Envelope.tsx
│   │   ├── WaxSeal.tsx
│   │   ├── Letter.tsx
│   │   ├── StoryMilestone.tsx
│   │   └── InvitationReveal.tsx
│   ├── shared/
│   │   ├── NavBar.tsx
│   │   ├── PaperBackground.tsx
│   │   ├── OrnamentalDivider.tsx
│   │   ├── PolaroidFrame.tsx
│   │   └── PostEnvelopeNav.tsx
│   ├── dress-code/
│   │   ├── PaletteSwatches.tsx
│   │   ├── AttireSilhouettes.tsx
│   │   └── AvoidColors.tsx
│   ├── ubicacion/
│   │   ├── VenueCard.tsx
│   │   └── VintageMap.tsx           # 'use client' (Leaflet)
│   └── motion/
│       └── SmoothScrollProvider.tsx # 'use client' (Lenis)
├── content/
│   ├── wedding.ts
│   ├── story.ts
│   └── dressCode.ts
├── lib/
│   ├── gsap.ts                 # registers ScrollTrigger, exports primitives
│   └── prefersReducedMotion.ts # SSR-safe util
├── public/
│   ├── textures/
│   │   └── paper-grain.svg
│   ├── ornaments/
│   │   ├── divider-1.svg
│   │   ├── divider-2.svg
│   │   └── corner.svg
│   └── photos/
│       ├── polaroid-1.jpg
│       ├── polaroid-2.jpg
│       ├── polaroid-3.jpg
│       └── polaroid-4.jpg
├── tailwind.config.ts (or @theme via v4)
├── vercel.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Performance Targets

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Total JS on home (after gzip): ≤ 250 KB (GSAP ~30 KB, ScrollTrigger ~25 KB, Motion ~30 KB, Lenis ~10 KB, React + Next + app).
- LCP: ≤ 2.5s on mid-tier mobile (envelope SVG is inline; no large images blocking).
- CLS: ≤ 0.02.
- All polaroid images served via `next/image` with width/height set.
- Fonts via `next/font` with `display: swap` is implicit.

## Accessibility

- `lang="es"` on `<html>`.
- All animated reveals also work statically (no information conveyed by animation alone).
- All interactive elements (links, language toggle, music toggle) keyboard-reachable, focus rings visible.
- Color contrast: ink-on-ivory ≥ 7:1 (verified).
- `prefers-reduced-motion: reduce` respected for ALL animations.
- Map has accessible fallback: "Abrir en Apple/Google Maps" links present even if map fails to load.
- All decorative SVGs `aria-hidden="true"`.
- Story milestones use semantic `<article>` with `<time datetime>`.

## Error & Edge Handling

- **Lenis fails to load:** falls back to native scroll; ScrollTrigger still works.
- **GSAP fails:** envelope renders in "broken/open" state by default in CSS so the page is still consumable.
- **Map tiles fail:** card shows venue name + address + "Abrir en Google Maps" link.
- **JS disabled:** server-rendered fallback shows the letter content already unfolded with all story milestones visible (no envelope animation, but all content accessible).

## Deployment

- `vercel.ts` config: `framework: 'nextjs'`, default build command.
- Production deploy via `vercel --prod`; preview deploys via PRs.
- No environment variables required (placeholders only; map uses OSM, no key).
- Future custom domain (e.g. `manuelyvalentina.com`) configured via Vercel dashboard by user.

## Spec Self-Review

- **Placeholders:** All content placeholders are realistic, not "TBD". ✅
- **Internal consistency:** Routes, file structure, and components align. Animation phases sum to 0→1 cleanly. ✅
- **Scope:** Three pages, one cinematic, one shared shell. Single implementation plan. ✅
- **Ambiguity:** "Mapbox or Leaflet" disambiguated: Leaflet + OSM as default (no API key). ✅
