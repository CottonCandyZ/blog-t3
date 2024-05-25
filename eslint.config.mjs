// @ts-expect-error: No type library for eslintPluginTailwindCSS
import pluginTailwindcss from 'eslint-plugin-tailwindcss'

const plugin = [
  {
    name: 'tailwindcss/rules',
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
    },
  },
]

export default plugin
