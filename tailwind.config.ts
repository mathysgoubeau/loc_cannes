import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gold: "#C5A059",
        white: "#FFFFFF"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"]
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "soft-scale": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.035)" }
        }
      },
      animation: {
        reveal: "reveal 900ms cubic-bezier(0.19, 1, 0.22, 1) both",
        "soft-scale": "soft-scale 7s ease-in-out alternate infinite"
      }
    }
  },
  plugins: []
};

export default config;
