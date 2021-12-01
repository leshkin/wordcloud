<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { FONTS, COLOR_PALETTES } from '/src/config.js'
  import { useHead } from '@vueuse/head'

  const { t, locale } = useI18n({ useScope: 'global' })

  const router = useRouter()
  let isCreated = ref(false)
  let isError = ref(false)
  let isLoading = ref(false)
  let font = ref(FONTS[0])
  let colorPalette = ref(COLOR_PALETTES[0])

  switch (router.currentRoute.value.path) {
    case '/ru':
      locale.value = 'ru'
      break
    case '/fr':
      locale.value = 'fr'
      break
    case '/de':
      locale.value = 'de'
      break
    case '/es':
      locale.value = 'es'
      break
    case '/pt':
      locale.value = 'pt'
      break
    case '/zh':
      locale.value = 'zh'
      break
    default:
      locale.value = 'en'
  }

  useHead({
    title: t('title'),
    meta: [
      {
        name: 'description',
        content: t('info'),
      },
    ],
  })

  let text = ref('')
  let words = ref([])

  const props = defineProps({
    lang: String,
  })

  watch(
    () => props.lang,
    (lang) => {
      locale.value = lang
    }
  )

  const generate = async () => {
    isCreated.value = false
    isError.value = false
    isLoading.value = true
    const response = await axios.post('/lemmatize', { text: text.value})
    if (!response.data.error) { 
      words.value = []
      response.data.forEach(el => {
        words.value.push({
          name: el.name,
          count: el.count,
          visible: true
        })
      })
    } else {
      isError.value = true
    }
  }

  const update = () => {
    isCreated.value = true
    isLoading.value = false
    document.querySelector('#customization').scrollIntoView({ behavior: 'smooth' })
  }

  const triggerDownload = (imgURI) => {
    var evt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    })

    var a = document.createElement('a')
    a.setAttribute('download', 'wordcloud.png')
    a.setAttribute('href', imgURI)
    a.setAttribute('target', '_blank')

    a.dispatchEvent(evt)
  }

  const downloadPNG = () => {
    let canvas = document.querySelector('canvas')
    let svg = document.querySelector('svg')
    let ctx = canvas.getContext('2d')
    let data = (new XMLSerializer()).serializeToString(svg)
    let DOMURL = window.URL || window.webkitURL || window

    let img = new Image()
    let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'})
    let url = DOMURL.createObjectURL(svgBlob)

    img.onload = function () {
      ctx.drawImage(img, 0, 0, 1500, 1500)
      DOMURL.revokeObjectURL(url)

      let imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

      triggerDownload(imgURI)
    }

    img.src = url
  }
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item is-size-1 has-text-weight-bold ff-lobster" href="https://wordcloud.online">
        Word Cloud
      </a>
    </div>
  </nav>
  <section>
    <div class="columns is-centered is-desktop">
      <div class="column is-half">
        <div class="container m-2">
          <article v-if="isError" class="message is-danger">
            <div class="message-body">{{ t('errors.textTooLong') }}</div>
          </article>
          <article class="message is-warning">
            <div class="message-body has-text-black">{{ t('info') }}</div>
          </article>
          <div class="field">
            <div class="control">
              <textarea class="textarea" v-model="text" :placeholder="t('placeholder')" rows="10"></textarea>
            </div>
          </div>
          <div class="field has-text-centered">
            <div class="control">
              <button class="button is-black"
                      :class="{'is-loading': isLoading}"
                      @click="generate()">{{ t('generate') }}</button>
            </div>
          </div>
          <div id="customization" class="message is-success">
            <div class="message-body">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">{{ t('font') }}</label>
                    <div class="control">
                      <font-dropdown v-model="font"></font-dropdown>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">{{ t('colorPalette') }}</label>
                    <div class="control">
                      <color-dropdown v-model="colorPalette"></color-dropdown>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">{{ t('words') }}</label>
                    <div class="control">
                      <word-dropdown v-model="words"></word-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <client-only>
            <word-cloud :words="words" :font="font" :colorPalette="colorPalette" @update="update()"></word-cloud>
            <canvas id="canvas" class="is-hidden" width="1500" height="1500"></canvas>
          </client-only>
          <div class="field">
            <div class="control has-text-centered">
              <button v-if="isCreated" class="button is-black" @click="downloadPNG()">
                <span class="icon-text">
                  <span class="icon">
                    <span class="material-icons">file_download</span>
                  </span>
                  <span>PNG</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="footer mt-3">
    <div class="content has-text-centered">
      <p>
        <span v-if="locale === 'en'" class="is-inline-block">English</span>
        <a v-else href="/" class="is-inline-block">English</a>
        <span v-if="locale === 'es'" class="ml-3 is-inline-block">Español</span>
        <a v-else href="/es" class="ml-3 is-inline-block">Español</a>
        <span v-if="locale === 'pt'" href="/pt" class="ml-3 is-inline-block">Português</span>
        <a v-else href="/pt" class="ml-3 is-inline-block">Português</a>
        <span v-if="locale === 'fr'" class="ml-3 is-inline-block">Français</span>
        <a v-else href="/fr" class="ml-3 is-inline-block">Français</a>
        <span v-if="locale === 'de'" class="ml-3 is-inline-block">Deutsch</span>
        <a v-else href="/de" class="ml-3 is-inline-block">Deutsch</a>
        <span v-if="locale === 'ru'" class="ml-3 is-inline-block">Русский</span>
        <a v-else href="/ru" class="ml-3 is-inline-block">Русский</a>
        <span v-if="locale === 'zh'" class="ml-3 is-inline-block">中文</span>
        <a v-else href="/zh" class="ml-3 is-inline-block">中文</a>
      </p>
      <p>
        Based on <a href="https://github.com/jasondavies/d3-cloud">d3-cloud</a> and <a href="https://github.com/explosion/spaCy">spaCy</a> libraries
      </p>
    </div>
  </footer>
</template>

<style>
  .ff-lobster {
    font-family: 'Lobster', cursive;
  }

  .navbar .navbar-brand {
    text-align: center;
    display: block;
    width: 100%;
  }

  .navbar .navbar-brand > .navbar-item,
  .navbar .navbar-brand .navbar-link {
    display: inline-block;
  }
</style>