# Magic Envelope Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-bleed envelope entry with a scroll-scrubbed cinematic — monogram + wax seal → a closed envelope flies in along a curved/looping path → lands centered → opens → the letter scales to full-page into the (unchanged) story.

**Architecture:** One pinned stage in `EnvelopeScene` drives a single scrubbed GSAP timeline across five beats. The flying envelope is a contained, fixed-aspect, centered element (`min(80vw, 460px)`) animated along a GSAP MotionPath with `autoRotate`. The flap mechanics (two-faced, sheen, baked grain, backface-hidden) are lifted from the current `Envelope.tsx` into a new `FlyingEnvelope.tsx`. A new `MonogramSeal.tsx` is the opener. The story sections below are untouched.

**Tech Stack:** Next 16 / React 19, GSAP 3.15 (ScrollTrigger + MotionPathPlugin + CustomEase — all free, already installed), `@gsap/react` useGSAP, Lenis (already RAF-unified), Tailwind v4. Verification is build + Playwright browser observation (computed transforms + screenshots), not unit tests — this is visual animation.

**Spec:** `docs/superpowers/specs/2026-06-04-magic-envelope-entry-design.md`

**Story-background decision (resolves the spec's open question):** The letter
paper scales up to fill the viewport as the *transition* into the story, then the
story intro fades in and the existing story sections keep their own `bg-ivory`
canvas. This is the spec's documented fallback and it guarantees the story
sections are visually unchanged (the user's hard constraint "don't change the
story"). We do NOT make the parchment a persistent recolored backdrop for the
milestones. If the user later wants the milestones literally on parchment, that
is a separate follow-up.

---

## File Structure

- `lib/gsap.ts` — register MotionPathPlugin (modify).
- `components/envelope/MonogramSeal.tsx` — opener: couple monogram + circular "M & V" wax seal (create).
- `components/envelope/FlyingEnvelope.tsx` — contained HP-inspired envelope reusing the rebuilt flap (create).
- `components/envelope/EnvelopeScene.tsx` — rewritten pinned stage + scrubbed timeline (modify heavily).
- `components/envelope/Envelope.tsx` — source of the flap markup to lift; deleted at the end (delete).
- Story files (`StoryMilestone.tsx`, `FamilyBlessing.tsx`, `InvitationReveal.tsx`) — NOT touched.

A note on verification commands used throughout:
- Build: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3` → expect `✓ Compiled successfully`.
- Dev server is assumed running on :3000 (`npm run dev`). If not: start it backgrounded and wait for `/` to return 200.
- Browser checks use the Playwright MCP tools. Lenis intercepts `window.scrollTo`, but for *observation* `window.scrollTo(0, <px>)` + a ~1.2s settle is sufficient to land the scrub at a position; read computed styles with `browser_evaluate` and capture with `browser_take_screenshot`. Delete screenshots after reading them.

---

## Task 1: Register MotionPathPlugin

**Files:**
- Modify: `lib/gsap.ts`

- [ ] **Step 1: Add the MotionPath import + registration**

Replace the file body so it reads:

```ts
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, MotionPathPlugin)

  // A paper-settle curve: decisive lift, gentle ease into rest (no bounce).
  if (!CustomEase.get('paperSettle')) {
    CustomEase.create('paperSettle', '0.16, 0.84, 0.24, 1')
  }
}

export { gsap, ScrollTrigger, CustomEase, MotionPathPlugin }
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add lib/gsap.ts
git commit -m "chore: register GSAP MotionPathPlugin"
```

---

## Task 2: MonogramSeal opener component

**Files:**
- Create: `components/envelope/MonogramSeal.tsx`

- [ ] **Step 1: Create the component**

A centered composition: the couple's names/monogram + a circular wax seal SVG with debossed "M & V". Matte terracotta wax styling consistent with the brand. `data-monogram-root` is the hook the scene animates. The seal art is a clearly-marked placeholder (swap when real art arrives).

```tsx
'use client'

import { forwardRef } from 'react'
import { wedding } from '@/content/wedding'

