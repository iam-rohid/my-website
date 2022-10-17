const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        gray: colors.zinc,
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
