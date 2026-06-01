# Manuel & Valentina Wedding Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page romantic-vintage wedding website in Spanish with a scroll-driven envelope-opening cinematic on the home page, deployed to Vercel.

**Architecture:** Next.js 16 App Router on Vercel. GSAP + ScrollTrigger pinned timeline for the home cinematic; Motion for UI micro-interactions; Lenis for smooth scroll. Content lives in typed TypeScript modules. Three routes share a paper-textured layout shell with a navigation bar that appears post-envelope on the home page.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, GSAP 3.13 + ScrollTrigger, Motion (Framer Motion v12), Lenis 1.3, next/font (Cormorant Garamond, Italiana, Mrs Saint Delafield), Leaflet + OpenStreetMap, deployed via `vercel.ts`.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Create Next.js 16 project non-interactively**

Run from `/Users/juan/Documents/repos/jcmn.dev/manuel-valentina`:
```bash
npx --yes create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir false \
  --import-alias "@/*" \
  --no-eslint \
  --turbopack \
  --yes
```

Expected: scaffolds into the current directory. If the CLI complains about non-empty dir because of `docs/`, run with `--use-npm` and accept the overwrite prompts by passing `--yes`. If it still refuses, scaffold into a temp dir and `mv` the files in (keeping `docs/`).

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```
Expected: Next reports "Ready" on http://localhost:3000. Kill the server (Ctrl-C) after confirming.

- [ ] **Step 3: Initialize git and make first commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with TS and Tailwind"
```

---

## Task 2: Install animation dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install GSAP, Motion, Lenis, Leaflet**

```bash
npm install gsap @gsap/react motion lenis leaflet
npm install -D @types/leaflet
```

Expected: all packages install without peer-dependency warnings.

- [ ] **Step 2: Verify versions**

```bash
node -e "const p=require('./package.json'); console.log(p.dependencies)"
```
Expected: gsap ≥ 3.13, motion ≥ 12, lenis ≥ 1.3, leaflet ≥ 1.9, @gsap/react ≥ 2.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add animation dependencies (gsap, motion, lenis, leaflet)"
```

---

## Task 3: Configure fonts and global theme

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `app/theme.css`

- [ ] **Step 1: Replace `app/layout.tsx` with font setup**

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Italiana, Mrs_Saint_Delafield } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italiana',
  display: 'swap',
})

const mrsSaint = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mrs-saint',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manuel & Valentina · 14 de Noviembre, 2026',
  description: 'Acompáñanos a celebrar nuestro matrimonio. 14 de Noviembre, 2026 · Hacienda San Carlos, Lima.',
  openGraph: {
    title: 'Manuel & Valentina · 14.11.2026',
    description: 'Acompáñanos a celebrar nuestro matrimonio.',
    type: 'website',
    locale: 'es_PE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${italiana.variable} ${mrsSaint.variable}`}>
      <body className="font-serif bg-ivory text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Replace `app/globals.css` with Tailwind v4 + custom theme**

```css
@import "tailwindcss";

@theme {
  --color-ivory: #F5EFE3;
  --color-cream: #ECE3CF;
  --color-ink: #1F1A14;
  --color-ink-soft: #4A3F2E;
  --color-gold: #B08D57;
  --color-gold-dim: #8C6F40;
  --color-wax: #8C2E2A;
  --color-wax-dark: #5C1B19;

  --font-serif: var(--font-cormorant), Georgia, serif;
  --font-display: var(--font-italiana), Georgia, serif;
  --font-script: var(--font-mrs-saint), cursive;

  --shadow-paper: 0 24px 60px -20px rgba(31, 26, 20, 0.25), 0 8px 20px -8px rgba(31, 26, 20, 0.15);
  --shadow-soft: 0 8px 24px -8px rgba(31, 26, 20, 0.18);
}

@layer base {
  html {
    scroll-behavior: auto; /* Lenis handles smooth scroll */
  }
  body {
    background-color: var(--color-ivory);
    color: var(--color-ink);
    font-family: var(--font-serif);
    overflow-x: hidden;
  }
  ::selection {
    background-color: var(--color-gold);
    color: var(--color-ivory);
  }
}

@layer utilities {
  .font-display { font-family: var(--font-display); letter-spacing: 0.02em; }
  .font-script  { font-family: var(--font-script); }
  .paper-texture {
    background-image: url('/textures/paper-grain.svg');
    background-size: 480px 480px;
    background-repeat: repeat;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Replace `app/page.tsx` with a temporary placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center paper-texture">
      <h1 className="font-display text-6xl text-ink">Manuel &amp; Valentina</h1>
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```
Open http://localhost:3000. Expected: "Manuel & Valentina" in Italiana display font on cream background. Kill server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure fonts (Cormorant, Italiana, Mrs Saint Delafield) and theme palette"
```

---

## Task 4: Add paper texture asset

**Files:**
- Create: `public/textures/paper-grain.svg`

- [ ] **Step 1: Create paper-grain SVG with SVG noise filter**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
    <feColorMatrix values="0 0 0 0 0.12
                           0 0 0 0 0.10
                           0 0 0 0 0.08
                           0 0 0 0.08 0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#n)" />
</svg>
```

- [ ] **Step 2: Verify in browser**

Reload http://localhost:3000. Expected: subtle warm grain visible over the cream background.

- [ ] **Step 3: Commit**

```bash
git add public/textures/paper-grain.svg
git commit -m "feat: add paper-grain SVG texture overlay"
```

---

## Task 5: Create content modules

**Files:**
- Create: `content/wedding.ts`
- Create: `content/story.ts`
- Create: `content/dressCode.ts`

- [ ] **Step 1: Create `content/wedding.ts`**

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
} as const

export type Wedding = typeof wedding
```

- [ ] **Step 2: Create `content/story.ts`**

```ts
export type StoryMilestone = {
  year: string
  title: string
  body: string
  rotation: number
  tapeColor: 'cream' | 'gold'
  photo: string
  caption: string
}

