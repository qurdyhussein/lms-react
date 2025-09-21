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
    'spin-slow': 'spin 20s linear infinite',
    'slide-loop': 'slideText 6s ease-in-out infinite',
    marquee: 'marquee 10s linear infinite',
    bounce: 'bounce 1s infinite',
  },
  keyframes: {
    slideLoop: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(-100%)' },
    },
    marquee: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(-100%)' },
    },
    slideText: {
      '0%': { transform: 'translateX(-100%)', opacity: 0 },
      '50%': { transform: 'translateX(0)', opacity: 1 },
      '100%': { transform: 'translateX(-100%)', opacity: 0 },
    },
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

