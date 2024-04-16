import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./src/**/*.tsx"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "SF Pro SC",
          "PingFang SC",
          "var(--font-noto-sans)",
          "var(--font-noto-sans-sc)",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ["var(--font-noto-sans-mono)", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        cxs: "rgba(0, 0, 0, 0.03) 1px 1px 20px 1px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
        "primary-medium": "rgb(var(--color-primary-medium) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
        "primary-extralight":
          "rgb(var(--color-primary-extralight) / <alpha-value>)",
      },
    },
  },
  safelist: [
    {
      pattern: /duration-(400|500|600|700)/,
    },
  ],
} satisfies Config;