/**
 * Opening composition: the couple's monogram + a circular wax seal.
 *
 * PLACEHOLDER SEAL: the circular "M & V" wax seal below is a stand-in. Replace
 * the <g data-seal-art> contents with the real seal artwork when provided; keep
 * the outer <svg> sizing + the data-monogram-seal hook so the scene animation
 * still finds it.
 */
export const MonogramSeal = forwardRef<HTMLDivElement>(function MonogramSeal(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      data-monogram-root
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
    >
      {/* Circular wax seal */}
      <svg
        data-monogram-seal
        width="180"
        height="180"
        viewBox="0 0 180 180"
        aria-hidden="true"
        className="drop-shadow-[0_14px_30px_rgba(94,39,48,0.45)]"
      >
        <defs>
          <radialGradient id="ms-wax" cx="42%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#C58874" />
            <stop offset="55%" stopColor="#9B5240" />
            <stop offset="100%" stopColor="#5E2730" />
          </radialGradient>
          <filter id="ms-deboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" result="b" />
            <feOffset in="b" dx="-1" dy="-1" result="tl" />
            <feFlood floodColor="#3A1014" floodOpacity="0.9" result="dark" />
            <feComposite in="dark" in2="tl" operator="in" result="darkEdge" />
            <feOffset in="b" dx="1" dy="1" result="br" />
            <feFlood floodColor="#E8A88E" floodOpacity="0.75" result="lite" />
            <feComposite in="lite" in2="br" operator="in" result="liteEdge" />
            <feMerge>
              <feMergeNode in="liteEdge" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="darkEdge" />
            </feMerge>
          </filter>
        </defs>

        <g data-seal-art>
          {/* Wax disc with a slightly irregular scalloped edge */}
          <circle cx="90" cy="90" r="78" fill="url(#ms-wax)" />
          <circle
            cx="90"
            cy="90"
            r="68"
            fill="none"
            stroke="#3A1014"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            filter="url(#ms-deboss)"
          />
          {/* Debossed initials */}
          <text
            x="90"
            y="103"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="52"
            fill="#7A3324"
            filter="url(#ms-deboss)"
          >
            M&amp;V
          </text>
        </g>
      </svg>

      {/* Couple monogram / names */}
      <p className="mt-8 font-script text-5xl md:text-7xl text-ink">
        {wedding.brideName} &amp; {wedding.groomName}
      </p>
      <p className="mt-3 font-display tracking-[0.45em] text-xs md:text-sm text-wine uppercase">
        {wedding.dateRoman}
      </p>
    </div>
  )
})
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`. (Component is not yet rendered anywhere; this only type-checks it.)

- [ ] **Step 3: Commit**

```bash
git add components/envelope/MonogramSeal.tsx
git commit -m "feat: monogram + circular wax-seal opener (placeholder seal)"
```

---

## Task 3: FlyingEnvelope contained component (markup)

**Files:**
- Create: `components/envelope/FlyingEnvelope.tsx`
- Reference (read, do not edit yet): `components/envelope/Envelope.tsx`

**What to lift from `Envelope.tsx`:** the rebuilt flap subtree — the flap wrap (`data-envelope-flap-wrap`), the flap pivot (`data-envelope-flap`, `origin-top`, `transformStyle: preserve-3d`, `willChange: transform`), its OUTSIDE face (baked-grain `backgroundImage` of `paper-grain.svg` + gradient, `backfaceVisibility: hidden`, the directional-lighting overlay, and the `data-envelope-flap-sheen` light-sweep div), and its INSIDE face (`rotateX(180deg)`, `backfaceVisibility: hidden`). Also lift the inner liner (`data-envelope-inside`, diamond pattern) and the cast shadow (`data-envelope-cast-shadow`). DROP: the full-viewport back layer, postmark, return address, and `absolute inset-0`/`perspective` full-bleed wrapper.

- [ ] **Step 1: Create the contained envelope**

Contained shell: fixed 3:2 aspect, centered by the scene (the scene sets position/scale). Reuses the flap markup. Exposes `data-fly-envelope` (root), and keeps `data-envelope-flap`, `data-envelope-flap-sheen`, `data-envelope-inside`, `data-envelope-cast-shadow`, `data-envelope-letter`, and a `data-fly-seal` wax seal that is a child of the flap so it lifts with it.

```tsx
'use client'

