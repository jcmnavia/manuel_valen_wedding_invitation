---
name: Manuel & Valentina
description: A romantic-vintage wedding invitation experience built around a full-bleed paper envelope that lifts open as the guest scrolls.
colors:
  ivory: "#F5EFE3"
  cream: "#ECE3CF"
  paper-warm: "#E5D5AE"
  paper-deep: "#CCB682"
  ink: "#1F1A14"
  ink-soft: "#4A3F2E"
  gold: "#B08D57"
  gold-dim: "#8C6F40"
  wax-terracotta: "#B86F58"
  wax-terracotta-light: "#C58974"
  wax-terracotta-deep: "#7A3F2E"
  wax-engrave: "#321004"
typography:
  display:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.02em"
  script:
    fontFamily: "Mrs Saint Delafield, cursive"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.02em"
  body:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.4em"
rounded:
  none: "0"
  sm: "2px"
  md: "4px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ivory}"
  venue-card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "32px"
  swatch:
    rounded: "999px"
    size: "96px"
---

# Design System: Manuel & Valentina

## 1. Overview

**Creative North Star: "The Sealed Heirloom Letter."**

The interface is a single paper envelope that fills the entire viewport. Cream-colored, slightly textured, sealed with deep red wax bearing an interlaced M&V monogram inside a small laurel wreath. The guest scrolls; the wax holds, the flap lifts, the seal travels up with the flap, the envelope opens, the letter inside is revealed. Every visual choice descends from that one object: warm paper tones for cards and sections, ornamental dividers reused on every page, polaroid photos with washi tape arriving in a sequence the way memories surface in a real letter.

This system rejects the pastel-rose template-aesthetic that dominates wedding sites. It rejects sticker-pack laurel ornament and the Etsy-download flourishes that follow it. It rejects SaaS marketing patterns (feature grids, hero metrics, FAQ accordions), gradient text, glassmorphism, and any visual element that would feel out of place on an heirloom paper invitation.

**Key Characteristics:**
- One typeface family per role (display, script, body); never more.
- One accent color (wax red), used only on the seal and on hover states.
- Paper-warm neutrals carry every surface; no grey, no black, no pure white.
- Animation is choreographed, not interactive: scroll progress drives the envelope cinematic and the polaroid reveals.
- Wide vertical spacing throughout; the page breathes between every beat.

## 2. Colors

A palette of paper, ink, gold leaf, and deep wax red. Every neutral is tinted warm; no cool greys, no pure black, no pure white.

### Primary
- **Terracotta Wax** (`#B86F58` with `#C58974` form-light highlights and `#7A3F2E` shadows): the wax seal itself. A matte, sun-faded rose-brown wax pool — vertical oval shape, irregular molten edges. Debossed botanical wreath surrounds a debossed M&V serif monogram. NOT metallic, NOT glossy. Appears only on the home cinematic.
- **Wax Engrave** (`#321004`): the dark interior color of debossed (recessed) wreath leaves, berries, and monogram strokes. Reads as physical depth, not a painted line.

### Secondary
- **Gold Leaf** (`#B08D57`): ornamental dividers, accent line below headlines, focus ring on links, palette swatch borders, button borders, link hover color. Used as a "second voice" alongside ink for delicate ornament.

### Postmark
- **Wax Red** (`#7A2421`): the postmark stamp in the upper-right of the envelope only. Used at low opacity (~60%). Nowhere else in the system.

### Neutral
- **Ivory** (`#F5EFE3`): the base paper color and the canvas of every page after the envelope opens.
- **Cream** (`#ECE3CF`): venue cards, polaroid mat board, the slightly darker neutral that distinguishes a surface from the canvas.
- **Paper-warm** (`#E5D5AE`) and **Paper-deep** (`#CCB682`): the envelope itself (front body and flap). Only used on the home cinematic.
- **Ink** (`#1F1A14`): all primary body and headline text. Never `#000`.
- **Ink-soft** (`#4A3F2E`): secondary text, italic body, captions. The "voice in parentheses."

### Named Rules
**The Terracotta Is The Seal Rule.** Terracotta wax (`#B86F58` family) appears only on the wax seal. Never on buttons, never on text, never as a fill anywhere else. The seal is a singular object, and its color is its signature.

**The Matte Wax Rule.** The wax surface is matte. No specular highlights, no crystalline sparkles, no glossy sheen, no metallic shader. Depth is conveyed through soft form lighting (slightly lighter top, slightly darker bottom) and through the debossed elements (dark recesses with a single thin top-light edge on each carved shape). If it looks like jewelry, it has failed.

