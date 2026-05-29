import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="180" height="180" fill="#07111F" rx="40" />
        {/* Edges */}
        <line x1="90"  y1="36"  x2="40"  y2="136" stroke="#5B8DEE" strokeWidth="8" strokeOpacity="0.5" />
        <line x1="90"  y1="36"  x2="140" y2="136" stroke="#5B8DEE" strokeWidth="8" strokeOpacity="0.5" />
        <line x1="40"  y1="136" x2="140" y2="136" stroke="#5B8DEE" strokeWidth="8" strokeOpacity="0.5" />
        {/* Nodes */}
        <circle cx="90"  cy="36"  r="17" fill="#5B8DEE" />
        <circle cx="40"  cy="136" r="17" fill="#5B8DEE" />
        <circle cx="140" cy="136" r="17" fill="#5B8DEE" />
      </svg>
    ),
    { ...size },
  )
}
