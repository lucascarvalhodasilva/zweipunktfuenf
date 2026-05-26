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
  title: 'zweipunktfünf | Webdesign, Chatbots und Crypto in Karlsruhe',
  description:
    'zweipunktfünf entwickelt markante Webauftritte, KI-gestützte Chatbots und digitale Crypto-Erlebnisse für Unternehmen in Karlsruhe.',
  openGraph: {
    title: 'zweipunktfünf | Webdesign, Chatbots und Crypto in Karlsruhe',
    description:
      'Webdesign, Chatbots und Crypto-Produkte für ambitionierte Marken aus Karlsruhe.',
    url: 'https://www.zweipunktfuenf.de',
    siteName: 'zweipunktfünf',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zweipunktfünf | Webdesign, Chatbots und Crypto in Karlsruhe',
    description:
      'Webdesign, Chatbots und Crypto-Produkte für ambitionierte Marken aus Karlsruhe.',
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
