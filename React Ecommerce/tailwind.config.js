export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow': "'Barlow', sans-serif",
      },
      colors: {
        "primary": 'var(--primary)',
        "secondary": 'var(--secondary)',
        "text-color": 'var(--text-color)',
        "paragraph-color": 'var(--paragraph-color)',
        "custom-cream": 'var(--custom-cream)',
        "footer-xt": 'var(--footer-xt)',
        "pagination-color":'var(--pagination-color)',
        "page-active":'var(--page-active)',
        "not-active":'var(--not-active)',
        "features":'var(--features)',
        "quality":'var(--quality)',
      },
      // screens: {
      //   'mini': '393px',
      //   'sm': '640px',
      //   'md': '1024px',
      //   'lg': '1280px',
      //   'xl': '1440px',
      // },
      container: {
        center: true,
        padding: '20px',
        screens: {
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: []
}