import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import Content from './components/Content.vue'
import { messages } from './messages.js'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})

const routes = [
  { path: '/', component: Content, props: { lang: 'en' } },
  { path: '/ru', component: Content, props: { lang: 'ru' } },
  { path: '/es', component: Content, props: { lang: 'es' } },
  { path: '/de', component: Content, props: { lang: 'de' } },
  { path: '/fr', component: Content, props: { lang: 'fr' } },
  { path: '/pt', component: Content, props: { lang: 'pt' } },
  { path: '/tr', component: Content, props: { lang: 'tr' } },
  { path: '/pl', component: Content, props: { lang: 'pl' } },
  { path: '/tl', component: Content, props: { lang: 'tl' } },
  { path: '/uk', component: Content, props: { lang: 'uk' } },
  { path: '/hi', component: Content, props: { lang: 'hi' } },
  { path: '/zh', component: Content, props: { lang: 'zh' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(i18n)
})
