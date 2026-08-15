/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#121212',
        elevated: '#181818',
        spotify: '#1DB954',
        gold: '#D4AF37',
      },
      fontFamily: {
        // Montserrat is loaded in index.html; falls back gracefully.
        sans: ['Montserrat', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        // Slow "breathing" pulse for the big Play button.
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(29,185,84,0.55)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 0 22px rgba(29,185,84,0)' },
        },
        // Horizontal marquee for long titles.
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
        marquee: 'marquee 12s linear infinite',
        floatUp: 'floatUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
