/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--sans)", ...fontFamily.sans],
        serif: ["var(--serif)", ...fontFamily.serif],
        display: ["var(--display)", ...fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
        button: "var(--color-text-button)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
        offset: "var(--color-border-offset)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "4/5": "4 / 5",
        "5/4": "5 / 4",
        "9/16": "9 / 16",
        "2/3": "2 / 3",
        "3/2": "3 / 2",
      },
      opacity: {
        7: ".075",
        15: ".15",
      },
      maxWidth: {
        "8xl": "86rem",
      },
      minHeight: {
        screenHeightWithoutHeader: "calc(100vh - 101px)",
      },
      height: {
        screenHeightWithoutHeader: "calc(100vh - 101px)",
      },
      spacing: {
        128: "32rem",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1.125, // 1.125rem === 18px
        fontSizeMax: 1.25, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 20, // 20rem === 320px
        screenMax: 96, // 96rem === 1536px
        unit: "rem", // default is rem but it's also possible to use 'px'
        prefix: "", // set a prefix to use it alongside the default font sizes
      },
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        "2xl": [3, 1.2],
        "3xl": [4, 1.2],
        "4xl": [5, 1.1],
        "5xl": [6, 1.1],
        "6xl": [7, 1.1],
        "7xl": [8, 1],
        "8xl": [9, 1],
        "9xl": [10, 1],
      },
    }),
    require("tailwind-heropatterns")({
      variants: [],
      patterns: ["graph-paper", "pie-factory", "topography"],
      colors: {
        "primary-light": "#171717",
        "secondary-light": "#f59e0b",
        "default-light": "#525252",
        "offset-light": "#a3a3a3",

        "primary-dark": "#fbbf24",
        "secondary-dark": "#3b82f6",
        "default-dark": "#a3a3a3",
        "offset-dark": "#525252",
      },

      opacity: {
        10: "0.1",
        15: "0.15",
        20: "0.2",
        100: "1.0",
      },
    }),
  ],
};