import { forwardRef } from 'react'

/**
 * Contained Harry-Potter-inspired envelope (aged parchment + wax seal +
 * calligraphy address), sized as a centered object — NOT full-bleed. Reuses the
 * rebuilt two-faced flap mechanics. The scene positions/scales/flies it and
 * runs the open timeline against the data- hooks below.
 *
 * Aspect is locked 3:2 via the padding-top trick on the inner box so it scales
 * cleanly at any width the scene gives the root.
 */
export const FlyingEnvelope = forwardRef<HTMLDivElement>(function FlyingEnvelope(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      data-fly-envelope
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: 'min(80vw, 460px)',
        // perspective lives on the root so the flap's rotateX reads as 3D
        perspective: '1600px',
        perspectiveOrigin: '50% 0%',
        // scene controls translate/scale; start hidden + centered
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity',
      }}
    >
      {/* 3:2 aspect box */}
      <div className="relative w-full" style={{ paddingTop: '66%' }}>
        {/* BACK / body of the envelope (parchment) */}
        <div
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(155deg, #F1E4C4 0%, #E6D3A8 55%, #D2BB86 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            boxShadow:
              '0 30px 60px -24px rgba(31,20,10,0.55), inset 0 1px 0 rgba(255,250,232,0.5)',
          }}
        />

        {/* INNER LINER (revealed once the flap opens) */}
        <div
          data-envelope-inside
          className="absolute inset-0 opacity-0 overflow-hidden rounded-[3px]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, #F6EFD4 0%, #E4D5AC 55%, #CDB98C 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 60%)',
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.10]"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 400 400"
          >
            <defs>
              <pattern id="fly-liner" width="46" height="46" patternUnits="userSpaceOnUse">
                <path d="M 23 0 L 46 23 L 23 46 L 0 23 Z" fill="none" stroke="#5C4A2C" strokeWidth="0.6" />
                <circle cx="23" cy="23" r="1" fill="#5C4A2C" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#fly-liner)" />
          </svg>
        </div>

        {/* FRONT of the envelope (lower V) with calligraphy address + emblem */}
        <div
          data-envelope-front
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/textures/paper-grain.svg'), linear-gradient(165deg, #EFE0BD 0%, #E0CD9F 60%, #CDB682 100%)",
            backgroundSize: '300px 300px, cover',
            backgroundBlendMode: 'multiply, normal',
            clipPath: 'polygon(0 40%, 100% 40%, 100% 100%, 0 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,250,232,0.4)',
          }}
        >
          <div className="absolute inset-x-0 bottom-[14%] text-center px-6">
            <p className="font-script text-2xl md:text-3xl text-ink/80 leading-none">
              Para Nuestros Invitados
            </p>
            <div className="mx-auto mt-2 h-px w-20 bg-wine/40" />
          </div>
        </div>

        {/* CAST SHADOW from the closed flap onto the front */}
        <div
          data-envelope-cast-shadow
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: '40%',
            height: '12%',
            background:
              'linear-gradient(180deg, rgba(31,20,10,0.20) 0%, rgba(31,20,10,0.06) 60%, rgba(31,20,10,0) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          }}
        />

        {/* TOP FLAP — clipped triangle, hinged on the top edge */}
        <div
          data-envelope-flap-wrap
          className="absolute inset-x-0 top-0"
          style={{ height: '60%', transformStyle: 'preserve-3d' }}
        >
          <div
            data-envelope-flap
            className="absolute inset-0 origin-top"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* OUTSIDE face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('/textures/paper-grain.svg'), linear-gradient(178deg, #F1E2BE 0%, #E3D2A6 55%, #D2BC84 100%)",
                backgroundSize: '300px 300px, cover',
                backgroundBlendMode: 'multiply, normal',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow:
                  'inset 0 2px 0 rgba(255,250,232,0.6), inset 0 -1px 0 rgba(31,20,10,0.08)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 55% at 28% 22%, rgba(255,250,232,0.18) 0%, rgba(255,250,232,0) 60%), radial-gradient(ellipse 70% 60% at 70% 95%, rgba(31,20,10,0.30) 0%, rgba(31,20,10,0) 60%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />
              <div
                data-envelope-flap-sheen
                className="absolute inset-0 opacity-0"
                style={{
                  background:
                    'linear-gradient(178deg, rgba(255,252,240,0) 0%, rgba(255,252,240,0.55) 48%, rgba(255,252,240,0) 64%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'translateY(-40%)',
                  willChange: 'transform, opacity',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            {/* INSIDE face (visible after rotation past 90°) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #F4ECCC 0%, #E2D2A8 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow:
                  'inset 0 2px 0 rgba(255,250,232,0.65), inset 0 -2px 8px rgba(31,20,10,0.10)',
              }}
            />

            {/* WAX SEAL — child of the flap, lifts with it (placeholder) */}
            <div
              data-fly-seal
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: '-14%', width: '26%' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-auto" aria-hidden="true">
                <defs>
                  <radialGradient id="fly-wax" cx="42%" cy="36%" r="70%">
                    <stop offset="0%" stopColor="#C58874" />
                    <stop offset="55%" stopColor="#9B5240" />
                    <stop offset="100%" stopColor="#5E2730" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="44" fill="url(#fly-wax)" />
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize="30"
                  fill="#7A3324"
                >
                  M&amp;V
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* LETTER inside — slides out + scales to full page (scene-driven) */}
        <div
          data-envelope-letter
          className="absolute left-1/2 top-[14%] -translate-x-1/2 opacity-0"
          style={{
            width: '86%',
            height: '78%',
            background:
              'linear-gradient(170deg, #FBF6E8 0%, #F4ECD6 60%, #ECDFC0 100%)',
            boxShadow:
              '0 -4px 18px -8px rgba(31,20,10,0.35), inset 0 1px 0 rgba(255,253,245,0.6)',
            borderTop: '1px solid rgba(255,253,245,0.6)',
          }}
        />
      </div>
    </div>
  )
})
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add components/envelope/FlyingEnvelope.tsx
git commit -m "feat: contained HP-inspired flying envelope (reuses rebuilt flap)"
```

---

## Task 4: Rewrite EnvelopeScene — render tree (monogram + flying envelope + story)

**Files:**
- Modify: `components/envelope/EnvelopeScene.tsx`

This task swaps the render tree to the new components and wires refs, but keeps a MINIMAL timeline (just reduced-motion + a trivial reveal) so the page renders. The full scrubbed timeline lands in Task 5.

- [ ] **Step 1: Replace imports + refs + render tree**

Change the import of `Envelope` to the two new components and add MotionPathPlugin to the gsap import:

```tsx
import { gsap, ScrollTrigger, MotionPathPlugin } from '@/lib/gsap'
import { MonogramSeal } from './MonogramSeal'
import { FlyingEnvelope } from './FlyingEnvelope'
```

Add refs inside the component (keep `containerRef`, `stageRef`, `letterRef`, `navVisible`; replace `envelopeWrapRef`/`envelopeRef`/`hintRef` usage):

```tsx
const monogramRef = useRef<HTMLDivElement | null>(null)
const flyEnvRef = useRef<HTMLDivElement | null>(null)
const pathRef = useRef<SVGPathElement | null>(null)
```

Replace the pinned `<section ref={stageRef}>` body (the part that rendered `<Envelope>`, the hint, and the letter block) with:

```tsx
{/* MONOGRAM + SEAL — the opener */}
<MonogramSeal ref={monogramRef} />

