/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0E28A3',
        secondary: '#0AE6D2',
        accent: '#36C9C6',
        bgShowroom: '#F6FFFE'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'md-strong': '0 10px 30px rgba(16,24,40,0.12)'
      }
    }
  },
  plugins: []
};
