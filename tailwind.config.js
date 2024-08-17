/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    screens: {
      'xs': '368px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1408px',
    },

    fontFamily: {
      inter: 'Inter, sans-serif',
      fa: 'FontAwesome',
    },
    extend: {
      // prettier-ignore
      colors: {
        primary: {
          DEFAULT:'#8929ed',50:'#faf5ff',100:'#f2e8ff',200:'#e8d4ff',300:'#d5b3ff',400:'#bc82fe',
          500:'#a252fa',600:'#8929ed',700:'#781fd1',800:'#661eab',900:'#541a89',950:'#380566',
        },
        blue: {
          DEFAULT:'#125ff6',50:'#eef6ff',100:'#d9ebff',200:'#bbddff',300:'#8dc8ff',400:'#57a8ff',
          500:'#3084ff',600:'#125ff6',700:'#124ee3',800:'#1640b7',900:'#183a90',950:'#142557',
        },
        amber: {
          DEFAULT:'#ffa700',50:'#fffdea',100:'#fff6c5',200:'#ffec85',300:'#ffdc46',400:'#ffc91b',
          500:'#ffa700',600:'#e27e00',700:'#bb5702',800:'#984308',900:'#7c370b',950:'#481b00',
        },
      },
    },
  },
  plugins: [],
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
};