{/* FLYING ENVELOPE — flown in along the motion path */}
<FlyingEnvelope ref={flyEnvRef} />

{/* Hidden motion path the envelope follows (authored in stage % space) */}
<svg
  className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  {/* start top-right + small, S-curve loop down to centre (50,50) */}
  <path
    ref={pathRef}
    d="M 116 -18 C 92 8, 96 40, 64 34 C 36 29, 30 6, 50 50"
    fill="none"
  />
</svg>

{/* LETTER CONTENT — the story intro that the scaled letter carries in */}
<div
  ref={letterRef}
  className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none opacity-0"
>
  <div className="text-center max-w-2xl pointer-events-auto text-ivory">
    <OrnamentalDivider variant={1} />
    <p className="font-display tracking-[0.5em] text-xs text-gold uppercase mt-8">
      Una pequeña historia
    </p>
    <p className="font-script text-6xl md:text-7xl text-ivory mt-4">
      de los dos
    </p>
    <p className="mt-10 text-base text-ivory/70 italic">
      Sigue desplazándote para leerla...
    </p>
  </div>
</div>
```

Keep the story block (`<div className="relative bg-ivory">…`) and `<PostEnvelopeNavRoot>` exactly as they are.

- [ ] **Step 2: Replace the useGSAP body with a minimal placeholder**

So the page renders before the full timeline exists. Replace the entire `useGSAP(() => { … }, { scope })` body with:

```tsx
useGSAP(
  () => {
    if (!containerRef.current || !stageRef.current || !letterRef.current) return

    if (prefersReducedMotion()) {
      gsap.set(flyEnvRef.current, { display: 'none' })
      gsap.set(monogramRef.current, { display: 'none' })
      gsap.set(letterRef.current, { opacity: 1 })
      setNavVisible(true)
      return
    }

    // Minimal placeholder reveal — replaced by the full timeline in Task 5.
    gsap.set(flyEnvRef.current, { opacity: 0 })
    gsap.set(letterRef.current, { opacity: 1 })
    setNavVisible(true)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  },
  { scope: containerRef },
)
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`. If TS flags unused `MotionPathPlugin`, leave it — Task 5 uses it. If it errors on unused, prefix with `void MotionPathPlugin` temporarily, removed in Task 5.

- [ ] **Step 4: Browser smoke check**

Navigate to `http://localhost:3000`, evaluate:
```js
() => ({ hasMonogram: !!document.querySelector('[data-monogram-root]'),
         hasFlyEnv: !!document.querySelector('[data-fly-envelope]'),
         hasPath: !!document.querySelector('path[d^="M 116"]') })
```
Expected: all three `true`. Page should render the story (letter intro visible) without crashing.

