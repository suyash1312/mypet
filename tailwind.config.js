/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        greige: '#EEEAE0',
        ink: '#2B2A28',
        clay: '#C1440E',
        sage: '#6B8F71',
        cream: '#FFFDF9',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"General Sans"', '"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
