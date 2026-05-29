import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="32" height="32" fill="#07111F" rx="6" />
        {/* Edges */}
        <line x1="16" y1="6"  x2="7"  y2="24" stroke="#5B8DEE" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="16" y1="6"  x2="25" y2="24" stroke="#5B8DEE" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="7"  y1="24" x2="25" y2="24" stroke="#5B8DEE" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Nodes */}
        <circle cx="16" cy="6"  r="3" fill="#5B8DEE" />
        <circle cx="7"  cy="24" r="3" fill="#5B8DEE" />
        <circle cx="25" cy="24" r="3" fill="#5B8DEE" />
      </svg>
    ),
    { ...size },
  )
}
