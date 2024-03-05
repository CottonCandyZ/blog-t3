import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
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
      animation: {
        backshake: "backshake 0.5s linear",
        show: "show 0.5s ease-in-out",
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
    }
  ],
} satisfies Config;
