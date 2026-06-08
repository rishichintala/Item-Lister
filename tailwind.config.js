/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6c63ff', dark: '#5a52d5', light: '#ede9ff' },
      },
    },
  },
  plugins: [],
}

