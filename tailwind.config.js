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
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
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
        eqBar: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
        marquee: 'marquee 12s linear infinite',
        floatUp: 'floatUp 0.6s ease-out both',
        eq1: 'eqBar 0.8s ease-in-out infinite',
        eq2: 'eqBar 0.8s ease-in-out 0.2s infinite',
        eq3: 'eqBar 0.8s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [],
}
