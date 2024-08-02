import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      keyframes: {
        navAnimate: {
          "0%": {
            width: "0%",
            left: "50%",
          },
          "100%": {
            width: "100%",
            left: "0",
          },
        },
        navAnimate2: {
          "0%": {
            transform: "translateY(-100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        navAnimate: "navAnimate 0.8s ease-in forwards",
        navAnimate2: "navAnimate2 0.5s ease-in"
      },
      screens: {
        xs: "400px",
        lg: "930px",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
