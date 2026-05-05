import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = [...nextVitals, ...nextTs].map((config) => {
  if (!config.plugins?.['react-hooks']) return config

  return {
    ...config,
    rules: {
      ...config.rules,
      'react-hooks/set-state-in-effect': 'warn',
    },
  }
})

export default eslintConfig
