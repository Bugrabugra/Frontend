import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px"
      },
      colors: {
        primary: {
          "100": "#ffe8f0",
          DEFAULT: "#ee2b69"
        },
        secondary: "#fbe843",
        black: {
          "100": "#333",
          "200": "#141413",
          "300": "#7d8087",
          DEFAULT: "#000"
        },
        white: {
          "100": "#f7f7f7",
          DEFAULT: "#fff"
        }
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};

export default config;
