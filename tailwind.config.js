/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#2dd4bf",
        secondary: "#94a3b8",
        light: "#cbd5e1",
        navy: "#0a192f",
      },
    },
  },
  plugins: [],
};
