/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{ejs,js}"],
  theme: {
    extend: {
      colors: {
        blueOne: "#102C57",
        goldOne: "#E3B04B",
        redOne: '#C10E0E',
        whiteOne: '#FEFAF6',
        creamOne: '#EADBC8',
        beigeOne: '#DAC0A3',
        input: '#F1F2F7'
      },
      fontFamily: {
        "arvo": ["Arvo", "serif"]
      },
      fontSize: {
        "xxs": "9px"
      }
    },
  },
  plugins: [],
}

