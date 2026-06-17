import type { Metadata } from 'next'
import { Montserrat, Bodoni_Moda } from 'next/font/google'
import { PaperBackground } from '@/components/shared/PaperBackground'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import './globals.css'

// Body copy — Montserrat. Kept at 500 (medium) on <body> so text reads legible,
// not thin. Italic loaded for the italicized lines used throughout the site.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Titles / display — Bodoni Moda (variable font). Normal + italic across the
// display weight range.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Valentina & Manuel · 16 de Agosto, 2026',
  description:
    'Acompáñanos a celebrar nuestro matrimonio. 16 de Agosto, 2026 · Fábula, Envigado.',
  // Favicons live under /public/favicon (realfavicongenerator export). Declared
  // explicitly so Next emits the right <link> tags from outside app/.
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'Valentina & Manuel · 16.08.2026',
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
      className={`${montserrat.variable} ${bodoni.variable}`}
    >
      <body className="font-serif bg-ivory text-ink antialiased">
        <PaperBackground />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
