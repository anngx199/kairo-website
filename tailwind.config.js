/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'rainbow': 'linear-gradient(90deg, #ff0000, #ff9900, #33cc33, #3399ff, #9900cc)',
      }
    },
  },
  plugins: [],
}