export const story: readonly StoryMilestone[] = [
  {
    year: '2019',
    title: 'Cómo nos conocimos',
    body: 'Una tarde de octubre en una cafetería de Barranco. Ella pidió un café cargado; él, un té de jazmín. Hablamos hasta que cerraron.',
    rotation: -2.5,
    tapeColor: 'cream',
    photo: '/photos/polaroid-1.jpg',
    caption: 'Octubre, 2019',
  },
  {
    year: '2021',
    title: 'El primer viaje',
    body: 'Cusco. Lluvia inesperada en Machu Picchu, un paraguas compartido, y una promesa silenciosa de no soltarnos la mano.',
    rotation: 1.8,
    tapeColor: 'gold',
    photo: '/photos/polaroid-2.jpg',
    caption: 'Cusco · 2021',
  },
  {
    year: '2024',
    title: 'La propuesta',
    body: 'Diciembre en Paracas. El sol se ponía sobre el mar cuando Manuel sacó la cajita. Valentina lloró antes de que él dijera una palabra.',
    rotation: -1.2,
    tapeColor: 'cream',
    photo: '/photos/polaroid-3.jpg',
    caption: 'Paracas · 2024',
  },
  {
    year: '2026',
    title: 'Y ahora...',
    body: 'Queremos celebrar este nuevo capítulo contigo. Acompáñanos a decir: para siempre.',
    rotation: 2.0,
    tapeColor: 'gold',
    photo: '/photos/polaroid-4.jpg',
    caption: 'Para siempre',
  },
] as const
```

- [ ] **Step 3: Create `content/dressCode.ts`**

```ts
export const dressCode = {
  title: 'Código de Vestimenta',
  formality: 'Formal — Black Tie',
  intro: 'Queremos que esta noche sea inolvidable. Te pedimos vestirte para la ocasión: ellos en traje oscuro o smoking; ellas en vestido largo o de cóctel elegante.',
  recommendedPalette: [
    { name: 'Esmeralda', hex: '#1F4D3D' },
    { name: 'Rosa empolvado', hex: '#C9A6A1' },
    { name: 'Crema', hex: '#ECE3CF' },
    { name: 'Carbón', hex: '#2E2A26' },
    { name: 'Oro envejecido', hex: '#B08D57' },
  ],
  avoid: ['Blanco', 'Marfil', 'Beige muy claro'],
  notes: 'Tacones cómodos recomendados — parte del jardín es de césped.',
} as const

export type DressCode = typeof dressCode
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat: add typed content modules (wedding, story, dressCode)"
```

---

## Task 6: Add placeholder polaroid photos

**Files:**
- Create: `public/photos/polaroid-1.jpg`
- Create: `public/photos/polaroid-2.jpg`
- Create: `public/photos/polaroid-3.jpg`
- Create: `public/photos/polaroid-4.jpg`

- [ ] **Step 1: Generate sepia-tinted placeholder JPEGs**

Polaroids should feel vintage. Generate four 800x800 sepia-tinted placeholder images. Use placehold.co with sepia tones via shell:

```bash
mkdir -p public/photos
curl -L "https://placehold.co/800x800/D9C7A3/4A3F2E.jpg?text=Octubre+2019&font=playfair" -o public/photos/polaroid-1.jpg
curl -L "https://placehold.co/800x800/C9B89A/4A3F2E.jpg?text=Cusco+2021&font=playfair" -o public/photos/polaroid-2.jpg
curl -L "https://placehold.co/800x800/D4BFA3/4A3F2E.jpg?text=Paracas+2024&font=playfair" -o public/photos/polaroid-3.jpg
curl -L "https://placehold.co/800x800/E0CBA8/4A3F2E.jpg?text=Para+Siempre&font=playfair" -o public/photos/polaroid-4.jpg
```

Expected: 4 JPEG files, each ~10-30 KB.

- [ ] **Step 2: Verify file sizes**

```bash
ls -lh public/photos/
```
Expected: 4 files present, non-empty.

- [ ] **Step 3: Commit**

```bash
git add public/photos/
git commit -m "feat: add placeholder polaroid images"
```

---

## Task 7: Build PaperBackground component

**Files:**
- Create: `components/shared/PaperBackground.tsx`

- [ ] **Step 1: Write the component**

```tsx
export function PaperBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 paper-texture opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(31, 26, 20, 0.12) 100%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Wire into `app/layout.tsx`**

In `app/layout.tsx`, import and render `<PaperBackground />` inside `<body>` before `{children}`:

```tsx
import { PaperBackground } from '@/components/shared/PaperBackground'
// ...
<body className="font-serif bg-ivory text-ink antialiased">
  <PaperBackground />
  {children}
</body>
```

- [ ] **Step 3: Verify in browser**

`npm run dev`, reload localhost:3000. Expected: subtle vignette + paper grain visible.

- [ ] **Step 4: Commit**

```bash
git add components/shared/PaperBackground.tsx app/layout.tsx
git commit -m "feat: add persistent PaperBackground with grain + vignette"
```

---

## Task 8: GSAP setup helper

**Files:**
- Create: `lib/gsap.ts`
- Create: `lib/prefersReducedMotion.ts`

- [ ] **Step 1: Create `lib/gsap.ts`**

```ts
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

- [ ] **Step 2: Create `lib/prefersReducedMotion.ts`**

```ts
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```

- [ ] **Step 3: Verify compile**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add gsap setup helper and reduced-motion util"
```

---

## Task 9: SmoothScrollProvider (Lenis + GSAP ticker)

**Files:**
- Create: `components/motion/SmoothScrollProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the provider**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Wrap children in `app/layout.tsx`**

```tsx
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
// ...
<body className="font-serif bg-ivory text-ink antialiased">
  <PaperBackground />
  <SmoothScrollProvider>
    {children}
  </SmoothScrollProvider>
</body>
```

- [ ] **Step 3: Verify in browser**

`npm run dev`, scroll the page. Expected: scrolling has a slight ease/glide (Lenis active). With `prefers-reduced-motion`, native scroll is used.

- [ ] **Step 4: Commit**

```bash
git add components/motion/ app/layout.tsx
git commit -m "feat: add Lenis-based smooth scroll provider synced to GSAP ticker"
```

---

## Task 10: Build NavBar component

**Files:**
- Create: `components/shared/NavBar.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Invitación' },
  { href: '/codigo-de-vestimenta', label: 'Código de Vestimenta' },
  { href: '/ubicacion', label: 'Ubicación' },
]

