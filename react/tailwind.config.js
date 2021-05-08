module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'titillium-web': ['Titillium Web']
      },
      backgroundColor: {
        'button-1': '#3b3b3b',
        'default-bg-highlighted': '#333333',
      },
      animation: {
        'spin-faster': 'spin 0.75s linear infinite',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
