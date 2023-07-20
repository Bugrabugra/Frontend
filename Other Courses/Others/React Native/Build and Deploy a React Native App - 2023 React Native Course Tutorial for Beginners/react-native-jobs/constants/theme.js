const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#ff7754",

  gray: "#83829a",
  gray2: "#c1c0c8",

  white: "#f3f4f8",
  lightWhite: "#fafafc"
};

const FONT = {
  regular: "DMSans-Regular",
  medium: "DMSans-Medium",
  bold: "DMSans-Bold"
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5
  }
};

export { COLORS, FONT, SIZES, SHADOWS };
