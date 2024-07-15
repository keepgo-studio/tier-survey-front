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
        "linear-black": "linear-gradient(-156.89deg, #2C2C30 0%, #232328 38%, #18181C 74%)"
      },
      colors: {
        "border": "#656565",
        "dark-black": "#1E1E21",
        "blue": "#3D67FC",
        "purple": "#6F46B4",
        "bright-gray": "#9F9F9F",
        "red": "#EF4444",
        "dimm-dark": "#292929",
        "gray": "#8C8C8C",
        "riot": "#eb002a"
      },
      boxShadow: {
        'basic': '0 4px 8px 2px rgba(0, 0, 0, 0.15);',
        'border': '0 0 0 1.5px #9F9F9F',
      },
      transitionDuration: {
        'default': '300ms'
      }
    },
  },
  plugins: [],
};
export default config;
