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
          "primary": "var(--primary)",
          "on-primary": "var(--on-primary)",
          "secondary": "var(--secondary)",
          "on-secondary": "var(--on-secondary)",
          "secondary-container": "var(--secondary-container)",
          "on-secondary-container": "var(--on-secondary-container)",
          "background": "var(--background)",
          "on-background": "var(--on-surface)",
          "surface": "var(--surface)",
          "on-surface": "var(--on-surface)",
          "on-surface-variant": "var(--on-surface-variant)",
          "outline-variant": "var(--outline-variant)",
          "surface-container": "var(--surface-container)",
          "surface-container-low": "var(--surface-container-low)",
          "surface-container-high": "var(--surface-container-high)",
          "surface-container-highest": "var(--surface-container-highest)",
          "surface-container-lowest": "var(--surface-container-lowest)",
          "error": "#ef4444",
          "error-container": "var(--error-container)",
      },
      "borderRadius": {
          "DEFAULT": "0.375rem",
          "sm": "0.25rem",
          "md": "0.5rem",
          "lg": "0.75rem",
          "xl": "1rem",
          "2xl": "1.25rem",
          "3xl": "1.5rem",
          "full": "9999px"
      },
      "fontFamily": {
          "headline": ["Outfit", "sans-serif"],
          "body": ["Inter", "sans-serif"],
          "label": ["Outfit", "sans-serif"]
      }
    },
  },
  plugins: [],
}
