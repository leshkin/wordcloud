// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  vite: {
    server: {
      proxy: {
        '/lemmatize': 'https://wordcloud.online',
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      title: 'Word Cloud - Free Online Tag Cloud Generator',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@vueuse/nuxt'],

  css: ['~/assets/main.css'],

  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    locales: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl', 'ru', 'uk', 'hi', 'zh'],
  },

  nitro: { compressPublicAssets: true },
})
