module.exports = {
  purge: {
    content: [
      "./public/**/*.html",
      "./src/**/*.vue"
    ]
  },
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('pattern-bg.png')"
      }),
    },
  },
  variants: {
    extend: {}
  },
  plugins: []
}
