import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
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
        navAnimate2: "navAnimate2 0.5s ease-in",
        slide:"slide 20s linear infinite"
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
