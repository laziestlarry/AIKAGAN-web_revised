import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // AutonomaX palette
        steel: "#1A5276",
        steel2: "#2874A6",
        sky: "#7FB3D5",
        amber: "#F5B041",
        green: "#2ECC71",
        light: "#F7F9F9",
        dark: "#17202A",
        // Legacy aliases mapped to the palette so existing components stay coherent
        ink: "#17202A",
        panel: "#1E2A38",
        gold: "#F5B041",
        emerald: "#2ECC71",
        mist: "#7FB3D5",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
