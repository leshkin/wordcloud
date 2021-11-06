import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import Content from './components/Content.vue'

const messages = {
  en: {
    info: 'Word Cloud allows you to build a word cloud online from any text and download the resulting image.',
    placeholder: 'Insert text to create a word cloud',
    generate: 'Generate',
    downloadPNG: 'Download PNG',
    errors: {
      textTooLong: 'The text is too long, please limit it to 10,000 characters.',
    }
  },
  ru: {
    info: 'Word Cloud позволяет создать облако слов онлайн из любого текста и скачать получившееся изображение.',
    placeholder: 'Вставьте текст для создания облака слов',
    generate: 'Создать',
    downloadPNG: 'Скачать PNG',
    errors: {
      textTooLong: 'Текст слишком длинный, ограничьте его 10 000 символов.',
    }
  },
  es: {
    info: 'Word Cloud le permite crear una nube de palabras en línea a partir de cualquier texto y descargar la imagen resultante.',
    placeholder: 'Insertar texto para crear una nube de palabras',
    generate: 'Generar',
    downloadPNG: 'Descargar PNG',
    errors: {
      textTooLong: 'El texto es demasiado largo, limítelo a 10,000 caracteres.',
    }
  },
  de: {
    info: 'Mit Word Cloud können Sie aus jedem Text online eine Wortwolke erstellen und das resultierende Bild herunterladen.',
    placeholder: 'Fügen Sie Text ein, um eine Wortwolke zu erstellen',
    generate: 'Generieren',
    downloadPNG: 'PNG herunterladen',
    errors: {
      textTooLong: 'Der Text ist zu lang, bitte begrenzen Sie ihn auf 10.000 Zeichen.',
    }
  },
  fr: {
    info: 'Word Cloud vous permet de créer un nuage de mots en ligne à partir de n\'importe quel texte et de télécharger l\'image résultante.',
    placeholder: 'Insérer du texte pour créer un nuage de mots',
    generate: 'Produire',
    downloadPNG: 'Télécharger PNG',
    errors: {
      textTooLong: 'Le texte est trop long, veuillez le limiter à 10 000 caractères.',
    }
  },
  pt: {
    info: 'O Word Cloud permite que você crie uma nuvem de palavras online a partir de qualquer texto e baixe a imagem resultante.',
    placeholder: 'Insira texto para criar uma nuvem de palavras',
    generate: 'Gerar',
    downloadPNG: 'Baixar PNG',
    errors: {
      textTooLong: 'O texto é muito longo, limite-o a 10.000 caracteres.',
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
  { path: '/es', component: Content, props: { lang: 'es' } },
  { path: '/de', component: Content, props: { lang: 'de' } },
  { path: '/fr', component: Content, props: { lang: 'fr' } },
  { path: '/pt', component: Content, props: { lang: 'pt' } },
]

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(i18n)
})
