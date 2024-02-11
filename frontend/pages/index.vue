<template>
  <div class="bg-amber-100 rounded border-l-4 border-amber-300 p-5 mb-5">{{ t('info') }}</div>

  <div v-if="isError" class="bg-red-100 rounded border-l-4 border-red-300 p-5 mb-5">
    {{ t('errors.textTooLong') }}
  </div>

  <textarea
    v-model="text"
    :placeholder="t('placeholder')"
    rows="10"
    class="mb-4 border border-gray-600 rounded w-full p-3"
  ></textarea>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
    <div class="hidden lg:block"></div>
    <div class="flex justify-center items-center">
      <PrimaryButton @click="generate()" :disabled="text.length === 0" :loading="isLoading" class="w-56">
        {{ t('generate') }}
      </PrimaryButton>
    </div>
    <div class="flex flex-col gap-4 lg:gap-2 justify-center">
      <button @click="text = DEMO_TEXT" class="text-neutral-400 underline">{{ t('insertDemoText') }}</button>
      <button @click="text = ''" class="text-neutral-400 underline">{{ t('clear') }}</button>
    </div>
  </div>

  <div
    v-show="isCreated"
    id="customization"
    class="bg-sky-100 rounded border-l-4 border-sky-300 p-5 grid grid-cols-1 lg:grid-cols-11 gap-5 mb-5"
  >
    <div class="col-span-3 space-y-2">
      <div>{{ t('font') }}</div>
      <DropdownFont v-model="font" :textLang="textLang" />
    </div>
    <div class="col-span-3 space-y-2">
      <div>{{ t('colorPalette') }}</div>
      <DropdownColor v-model="colorPalette" />
    </div>
    <div class="col-span-3 space-y-2">
      <div>{{ t('words') }}</div>
      <DropdownWord v-model="words" />
    </div>
    <div class="col-span-2 flex items-end">
      <PrimaryButton @click="redraw()" :disabled="text.length === 0" :loading="isRedrawing" class="w-40">
        {{ t('redraw') }}
      </PrimaryButton>
    </div>
  </div>

  <client-only>
    <div v-if="isCreated">
      <YandexAdRefresh type="result" />
    </div>
    <div v-show="isCreated" class="mx-auto max-w-[550px]">
      <WordCloud
        :update="wordCloudUpdate"
        :words="words"
        :font="font"
        :colorPalette="colorPalette"
        @update="update()"
      ></WordCloud>
    </div>
  </client-only>

  <div v-if="isCreated" class="flex justify-center">
    <PrimaryButton @click="downloadPNG()" icon="download" class="w-24">PNG</PrimaryButton>
  </div>

  <h2 class="text-3xl font-bold mb-5 mt-10 text-center">{{ t('gallery') }}</h2>
  <div class="text-lg text-center mb-3">1984, George Orwell, 1st chapter</div>
  <div class="flex justify-center">
    <img alt="Word cloud for 1984, George Orwell, 1st chapter" src="/wordcloud-1984.jpg" loading="lazy" />
  </div>

  <div class="text-lg text-center mt-10 mb-3">{{ t('parisTravelGuide') }}</div>
  <div class="flex justify-center">
    <img
      alt="Word cloud for Paris travel guide"
      src="/wordcloud-paris.jpg"
      style="border: 1px solid #dddddd"
      loading="lazy"
    />
  </div>

  <div class="text-lg text-center mt-10 mb-3">Eugene Onegin, A. Pushkin, 1st chapter</div>
  <div class="flex justify-center">
    <img alt="Word cloud for Eugene Onegin, A. Pushkin, 1st chapter" src="/wordcloud-onegin.jpg" loading="lazy" />
  </div>

  <div class="text-lg text-center mt-10 mb-3">{{ t('legendOfConfucius') }}</div>
  <div class="flex justify-center">
    <img
      alt="Word cloud for A Legend of Confucius"
      src="/wordcloud-confucius.jpg"
      style="border: 1px solid #dddddd"
      loading="lazy"
    />
  </div>

  <div class="space-y-6 my-10">
    <h2 class="text-3xl font-bold text-center">{{ $t('testimonials') }}</h2>
    <div class="shadow-md p-5 space-y-4 rounded border border-gray-100">
      <div class="flex gap-4">
        <div>
          <img src="/anton.jpeg" alt="Avatar" class="h-20 w-20 object-cover" />
        </div>
        <div>
          <div class="text-lg font-semibold">Anton L</div>
          <a
            href="https://anton-l.medium.com/top-5-best-free-word-cloud-generators-13836706375b"
            class="block text-blue-800 hover:underline"
            >Top 5 free word cloud generators in 2022</a
          >
        </div>
      </div>
      <div>
        The minimalistic service and the only one I’ve analyzed that lemmatizes words to the initial grammatical form!
        Simple interface, good ready-made styles. Also, the algorithm places the most frequent words closer to the
        center of the cloud, that is, the visual focus is on the frequent vocabulary. Of the minuses: there is not a
        large selection of cloud shapes.
      </div>
    </div>

    <div class="shadow-md p-5 space-y-4 rounded border border-gray-100">
      <div class="flex gap-4">
        <div>
          <img src="/misha.jpg" alt="Avatar" class="h-20 w-20 object-cover" />
        </div>
        <div>
          <div class="text-lg font-semibold">Misha Bruno</div>
          <a
            href="https://datadrivenlanguagelearning.blogspot.com/2022/11/top-5-free-word-cloud-generators-in-2022.html"
            class="block text-blue-800 hover:underline"
            >Best free word cloud generators for language learning in 2022</a
          >
        </div>
      </div>
      <div>A service that allowed me to quickly build a pretty word cloud with little effort.</div>
    </div>

    <div class="shadow-lg p-5 space-y-4 rounded border border-gray-100">
      <div class="flex gap-4">
        <div>
          <img src="/miroslava.webp" alt="Avatar" class="h-20 w-20 object-cover" />
        </div>
        <div>
          <div class="text-lg font-semibold">Мирослава К.</div>
          <a
            href="https://vc.ru/services/368275-5-luchshih-besplatnyh-servisov-dlya-sozdaniya-oblaka-slov"
            class="block text-blue-800 hover:underline"
            >5 лучших бесплатных сервисов для создания облака слов</a
          >
        </div>
      </div>
      <div>
        Этот сервис умнее всего анализирует текст: он позволяет создать облако частотных слов текста, при этом приводя
        все слова к начальной форме. Это значит, вы не получите, например, в облаке кот, коту, кота и т.д., а
        посчитаются сразу все формы слова кот. Полученный набор слов можно настроить, например, убрать фамилии или
        цифры. Красивые цветовые палитры, минимум функций, отсутствие регистрации. Кроме русского поддерживаются другие
        языки. Главный минус — отсутствие более сложных форм облака.
      </div>
    </div>
  </div>
