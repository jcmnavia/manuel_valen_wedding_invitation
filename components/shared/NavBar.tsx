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
            <Link
              href="/"
              className="font-script text-3xl text-ink hover:text-gold transition-colors"
            >
              M &amp; V
            </Link>
            <ul className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs tracking-widest uppercase">
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
