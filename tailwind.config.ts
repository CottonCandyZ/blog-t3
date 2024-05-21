import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'selector',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-noto-sans)',
          'var(--font-noto-sans-sc)',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['var(--font-noto-sans-mono)', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        cxs: 'rgba(0, 0, 0, 0.03) 1px 1px 20px 1px',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      colors: {
        'primary-bg': 'rgb(var(--color-primary-bg) / <alpha-value>)',
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-small': 'rgb(var(--color-primary-small) / <alpha-value>)',
        'primary-medium': 'rgb(var(--color-primary-medium) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        'primary-extralight':
          'rgb(var(--color-primary-extralight) / <alpha-value>)',
      },
    },
  },
  safelist: [
    {
      pattern: /duration-(400|500|600|700)/,
    },
  ],
} satisfies Config
