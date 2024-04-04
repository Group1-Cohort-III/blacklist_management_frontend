/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans"],
      },
      colors: {
        primary: "#18425D",
        secondary: "#EE312A",
        bgColor: "#F7F8FC",
        txtColor: "#F3F5F6",
        gray: {
          1: "#A9ABAE",
          2: "#BDBFC1",
          3: "#727376",
          4: "#606062",
        },
      },
    },
  },
  plugins: [],
};
