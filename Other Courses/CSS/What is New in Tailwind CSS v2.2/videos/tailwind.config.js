const colors = require('./node_modules/tailwindcss/colors');

module.exports = {
  purge: [],
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
      animation: {
        wiggle: "wiggle 1s infinite"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "scale(1.2) rotate(7deg)"
          },
          "50%": {
            transform: "scale(0.8) rotate(-7deg)"
          }
        }
      }
    }
  },
  variants: {
    extend: {
      boxDecorationBreak: ["hover"]
    },
  },
  plugins: [],
}
