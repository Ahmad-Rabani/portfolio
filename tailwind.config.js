/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FAFAF7',
          100: '#F5F5EE',
          200: '#EEEEE4',
        },
        amber: {
          accent: '#E8A435',
          light: '#F5C76A',
          dark: '#C4851A',
        },
        charcoal: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
          400: '#6A6A6A',
          300: '#8A8A8A',
          200: '#AAAAAA',
        },
        dark: {
          bg: '#0F0F0F',
          surface: '#181818',
          card: '#222222',
          border: '#333333',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
