/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          accent: '#06b6d4',
          primary: '#6366f1',
          primaryDark: '#4f46e5',
          neon: '#00F0FF',
        },
        surface: {
          dark: '#0B0F19',
          card: 'rgba(15, 23, 42, 0.75)',
          bubble: '#1e293b',
          userBubble: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1.0)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bounce-dot-1': 'bounceDot 1.4s infinite ease-in-out',
        'bounce-dot-2': 'bounceDot 1.4s infinite ease-in-out 0.2s',
        'bounce-dot-3': 'bounceDot 1.4s infinite ease-in-out 0.4s',
      }
    },
  },
  plugins: [],
}