</template>

<script setup>
import { FONTS, COLOR_PALETTES, DEMO_TEXT } from '~/config.js'

const { t, locale } = useI18n()

let isCreated = ref(false)
let isError = ref(false)
let isLoading = ref(false)
let isRedrawing = ref(false)
let font = ref(FONTS[0])
let colorPalette = ref(COLOR_PALETTES[0])
let wordCloudUpdate = ref(null)
let text = ref('')
let words = ref([])
let textLang = ref('en')

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
  title: t('title'),
  meta: [
    {
      name: 'description',
      content: t('info'),
    },
  ],
})

async function generate() {
  if (text.value.length > 10000) {
    isError.value = true
    return
  }

  isError.value = false
  isLoading.value = true
  const { data, error } = await useApiFetch('/lemmatize', { method: 'POST', body: { text: text.value } })
  isLoading.value = false

  if (error.value) {
    isError.value = true
  } else {
    words.value = []
    data.value.words.forEach((el) => {
      words.value.push({
        name: el.name,
        count: el.count,
        visible: isNaN(el.name),
      })
    })
    console.log(words.value)
    textLang.value = data.value.lang
    isCreated.value = true
  }
}

function update() {
  isCreated.value = true
  isLoading.value = false
  isRedrawing.value = false
  nextTick(() => {
    document.querySelector('#customization').scrollIntoView({ behavior: 'smooth' })
  })
}

const triggerDownload = (imgURI) => {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true,
  })

  var a = document.createElement('a')
  a.setAttribute('download', 'wordcloud.png')
  a.setAttribute('href', imgURI)
  a.setAttribute('target', '_blank')

  a.dispatchEvent(evt)
}

const downloadPNG = () => {
  let canvas = document.querySelector('#wordcloud-canvas')
  let svg = document.querySelector('#wordcloud-svg')
  let ctx = canvas.getContext('2d')
  let data = new XMLSerializer().serializeToString(svg)
  let DOMURL = window.URL || window.webkitURL || window

  let img = new Image()
  let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
  let url = DOMURL.createObjectURL(svgBlob)

  img.onload = function () {
    ctx.drawImage(img, 0, 0, 1500, 1500)
    DOMURL.revokeObjectURL(url)

    let imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

    triggerDownload(imgURI)
  }

  img.src = url
}

const redraw = () => {
  isRedrawing.value = true
  wordCloudUpdate.value = {}
}
</script>
