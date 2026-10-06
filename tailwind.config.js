/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      'mobile': '390px',
      'tablet': '768px',
      'desktop': '1440px',
    },
    extend: {
      colors: {
        brand: {
          navy: '#0F2A4D',
          blue: '#027ABB',
          darkBlue: '#015EA0',
          green: '#03E78B',
          accentGreen: '#49E670',
          emerald: '#10B981',
          lightBg: '#F8FAFC',
          cardBg: '#FFFFFF',
          ink: '#14213B',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        ink: {
          DEFAULT: '#14213B',
          60: '#64748B',
          80: '#334155',
          90: '#1E293B',
        }
      },
      fontFamily: {
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'marquee-ltr': 'marquee-ltr 30s linear infinite',
        'marquee-rtl': 'marquee-rtl 30s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        'marquee-ltr': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      },
      maxWidth: {
        '7xl': '80rem',
      }
    },
  },
  plugins: [],
};
