/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kugile', 'sans-serif'],
        system: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#07111F',
        card: {
          DEFAULT: '#0B1525',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        primary: '#FFFFFF',
        secondary: '#A7B2C7',
        muted: '#6D7B92',
        accent: {
          primary: '#FF8A3D',
          soft: '#F78B4B',
          glow: 'rgba(255, 138, 61, 0.18)',
        }
      },
      blur: {
        card: '12px',
      },
      borderRadius: {
        card: '20px',
        search: '14px',
      }
    },
  },
  plugins: [],
}
