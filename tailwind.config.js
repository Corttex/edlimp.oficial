/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "primary": "#2638b6",
          "secondary": "#a7fc5d",
          "background": "var(--background)",
          "surface": "var(--surface)",
          "on-surface": "var(--on-surface)",
          "on-surface-variant": "var(--on-surface-variant)",
          "outline-variant": "var(--outline-variant)",
          "surface-container": "var(--surface-container)",
          "surface-container-low": "var(--surface-container-low)",
          "surface-container-high": "var(--surface-container-high)",
          "surface-container-highest": "var(--surface-container-highest)",
          "surface-container-lowest": "var(--surface-container-lowest)",
          "error": "#ba1a1a",
          "error-container": "#ffdad6",
          "on-primary": "#ffffff",
          "on-secondary": "#082100",
          "secondary-container": "#c4ff8f",
          "on-secondary-container": "#082100",
          "primary-container": "#233aa7",
          "on-primary-container": "#e0e3ff",
      },
      "borderRadius": {
          "DEFAULT": "1rem",
          "lg": "2rem",
          "xl": "3rem",
          "full": "9999px"
      },
      "fontFamily": {
          "headline": ["Manrope"],
          "body": ["Manrope"],
          "label": ["Plus Jakarta Sans"]
      }
    },
  },
  plugins: [],
}
