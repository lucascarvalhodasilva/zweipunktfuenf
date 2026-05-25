import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: '#c8ff00',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          2.5
        </span>
      </div>
    ),
    {
      ...size,
    },
  )
}
