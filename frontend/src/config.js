export const FONTS = [
  {
    family: 'Lobster',
    lang: ['latin']
  },
  {
    family: 'Roboto',
    lang: ['latin'] // todo: add other alphabets
  },
  {
    family: 'Alfa Slab One',
    lang: ['latin']
  },
  {
    family: 'Bebas Neue',
    lang: ['latin']
  },
  {
    family: 'Source Serif Pro',
    lang: ['latin']
  }
]

export const COLOR_PALETTES = [
  {
    name: 'contrasting-1',
    colors: ['#e76f3d', '#feab6b', '#f3e9e7', '#9bcfe0', '#00a7c7'],
    backgroundColor: '#000000'
  },
  {
    name: 'warm-1',
    colors: ['#c6c3b3', '#ccaf9b', '#a06b39', '#873c1e', '#312921'],
    backgroundColor: '#ffffff'
  },
  {
    name: 'pastel-1',
    colors: ['#a47053', '#efca66', '#ecdab9', '#cec3c8', '#909cac'],
    backgroundColor: '#ffffff'
  },
  {
    name: 'cold-1',
    colors: ['#252b31', '#5e6668', '#c1c8c7', '#f6fafb', '#d49c6b'],
    backgroundColor: '#000000'
  },
  {
    name: 'black',
    colors: ['#000000'],
    backgroundColor: '#ffffff'
  },
  {
    name: 'white',
    colors: ['#ffffff'],
    backgroundColor: '#000000'
  }
]

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?display=swap'

export function getFontURL (font) {
  return GOOGLE_FONTS_URL + '&family=' + font.family.replaceAll(' ', '+')
}