export function NavBar({ visible = true }: { visible?: boolean }) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 inset-x-0 z-40"
        >
          <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-script text-2xl text-ink hover:text-gold transition-colors">
              M &amp; V
            </Link>
            <ul className="flex items-center gap-8 text-sm tracking-widest uppercase">
              {links.map((l) => {
                const active = pathname === l.href
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`relative font-display transition-colors ${
                        active ? 'text-gold' : 'text-ink hover:text-gold'
                      }`}
                    >
                      {l.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/NavBar.tsx
git commit -m "feat: add animated NavBar with active route indicator"
```

---

## Task 11: OrnamentalDivider + ornament SVGs

**Files:**
- Create: `public/ornaments/divider-1.svg`
- Create: `public/ornaments/divider-2.svg`
- Create: `public/ornaments/corner.svg`
- Create: `components/shared/OrnamentalDivider.tsx`

- [ ] **Step 1: Create `public/ornaments/divider-1.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 24" width="320" height="24">
  <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
    <path d="M8 12 L140 12" />
    <path d="M180 12 L312 12" />
    <circle cx="160" cy="12" r="4" />
    <path d="M148 12 Q160 4 172 12" />
    <path d="M148 12 Q160 20 172 12" />
  </g>
</svg>
```

- [ ] **Step 2: Create `public/ornaments/divider-2.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 32" width="320" height="32">
  <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
    <path d="M10 16 C 60 4, 100 28, 160 16 C 220 4, 260 28, 310 16" />
    <circle cx="160" cy="16" r="2.5" fill="currentColor" />
  </g>
</svg>
```

- [ ] **Step 3: Create `public/ornaments/corner.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
    <path d="M6 6 Q 40 8 40 40 Q 8 40 6 6 Z" />
    <path d="M14 14 Q 32 16 32 32 Q 16 32 14 14" />
    <circle cx="8" cy="8" r="1.6" fill="currentColor" />
  </g>
</svg>
```

- [ ] **Step 4: Create `components/shared/OrnamentalDivider.tsx`**

```tsx
'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

type Props = {
  variant?: 1 | 2
  className?: string
  animate?: boolean
}

export function OrnamentalDivider({ variant = 1, className = '', animate = true }: Props) {
  const ref = useRef<SVGSVGElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const paths1 = (
    <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
      <motion.path d="M8 12 L140 12"
        initial={{ pathLength: 0 }} animate={animate && inView ? { pathLength: 1 } : {}} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.path d="M180 12 L312 12"
        initial={{ pathLength: 0 }} animate={animate && inView ? { pathLength: 1 } : {}} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.circle cx={160} cy={12} r={4}
        initial={{ scale: 0 }} animate={animate && inView ? { scale: 1 } : {}} transition={{ delay: 0.6, duration: 0.4 }} />
      <motion.path d="M148 12 Q160 4 172 12"
        initial={{ pathLength: 0 }} animate={animate && inView ? { pathLength: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} />
      <motion.path d="M148 12 Q160 20 172 12"
        initial={{ pathLength: 0 }} animate={animate && inView ? { pathLength: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} />
    </g>
  )

  const paths2 = (
    <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round">
      <motion.path d="M10 16 C 60 4, 100 28, 160 16 C 220 4, 260 28, 310 16"
        initial={{ pathLength: 0 }} animate={animate && inView ? { pathLength: 1 } : {}} transition={{ duration: 1.4, ease: 'easeOut' }} />
      <motion.circle cx={160} cy={16} r={2.5} fill="currentColor"
        initial={{ scale: 0 }} animate={animate && inView ? { scale: 1 } : {}} transition={{ delay: 0.8, duration: 0.4 }} />
    </g>
  )

  const viewBox = variant === 1 ? '0 0 320 24' : '0 0 320 32'

  return (
    <svg
      ref={ref}
      role="presentation"
      aria-hidden="true"
      viewBox={viewBox}
      className={`text-gold ${className}`}
      width={320}
      height={variant === 1 ? 24 : 32}
    >
      {variant === 1 ? paths1 : paths2}
    </svg>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add public/ornaments/ components/shared/OrnamentalDivider.tsx
git commit -m "feat: add ornamental dividers with stroke-draw animation"
```

---

## Task 12: PolaroidFrame component

**Files:**
- Create: `components/shared/PolaroidFrame.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  caption: string
  rotation?: number
  tapeColor?: 'cream' | 'gold'
  className?: string
}

const tapeStyles: Record<NonNullable<Props['tapeColor']>, string> = {
  cream: 'bg-[rgba(236,227,207,0.85)]',
  gold:  'bg-[rgba(176,141,87,0.55)]',
}

export function PolaroidFrame({
  src, alt, caption, rotation = 0, tapeColor = 'cream', className = '',
}: Props) {
  return (
    <figure
      className={`relative inline-block bg-[#FBF6EA] p-3 pb-12 shadow-[0_18px_40px_-16px_rgba(31,26,20,0.35),0_4px_12px_-2px_rgba(31,26,20,0.15)] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 ${tapeStyles[tapeColor]} skew-y-[-2deg] opacity-90`} aria-hidden="true" />
      <div className="relative w-[260px] h-[260px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="260px"
          className="object-cover sepia-[.35] contrast-[1.05] brightness-[0.96]"
        />
      </div>
      <figcaption className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/PolaroidFrame.tsx
git commit -m "feat: add PolaroidFrame with tape and sepia tint"
```

---

## Task 13: WaxSeal SVG component

**Files:**
- Create: `components/envelope/WaxSeal.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
}

export const WaxSeal = forwardRef<SVGSVGElement, Props>(function WaxSeal({ className = '' }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      width="160"
      height="160"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wax-grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#B53F3A" />
          <stop offset="55%" stopColor="#8C2E2A" />
          <stop offset="100%" stopColor="#5C1B19" />
        </radialGradient>
        <radialGradient id="wax-highlight" cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="rgba(255,220,205,0.55)" />
          <stop offset="100%" stopColor="rgba(255,220,205,0)" />
        </radialGradient>
      </defs>

      <g data-wax-seal>
        <path
          data-wax-blob
          d="M100 14 C 132 14 168 30 178 62 C 192 90 178 132 154 156 C 138 174 110 188 90 184 C 60 178 28 156 18 124 C 8 92 22 56 50 32 C 64 22 80 14 100 14 Z"
          fill="url(#wax-grad)"
        />
        <ellipse cx="78" cy="68" rx="44" ry="28" fill="url(#wax-highlight)" />

        <g data-wax-monogram fill="none" stroke="rgba(255,230,210,0.85)" strokeWidth="2.5" strokeLinecap="round" transform="translate(0,4)">
          <path d="M68 120 L68 80 L100 110 L132 80 L132 120" />
          <path d="M86 124 L114 124" />
        </g>

        <path
          data-wax-fissure
          d="M40 90 L 80 110 L 120 95 L 160 120"
          fill="none"
          stroke="#3A0E0C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
      </g>

      <g data-wax-fragments opacity="0">
        <path data-wax-frag="1" d="M40 90 L 80 110 L 60 130 Z" fill="url(#wax-grad)" />
        <path data-wax-frag="2" d="M80 110 L 120 95 L 130 130 L 95 135 Z" fill="url(#wax-grad)" />
        <path data-wax-frag="3" d="M120 95 L 160 120 L 145 145 L 125 130 Z" fill="url(#wax-grad)" />
      </g>
    </svg>
  )
})
```

- [ ] **Step 2: Commit**

```bash
git add components/envelope/WaxSeal.tsx
git commit -m "feat: add WaxSeal SVG with monogram, fissure, and fragment groups"
```

---

## Task 14: Envelope SVG component

**Files:**
- Create: `components/envelope/Envelope.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { forwardRef, ReactNode } from 'react'
import { WaxSeal } from './WaxSeal'

type Props = {
  children?: ReactNode
}

export const Envelope = forwardRef<HTMLDivElement, Props>(function Envelope({ children }, ref) {
  return (
    <div
      ref={ref}
      data-envelope
      className="relative w-[min(560px,86vw)] aspect-[1.55/1]"
      style={{ perspective: '1600px' }}
    >
      {/* Back of envelope */}
      <div
        data-envelope-back
        className="absolute inset-0 rounded-[6px] shadow-[0_30px_80px_-20px_rgba(31,26,20,0.45)]"
        style={{
          background: 'linear-gradient(160deg, #ECE3CF 0%, #DCCFB2 100%)',
        }}
      />

      {/* Letter shadow inside */}
      <div data-envelope-inside className="absolute inset-3 rounded-[4px] bg-[#F5EFE3] opacity-0" />

      {/* Body front */}
      <div
        data-envelope-front
        className="absolute inset-0 rounded-[6px]"
        style={{
          background:
            'linear-gradient(170deg, #F1E7D0 0%, #E2D3B0 60%, #D6C39A 100%)',
          clipPath: 'polygon(0 38%, 100% 38%, 100% 100%, 0 100%)',
          boxShadow: 'inset 0 -1px 0 rgba(31,26,20,0.08)',
        }}
      />

      {/* Body side flaps decorative lines */}
      <svg
        viewBox="0 0 100 65"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <path d="M0 38 L 50 75 L 100 38" fill="none" stroke="rgba(31,26,20,0.18)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <path d="M0 38 L 50 60 L 100 38" fill="none" stroke="rgba(31,26,20,0.12)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Top flap (animatable) */}
      <div
        data-envelope-flap
        className="absolute inset-x-0 top-0 h-[62%] origin-top"
        style={{
          background:
            'linear-gradient(180deg, #E8DAB8 0%, #D5C297 100%)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      />

      {/* Wax seal */}
      <div
        data-envelope-seal
        className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <WaxSeal />
      </div>

      {/* Slot for letter content */}
      <div data-envelope-slot className="absolute inset-0">
        {children}
      </div>
    </div>
  )
})
```

- [ ] **Step 2: Commit**

```bash
git add components/envelope/Envelope.tsx
git commit -m "feat: add Envelope SVG-shaped paper container with flap and seal"
```

---

## Task 15: StoryMilestone component

**Files:**
- Create: `components/envelope/StoryMilestone.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { PolaroidFrame } from '@/components/shared/PolaroidFrame'
import type { StoryMilestone as Milestone } from '@/content/story'

type Props = {
  milestone: Milestone
  index: number
  reverse?: boolean
}

export function StoryMilestone({ milestone, index, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: milestone.rotation - 6 }}
        animate={inView ? { opacity: 1, y: 0, rotate: milestone.rotation } : {}}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <PolaroidFrame
          src={milestone.photo}
          alt={milestone.title}
          caption={milestone.caption}
          rotation={0}
          tapeColor={milestone.tapeColor}
        />
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="max-w-md text-center md:text-left"
      >
        <p className="font-display tracking-[0.4em] text-sm text-gold mb-2">
          {milestone.year}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
          {milestone.title}
        </h3>
        <time dateTime={milestone.year} className="sr-only">{milestone.year}</time>
        <p className="text-lg leading-relaxed text-ink-soft italic">
          {milestone.body}
        </p>
      </motion.article>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/envelope/StoryMilestone.tsx
git commit -m "feat: add StoryMilestone with polaroid + animated copy"
```

---

## Task 16: InvitationReveal component

**Files:**
- Create: `components/envelope/InvitationReveal.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { wedding } from '@/content/wedding'

export function InvitationReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const transition = (delay: number) => ({
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  })

  return (
    <section
      ref={ref}
      data-invitation
      className="relative flex flex-col items-center text-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(0)}
      >
        <OrnamentalDivider variant={2} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.15)}
        className="font-display tracking-[0.5em] text-sm text-gold mt-8 mb-6 uppercase"
      >
        Tenemos el honor de invitarte
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.35)}
        className="font-script text-7xl md:text-9xl text-ink leading-none"
      >
        {wedding.brideName}
      </motion.h1>

      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(0.6)}
        className="font-display text-3xl text-gold my-4"
      >
        &amp;
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(0.75)}
        className="font-script text-7xl md:text-9xl text-ink leading-none"
      >
        {wedding.groomName}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(1.0)}
        className="mt-12 mb-8"
      >
        <OrnamentalDivider variant={1} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.15)}
        className="font-display tracking-[0.6em] text-2xl md:text-3xl text-ink uppercase"
      >
        {wedding.dateRoman}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.3)}
        className="mt-3 text-lg text-ink-soft italic"
      >
        {wedding.dateDisplay}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.45)}
        className="mt-8"
      >
        <p className="font-display tracking-[0.3em] text-sm text-gold uppercase mb-1">
          Ceremonia
        </p>
        <p className="text-xl text-ink">
          {wedding.ceremony.name}
        </p>
        <p className="text-base text-ink-soft italic">
          {wedding.ceremony.address}
        </p>
        <p className="text-base text-ink mt-1">
          {wedding.ceremony.time} h
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={transition(1.7)}
        className="mt-16 flex flex-col md:flex-row gap-4"
      >
        <Link
          href="/codigo-de-vestimenta"
          className="group relative px-8 py-4 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Código de Vestimenta
        </Link>
        <Link
          href="/ubicacion"
          className="group relative px-8 py-4 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.3em] text-sm uppercase"
        >
          Ubicación
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={transition(2.0)}
        className="mt-16 font-script text-3xl text-ink-soft"
      >
        Con amor, M &amp; V
      </motion.p>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/envelope/InvitationReveal.tsx
