/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}" 
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff', 
          200: '#bfdbfe', 
          DEFAULT: '#2563eb', 
          hover: '#1d4ed8', 
          800: '#1e40af'  
        },
        neo: {
          bg: '#E6E7EE',
          dark: '#b8b9c1',
          light: '#ffffff',
          accent: '#FF5722'
        }
      },
     boxShadow: {
        'neo-convex': '14px 14px 28px #b8b9c1, -14px -14px 28px #ffffff',
        'neo-btn': '6px 6px 12px #b8b9c1, -6px -6px 12px #ffffff',
        'neo-concave': 'inset 5px 5px 10px #b8b9c1, inset -5px -5px 10px #ffffff',
      },
      fontFamily: {
        led: ['VT323', 'monospace'],
      }
    },
  },
  plugins: [],
}