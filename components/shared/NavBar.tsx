'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Invitación' },
  { href: '/codigo-de-vestuario', label: 'Código de Vestuario' },
  { href: '/ubicacion', label: 'Ubicación' },
  { href: '/mensajes', label: 'Dedicatorias' },
]

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Site nav, shared by every page.
 *
 *  - Full-bleed blurred bar (blur on every screen; content padded, not cramped
 *    to the edges).
 *  - Desktop (md+): links inline on the right.
 *  - Mobile: a burger opens a full-screen blurred overlay with the links
 *    stacked large and centered (the long Spanish labels no longer wrap the bar).
 *
 * `visible` lets the home page reveal it after the seal animation; it defaults
 * to true for subpages that render it directly.
 */
export function NavBar({ visible = true }: { visible?: boolean }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portals need the DOM — only render the overlay after mount (not during SSR).
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Close the menu when the route changes (a link was followed) or the nav hides.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  useEffect(() => {
    if (!visible) setMenuOpen(false)
  }, [visible])

  const bar = (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease }}
          className="fixed top-0 inset-x-0 z-50 w-full border-b border-sage/20 bg-ivory/70 backdrop-blur-md"
          aria-label="Navegación principal"
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <Link
              href="/"
              className="font-display text-3xl leading-none text-ink hover:text-gold transition-colors"
            >
              V &amp; M
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-8 text-xs uppercase tracking-widest md:flex">
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

            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span className="block h-px w-6 bg-ink" />
              <span className="block h-px w-6 bg-ink" />
              <span className="block h-px w-6 bg-ink" />
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )

  // Full-screen mobile overlay. Rendered via a portal at <body> so it escapes
  // the nav's transform context — a `transform` on an ancestor (framer-motion's
  // y-animation) would otherwise trap this `position: fixed` element inside the
  // ~80px nav box instead of covering the viewport.
  const overlay = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[60] flex flex-col bg-ivory/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl leading-none text-ink"
            >
              V &amp; M
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-8 w-8 items-center justify-center text-ink"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 4 L18 18 M18 4 L4 18" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
            {links.map((l, i) => {
              const active = pathname === l.href
              return (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-2xl uppercase tracking-[0.18em] transition-colors ${
                      active ? 'text-gold' : 'text-ink hover:text-gold'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {bar}
      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
