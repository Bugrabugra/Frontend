const colors = require('./node_modules/tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
      },
      screens: {
        "xs": "576px",
        ...defaultTheme.screens,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
