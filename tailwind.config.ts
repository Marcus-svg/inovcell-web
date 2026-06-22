import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00A859',   // Azul tecnológico para botões e destaques
          secondary: '#008a48', // Verde oficial do WhatsApp para conversão
          dark: '#0F172A',      // Fundo escuro elegante (slate-900)
        }
      }
    },
  },
  plugins: [],
};
export default config;