git commit -m "feat: add InvitationReveal with names, date, venue, CTAs"
```

---

## Task 17: EnvelopeScene cinematic (the centerpiece)

**Files:**
- Create: `components/envelope/EnvelopeScene.tsx`

- [ ] **Step 1: Write the orchestrator**

```tsx
'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Envelope } from './Envelope'
import { StoryMilestone } from './StoryMilestone'
import { InvitationReveal } from './InvitationReveal'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'
import { story } from '@/content/story'

export function EnvelopeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const envelopeRef = useRef<HTMLDivElement | null>(null)
  const letterRef = useRef<HTMLDivElement | null>(null)
  const hintRef = useRef<HTMLDivElement | null>(null)
  const [navVisible, setNavVisible] = useState(false)

  useGSAP(
    () => {
      if (!containerRef.current || !stageRef.current || !envelopeRef.current || !letterRef.current) return

      const reduced = prefersReducedMotion()

      if (reduced) {
        // Static fallback: show letter open, no pinning.
        gsap.set(envelopeRef.current, { opacity: 0, display: 'none' })
        gsap.set(letterRef.current, { opacity: 1, y: 0 })
        setNavVisible(true)
        return
      }

      const envelope = envelopeRef.current
      const flap = envelope.querySelector('[data-envelope-flap]') as HTMLElement
      const inside = envelope.querySelector('[data-envelope-inside]') as HTMLElement
      const seal = envelope.querySelector('[data-envelope-seal]') as HTMLElement
      const waxBlob = envelope.querySelector('[data-wax-blob]') as SVGPathElement | null
      const monogram = envelope.querySelector('[data-wax-monogram]') as SVGGElement | null
      const fissure = envelope.querySelector('[data-wax-fissure]') as SVGPathElement | null
      const fragGroup = envelope.querySelector('[data-wax-fragments]') as SVGGElement | null
      const frags = envelope.querySelectorAll('[data-wax-frag]') as NodeListOf<SVGPathElement>

      // Initial states
      gsap.set(envelope, { opacity: 0, scale: 0.86, y: 30 })
      gsap.set(hintRef.current, { opacity: 0 })
      gsap.set(letterRef.current, { opacity: 0, y: 60, scale: 0.96 })
      gsap.set(flap, { rotateX: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          pin: stageRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (st) => {
            setNavVisible(st.progress > 0.82)
          },
        },
      })

      // 0.00 – 0.05 — Arrival
      tl.to(envelope, { opacity: 1, scale: 0.92, y: 10, duration: 0.05 }, 0)
        .to(hintRef.current, { opacity: 1, duration: 0.03 }, 0.02)
        .to(hintRef.current, { opacity: 0, duration: 0.04 }, 0.10)

      // 0.05 – 0.15 — Lean-in (warm glow)
      tl.to(envelope, { scale: 1.0, duration: 0.10 }, 0.05)
        .to(seal, {
          filter: 'drop-shadow(0 6px 18px rgba(140,46,42,0.5))',
          duration: 0.08,
        }, 0.07)

      // 0.15 – 0.25 — Crack
      if (fissure) {
        tl.to(fissure, { strokeDashoffset: 0, duration: 0.06, ease: 'power2.out' }, 0.15)
      }
      if (fragGroup) {
        tl.to(fragGroup, { opacity: 1, duration: 0.01 }, 0.21)
      }
      if (waxBlob) {
        tl.to(waxBlob, { opacity: 0, duration: 0.02 }, 0.21)
      }
      if (monogram) {
        tl.to(monogram, { opacity: 0, duration: 0.02 }, 0.21)
      }
      frags.forEach((f, i) => {
        const dir = i === 0 ? -1 : i === 1 ? 0 : 1
        tl.to(
          f,
          {
            x: dir * (40 + i * 12),
            y: 80 + i * 14,
            rotation: dir * (25 + i * 10),
            opacity: 0,
            duration: 0.08,
            ease: 'power2.in',
          },
          0.21 + i * 0.01,
        )
      })

      // 0.25 – 0.40 — Open flap
      tl.to(flap, {
        rotateX: -170,
        duration: 0.15,
        transformOrigin: 'top center',
        ease: 'power2.inOut',
      }, 0.25)
      tl.to(inside, { opacity: 1, duration: 0.05 }, 0.30)

      // 0.40 – 0.50 — Letter emerges
      tl.to(envelope, { y: -40, scale: 0.9, duration: 0.08 }, 0.40)
        .to(envelope, { opacity: 0.0, duration: 0.06 }, 0.46)
        .to(letterRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.10, ease: 'power2.out' }, 0.40)

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={stageRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Envelope layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Envelope ref={envelopeRef} />
        </div>

        {/* Hint */}
        <div
          ref={hintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-soft"
        >
          <p className="font-display tracking-[0.4em] text-xs uppercase">
            Desliza para abrir
          </p>
          <svg width="16" height="22" viewBox="0 0 16 22" className="animate-bounce" aria-hidden="true">
            <path d="M8 2 V 18 M2 12 L 8 18 L 14 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Letter layer (overlays once envelope fades) */}
        <div
          ref={letterRef}
          className="absolute inset-0 overflow-y-auto"
          style={{ pointerEvents: 'none' }}
        >
          <div className="min-h-full w-full flex flex-col items-center justify-center px-6 py-24" style={{ pointerEvents: 'auto' }}>
            <div className="max-w-3xl w-full">
              <header className="text-center mb-16">
                <OrnamentalDivider variant={1} />
                <p className="font-display tracking-[0.5em] text-sm text-gold uppercase mt-8">
                  Una pequeña historia
                </p>
                <p className="font-script text-5xl text-ink mt-3">de los dos</p>
              </header>

              <div className="space-y-32">
                {story.map((m, i) => (
                  <StoryMilestone key={m.year} milestone={m} index={i} reverse={i % 2 === 1} />
                ))}
              </div>

              <InvitationReveal />
            </div>
          </div>
        </div>
      </div>

      {/* Post-envelope nav (rendered separately so it persists after the pin releases) */}
      <PostEnvelopeNavRoot visible={navVisible} />
    </div>
  )
}

