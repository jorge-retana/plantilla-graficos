const postcssPresetEnv = require('postcss-preset-env')
const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')

module.exports = {
  plugins: [
    tailwindcssNesting(),
    tailwindcss({ config: 'config/style/tailwind.config.cjs' }),
    postcssPresetEnv({ stage: 3 }),
  ],
}
