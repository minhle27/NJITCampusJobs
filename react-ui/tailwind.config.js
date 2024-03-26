/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "search-bar": "#F4EEEE",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        36: "36px",
        48: "48px",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
