const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
