/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eeeef1",
          200: "#d9d9e0",
          300: "#b8b8c4",
          400: "#8e8ea0",
          500: "#6e6e80",
          600: "#565669",
          700: "#404052",
          800: "#2a2a37",
          900: "#171723",
          950: "#0c0c14",
        },
        accent: {
          DEFAULT: "#7c3aed",
          soft: "#a78bfa",
        },
      },
    },
  },
  plugins: [],
};
