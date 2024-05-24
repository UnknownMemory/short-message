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
        "sm-primary": "#F7F2E7",
        "sm-secondary": "#DFCCFB",
        "sm-primary-dark": "#222831",
        "sm-light-beige": "#F0EBE3",
        "sm-light-gray": "#D8D3CD",
        "sm-dark-gray": "#797A7E",
      },
    }

  },
  plugins: [],
};
export default config;
