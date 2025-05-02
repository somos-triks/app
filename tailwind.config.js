/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{php,html,js,jsx}",
    "./includes/**/*.{php,html,js,jsx}",
    "./components/**/*.{php,html,js,jsx}",
    "./assets/**/*.{js,jsx}",
    "./pages/**/js/**/*.{js,jsx}",
    "./pages/**/js/modules/**/*.{js,jsx}",
    "!./node_modules/**/*"
  ],
  safelist: [
    'bg-primary-500',
    'hover:bg-primary-600',
    'dark:bg-gray-700',
    'dark:hover:bg-gray-600'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#5c20e6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out'
      }
    }
  },
  plugins: [],
}
