/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#D4AF37',
          600: '#b8972e',
          700: '#92750f',
          800: '#78600a',
          900: '#614d08',
        },
        royal: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1a3a6b',
          600: '#1e40af',
          700: '#1d3b9a',
          800: '#1e3a8a',
          900: '#1e2f6e',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gem-gradient': 'linear-gradient(135deg, #1a3a6b 0%, #0f1f3d 50%, #1a1a2e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #f5d76e 50%, #D4AF37 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(212, 175, 55, 0.3)',
        'gem':  '0 8px 32px rgba(26, 58, 107, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float':   'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
