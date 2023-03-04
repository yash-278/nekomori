/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      gray: {
        700: "#374151",
        800: "#1f2937",
      },
    },
    screens: {
      sm: "340px",
      // => @media (min-width: 576px) { ... }
      md: "520px",
      // => @media (min-width: 960px) { ... }
      lg: "786px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        "accent-gray-black": "#001827",
        "accent-gray-darkest": "#1f2937",
        "accent-gray-darker": "#374151",
        "accent-gray-dark": "#4b5563",
        "accent-gray": "#6b7280",
      },
    },
    fontFamily: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("flowbite/plugin"),
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/line-clamp"),
  ],
});
