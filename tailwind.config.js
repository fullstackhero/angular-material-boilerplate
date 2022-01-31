// const {guessProductionMode} = require("@ngneat/tailwind");
//  process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  mode:'jit',
  prefix: '',
  content: ['./src/**/*.{html,ts,css,scss}'],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Helvetica Neue", "sans-serif",],
    },
    extend: {
      colors: {},
    },
  },
  plugins: [
    require('tailwindcss/aspect-ratio'),
    require('tailwindcss/forms'),
    require('tailwindcss/line-clamp'),
    require('tailwindcss/typography')
  ]
}
