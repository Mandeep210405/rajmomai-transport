import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101010",
        charcoal: "#191919",
        gold: "#D4AF37",
        copper: "#B87333",
        offwhite: "#F5F3EF",
        muted: "#A3A3A3",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        display: ['"Oswald Variable"', "Impact", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 60px -12px rgba(212,175,55,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
