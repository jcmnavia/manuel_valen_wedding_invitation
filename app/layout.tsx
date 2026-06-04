import type { Metadata } from 'next'
import { Cormorant_Garamond, Italiana, Mrs_Saint_Delafield } from 'next/font/google'
import { PaperBackground } from '@/components/shared/PaperBackground'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { BackgroundMusic } from '@/components/shared/BackgroundMusic'
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
  title: 'Manuel & Valentina · 16 de Agosto, 2026',
  description:
    'Acompáñanos a celebrar nuestro matrimonio. 16 de Agosto, 2026 · Fábula, Envigado.',
  openGraph: {
    title: 'Manuel & Valentina · 16.08.2026',
    description: 'Acompáñanos a celebrar nuestro matrimonio.',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${italiana.variable} ${mrsSaint.variable}`}
    >
      <body className="font-serif bg-ivory text-ink antialiased">
        <PaperBackground />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <BackgroundMusic />
      </body>
    </html>
  )
}
