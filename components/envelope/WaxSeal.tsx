'use client'

import { forwardRef } from 'react'

type Props = {
  className?: string
}

export const WaxSeal = forwardRef<SVGSVGElement, Props>(function WaxSeal(
  { className = '' },
  ref,
) {
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

        <g
          data-wax-monogram
          fill="none"
          stroke="rgba(255,230,210,0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="translate(0,4)"
        >
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
        <path
          data-wax-frag="2"
          d="M80 110 L 120 95 L 130 130 L 95 135 Z"
          fill="url(#wax-grad)"
        />
        <path
          data-wax-frag="3"
          d="M120 95 L 160 120 L 145 145 L 125 130 Z"
          fill="url(#wax-grad)"
        />
      </g>
    </svg>
  )
})
