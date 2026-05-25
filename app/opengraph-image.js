import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'zweipunktfünf – Webdesign, Chatbots und Crypto in Karlsruhe'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const headingStyle = {
  fontSize: '72px',
  fontWeight: 700,
  lineHeight: 1.1,
  margin: 0,
  letterSpacing: '-0.02em',
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          padding: '72px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Top: brand name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c8ff00',
              fontFamily: 'monospace',
            }}
          >
            zweipunktfünf
          </span>
        </div>

        {/* Center: headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <p style={{ ...headingStyle, color: '#f5f2eb' }}>Webdesign.</p>
          <p style={{ ...headingStyle, color: '#f5f2eb' }}>Chatbots.</p>
          <p style={{ ...headingStyle, color: '#c8ff00' }}>Crypto.</p>
        </div>

        {/* Bottom: tagline + location */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              color: '#555555',
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
            }}
          >
            Keine Buzzwords — nur Ergebnisse.
          </span>
          <span
            style={{
              fontSize: '16px',
              color: '#555555',
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
            }}
          >
            Karlsruhe
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
