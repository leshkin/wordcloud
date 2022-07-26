import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/lemmatize': 'http://127.0.0.1:8889',
      // '/lemmatize': 'https://wordcloud.online',
    },
  },
  plugins: [
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    vue(),
    vueI18n({
      runtimeOnly: false,
    }),
  ],
})
