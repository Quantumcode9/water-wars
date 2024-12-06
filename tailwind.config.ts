import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'custom-md': '879px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        accent: "var(--accent)",
        button: "var(--button)",
        textSecondary: "var(--textSecondary)",
        surface: "var(--surface)",
        surfaceSecondary: "var(--surfaceSecondary)",
        surfaceHighlight: "var(--surfaceHighlight)",
        buttonHighlight: "var(--buttonHighlight)",
        bentoBox: "var(--bentoBox)",
        bentoBoxHighlight: "var(--bentoBoxHighlight)",
      },
      boxShadow: {
        'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
