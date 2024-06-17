import  flowbite  from 'flowbite-react/tailwind'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      screens:{
        xs:"400px",
        lg:"930px"
      },
      fontFamily:{
        playfair:['Playfair Display','serif']
      },
    },
  },
  plugins: [],
}