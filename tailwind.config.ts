import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"
export default {
  content: ["./src/**/*.tsx"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['SF Pro SC', 'PingFang SC', 'Noto Sans', 'Noto Sans SC', ...defaultTheme.fontFamily.sans],
        'mono': ['Noto Sans Mono', ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "move-show": {
          "40%": {
            transform: "translate(-20%, -10%) rotate(-20deg)",
          },
          "0%, 100%": {
            transform: "translate(0) rotate(0)",
          },
        },
        backshake: {
          "0%, 50%": { transform: "rotate(8deg)" },
          "25%, 75%": { transform: "rotate(-8deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        show: {
          "0%": { opacity: "0"},
          "100%": { opacity: "1"},
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        backshake: "backshake 0.5s linear",
        show: "show 0.5s ease-in-out",
        "move-show": "move-show ease-in-out 1.2s 1s",
        "move-show-without-delay": "move-show ease-in-out 1.2s",
      },
      colors: {
        'primary': "rgb(var(--color-primary) / <alpha-value>)",
        'primary-dark': "rgb(var(--color-primary-dark) / <alpha-value>)",
        'primary-medium': "rgb(var(--color-primary-medium) / <alpha-value>)",
        'primary-light': "rgb(var(--color-primary-light) / <alpha-value>)",
        'primary-extralight': "rgb(var(--color-primary-extralight) / <alpha-value>)",
      },
    },
  },
  safelist: [
    {
      pattern: /theme-/,
    },
    {
      pattern: /duration-(400|500|600|700)/,
    }
  ],
} satisfies Config;
