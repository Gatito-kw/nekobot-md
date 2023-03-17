import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   if (!args[0]) return m.reply('Ingresa un Url.')
   if (!isURL(args[0])) return m.reply('Ingresa una url Válida.')
   let res = await fetch('https://api.popcat.xyz/screenshot?url=' + args[0])
   let img = await res.buffer()
   await conn.sendFile(m.chat, img, 'Screenshot.jpg', `*Screenshot Web. 🍟*\n\n${args[0]}`, m)
}

handler.help = ['screenshot']
handler.tags = ['tool']
handler.command = ['screenshot']

export default handler

function isURL(url) {
   var regex = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
   return regex.test(url)
}