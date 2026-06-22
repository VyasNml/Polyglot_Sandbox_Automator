/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151e2e',
          900: '#0f172a',
        },
        primary: {
          DEFAULT: '#14b8a6', // Soft teal
          dark: '#0d9488',
        },
        background: {
          light: '#f8fafc', // off-white
          dark: '#0b0f19', // very dark blue-gray
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b', // slate-800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
