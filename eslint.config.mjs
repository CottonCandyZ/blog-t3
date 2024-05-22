import antfu from '@antfu/eslint-config'
// @ts-expect-error: No type library for nextPlugin
import nextPlugin from '@next/eslint-plugin-next'
// @ts-expect-error: No type library for eslintPluginTailwindCSS
import pluginTailwindcss from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
}, {
  name: 'next/rules',
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}, {
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
})
