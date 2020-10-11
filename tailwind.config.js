module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js'
  ],
  theme: {},
  variants: {
    backgroundColor: ['dark'],
    textColor: ['dark']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