- [ ] **Step 5: Commit**

```bash
git add components/envelope/EnvelopeScene.tsx
git commit -m "feat: wire monogram + flying envelope into the scene (minimal timeline)"
```

---

## Task 5: The scrubbed choreography timeline

**Files:**
- Modify: `components/envelope/EnvelopeScene.tsx`

Replace the minimal placeholder (the non-reduced-motion branch from Task 4 Step 2) with the full five-beat scrubbed timeline. Progress maps: monogram 0–0.12, flight 0.12–0.45, settle 0.45–0.52, open 0.52–0.78, letter-scale 0.78–1.

- [ ] **Step 1: Implement the timeline**

Replace everything in the non-reduced-motion path (after the `prefersReducedMotion()` early-return block) with:

```tsx
const stage = stageRef.current
const flyEnv = flyEnvRef.current as HTMLElement
const monogram = monogramRef.current as HTMLElement
const path = pathRef.current as unknown as SVGPathElement
const flap = flyEnv.querySelector('[data-envelope-flap]') as HTMLElement
const sheen = flyEnv.querySelector('[data-envelope-flap-sheen]') as HTMLElement | null
const inside = flyEnv.querySelector('[data-envelope-inside]') as HTMLElement
const castShadow = flyEnv.querySelector('[data-envelope-cast-shadow]') as HTMLElement | null
const innerLetter = flyEnv.querySelector('[data-envelope-letter]') as HTMLElement | null

// Initial states
gsap.set(monogram, { opacity: 1, y: 0 })
gsap.set(letterRef.current, { opacity: 0 })
gsap.set(flap, { rotateX: 0 })
gsap.set(inside, { opacity: 0 })
if (castShadow) gsap.set(castShadow, { opacity: 1 })
// Envelope starts hidden + small, parked at the path start.
gsap.set(flyEnv, { opacity: 0, scale: 0.34 })

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: stage,
    start: 'top top',
    end: '+=400%',
    pin: true,
    scrub: 0.6,
    anticipatePin: 1,
    onUpdate: (st) => setNavVisible(st.progress > 0.9),
  },
})

// 0.00–0.12 — monogram holds, then fades + lifts away
tl.to(monogram, { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' }, 0)

// 0.12–0.45 — envelope flies in along the curved path, growing, auto-rotating
tl.set(flyEnv, { opacity: 1 }, 0.12)
tl.to(
  flyEnv,
  {
    duration: 0.33,
    ease: 'power1.inOut',
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: 90, // path tangent + 90° so the upright envelope faces forward
      start: 0,
      end: 1,
    },
  },
  0.12,
)
tl.to(flyEnv, { scale: 1, duration: 0.33, ease: 'power2.out' }, 0.12)
// settle rotation back upright as it lands
tl.to(flyEnv, { rotation: 0, duration: 0.08, ease: 'power2.out' }, 0.45)

// 0.52–0.78 — flap opens (reused mechanics)
tl.to(flap, { rotateX: 168, duration: 0.26, ease: 'paperSettle' }, 0.52)
if (sheen) {
  tl.to(sheen, { opacity: 1, duration: 0.06 }, 0.53)
  tl.to(sheen, { y: '60%', duration: 0.2, ease: 'power1.inOut' }, 0.53)
  tl.to(sheen, { opacity: 0, duration: 0.08 }, 0.7)
}
tl.to(inside, { opacity: 1, duration: 0.08 }, 0.6)
if (castShadow) tl.to(castShadow, { opacity: 0, duration: 0.16 }, 0.54)

// 0.78–1.00 — letter slides out + scales to full page; envelope recedes
if (innerLetter) {
  tl.to(innerLetter, { opacity: 1, duration: 0.05 }, 0.76)
  // scale the letter far past the envelope bounds to fill the viewport
  tl.to(
    innerLetter,
    { yPercent: -22, scale: 6.5, duration: 0.22, ease: 'paperSettle' },
    0.78,
  )
}
tl.to(flyEnv, { opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.84)
tl.fromTo(
  letterRef.current,
  { opacity: 0, yPercent: 6 },
  { opacity: 1, yPercent: 0, duration: 0.16, ease: 'paperSettle' },
  0.86,
)

return () => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`. (MotionPathPlugin is now used, so any temporary `void` from Task 4 must be removed.)

