/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-200" : "#b05b20",
        "primary-100" : "#da7631",
        "secondary-200" : "#df2727",
        "secondary-100" : "#060101"
      }
    },
  },
  plugins: [],
}