**The Wax-Red Is The Postmark Rule.** The deep red `#7A2421` is used only on the round postmark stamp in the upper-right of the envelope. Used at low opacity. Never on buttons, body, or as a hover state.

**The No Pure Black, No Pure White Rule.** `#000` and `#fff` are forbidden. Every neutral is tinted toward the paper hue. The closest the system gets to white is `#F5EFE3` (ivory). The closest it gets to black is `#1F1A14` (ink).

**The Gold Restraint Rule.** Gold leaf is only ever 1px thick. Dividers are 1px, focus rings are 1px, swatch borders are 1px. Never a gold fill, never gradient gold, never metallic shader. Just the color, used as if it were ink with a different pigment.

## 3. Typography

**Display Font:** Italiana (with Georgia, serif fallback)
**Script Font:** Mrs Saint Delafield (with cursive fallback)
**Body Font:** Cormorant Garamond (with Georgia, serif fallback)

**Character:** Italiana is a high-contrast didone display face used as the engraved-plate voice — wide tracking, all-caps small labels, large invitation headlines. Mrs Saint Delafield is the handwritten signature, used sparingly on names, on the closing "Con amor, M & V," and as the section subtitle on Ubicación. Cormorant Garamond is the body — a warm, readable transitional serif that holds a paragraph of Spanish copy without strain.

### Hierarchy
- **Display** (Italiana 400, clamp(2.5rem, 7vw, 6rem), 1.05): the section title on each page. "Código de Vestimenta", "Ubicación". Letter-spaced 0.02em.
- **Script** (Mrs Saint Delafield 400, clamp(2.5rem, 6vw, 5rem), 1.0): names ("Manuel", "Valentina"), the closing signature, the recipient line "Nuestros Invitados" on the envelope. Reserved for moments where the voice is personal.
- **Headline** (Italiana 400, clamp(1.75rem, 4vw, 2.5rem), 1.15): the title above each story milestone ("Cómo nos conocimos", "La propuesta"), the venue name on cards.
- **Body** (Cormorant Garamond 400 italic, 1.125rem, 1.7): all paragraph copy, story narration, dress code intro, venue descriptions. Cap at 65-75 ch.
- **Label** (Italiana 400, 0.75rem, tracking 0.4em, UPPERCASE): overlines, navigation links, section eyebrows ("Para la ocasión", "Dónde celebrar", year stamps on story milestones).

### Named Rules
**The One Face Per Role Rule.** Italiana for engraved-plate voice (display + label). Mrs Saint Delafield for handwritten voice (names + signatures). Cormorant Garamond for letter voice (all body). Never substitute. Never add a fourth.

**The Body Is Italic Rule.** Body copy across the site is set in italic Cormorant Garamond. The italic carries the warmth of a handwritten letter. Roman is reserved for headlines and labels.

**The Tracking Carries Authority Rule.** The 0.4em letter-spacing on labels (uppercase Italiana) is the visual signature of "engraved on the plate." Never apply this tracking to body or headlines.

## 4. Elevation

The system is mostly flat. Shadows are not used for hierarchy; tonal layering is. Paper sits on paper of a slightly different warmth (ivory canvas, cream cards, paper-warm envelope body, paper-deep envelope flap). The only meaningful shadows in the entire site are: (1) the diffuse drop shadow under the wax seal, and (2) the soft drop under the polaroid mat, which sells the photo as a physical object on the page.

### Shadow Vocabulary
- **Polaroid drop** (`box-shadow: 0 18px 40px -16px rgba(31,26,20,0.35), 0 4px 12px -2px rgba(31,26,20,0.15)`): under every PolaroidFrame; gives the photo physical weight.
- **Seal drop** (a filter, not a box-shadow, applied to the wax SVG): `drop-shadow(0 14px 36px rgba(122,36,33,0.45))`. Carries the wax's warmth into the shadow tone.
- **Venue card** (`box-shadow: 0 18px 40px -20px rgba(31,26,20,0.25)`): minimal lift, the card is on the paper, not floating.

### Named Rules
**The No Generic Card Shadow Rule.** Never use a default `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` or any other neutral lift. Every shadow tints toward warm (ink alpha), and the only shadows allowed are the three above.

**The Tonal Layering Rule.** When a surface needs to feel "above" another, drop its brightness 4-8% (e.g. ivory canvas → cream card), do not add a shadow.

## 5. Components

