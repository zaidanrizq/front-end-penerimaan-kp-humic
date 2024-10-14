/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yesevaOne: ['Yeseva One', 'serif'],
        workSans: ['Work Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif']
      },
      colors: {
        'primary': '#B4252A',
        'secondary': '#B4252A',
        'accent': '#949597',
        'black': '#212124'
      },
    },
  },
  plugins: [],
};
