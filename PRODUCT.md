# Product

## Register

brand

## Users

Wedding guests of Manuel and Valentina, ages roughly 18 to 80, mostly Spanish-speaking (Peruvian Spanish), receiving the link via WhatsApp/SMS. Half will open it on a phone in landscape during a commute, the other half on a desktop while drinking coffee. Almost none will look at it twice. Their context is anticipation: "is this the one I just got from M&V?" The site has 30 seconds to make them feel that the wedding will be a beautiful evening worth dressing up for, and to deliver three facts they will need later: when, where, what to wear.

The site is in Spanish only. Tú-form throughout, intimate but not casual.

## Product Purpose

A digital wedding invitation that performs the same job a paper invitation performs in real life. The site exists to (a) deliver the invitation as an experience worth pausing for, not a card-with-info, and (b) give guests the practical details for the ceremony, reception, and dress code without making them hunt. Success is one guest forwarding the link to a partner with the message "look at this" instead of "here's the address."

## Brand Personality

Three words: **heirloom, intimate, deliberate.**

Voice: a handwritten letter from a friend who cares about the typography of the envelope. Warm, never saccharine. Italics and ornament are earned, not sprinkled. The interface has the patience of paper: a single thing on screen at a time, breathing room everywhere, every flourish reads as craft rather than decoration. Emotional goal: the guest closes the tab feeling that the couple has style, that the wedding will be one of the good ones, and that they have been personally addressed.

## Anti-references

- **Generic wedding-site templates** (The Knot, Joy, Zola default themes). Pastel rose, identical script font, photo-grid hero, RSVP form above the fold.
- **Sticker-pack ornament** (Etsy "wedding invitation download" aesthetic): clip-art laurel wreaths, generic gold-foil flourishes, over-the-top calligraphy that nobody can read.
- **SaaS marketing patterns**: hero with big metric, three-column feature grid, FAQ accordion. The interface should not feel like a product page.
- **Modern flat illustration mascots**: pastel couples with cartoon faces, blob backgrounds, animated confetti.
- **Glassmorphism and gradient text**: blurred panels, gradient headings, neon glow. Wrong register.
- **Auto-playing music**, **confetti cannons**, **pop-up RSVP modals**. Every one of these is a category reflex; reject all.

## Design Principles

1. **The envelope is the page.** The home view is not a hero section; it is a sealed envelope filling the viewport. The user opens it. Every interaction descends from this metaphor.
2. **Patience is a feature.** Things take their time. Scroll-driven choreography earns the patience by giving each beat a reason: arrival, intimacy, reveal. No rushed states, no impatient micro-interactions.
3. **Restraint over ornament.** One typeface family per role, one accent color (wax red), one ornamental flourish per section. Decoration is rare so it lands when it appears.
4. **Read it like a letter.** Body copy lives at letter-length lines, in a serif sized for reading, not for headlines. Information hierarchy follows letter conventions: salutation, body, signature, postscript.
5. **Spanish first, last, and only.** No language toggle, no fallback to English copy, no machine-translated phrasing. The grammar carries the warmth.

## Accessibility & Inclusion

- **WCAG 2.2 AA** for color contrast on all text (ink #1F1A14 on ivory #F5EFE3 measures ≥ 7:1 → AAA on body, comfortably AA on the gold accent).
- **`prefers-reduced-motion: reduce` is honored everywhere**: the envelope opens in a single 1.2s timeline instead of scroll-pinned, Lenis is disabled, polaroid reveals collapse to opacity-only.
- **Static reachability**: every piece of information in the cinematic is also present in the post-cinematic scroll. A guest who cannot or will not scroll-and-scrub still gets the date, venue, dress code, and map.
- **Map has a textual fallback**: address, "Open in Google Maps" link, and venue name are present even if Leaflet fails to load.
- **All decorative SVG is `aria-hidden`** and uses `role="presentation"`. Only the headings, body text, and links are exposed to assistive tech.
- **Touch targets** are ≥ 44×44 px on mobile for the two CTAs and nav links.
- **Keyboard navigation** works for everything; focus rings are visible (gold underline, not removed).
- **No information conveyed by motion or color alone.**
