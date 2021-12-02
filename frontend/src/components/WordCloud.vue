<script setup>
import { watch } from 'vue'
import { select } from 'd3'
import cloud from '/src/lib/d3-cloud.js'
import { embedFonts } from '/src/lib/embed-fonts.js'
import { getFontURL } from '/src/config.js'

const props = defineProps({ words: Array, font: String, colorPalette: Object, update: Object })
const emit = defineEmits(['update'])

let layout
let css

const redraw = async (words, font, colorPalette) => {
  css = await embedFonts(getFontURL(font))
  words = words.filter(w => w.visible)
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

watch(
  props,
  async (props) => {
    if (props.words.filter(w => w.visible).length > 0) {
      redraw(props.words, props.font, props.colorPalette)
    }
  }
)

const draw = (words) => {
  select('#wordcloud').select('span').remove()
  select('#wordcloud').select('svg').remove()

  let svg = select('#wordcloud').append('svg')
                                .attr('id', 'svg')
                                .attr('width', layout.size()[0])
                                .attr('height', layout.size()[1])
                                .attr('style', 'border: 1px solid #dddddd')

  svg.append('defs')
      .append('style')
        .attr('type', 'text/css')
        .text(css)
  
  svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', props.colorPalette.backgroundColor)
    
  svg.append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
      .style('font-size', function (d) {
        return d.size + 'px'
      })
      .style('font-family', props.font.family)
      .style('fill', function() {
        return props.colorPalette.colors[Math.floor( Math.random() * props.colorPalette.colors.length )]
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
  <span id="wordcloud" class="mb-5">
    <span class="empty"></span>
  </span>
</template>

<style>
  .empty {
    height: 500px;
    width: 500px;
    display: block;
    background-color: #dddddd;
  }
</style>