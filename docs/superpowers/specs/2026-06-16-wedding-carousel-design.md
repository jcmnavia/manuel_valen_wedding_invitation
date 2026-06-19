# "Nos casamos!" Carousel — Design

**Date:** 2026-06-16
**Status:** Approved, ready for implementation

## Summary

Replace the home page's `StoryMilestone` photo-timeline with a single full-screen
"Nos casamos!" section: an auto cross-fading photo carousel paired with the
headline. The seal-intro overlay text is removed at the same time.

## Scope

**In scope**
- Remove the `StoryMilestone` timeline map from `EnvelopeScene.tsx`.
- Remove the seal-intro overlay ("Una pequeña historia / de los dos / Sigue
  desplazándote para leerla…") and the GSAP tween that faded it in.
- Add a new full-viewport carousel section in its place.
- Rename the 13 carousel photos to clean numbered names.

**Out of scope (kept as-is, below the new section)**
- `La bendición` family blessing (`FamilyBlessing`).
- The invitation / event details (`InvitationReveal`).
- `SiteFooter`, nav.

**Not deleted (left on disk, unused)**
- `components/envelope/StoryMilestone.tsx`
- `content/story.ts`

  Consistent with how the removed envelope-flight code was preserved.

## Layout

### Mobile (`< md`)
- Full-screen carousel: `h-[100svh]`, photo fills the viewport (`object-cover`).
- "Nos casamos!" overlaid on the photo, centered, in the script font.
- A subtle dark gradient scrim sits behind the text for legibility over any photo.

### Desktop (`md+`)
- Two equal halves (`flex`, 50 / 50), full viewport height (`h-screen`/`100svh`).
- **Left 50%** — the full-height photo carousel (`object-cover`).
- **Right 50%** — a solid **Eucalipto `#8BA597`** panel; "Nos casamos!" centered
  in the script font, in a light/cream tone for contrast. No scrim needed (solid
  panel).

## Carousel behavior
- Auto cross-fade, **one photo visible at a time**, **~4s per slide**, infinite loop.
- Cross-fade implemented with stacked absolutely-positioned layers toggling
  opacity (CSS transition ~1s). Driven by a `setInterval` advancing an index.
  No carousel library.
- **No controls** (no dots, no arrows) — ambient slideshow.
- **`prefers-reduced-motion`**: no auto-advance; show a single static photo
  (the first). Cross-fade transitions disabled.
- All 13 photos used.

## Headline
- Exactly **"Nos casamos!"** — `font-script`, large. No date, no eyebrow.

## Photos
- Location: `public/photos/carousel/`.
- Rename the 13 `WhatsApp Image …` files to `01.jpeg … 13.jpeg` (current
  timestamp sort order). Clean names = obvious carousel order; reorder later by
  renaming.
- Mix: 10 portrait, 3 landscape — all rendered `object-cover`, so landscapes
  crop to fill the portrait/half-screen frame. Acceptable for an ambient fade.

## Components & data

### `components/envelope/WeddingCarousel.tsx` (new, client component)
- **What it does:** renders the full-viewport "Nos casamos!" section (responsive
  mobile/desktop layouts) with the auto cross-fading photo carousel.
- **How to use it:** `<WeddingCarousel />` — no required props. Reads the photo
  list from content.
- **Depends on:** `next/image`, the carousel photo content, `font-script` /
  Eucalipto color token from the theme, `prefersReducedMotion`.

### Carousel content
- A small array of `{ src, alt }` for the 13 photos. Inline in the component or a
  tiny `content/carousel.ts` — implementer's choice (prefer `content/` to match
  the repo's content-separation convention).

### `EnvelopeScene.tsx` (edited)
- Remove the seal-intro overlay JSX (`letterRef` block) and the
  `tl.fromTo(letterRef …)` tween. The seal still fades + lifts on scroll; nothing
  fades in after it. (Keep `letterRef`-related refs only if still referenced;
  otherwise remove cleanly so there are no dangling refs.)
- Remove the `{story.map(...)}` block, the `StoryMilestone` import, and the
  `story` import.
- Insert `<WeddingCarousel />` as a full-viewport section immediately after the
  pinned seal `<section>` and before the family-blessing / invitation block.

## Reduced-motion / a11y
- Carousel pauses (shows static first photo) under `prefers-reduced-motion`.
- Each photo has descriptive-enough `alt` (e.g. "Valentina y Manuel").
- Headline is a real heading element for structure.

## Verification
- `tsc --noEmit` + `next build` clean.
- Browser: section is full-viewport; mobile shows photo + overlaid headline;
  desktop shows 50/50 with Eucalipto panel; photos cross-fade ~4s; family
  blessing + invitation still render below; seal still fades on scroll with no
  leftover intro text.