### Buttons
- **Shape:** square corners (`rounded: 0` to `2px` max). Never pill-shaped, never large radii.
- **Primary:** ivory background, ink text, 1px solid gold border. Padding 16px 32px. Label typography (uppercase Italiana, 0.4em tracking).
- **Hover:** background transitions over 500ms to gold (#B08D57), text to ivory. The slow transition is intentional: matches the patience of the rest of the site.
- **Focus:** 1px gold underline beneath the text. No outline ring.

### Cards (Venue, Polaroid)
- **Venue card:** cream (#ECE3CF) background, 1px solid `gold/30` border, `rounded: sm` (2px). Padding 32px. Centered text. Soft drop shadow.
- **Polaroid frame:** off-white (#FBF6EA) mat with extra bottom padding, washi tape strip at top center, slight rotation per-instance (-3deg to +3deg), sepia/contrast filter on the inner image.

### Inputs
None. The site has no forms. RSVP is intentionally out of scope.

### Navigation
- **NavBar (subpages):** fixed top, max-width 5xl, max 80px tall. Backdrop-blur on the row. "M & V" monogram (Mrs Saint Delafield) on the left, three uppercase Italiana label-style links on the right (gap 4-8). Active link is gold; inactive is ink. 1px gold animated underline on the active link.
- **NavBar (home, post-envelope):** identical to subpages, but appears via `opacity 0 → 1` + `translateY(-16px → 0)` when the envelope scroll progress crosses 0.85.

### Signature: Wax Seal
A layered SVG 220×260 viewBox (vertical oval), scaled to `clamp(180px, 26vw, 280px)`. Matte terracotta wax with an irregular vertical-oval outline — small thickness bumps and a slight drip overflow at the lower-right. Form lighting only: a soft top-light radial gradient (no specular, no sparkles, no shine). The design is **debossed**: every element (wreath leaves, stems, berries, monogram) is drawn as a dark recess with a single thin top-light edge along its upper-left, creating the optical illusion of physical depth carved into wax. The center field carries a **debossed serif M&V monogram**, surrounded by a **botanical wreath** of two mirrored curving stems with ~14 small leaves and 6 tiny berry pairs, meeting in small sprigs at the top and bottom of the oval. Sits at the seam where the flap meets the front body. Lifts up with the flap during the cinematic; never cracks, never shatters.

### Signature: Envelope (home only)
A full-bleed paper artifact filling 100vw × 100vh. Five stacked layers: (1) envelope back (cream gradient, full viewport), (2) inner liner (revealed when flap opens, with a subtle diamond pattern), (3) envelope front (clipped to lower 62%, with grain, address text, postmark, and return address), (4) top flap (clipped to triangle, hinged on top edge, rotates 0 → -178° on rotateX), (5) wax seal at the flap-front seam.

## 6. Do's and Don'ts

### Do:
- **Do** treat the envelope as the page on the home view. Edge-to-edge, no centered card.
- **Do** use Italiana at 0.4em letter-spacing for every uppercase label.
- **Do** italicize body copy. Cormorant Garamond italic is the default for paragraphs.
- **Do** keep the wax red ≤ 5% of any screen. It belongs on the seal, the postmark, and link hover states only.
- **Do** use the ornamental dividers between sections; their stroke-draw animation is part of the patience.
- **Do** show photographs as polaroids: cream mat, washi tape, slight rotation, sepia + contrast filter, 800×800 minimum.
- **Do** respect `prefers-reduced-motion: reduce`: skip the scroll-pin, auto-open the envelope, fall back to native scroll.
- **Do** keep all copy in Spanish, tú-form. Headlines, labels, alt text, error states.

### Don't:
- **Don't** use the pastel-rose-and-laurel template aesthetic that dominates wedding sites (The Knot, Joy, Zola defaults). Reject it explicitly.
- **Don't** apply Etsy-download "wedding clip art" — over-rendered gold foil flourishes, clip-art laurel wreaths, generic calligraphy. The laurel inside the wax seal is the only laurel in the system.
- **Don't** use SaaS marketing patterns: hero with big metric, three-column feature grid, FAQ accordion, testimonial slider. The interface is a letter, not a product page.
- **Don't** introduce dark mode, glassmorphism, or gradient text. All three are wrong-register reflexes.
- **Don't** auto-play music, drop confetti, or surface RSVP modals. Every one of these is a wedding-site cliché.
- **Don't** add a fourth typeface. Italiana, Mrs Saint Delafield, Cormorant Garamond. That is the full set.
- **Don't** use pure `#000` or `#fff`. Every neutral is tinted toward the paper hue.
- **Don't** apply `border-left` greater than 1px as a colored stripe on cards or callouts. Never an accent stripe.
- **Don't** use pill-shaped buttons or 12px+ border-radius on any element. Square corners, ≤ 2px radius only.
- **Don't** use modal dialogs. There is no modal in the system.
- **Don't** crack the wax seal. The seal lifts up intact with the flap; it does not shatter.
