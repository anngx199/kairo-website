/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        rainbow: 'linear-gradient(90deg, #ff0000, #ff9900, #33cc33, #3399ff, #9900cc)',
      },
      fontFamily: {
        comic: ['"Luckiest Guy"', 'cursive'],
        anton: ['Bebas Neue', 'sans-serif'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
    },
  },
  plugins: [],
}
