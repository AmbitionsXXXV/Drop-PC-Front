/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  important: true,
  plugins: [require("@tailwindcss/typography")],
  corePlugins: {
    preflight: false
  }
};
