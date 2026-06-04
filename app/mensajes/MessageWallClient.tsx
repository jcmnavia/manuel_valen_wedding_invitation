'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageForm } from './MessageForm'

/**
 * Floating "Dejar un mensaje" button + the form modal.
 *
 * The wall itself is server-rendered on the page; this client island only owns
 * the button and the dialog. The modal is accessible (role=dialog, aria-modal,
 * Escape + backdrop close, focus moved in on open and restored on close, body
 * scroll locked) and closes itself shortly after a successful submit so the
 * guest sees the "¡Gracias!" confirmation first.
 *
 * Note: this is the single intentional modal in the system (see DESIGN.md).
 */
export function MessageWallClient() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = useCallback(() => setOpen(false), [])

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog.
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  // Restore focus to the trigger when the dialog closes.
  useEffect(() => {
    if (!open) triggerRef.current?.focus()
  }, [open])

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  // After a successful submit, hold briefly so the "¡Gracias!" shows, then close.
  const handleSuccess = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 1400)
  }, [])

  return (
    <>
      {/* Floating trigger — fixed, reachable while scrolling the wall */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-6 py-4 bg-wine text-ivory hover:bg-wine-deep transition-colors duration-300 font-display tracking-[0.25em] text-xs uppercase rounded-sm shadow-[0_14px_30px_-10px_rgba(94,39,48,0.6)]"
      >
        <span className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h16v11H8l-4 4V5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Dejar un mensaje
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Cerrar"
              onClick={close}
              className="absolute inset-0 bg-ink/55 backdrop-blur-[2px] cursor-default"
            />

            {/* Dialog */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mensaje-modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-ivory rounded-sm shadow-[0_30px_80px_-20px_rgba(31,26,20,0.55)] px-7 py-9 md:px-10 md:py-10 focus:outline-none"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-4 right-4 text-ink-soft hover:text-wine transition-colors p-2 -m-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <p className="text-center font-display tracking-[0.5em] text-xs text-wine uppercase mb-2">
                Déjanos unas palabras
              </p>
              <h2
                id="mensaje-modal-title"
                className="text-center font-display text-3xl md:text-4xl text-ink mb-8"
              >
                Tu mensaje
              </h2>

              <MessageForm onSuccess={handleSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
