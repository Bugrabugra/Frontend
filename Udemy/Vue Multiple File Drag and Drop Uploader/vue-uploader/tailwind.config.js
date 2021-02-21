module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    rotate: {
      "-90": "-90deg"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-transforms")({
    })
  ],
}
