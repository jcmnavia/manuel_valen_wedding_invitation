'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Looping background music ("Can't Help Falling In Love").
 *
 * Browsers block audio autoplay until the user interacts, so playback starts on
 * the FIRST user gesture (scroll / tap / click / key) and the volume eases in.
 * A small corner toggle lets the guest mute/unmute; that choice is remembered
 * in localStorage, so a guest who muted won't have it restart on navigation.
 *
 * The track file is self-hosted under /music/.
 */

const SRC = '/music/cant%20help%20falling%20in%20love.mp3'
const STORAGE_KEY = 'mv-music-muted'
const TARGET_VOLUME = 0.45

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // null until mounted (avoids hydration mismatch); then true/false.
  const [muted, setMuted] = useState<boolean | null>(null)
  const [started, setStarted] = useState(false)

  // Resolve the persisted mute choice once, on mount.
  useEffect(() => {
    const saved =
      typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'
    setMuted(saved)
  }, [])

  // Fade the volume toward a target over ~1.2s.
  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) clearInterval(fadeRef.current)
    const step = (target - audio.volume) / 24
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return
      const next = audioRef.current.volume + step
      const done = step > 0 ? next >= target : next <= target
      audioRef.current.volume = done ? target : Math.max(0, Math.min(1, next))
      if (done) {
        if (fadeRef.current) clearInterval(fadeRef.current)
        onDone?.()
      }
    }, 50)
  }

  // Start playback on the first user gesture (unless the guest had it muted).
  useEffect(() => {
    if (muted === null || muted) return // not ready, or user chose silence
    const audio = audioRef.current
    if (!audio) return

    const start = () => {
      if (started) return
      audio.volume = 0
      audio
        .play()
        .then(() => {
          setStarted(true)
          fadeTo(TARGET_VOLUME)
        })
        .catch(() => {
          /* gesture wasn't enough yet; another will fire */
        })
    }

    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'keydown',
      'wheel',
      'touchstart',
      'scroll',
    ]
    events.forEach((e) =>
      window.addEventListener(e, start, { once: false, passive: true }),
    )
    return () => events.forEach((e) => window.removeEventListener(e, start))
  }, [muted, started])

  useEffect(() => {
    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || muted === null) return
    if (muted) {
      // unmute → play + fade in
      localStorage.setItem(STORAGE_KEY, '0')
      setMuted(false)
      audio.volume = 0
      audio.play().then(() => {
        setStarted(true)
        fadeTo(TARGET_VOLUME)
      })
    } else {
      // mute → fade out then pause
      localStorage.setItem(STORAGE_KEY, '1')
      setMuted(true)
      fadeTo(0, () => audioRef.current?.pause())
    }
  }

  // Don't render the control until we know the persisted state.
  if (muted === null) {
    return <audio ref={audioRef} src={SRC} loop preload="auto" />
  }

  const playing = !muted && started

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Activar música' : 'Silenciar música'}
        aria-pressed={!muted}
        className="fixed bottom-6 left-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-cream/80 backdrop-blur-sm border border-sage/40 text-wine shadow-[0_8px_20px_-8px_rgba(31,26,20,0.3)] transition-colors duration-300 hover:bg-cream"
      >
        {muted ? (
          // muted: note with a slash
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 18V7l9-2v9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6.5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="15.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          // playing: musical note (animated pulse while sounding)
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={playing ? 'animate-pulse' : ''}
          >
            <path
              d="M9 18V7l9-2v9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6.5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="15.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
      </button>
    </>
  )
}