function PostEnvelopeNavRoot({ visible }: { visible: boolean }) {
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-script text-2xl text-ink hover:text-gold transition-colors">
          M &amp; V
        </Link>
        <div className="flex items-center gap-8 text-sm tracking-widest uppercase font-display">
          <Link href="/codigo-de-vestimenta" className="text-ink hover:text-gold transition-colors">
            Código de Vestimenta
          </Link>
          <Link href="/ubicacion" className="text-ink hover:text-gold transition-colors">
            Ubicación
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace `app/page.tsx`:

```tsx
import { EnvelopeScene } from '@/components/envelope/EnvelopeScene'

export default function Home() {
  return (
    <main>
      <EnvelopeScene />
    </main>
  )
}
```

- [ ] **Step 3: Manual verification**

```bash
npm run dev
```
Open http://localhost:3000. Slowly scroll. Expected sequence:
1. Envelope fades in.
2. "Desliza para abrir" appears then fades.
3. Envelope scales up; seal glows.
4. Wax seal cracks (fissure draws); seal shatters into 3 fragments that fall.
5. Top flap rotates open (3D).
6. Envelope fades; letter content appears.
7. Continue scrolling: story milestones reveal one by one with polaroids.
8. Final invitation reveal with names, date, venue.
9. Nav bar fades in near the bottom.

Kill server.

- [ ] **Step 4: Commit**

```bash
git add components/envelope/EnvelopeScene.tsx app/page.tsx
git commit -m "feat: build EnvelopeScene cinematic — GSAP pinned timeline with crack, flap, letter, story, invitation"
```

---

## Task 18: Dress code page

**Files:**
- Create: `app/codigo-de-vestimenta/page.tsx`
- Create: `components/dress-code/PaletteSwatches.tsx`
- Create: `components/dress-code/AvoidColors.tsx`
- Create: `components/dress-code/AttireSilhouettes.tsx`

- [ ] **Step 1: Create `components/dress-code/PaletteSwatches.tsx`**

```tsx
'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { dressCode } from '@/content/dressCode'

export function PaletteSwatches() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10">
      {dressCode.recommendedPalette.map((c, i) => (
        <motion.div
          key={c.hex}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="w-24 h-24 rounded-full shadow-[0_18px_36px_-12px_rgba(31,26,20,0.35),inset_0_-6px_18px_rgba(0,0,0,0.18),inset_0_6px_12px_rgba(255,255,255,0.18)]"
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
          />
          <p className="font-display tracking-[0.2em] text-xs text-ink mt-4 uppercase">
            {c.name}
          </p>
          <p className="text-xs text-ink-soft italic mt-1">{c.hex}</p>
        </motion.div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/dress-code/AvoidColors.tsx`**

```tsx
import { dressCode } from '@/content/dressCode'

export function AvoidColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {dressCode.avoid.map((c) => (
        <span
          key={c}
          className="relative inline-flex items-center gap-2 px-4 py-2 border border-ink-soft/30 rounded-full text-sm text-ink-soft"
        >
          <span aria-hidden="true" className="absolute left-2 right-2 top-1/2 h-px bg-wax/60" />
          <span className="relative">{c}</span>
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/dress-code/AttireSilhouettes.tsx`**

```tsx
'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export function AttireSilhouettes() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const drawTransition = (delay = 0) => ({
    duration: 2.2,
    delay,
    ease: 'easeInOut' as const,
  })

  return (
    <div ref={ref} className="flex justify-center items-end gap-12 md:gap-20 text-gold">
      <svg viewBox="0 0 100 220" width="120" height="240" aria-label="Smoking">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <motion.circle cx={50} cy={28} r={14} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0)} />
          <motion.path d="M36 42 L 26 64 L 30 110 L 22 200 L 36 200 L 44 130" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.2)} />
          <motion.path d="M64 42 L 74 64 L 70 110 L 78 200 L 64 200 L 56 130" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.2)} />
          <motion.path d="M40 60 L 50 95 L 60 60" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.6)} />
          <motion.line x1={50} y1={62} x2={50} y2={130} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.8)} />
        </g>
      </svg>

      <svg viewBox="0 0 100 220" width="120" height="240" aria-label="Vestido largo">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <motion.circle cx={50} cy={26} r={12} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0)} />
          <motion.path d="M40 40 L 50 60 L 60 40" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.2)} />
          <motion.path d="M42 60 Q 28 130 18 210 L 82 210 Q 72 130 58 60 Z" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(0.4)} />
          <motion.path d="M28 120 Q 50 140 72 120" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={drawTransition(1.2)} />
        </g>
      </svg>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/codigo-de-vestimenta/page.tsx`**

```tsx
import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { PaletteSwatches } from '@/components/dress-code/PaletteSwatches'
import { AvoidColors } from '@/components/dress-code/AvoidColors'
import { AttireSilhouettes } from '@/components/dress-code/AttireSilhouettes'
import { dressCode } from '@/content/dressCode'

export const metadata = {
  title: 'Código de Vestimenta · Manuel & Valentina',
}

export default function DressCodePage() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-gold uppercase">
            Para la ocasión
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ink mt-6">
            {dressCode.title}
          </h1>
          <p className="font-script text-3xl text-ink-soft mt-4">
            {dressCode.formality}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <p className="text-center text-lg leading-relaxed text-ink-soft max-w-xl mx-auto italic mb-20">
          {dressCode.intro}
        </p>

        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Paleta sugerida
          </h2>
          <PaletteSwatches />
        </section>

        <div className="flex justify-center mb-24">
          <OrnamentalDivider variant={1} />
        </div>

        <section className="mb-24">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            Colores a evitar
          </h2>
          <AvoidColors />
        </section>

        <div className="flex justify-center mb-20">
          <OrnamentalDivider variant={2} />
        </div>

        <section className="mb-16">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-10">
            La etiqueta
          </h2>
          <AttireSilhouettes />
        </section>

        <p className="text-center text-base text-ink-soft italic max-w-md mx-auto">
          {dressCode.notes}
        </p>
      </main>
    </>
  )
}
```

- [ ] **Step 5: Verify in browser**

`npm run dev`, visit http://localhost:3000/codigo-de-vestimenta. Expected: nav bar, hero, palette swatches with stagger animation, avoid colors with strikethrough, two silhouettes drawing in.

- [ ] **Step 6: Commit**

```bash
git add app/codigo-de-vestimenta/ components/dress-code/
git commit -m "feat: build dress code page with palette, avoid colors, attire silhouettes"
```

---

## Task 19: Location page (with map)

**Files:**
- Create: `app/ubicacion/page.tsx`
- Create: `components/ubicacion/VenueCard.tsx`
- Create: `components/ubicacion/VintageMap.tsx`

- [ ] **Step 1: Create `components/ubicacion/VenueCard.tsx`**

```tsx
import Link from 'next/link'

type Props = {
  label: string
  name: string
  address: string
  time: string
  mapsHref: string
}

export function VenueCard({ label, name, address, time, mapsHref }: Props) {
  return (
    <article className="relative bg-cream/60 border border-gold/30 rounded-sm p-8 md:p-10 text-center shadow-[0_18px_40px_-20px_rgba(31,26,20,0.25)]">
      <p className="font-display tracking-[0.4em] text-xs text-gold uppercase">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-ink mt-4 mb-3">
        {name}
      </h2>
      <p className="text-ink-soft italic">{address}</p>
      <p className="font-display tracking-[0.3em] text-sm text-ink mt-6 uppercase">
        {time} h
      </p>
      <Link
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 px-6 py-3 border border-gold text-ink hover:bg-gold hover:text-ivory transition-colors duration-500 font-display tracking-[0.25em] text-xs uppercase"
      >
        Cómo llegar
      </Link>
    </article>
  )
}
```

- [ ] **Step 2: Create `components/ubicacion/VintageMap.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { wedding } from '@/content/wedding'

export function VintageMap() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    let map: import('leaflet').Map | null = null

    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !ref.current) return

      map = L.map(ref.current, {
        center: wedding.ceremony.coords,
        zoom: 14,
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      const dropIcon = L.divIcon({
        className: 'vintage-pin',
        html: '<span class="vintage-pin-dot"></span>',
        iconSize: [24, 30],
        iconAnchor: [12, 28],
      })

      L.marker(wedding.ceremony.coords, { icon: dropIcon })
        .addTo(map)
        .bindPopup(`<strong>${wedding.ceremony.name}</strong><br/>${wedding.ceremony.address}`)

      if (
        wedding.reception.coords[0] !== wedding.ceremony.coords[0] ||
        wedding.reception.coords[1] !== wedding.ceremony.coords[1]
      ) {
        L.marker(wedding.reception.coords, { icon: dropIcon })
          .addTo(map)
          .bindPopup(`<strong>${wedding.reception.name}</strong><br/>${wedding.reception.address}`)
      }
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className="w-full h-[420px] rounded-sm border border-gold/30 overflow-hidden"
        aria-label="Mapa de la ceremonia y recepción"
        role="region"
      />
      <style>{`
        .leaflet-container {
          filter: sepia(0.45) saturate(0.7) contrast(1.05) hue-rotate(-8deg);
          font-family: var(--font-serif);
          background: #ECE3CF;
        }
        .vintage-pin { position: relative; }
        .vintage-pin-dot {
          display: block;
          width: 16px; height: 16px;
          background: #8C2E2A;
          border: 2px solid #F5EFE3;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          margin-left: 4px;
        }
      `}</style>
      <p className="text-xs text-ink-soft italic text-center mt-3">
        Si no puedes ver el mapa,{' '}
        <a
          className="underline decoration-gold"
          href={`https://maps.google.com/?q=${wedding.ceremony.coords[0]},${wedding.ceremony.coords[1]}`}
          target="_blank" rel="noopener noreferrer"
        >
          ábrelo en Google Maps
        </a>.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/ubicacion/page.tsx`**

```tsx
import { NavBar } from '@/components/shared/NavBar'
import { OrnamentalDivider } from '@/components/shared/OrnamentalDivider'
import { VenueCard } from '@/components/ubicacion/VenueCard'
import { VintageMap } from '@/components/ubicacion/VintageMap'
import { wedding } from '@/content/wedding'

export const metadata = {
  title: 'Ubicación · Manuel & Valentina',
}

const ceremoniaMaps = `https://maps.google.com/?q=${wedding.ceremony.coords[0]},${wedding.ceremony.coords[1]}`
const recepcionMaps = `https://maps.google.com/?q=${wedding.reception.coords[0]},${wedding.reception.coords[1]}`

export default function UbicacionPage() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-display tracking-[0.5em] text-sm text-gold uppercase">
            Dónde celebrar
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ink mt-6">
            Ubicación
          </h1>
          <p className="font-script text-3xl text-ink-soft mt-4">
            {wedding.ceremony.name}
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <OrnamentalDivider variant={2} />
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <VenueCard
            label="Ceremonia"
            name={wedding.ceremony.name}
            address={wedding.ceremony.address}
            time={wedding.ceremony.time}
            mapsHref={ceremoniaMaps}
          />
          <VenueCard
            label="Recepción"
            name={wedding.reception.name}
            address={wedding.reception.address}
            time={wedding.reception.time}
            mapsHref={recepcionMaps}
          />
        </section>

        <section>
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase text-center mb-8">
            En el mapa
          </h2>
          <VintageMap />
        </section>

        <section className="mt-20 text-center max-w-xl mx-auto">
          <h2 className="font-display tracking-[0.4em] text-xs text-gold uppercase mb-4">
            Recomendaciones
          </h2>
          <p className="text-ink-soft italic leading-relaxed">
            Hay estacionamiento disponible en el lugar. Para quienes vengan desde el centro, recomendamos salir con al menos 60 minutos de anticipación.
          </p>
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 4: Verify in browser**

`npm run dev`, visit http://localhost:3000/ubicacion. Expected: nav bar, two venue cards side-by-side, sepia-tinted map with wax-red pin(s).

- [ ] **Step 5: Commit**

```bash
git add app/ubicacion/ components/ubicacion/
git commit -m "feat: build ubicacion page with venue cards and sepia-tinted Leaflet map"
```

---

## Task 20: Cross-browser polish + reduced-motion testing

**Files:**
- Modify: `app/globals.css` (if needed)
- Modify: `components/envelope/EnvelopeScene.tsx` (if needed)

- [ ] **Step 1: Manual full-flow test in browser**

```bash
npm run dev
```
Test all three pages in:
1. Normal motion mode — verify envelope cinematic plays smoothly.
2. Reduced-motion mode (toggle in DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`) — verify the envelope is hidden/open and content is statically reachable.

Expected: in reduced-motion, scrolling is native (no Lenis), the home page shows the letter content already unfolded with the story milestones and invitation reveal visible in a normal scrolling layout.

- [ ] **Step 2: Mobile responsive check**

In DevTools, toggle device emulation to iPhone 14 (390px wide). Verify:
- Home cinematic still works (envelope scales correctly).
- Story milestones stack vertically.
- Dress code palette wraps to 2-3 columns.
- Venue cards stack vertically.

Fix any layout issues by adjusting Tailwind responsive classes inline.

- [ ] **Step 3: Type check + lint**

```bash
npx tsc --noEmit
```
Expected: no errors. Fix any reported issues.

- [ ] **Step 4: Production build**

```bash
npm run build
```
Expected: build succeeds. Fix any errors. Inspect bundle output for the home route — total JS should be under ~250 KB.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: cross-browser and responsive polish"
```

(Skip if no changes needed.)

---

## Task 21: Add vercel.ts config and README

**Files:**
- Create: `vercel.ts`
- Create: `README.md`

- [ ] **Step 1: Install `@vercel/config`**

```bash
npm install -D @vercel/config
```

- [ ] **Step 2: Create `vercel.ts`**

```ts
import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
}
```

- [ ] **Step 3: Create `README.md`**

```markdown
# Manuel & Valentina — Wedding Site

Romantic-vintage wedding website with a scroll-driven envelope-opening cinematic.

## Stack

- Next.js 16 (App Router) on Vercel
- GSAP 3 + ScrollTrigger (pinned scrub timeline)
- Motion (Framer Motion v12)
- Lenis smooth scroll
- Tailwind CSS v4
- TypeScript (strict)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All content lives in typed modules under `content/`:

- `content/wedding.ts` — names, date, venue
- `content/story.ts` — relationship milestones
- `content/dressCode.ts` — dress code palette and notes

Replace polaroid photos in `public/photos/polaroid-{1..4}.jpg` (keep filenames).

## Deploy

```bash
vercel deploy            # preview
vercel deploy --prod     # production
```

## Accessibility

- `prefers-reduced-motion` honored: cinematic is replaced by a static unfolded letter; smooth scroll is disabled.
- All decorative animations are non-essential; all content is reachable without JS.
```

- [ ] **Step 4: Commit**

```bash
git add vercel.ts README.md package.json package-lock.json
git commit -m "chore: add vercel.ts config and README"
```

---

## Task 22: Deploy to Vercel

- [ ] **Step 1: Check Vercel CLI installed**

```bash
which vercel || echo "not installed"
```
If "not installed", instruct the user to run `npm i -g vercel` and re-authenticate with `vercel login` — this step requires the user.

- [ ] **Step 2: Deploy preview**

```bash
vercel deploy --yes
```
Expected: prompt to link/create project; accepts defaults; returns a preview URL.

- [ ] **Step 3: Verify preview URL works end-to-end**

Open the preview URL. Test the envelope cinematic, dress code page, and ubicacion page. Confirm all three pages load and the map renders.

- [ ] **Step 4: Production deploy (optional, only on explicit user request)**

```bash
vercel deploy --prod --yes
```

- [ ] **Step 5: Final commit if anything changed**

```bash
git add -A
git diff --cached --quiet || git commit -m "chore: deployment configuration adjustments"
```

---

## Self-Review

**Spec coverage:**
- ✅ Tech stack (Task 1, 2, 8, 9, 21)
- ✅ Fonts + palette (Task 3)
- ✅ Paper texture (Task 4, 7)
- ✅ Content modules (Task 5)
- ✅ Placeholder photos (Task 6)
- ✅ Shared components: PaperBackground (7), NavBar (10), OrnamentalDivider (11), PolaroidFrame (12)
- ✅ Envelope cinematic: WaxSeal (13), Envelope (14), StoryMilestone (15), InvitationReveal (16), EnvelopeScene (17)
- ✅ Dress code page (18)
- ✅ Ubicacion page with sepia Leaflet map (19)
- ✅ Reduced-motion fallback (in Task 17 and globally in Task 3); manual verification (20)
- ✅ Vercel deploy (21, 22)

**Placeholder scan:** No "TBD"s, no "implement later". Every component has full source.

**Type consistency:** `StoryMilestone` type exported from `content/story.ts` is consumed by `components/envelope/StoryMilestone.tsx`. `wedding` type is exported. `dressCode` is exported as const. Component prop names match across imports.

**Ambiguity check:** Map choice locked to Leaflet+OSM (no key needed). All animation timings expressed as scroll progress (0-1). All paths absolute and explicit.
