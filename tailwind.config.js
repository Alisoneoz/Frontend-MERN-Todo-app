/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        wine: "#c20044",
        pinky:"#ffb3f0",
        orangish: "#ff4405",
        specialGray: {
          200:"#F6EBF4",
          100:"#f9f1f7",},
        purply:{
          900:"#310e46",
          800:"#622f82"
        }
      },
      fontFamily: {
        josefin : "'Josefin Sans', sans-serif",
      }
    },
  },
  plugins: [],
}
