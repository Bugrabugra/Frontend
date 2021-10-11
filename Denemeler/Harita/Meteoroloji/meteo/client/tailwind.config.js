module.exports = {
  mode: "jit",
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "rain-light": "#2DB9EA",
        "rain-medium": "#2DB9EA",
        "rain-heavy": "#FEDA71",
        "rain-very-heavy": "#F1873F",
        "rain-severe": "#EB5944",
        "snow-light": "#B2DAEC",
        "snow-medium": "#59A8DD",
        "snow-heavy": "#3E78AB",
        "wind-light": "#A7B44F",
        "wind-heavy": "#F1873F",
        "wind-severe": "#97549D",
        "flood-light": "#A5D4DC",
        "flood-heavy": "#3C9DB6",
        "weather-icon": "#09222F",
        "weather-icon-hover": "#125172",
        "weather-icon-object": "#323A41",
        "map-drawer-header": "#009FE3",
        "map-drawer-top-menu": "#29323C",
        "map-drawer-bottom-menu": "#252730",
      },
      boxShadow: {
        buttonInner: "" +
          "inset 10px 5px 10px -4px rgba(10, 10, 10, 0.9), " +
          "inset -12px 5px 10px -4px rgba(10, 10, 10, 0.9)"
      },
      fontSize: {
        'xxs': '.65rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
