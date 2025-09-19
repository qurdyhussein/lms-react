/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    'fade-in': 'fadeIn 1s ease-out',
    'fade-in-slow': 'fadeIn 2s ease-out',
    'grow': 'growLogo 1.5s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    growLogo: {
      '0%': { transform: 'scale(0.5)', opacity: 0 },
      '100%': { transform: 'scale(1)', opacity: 1 },
    },
  },
}
  },
  plugins: [],
}

