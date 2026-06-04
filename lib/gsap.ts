'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  // A paper-settle curve: decisive lift, gentle ease into rest (no bounce).
  // Used by the envelope flap so it reads as a weighted sheet, not a hinge.
  if (!CustomEase.get('paperSettle')) {
    CustomEase.create('paperSettle', '0.16, 0.84, 0.24, 1')
  }
}

export { gsap, ScrollTrigger, CustomEase }
