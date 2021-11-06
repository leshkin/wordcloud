<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const { t, locale } = useI18n({ useScope: 'global' })

  const router = useRouter()
  let isCreated = ref(false)
  let isError = ref(false)
  let isLoading = ref(false)

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
    default:
      locale.value = 'en'
  }

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

  words.value = text.value.split(' ')

  const generate = async () => {
    isCreated.value = false
    isError.value = false
    isLoading.value = true
    const response = await axios.post('/lemmatize', { text: text.value})
    console.log(response.data)
    isLoading.value = false
    if (!response.data.error) {
      words.value = response.data
      isCreated.value = true
    } else {
      isError.value = true
    }
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
      ctx.drawImage(img, 0, 0, 500, 500)
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
      <a class="navbar-item is-size-1 has-text-weight-bold" href="https://wordcloud.online">
        <span class="has-text-link ">Word</span> <span class="has-text-danger">Cloud</span>
      </a>
    </div>
  </nav>
  <section class="hero is-fullheight-with-navbar">
    <div class="columns is-mobile is-centered">
      <div class="column is-two-thirds">
      <article v-if="isError" class="message is-danger">
        <div class="message-body">{{ t('errors.textTooLong') }}</div>
      </article>
      <article class="message is-dark">
        <div class="message-body">{{ t('info') }}</div>
      </article>
      <div class="field">
        <div class="control">
          <textarea class="textarea" v-model="text" :placeholder="t('placeholder')" rows="10"></textarea>
        </div>
      </div>
      <div class="field has-text-centered">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': isLoading}" @click="generate()">{{ t('generate') }}</button>
        </div>
      </div>
      <client-only>
        <word-cloud :words="words"></word-cloud>
        <canvas id="canvas" class="is-hidden" width="500" height="500"></canvas>
      </client-only>
      <div class="field has-text-centered">
        <div class="control">
          <button v-if="isCreated" class="button is-success" @click="downloadPNG()">{{ t('downloadPNG') }}</button>
        </div>
      </div>
    </div>
  </div>
  </section>
  <footer class="footer mt-3">
    <div class="content has-text-centered">
      <p>
        <router-link to="/en">English</router-link>
        <router-link to="/es" class="ml-3">Español</router-link>
        <router-link to="/pt" class="ml-3">Português</router-link>
        <router-link to="/fr" class="ml-3">Français</router-link>
        <router-link to="/de" class="ml-3">Deutsch</router-link>
        <router-link to="/ru" class="ml-3">Русский</router-link>
      </p>
      <p>
        Based on <a href="https://github.com/jasondavies/d3-cloud">d3-cloud</a> and <a href="https://github.com/explosion/spaCy">spaCy</a> libraries
      </p>
    </div>
  </footer>
</template>

<style>
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