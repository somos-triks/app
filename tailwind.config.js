/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./includes/**/*.{php,js}",
    "./pages/**/*.{php,js}",
    "./**/*.php",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#491bec',
          200: '#491bec',
          300: '#491bec',
          400: '#491bec',
          500: '#491bec',
          600: '#491bec',
          700: '#491bec',
          800: '#491bec',
          900: '#491bec',
          950: '#491bec',
        },
        black: '#000000',
        white: '#ffffff',
        custom: {
          border: '#191919',
        }
      },
      backgroundColor: {
        dark: '#000000',
        light: '#ffffff',
      },
      textColor: {
        dark: '#ffffff',
        light: '#000000',
      },
      borderColor: {
        custom: {
          border: '#191919',
        }
      },
    },
  },
  plugins: [],
}
