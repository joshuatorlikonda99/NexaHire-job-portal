import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        brand: {
          DEFAULT: "#6757E8",
          dark: "#5040CB",
          light: "#EFEDFF",
        },
        accent: {
          DEFAULT: "#0EA5A3",
          dark: "#087E7C",
          light: "#E5FAF8",
        },
        signal: "#F59E0B",
        midnight: "rgb(var(--midnight) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,21,38,.04), 0 10px 35px rgba(18,21,38,.07)",
        float: "0 24px 70px rgba(20,22,45,.16)",
        glow: "0 18px 50px rgba(103,87,232,.20)",
      },
      borderRadius: {
        xl2: "1.1rem",
        xl3: "1.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-12px,0) rotate(1deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(18px,-14px,0) scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        rise: "rise .55s ease-out both",
      },
      opacity: {
        7: ".07", 8: ".08", 9: ".09", 12: ".12", 15: ".15", 35: ".35",
        42: ".42", 45: ".45", 55: ".55", 58: ".58", 62: ".62", 64: ".64",
        65: ".65", 68: ".68", 72: ".72", 78: ".78", 85: ".85", 92: ".92",
      },
    },
  },
  plugins: [],
};

export default config;
