/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1371B9',
        secondary: '#4091CE',
        accent: '#F30051',
        dark: '#11080B',
        gray: '#4E4E4E',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}