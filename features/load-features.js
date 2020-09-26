const path = require('path')
const fs = require('fs')
const L = require('@util/logger');

module.exports = (client) => {
  const readFeatures = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readFeatures(path.join(dir, file))
      } else if (file !== 'load-features.js') {
        const feature = require(path.join(__dirname, dir, file))
        L.log(`Enabling feature "${file}"`)
        feature(client)
      }
    }
  }

  readFeatures('.')
}
