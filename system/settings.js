const fs = require('fs')

global.owner = "3584573993448"
global.footer = "BUG BOT MAD HINDU MOTU PATLU"
global.idsal = "120363379684517003@newsletter"
global.image = "https://files.catbox.moe/jp2qhx.jpg"
global.linksal = "http://t.me/MOTU_PATALU_HINDU_HAI"
global.autoread = false //true/false

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
