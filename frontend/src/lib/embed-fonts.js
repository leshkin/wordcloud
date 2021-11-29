export async function embedFonts (url) {
  return await fetch(url).then(res => res.text()).then(embedFontFiles)
}

function embedFontFiles (cssText) {
  var fontLocations = cssText.match(/https:\/\/[^)]+/g)
  var fontLoadedPromises = fontLocations.map(function (location) {
    return new Promise(function (resolve, reject) {
      fetch(location).then(function (res) {
        return res.blob()
      }).then(function (blob) {
        var reader = new FileReader()
        reader.addEventListener('load', function () {
          // Side Effect
          cssText = cssText.replace(location, this.result)
          resolve([location, this.result])
        })
        reader.readAsDataURL(blob)
      }).catch(reject)
    })
  })
  return Promise.all(fontLoadedPromises).then(function () {
    return cssText
  })
}