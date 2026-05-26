/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#07111F',
        deep: '#0D1F3C',
        slate: '#1C3461',
        signal: '#5B8DEE',
        mist: '#C2D4F5',
        frost: '#F4F7FE',
        'on-surface': '#e1e2ea',
        'on-surface-variant': '#c3c6d4',
        'surface-container': '#1d1f26',
        'border-dark': 'rgba(91, 141, 238, 0.12)',
        'border-signal': 'rgba(91, 141, 238, 0.3)',
        tertiary: '#ffb95a',
        'error-color': '#ffb4ab',
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        margin: '32px',
        'max-w': '1280px',
        gutter: '24px',
      },
    },
  },
  plugins: [],
}
