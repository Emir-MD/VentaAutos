import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",   // naranja cálido (NO es el mismo)
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        mint: { 500: "#2ec8a0" }, // botón “Consulta tu saldo” estilo propio
        slate: { 950: "#111827" }
      },
      boxShadow: {
        card: "0 12px 28px rgba(0,0,0,.08)"
      },
      borderRadius: {
        pill: "9999px"
      }
    },
  },
  plugins: [],
} satisfies Config;
