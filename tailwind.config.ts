import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        backshake: {
          "0%, 50%": { transform: "rotate(8deg)" },
          "25%, 75%": { transform: "rotate(-8deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        backshake: "backshake 0.5s linear",
      },
      colors: {
        'primary': "rgb(var(--color-primary) / <alpha-value>)",
        'primary-dark': "rgb(var(--color-primary-dark) / <alpha-value>)",
        'primary-medium': "rgb(var(--color-primary-medium) / <alpha-value>)",
        'primary-light': "rgb(var(--color-primary-light) / <alpha-value>)",
        'primary-extralight': "rgb(var(--color-primary-extralight) / <alpha-value>)",
      },
      typography: {
        primary: {
          css: {
            // https://github.com/tailwindlabs/tailwindcss/issues/9143
            '--tw-prose-body': "rgb(var(--color-primary-dark))",
            '--tw-prose-headings': "rgb(var(--color-primary-dark))",
            '--tw-prose-lead': "rgb(var(--color-primary))",
            '--tw-prose-links': "rgb(var(--color-primary))",
            '--tw-prose-bold': "rgb(var(--color-primary-dark))",
            '--tw-prose-counters': "rgb(var(--color-primary))",
            '--tw-prose-bullets': "rgb(var(--color-primary-dark))",
            '--tw-prose-hr': "rgb(var(--color-primary-dark))",
            '--tw-prose-quotes': "rgb(var(--color-primary-dark))",
            '--tw-prose-quote-borders': "rgb(var(--color-primary-dark))",
            '--tw-prose-captions': "rgb(var(--color-primary-dark))",
            '--tw-prose-code': "rgb(var(--color-primary))",
            '--tw-prose-pre-code': "rgb(var(--color-primary-dark))",
            '--tw-prose-pre-bg': "rgb(var(--color-primary-light))",
            '--tw-prose-th-borders': "rgb(var(--color-primary-dark))",
            '--tw-prose-td-borders': "rgb(var(--color-primary-dark))",
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /theme-/,
    }
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
