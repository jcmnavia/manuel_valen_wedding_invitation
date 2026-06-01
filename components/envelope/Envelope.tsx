'use client'

import { forwardRef, ReactNode } from 'react'
import { WaxSeal } from './WaxSeal'

type Props = {
  children?: ReactNode
}

export const Envelope = forwardRef<HTMLDivElement, Props>(function Envelope(
  { children },
  ref,
) {
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

      {/* Inner paper visible once flap opens */}
      <div
        data-envelope-inside
        className="absolute inset-3 rounded-[4px] bg-[#F5EFE3] opacity-0"
      />

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

      {/* Decorative seam lines */}
      <svg
        viewBox="0 0 100 65"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M0 38 L 50 75 L 100 38"
          fill="none"
          stroke="rgba(31,26,20,0.18)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 38 L 50 60 L 100 38"
          fill="none"
          stroke="rgba(31,26,20,0.12)"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Top flap (animatable) */}
      <div
        data-envelope-flap
        className="absolute inset-x-0 top-0 h-[62%] origin-top"
        style={{
          background: 'linear-gradient(180deg, #E8DAB8 0%, #D5C297 100%)',
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
