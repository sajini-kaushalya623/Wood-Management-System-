/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          dark: '#4E342E',
          light: '#8D6E63',
          cream: '#EFEBE9',
          walnut: '#6D4C41',
          coffee: '#5D4037',
          darkest: '#3E2723'
        }
      },
      fontFamily: {
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
        body: ['Roboto', 'Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}