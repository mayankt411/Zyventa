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
        // Colors come from CSS variables in globals.css (clinical navy palette).
        // Legacy names: navy = primary, blue = accent text, green = accent.
        brand: {
          navy: 'rgb(var(--c-navy) / <alpha-value>)',
          blue: 'rgb(var(--c-accent-text) / <alpha-value>)',
          darkBlue: 'rgb(var(--c-navy-dark) / <alpha-value>)',
          green: 'rgb(var(--c-accent) / <alpha-value>)',
          accentGreen: 'rgb(var(--c-accent-hover) / <alpha-value>)',
          emerald: 'rgb(var(--c-navy) / <alpha-value>)',
          lightBg: 'rgb(var(--c-sand) / <alpha-value>)',
          paper: 'rgb(var(--c-paper) / <alpha-value>)',
          sand: 'rgb(var(--c-sand) / <alpha-value>)',
          plum: 'rgb(var(--c-plum) / <alpha-value>)',
          cardBg: '#FFFFFF',
          ink: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-60) / <alpha-value>)',
          border: 'rgb(var(--c-border) / <alpha-value>)',
          onDarkMuted: 'rgb(var(--c-on-dark-muted) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          60: 'rgb(var(--c-ink-60) / <alpha-value>)',
          80: 'rgb(var(--c-ink-80) / <alpha-value>)',
          90: 'rgb(var(--c-ink-90) / <alpha-value>)',
        },
        // Cool neutrals.
        slate: {
          50: 'rgb(var(--c-slate-50) / <alpha-value>)',
          100: 'rgb(var(--c-slate-100) / <alpha-value>)',
          200: 'rgb(var(--c-slate-200) / <alpha-value>)',
          300: 'rgb(var(--c-slate-300) / <alpha-value>)',
          400: 'rgb(var(--c-slate-400) / <alpha-value>)',
          500: 'rgb(var(--c-slate-500) / <alpha-value>)',
          600: 'rgb(var(--c-slate-600) / <alpha-value>)',
          700: 'rgb(var(--c-slate-700) / <alpha-value>)',
          800: 'rgb(var(--c-slate-800) / <alpha-value>)',
          900: 'rgb(var(--c-slate-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        heading: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
