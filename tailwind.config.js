/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neubrutalism-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neubrutalism-md': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neubrutalism-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neubrutalism-btn': '3px 3px 0px 0px rgba(0,0,0,1)',
        'neubrutalism-btn-hover': '1px 1px 0px 0px rgba(0,0,0,1)',
        'neubrutalism-card': '6px 6px 0px 0px rgba(0,0,0,1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
