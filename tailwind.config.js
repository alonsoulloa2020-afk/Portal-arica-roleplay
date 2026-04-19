/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main':          '#0f0d09',
        'bg-card':          'rgba(30,18,8,0.45)',
        'primary-neon':     '#ea580c',
        'accent-glow':      '#f97316',
        'critical-magenta': '#ec4899',
        'cyan-detail':      '#fb923c',
        'text-main':        '#f8fafc',
        'text-muted':       '#94a3b8',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body:    ['"Barlow Condensed"', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-orange':  '0 0 20px rgba(234,88,12,0.6), 0 0 60px rgba(234,88,12,0.2)',
        'neon-amber':   '0 0 20px rgba(251,146,60,0.6), 0 0 60px rgba(251,146,60,0.2)',
        'neon-magenta': '0 0 20px rgba(236,72,153,0.6), 0 0 60px rgba(236,72,153,0.2)',
        'card-glass':   '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'ken-burns':   'kenBurns 8s ease-out forwards',
        'shimmer':     'shimmer 3s infinite linear',
        'pulse-neon':  'pulseNeon 2.5s ease-in-out infinite',
        'float':       'float 5s ease-in-out infinite',
        'scan-line':   'scanLine 8s linear infinite',
        'particle':    'particleDrift 12s linear infinite',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1.0)',    transformOrigin: 'center center' },
          '100%': { transform: 'scale(1.15)',   transformOrigin: 'center center' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition:  '400px 0' },
        },
        pulseNeon: {
          '0%,100%': { boxShadow: '0 0 12px rgba(234,88,12,0.5)' },
          '50%':     { boxShadow: '0 0 30px rgba(234,88,12,0.9), 0 0 60px rgba(249,115,22,0.4)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)'  },
          '50%':     { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(100vh) translateX(0)',   opacity: '0'   },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(-10vh) translateX(40px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
