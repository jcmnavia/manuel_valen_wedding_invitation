'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, MotionPathPlugin)

  // A paper-settle curve: decisive lift, gentle ease into rest (no bounce).
  if (!CustomEase.get('paperSettle')) {
    CustomEase.create('paperSettle', '0.16, 0.84, 0.24, 1')
  }
}

export { gsap, ScrollTrigger, CustomEase, MotionPathPlugin }
