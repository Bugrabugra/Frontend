module.exports = {
  mode: "jit",
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        olive: "#BCEE11"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}