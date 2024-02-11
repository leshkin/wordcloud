/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  safelist: ['bg-[#000000]', 'bg-[#ffffff]', 'bg-[#f0f0f5]'],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1',
      },
    },
  },
}
