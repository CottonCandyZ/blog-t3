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
      
    },
  },
  safelist: [
    {
      pattern: /theme-/,
    }
  ],
  plugins: [],
} satisfies Config;
