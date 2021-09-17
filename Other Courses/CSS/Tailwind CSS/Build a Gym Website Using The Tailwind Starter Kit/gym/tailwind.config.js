const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
