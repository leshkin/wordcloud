export const FONTS = [
  {
    family: 'Lobster',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'ru'],
  },
  {
    family: 'Roboto',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'ru'],
  },
  {
    family: 'Alfa Slab One',
    lang: ['en', 'es', 'de', 'fr', 'pt'],
  },
  {
    family: 'Russo One',
    lang: ['ru'],
  },
  {
    family: 'Bebas Neue',
    lang: ['en', 'es', 'de', 'fr', 'pt'],
  },
  {
    family: 'Source Serif Pro',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'ru'],
  },
  {
    family: 'Noto Sans SC',
    lang: ['zh'],
  },
]

export const COLOR_PALETTES = [
  {
    name: 'contrasting-1',
    colors: ['#e76f3d', '#feab6b', '#f3e9e7', '#9bcfe0', '#00a7c7'],
    backgroundColor: '#000000',
  },
  {
    name: 'blue',
    colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'green',
    colors: ['#386641', '#6a994e', '#a7c957', '#f2e8cf', '#bc4749'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'cold-1',
    colors: ['#252b31', '#5e6668', '#c1c8c7', '#f6fafb', '#d49c6b'],
    backgroundColor: '#000000',
  },
  {
    name: 'black',
    colors: ['#000000'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'white',
    colors: ['#ffffff'],
    backgroundColor: '#000000',
  },
]

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?display=swap'

export function getFontURL(font) {
  return GOOGLE_FONTS_URL + '&family=' + font.family.replaceAll(' ', '+')
}
