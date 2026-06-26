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
        }
      }
    },
  },
  plugins: [],
}