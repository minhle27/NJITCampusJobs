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
        "sort-bar": "#F7F5F5",
        "job-description": "#7E7B7B",
        "click-button-1": "#94DA69",
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
      height: {
        "feed-list": "70dvh",
        "job-description": "68svh",
      },
      minHeight: {
        "feed-list": "70dvh",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
