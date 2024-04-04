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
        "cyan-feed": "#82E6CE",
      },
      fontSize: {
        14: "14px",
        15: "15px",
        16: "16px",
        36: "36px",
        48: "48px",
      },
      width: {
        "1/11": "11.11111%",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
