/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headlines : "#1E1E1E",
        main: "#E34040",
        mainHover: "#BB2121",
        background: "#F7F7F7",
        subtitles : "#848484",
      },
      fontFamily: {
        sansation: ['Sansation', 'sans-serif'],

      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      screens: {
        xs: "375px",
        sm: "500px",
        md: "772px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
