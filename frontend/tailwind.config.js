/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#E10600',
          black: '#15151E',
          white: '#FFFFFF',
          gray: '#949498',
          gold: '#FFD700',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
        },
      },
      fontFamily: {
        'formula1': ['Titillium Web', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

