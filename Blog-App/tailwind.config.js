/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '1200px', 
        'custom-medium': '881px',
        'custom-small': '456px',
        'custom-smallx': '331px',
        'custom-smallinp': '240px',
      },

    },
  },
  plugins: [],
}
