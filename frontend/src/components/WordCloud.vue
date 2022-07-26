<script setup>
import { watch } from 'vue'
import { select } from 'd3'
import cloud from '/src/lib/d3-cloud.js'
import { embedFonts } from '/src/lib/embed-fonts.js'
import { getFontURL } from '/src/config.js'

const props = defineProps({ words: Array, font: Object, colorPalette: Object, update: Object })
const emit = defineEmits(['update'])
let hidden = true

let layout
let css

watch(props, async (props) => {
  if (props.words.filter((w) => w.visible).length > 0) {
    hidden = true
    redraw(props.words, props.font, props.colorPalette)
    hidden = true
    redraw(props.words, props.font, props.colorPalette)
  }
})

const redraw = async (words, font, colorPalette) => {
  css = await embedFonts(getFontURL(font))
  words = words.filter((w) => w.visible)
  const ratio = 100 / words[0].count
  layout = cloud()
    .size(['500', '500'])
    .words(
      words.map(function (d) {
        return { text: d.name, size: 10 + ratio * d.count }
      })
    )
    .font(font.family)
    .fontSize(function (d) {
      return d.size
    })
    .on('end', draw)

  layout.start()
}

const draw = (words) => {
  select('#wordcloud').select('svg').remove()
  console.log(hidden)
  let svg = select(hidden ? '#wordcloud-hidden' : '#wordcloud')
    .append('svg')
    .attr('id', 'svg')
    .attr('width', 500)
    .attr('height', 500)
    .attr('viewBox', '-250 -250 500 500')

  svg.append('defs').append('style').attr('type', 'text/css').text(css)

  svg
    .append('rect')
    .attr('x', '-250')
    .attr('y', '-250')
    .attr('width', '500')
    .attr('height', '500')
    .attr('fill', props.colorPalette.backgroundColor)

  svg
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', function (d) {
      return d.size + 'px'
    })
    .style('font-family', props.font.family)
    .style('fill', function () {
      return props.colorPalette.colors[Math.floor(Math.random() * props.colorPalette.colors.length)]
    })
    .attr('text-anchor', 'middle')
    .attr('transform', function (d) {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
    })
    .text(function (d) {
      return d.text
    })

  emit('update')
}
</script>

<template>
  <div id="wordcloud-hidden" class="mb-5"></div>
  <div id="wordcloud" class="mb-5"></div>
</template>

<style>
#wordcloud-hidden {
  border: 1px solid #dddddd;
}

#wordcloud {
  border: 1px solid #dddddd;
}

#wordcloud svg {
  display: block;
}
</style>
