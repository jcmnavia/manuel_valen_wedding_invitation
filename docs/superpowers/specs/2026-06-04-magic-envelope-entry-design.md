# Magic Envelope Entry — Design Spec

Date: 2026-06-04
Status: Approved (design); pending spec review

## Goal

Replace the full-bleed paper envelope entry (which doesn't scale on mobile) with
a scroll-scrubbed cinematic: a couple's monogram + wax seal, then a closed
envelope that flies in along a magical curved/looping path (Harry-Potter-letter
style), lands centered at moderate size, opens, and the letter slides out and
scales up to full-page — seaming into the couple's history (unchanged).

## Why this is more mobile-scalable

The old entry WAS the viewport (100vw×100vh of paper), so phone proportions broke.
The new envelope is a **contained, fixed-aspect object** sized `min(80vw, 460px)`
wide, centered in a pinned stage. It scales cleanly on any screen because it is a
bounded element, not the page itself. The flight path is defined in
viewport-relative units so the arc and landing work across screen sizes.

## Decisions (locked)

- **Pacing:** Fully scroll-scrubbed. One pinned stage, one scrubbed GSAP timeline;
  every beat maps to scroll progress.
- **Flight path:** Swoops in from far, looping — enters small from a far top
  corner, follows a curved arc with a loop/S-curve, grows as it nears, settles
  dead-center. Envelope auto-rotates along the path.
- **Envelope look:** Harry-Potter-INSPIRED but on-brand — aged parchment/cream,
  ornate wax seal, calligraphy address, a thin decorative emblem — in the
  heirloom palette (wine/sage/ink), NOT literal yellowed-parchment/green-ink.
- **Opener:** A circular wax seal with "M & V" initials (placeholder, swappable
  when the real seal art arrives) plus the couple's monogram/names.
- **Letter end state:** The letter scales up to full-page parchment and the story
  sits ON that surface (the letter becomes the page). See "Story background" for
  how this preserves the existing story look.
- **Seal on open:** The wax seal lifts intact with the flap (no cracking).
- **Story sections:** Untouched. StoryMilestone, FamilyBlessing, InvitationReveal
  and all their animations stay exactly as they are now.

## Tooling

- **GSAP MotionPathPlugin** (free, already in `gsap@3.15`) — animates the
  envelope along an SVG path with `autoRotate` for the magical arc.
- **GSAP CustomEase** (already registered) — `paperSettle` and a flight ease.
- No new npm dependency required (both plugins ship in the installed `gsap`).
- Reuses the rebuilt flap mechanics (two-faced flap, sheen sweep, baked grain,
  backface-hidden) from the current Envelope, re-housed in a contained component.

## Scroll-scrubbed choreography (progress → beat)

Pinned stage, scroll distance ≈ `+=400%`. One timeline; progress 0→1.

| progress | beat |
|---|---|
| 0.00–0.12 | **Monogram + wax seal** centered, holding. As scroll starts it fades + lifts away (`opacity→0`, slight `y`). |
| 0.12–0.45 | **Envelope flies in** along the SVG MotionPath: starts small at a far top corner, loops/S-curves inward, **scales up** as it nears, `autoRotate` tilts it along the path. A soft shadow/blur trail under it sells motion. |
| 0.45–0.52 | Envelope **settles** at center (soft landing, no bounce). |
| 0.52–0.78 | **Flap opens** (two-faced 3D flap, sheen sweep, `paperSettle`); wax seal rides up intact with the flap. |
| 0.78–1.00 | **Letter slides up/out and scales to full-page parchment**; envelope recedes behind it. At full scale the letter is the story canvas. |

Nav appears (`navVisible`) past ~0.9, as today.

## Components

### `components/envelope/MonogramSeal.tsx` (new)
The opening composition: the couple's monogram/names + a **circular wax seal**
SVG with debossed "M & V" initials, terracotta-wax styling (matte, form-lit,
debossed — consistent with the prior seal treatment but circular). A single
`data-` hook the scene animates. Built to be swapped for real seal art later
(documented prop/marker).

### `components/envelope/FlyingEnvelope.tsx` (new)
The contained HP-inspired envelope. Fixed aspect (~3:2), width `min(80vw, 460px)`,
centered via the scene. Layers: back, inner liner, front (calligraphy address +
thin emblem), cast shadow, two-faced flap (reusing the rebuilt mechanics:
`data-envelope-flap` + sheen `data-envelope-flap-sheen`, backface-hidden, baked
grain background), wax seal as a child of the flap so it lifts with it. Exposes
`data-` hooks the scene needs (`data-fly-envelope`, `data-envelope-flap`,
`data-envelope-flap-sheen`, `data-envelope-letter`).

### `components/envelope/EnvelopeScene.tsx` (rewritten orchestration)
Owns the pinned stage + the scrubbed timeline implementing the choreography.
Defines the MotionPath (viewport-relative), drives monogram→flight→open→
letter-scale. Renders the story below (unchanged imports/usage). Keeps the
reduced-motion fallback. The existing `letterRef` "Una pequeña historia / de los
dos" intro is the content that rides on the scaled-up letter into the story.

### `lib/gsap.ts`
Register `MotionPathPlugin` alongside `ScrollTrigger` + `CustomEase`.

### Removed / superseded
`FlyingEnvelope.tsx` is built by **lifting the reusable flap internals out of**
the current `Envelope.tsx` (the rebuilt two-faced flap, sheen, baked-grain
background, backface-hidden faces, inner liner, cast shadow) and re-housing them
in a contained, fixed-aspect, centered shell — NOT rewriting them from scratch
(that would lose the recent jank fixes). The full-bleed wrapper, the address/
postmark layout, and full-viewport sizing are dropped. `Envelope.tsx` is deleted
once `FlyingEnvelope.tsx` is wired and verified and nothing else imports it.

## Story background (resolves the one tension)

The letter scales to a full-page parchment that becomes the story's backdrop.
To honor "don't change the story sections," the parchment tone is set to match
the existing story canvas (ivory `#F5EFE3` / cream `#ECE3CF`), so the milestones
look essentially identical — same layout, content, animations — just on the
continuous letter surface. NET VISUAL CHANGE TO THE STORY ≈ none.

Open question for spec review: if even a subtle warmer paper tone is unwanted,
the fallback is "letter scales up, then cross-fades to the existing ivory story"
(letter as transition, not persistent backdrop). Default = match the tone.

## Flight path details

- Path authored as an SVG `path` in the pinned stage's coordinate space
  (percentages / viewport units), e.g. start near `(85%, -20%)` (off-screen top
  right, small), arc left-and-down through a loop, settle at `(50%, 50%)`.
- `motionPath: { path, align, autoRotate: true, start: 0, end: 1 }` driven by the
  scrubbed timeline. `autoRotate` keyed so the envelope faces "forward" as it
  lands (rotation eased back to ~0 at the end so it sits upright to open).
- Scale tween parallel to the path: `~0.35 → 1` as it approaches center.
- Motion cue: a soft drop-shadow that grows + a faint trailing blur during
  flight, removed on settle.

## Performance

- Animate only `transform` + `opacity` (MotionPath outputs transforms). No
  clip-path/box-shadow geometry animation.
- Baked paper grain as a background image on the moving flap (already done in the
  current flap), not a live `feTurbulence` filter.
- `will-change: transform` on the flying envelope + flap + letter, scoped, removed
  on timeline complete.
- One RAF: Lenis↔ScrollTrigger already unified in SmoothScrollProvider — keep.
- Envelope/letter textures: reuse the single baked `paper-grain.svg`.

## Accessibility / reduced motion

- `prefers-reduced-motion: reduce`: skip the flight + scrub. Show the opened
  letter / story intro directly (as the current reduced-motion branch does),
  envelope hidden. Every downstream fact (date, venue, dress code, messages)
  remains reachable by normal scroll.
- Decorative SVG (seal, emblem, envelope) is `aria-hidden`. Headings/links exposed.
- Honor the existing nav reveal + focus behavior.

## Testing / verification

- Build passes (types + prerender).
- Browser (desktop + mobile 390px): step scroll through progress 0→1 and confirm
  each beat — monogram holds then fades; envelope flies a curved path (not
  straight) and grows; lands centered at moderate size; flap opens cleanly
  (no backface bleed); letter scales to full-page; seam into milestones is smooth.
- Confirm the story sections below are visually unchanged.
- Reduced-motion: envelope hidden, story reachable.

## Out of scope

- Real seal art (user provides later; placeholder circular seal now).
- Cracking/breaking seal (seal lifts intact).
- Changing any story section (milestones/family/invitation) content or animation.
- Sound/music.
