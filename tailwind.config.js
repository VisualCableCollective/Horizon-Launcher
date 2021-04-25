module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'titillium-web' : ['Titillium Web']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
