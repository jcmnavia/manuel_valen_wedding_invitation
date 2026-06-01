'use client'

import { prefersReducedMotion } from './prefersReducedMotion'

type ConfettiInstance = {
  addConfetti: (opts: {
    emojis?: string[]
    emojiSize?: number
    confettiNumber?: number
    confettiColors?: string[]
    confettiRadius?: number
  }) => Promise<void>
  clearCanvas: () => void
}

let instance: ConfettiInstance | null = null
let pending: Promise<ConfettiInstance> | null = null

async function getInstance(): Promise<ConfettiInstance | null> {
  if (typeof window === 'undefined') return null
  if (instance) return instance
  if (!pending) {
    pending = import('js-confetti').then((mod) => {
      const JSConfetti = mod.default
      instance = new JSConfetti() as ConfettiInstance
      return instance
    })
  }
  return pending
}

export type ConfettiPreset = 'gold-burst' | 'gold-rings'

const presets: Record<ConfettiPreset, Parameters<ConfettiInstance['addConfetti']>[0]> = {
  'gold-burst': {
    confettiColors: ['#F2D898', '#E4C57A', '#C2A35A', '#9B7B3A', '#FFFFFF'],
    confettiNumber: 120,
    confettiRadius: 4,
  },
  'gold-rings': {
    emojis: ['💍', '✨', '💛'],
    emojiSize: 42,
    confettiNumber: 24,
  },
}

export async function fireConfetti(preset: ConfettiPreset) {
  if (prefersReducedMotion()) return
  const inst = await getInstance()
  if (!inst) return
  await inst.addConfetti(presets[preset])
}

export async function fireConfettiCombo(...presetList: ConfettiPreset[]) {
  if (prefersReducedMotion()) return
  const inst = await getInstance()
  if (!inst) return
  await Promise.all(presetList.map((p) => inst.addConfetti(presets[p])))
}
