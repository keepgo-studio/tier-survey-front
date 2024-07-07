import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/b_widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/e_shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'prime-purple': '#6F46B4',
        'prime-white': '#EEEEEE',
        'prime-deep-dark': '#222831',
        'prime-dark': '#31363F',
        'prime-gray': '#8C8C8C',
        'prime-mint': '#76ABAE',
        'prime-color': '#f0f4f9',
        'riot': '#d53235'
      },
      boxShadow: {
        'prime': '0 0 12px 4px rgba(0, 0, 0, 0.15);'
      },
      transitionDuration: {
        'default': '300ms'
      }
    },
  },
  plugins: [],
};
export default config;
