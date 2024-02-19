/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
