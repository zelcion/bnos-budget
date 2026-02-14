/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        budget: {
          green: "#22C55E",
          yellow: "#EAB308",
          red: "#EF4444",
          purple: "#A855F7",
          darkPurple: "#7C3AED",
        },
      },
    },
  },
  plugins: [],
};
