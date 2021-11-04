import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import Content from './components/Content.vue'

const messages = {
  en: {
    info: 'WordCloud allows you to build a word cloud online from any text and download the resulting image.',
    placeholder: 'Insert text to create a word cloud',
    generate: 'Generate',
    downloadPNG: 'Download PNG',
    errors: {
      textTooLong: 'The text is too long, please limit it to 10,000 characters.',
    }
  },
  ru: {
    info: 'WordCloud позволяет создать облако слов онлайн из любого текста и скачать получившееся изображение.',
    placeholder: 'Вставьте текст для создания облака слов',
    generate: 'Создать',
    downloadPNG: 'Скачать PNG',
    errors: {
      textTooLong: 'Текст слишком длинный, ограничьте его 10 000 символов.',
    }
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})

const routes = [
  { path: '/', component: Content, props: { lang: 'en' } },
  { path: '/en', component: Content, props: { lang: 'en' } },
  { path: '/ru', component: Content, props: { lang: 'ru' } },
]

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(i18n)
})
