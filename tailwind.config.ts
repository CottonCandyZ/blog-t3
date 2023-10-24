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
        'backshake': 'backshake 0.5s linear',
      },
    },
  },
  plugins: [],
} satisfies Config;
