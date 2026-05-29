import { DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.zweipunktfuenf.de'),
  title: 'zweipunktfünf | Webseiten in 14 Tagen',
  description:
    'zweipunktfünf entwickelt markante Webauftritte und KI-gestützte Chatbots für Unternehmen in Karlsruhe.',
  openGraph: {
    title: 'zweipunktfünf | Webseiten in 14 Tagen',
    description:
      'Webdesign und KI-Chatbots für ambitionierte Marken aus Karlsruhe.',
    url: 'https://www.zweipunktfuenf.de',
    siteName: 'zweipunktfünf',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'zweipunktfünf – Webdesign und KI-Chatbots aus Karlsruhe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zweipunktfünf | Webseiten in 14 Tagen',
    description:
      'Webdesign und KI-Chatbots für ambitionierte Marken aus Karlsruhe.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen bg-midnight text-on-surface antialiased font-body">
        {children}
      </body>
    </html>
  )
}