- [ ] **Step 3: Browser — verify the flight is curved (not straight)**

Navigate to `http://localhost:3000`. Sample the envelope transform at two mid-flight scroll positions and confirm BOTH x and y change non-linearly (a straight path would change them proportionally; a curve won't):
```js
() => { window.scrollTo(0, 700); return 'set'; }   // ~progress 0.18
```
wait ~1s, then read:
```js
() => { const e=document.querySelector('[data-fly-envelope]');
        return getComputedStyle(e).transform; }
```
Then `window.scrollTo(0, 1100)` (~progress 0.28), wait, read again. Expected: the two `matrix(...)` translate components differ in a non-proportional way (the path curves), and the matrix shows a rotation (autoRotate). Capture a screenshot at each; the envelope should be visibly off-center and tilted mid-flight, larger at the later position.

- [ ] **Step 4: Browser — verify landing + open + letter scale**

- `window.scrollTo(0, 1750)` (~0.45 settle): screenshot — envelope centered, upright, full size, closed.
- `window.scrollTo(0, 2300)` (~0.6 open): screenshot — flap rotated open, liner visible, no backface bleed.
- `window.scrollTo(0, 3100)` (~0.85 letter): screenshot — letter scaled large filling most of the viewport.
- `window.scrollTo(0, 3600)` (~0.95): screenshot — story intro ("Una pequeña historia / de los dos") visible, nav appeared.

Delete all screenshots after reading.

- [ ] **Step 5: Commit**

```bash
git add components/envelope/EnvelopeScene.tsx
git commit -m "feat: scroll-scrubbed magic envelope choreography (fly/open/scale)"
```

---

## Task 6: Tune timing + path, verify mobile, verify reduced motion

**Files:**
- Modify: `components/envelope/EnvelopeScene.tsx` (timing/path numbers only, as needed)

- [ ] **Step 1: Desktop full pass + tune**

Step scroll from 0 to bottom of the pinned stage in ~6 increments; at each, screenshot. Judge: monogram reads, flight is a clear magical curve (adjust the `d=` path control points if the arc is ugly or clips off-screen — keep it within roughly `x∈[-10,120], y∈[-25,60]` in the 0–100 stage space so it enters/exits gracefully), landing is centered and upright, open is clean, letter fills the screen, seam into story is smooth. Adjust the per-beat `duration`/position numbers so no beat feels rushed or dead. Re-run build after any change.

- [ ] **Step 2: Mobile (390×844) pass**

Resize to 390×844, navigate fresh, step through the same positions. Confirm: the envelope (`min(80vw,460px)`) is a sensible size on the narrow screen, the flight path still enters/exits on-screen and lands centered, nothing overflows horizontally, the letter still scales to fill. Tune path/scale if the arc clips on the narrow viewport (the path is in % space so it should hold, but verify). Screenshot 3 key beats. Reset viewport to 1280×900 after.

- [ ] **Step 3: Reduced-motion check**

In the browser, emulate reduced motion and reload:
```js
// via Playwright: set prefers-reduced-motion: reduce, then navigate
```
Confirm: the envelope + monogram are `display:none`, the story intro + nav are visible immediately, and scrolling reaches all sections (dress code, location, dedicatorias). Screenshot once.

- [ ] **Step 4: Commit any tuning**

```bash
git add components/envelope/EnvelopeScene.tsx
git commit -m "fix: tune flight path + beat timing; verify mobile + reduced motion"
```

(If no changes were needed, skip the commit.)

---

## Task 7: Retire the old full-bleed Envelope

**Files:**
- Delete: `components/envelope/Envelope.tsx`

- [ ] **Step 1: Confirm no importers**

Run: `grep -rn "from './Envelope'\|from '@/components/envelope/Envelope'" app components --include="*.tsx" | grep -v FlyingEnvelope`
Expected: no output (nothing imports the old `Envelope`).

- [ ] **Step 2: Delete the file**

```bash
rm components/envelope/Envelope.tsx
```

- [ ] **Step 3: Verify build + a final browser smoke pass**

Run: `npm run build 2>&1 | grep -E "✓ Compiled|Failed|error TS" | head -3`
Expected: `✓ Compiled successfully`. Then load `http://localhost:3000`, scroll through the entry once, confirm nothing broke.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old full-bleed Envelope (replaced by FlyingEnvelope)"
```

---

## Task 8: Final verification + push

- [ ] **Step 1: Full build**

Run: `npm run build 2>&1 | tail -12`
Expected: `✓ Compiled successfully`, all routes present, `/` static.

- [ ] **Step 2: Confirm story sections untouched**

Run: `git diff --stat HEAD~7 -- components/envelope/StoryMilestone.tsx components/envelope/FamilyBlessing.tsx components/envelope/InvitationReveal.tsx`
Expected: no output (these files were not modified by this plan).

- [ ] **Step 3: Push**

```bash
git push origin main
```

- [ ] **Step 4: Report** the deploy is triggered; ask the user to scroll the live entry and give feedback on pacing/path before any further polish.
