<script setup>
import { watch } from 'vue'
import { select } from 'd3'
import cloud from '/src/lib/d3-cloud.js'

const props = defineProps({ words: Array })

watch(
  () => props.words,
  (words) => {
    var layout = cloud()
      .size([500, 500])
      .words(
        words.map(function (d) {
          return { text: d[0], size: 10 + d[1]*5 }
        })
      )
      .font('Impact')
      .fontSize(function (d) {
        return d.size
      })
      .on('end', draw)

    layout.start()

    function draw(words) {
      select('#wordcloud').select('svg').remove()

      select('#wordcloud')
        .append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
        .selectAll('text')
        .data(words)
        .enter().append('text')
        .style('font-size', function (d) {
          return d.size + 'px'
        })
        .style('font-family', 'Impact')
        .style('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function (d) {
          return d.text
        })
    }
  }
)
</script>

<template>
  <div id="wordcloud" class="has-text-centered mt-5"></div>
</template>
