const colors = require("tailwindcss/colors");


module.exports = {
  mode: "jit",
  purge: ["./**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        emerald: colors.emerald,
        indigo: colors.indigo,
        rose: colors.rose,
        amber: colors.amber,
        sky: colors.sky,
        teal: colors.teal,
        fuchsia: colors.fuchsia
      }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
