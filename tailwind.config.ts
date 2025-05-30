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
        "sm-white": "#F6F5F2",
        "sm-primary": "#A374D5",
        "sm-dark-purple": "#BEADFA",
        "sm-primary-dark": "#222831",
        "sm-border-dark": "#3B3B3B",
        "sm-light-beige": "#F0EBE3",
        "sm-light-gray": "#D8D3CD",
        "sm-dark-gray": "#797A7E",
      },
    }

  },
  plugins: [],
};
export default config;
