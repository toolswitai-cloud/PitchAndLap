import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        card: "#111111",
        "card-hover": "#161616",
        border: "#1e1e1e",
        "border-hover": "#2a2a2a",
        accent: "#E63946",
        muted: "#888888",
        body: "#cccccc",
        white: "#ffffff",
        cricket: {
          text: "#5DCAA5",
          bg: "#085041",
          border: "#1D9E75",
        },
        football: {
          text: "#85B7EB",
          bg: "#0C447C",
          border: "#378ADD",
        },
        tennis: {
          text: "#EF9F27",
          bg: "#633806",
          border: "#BA7517",
        },
        f1: {
          text: "#E63946",
          bg: "#791F1F",
          border: "#A32D2D",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
      animation: {
        "float-slow": "float 3s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite 0.5s",
        "float-fast": "float 3.5s ease-in-out infinite 1s",
        "float-horizontal": "floatHorizontal 5s ease-in-out infinite 0.3s",
        "bounce-slow": "bounce 2s infinite",
        "pulse-dot": "pulseDot 2s infinite",
        "scroll-ticker": "scrollTicker 25s linear infinite",
        "progress-fill": "progressFill 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatHorizontal: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(15px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        scrollTicker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;