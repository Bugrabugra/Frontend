const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "540px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
