/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#170B30',
        'custom-indigo': '#3e1c93',
        'blue-loader-animation': '#3b306f'
      },
    },
  },
  plugins: [],
}

