import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   if (!args[0]) return m.reply('Ingresa el enlace que quieres Acortar.')
   if (!isURL(args[0])) return m.reply('Ingresa una url Válida.')
   let res = await fetch('https://linkpoi.ga/api.php?url=' + args[0])
   let json = await res.json()
   await m.reply(json.shorturl.replace('\/','/'))
}

handler.help = ['linkpoi']
handler.tags = ['tool']
handler.command = ['linkpoi']

export default handler

function isURL(url) {
   var regex = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
   return regex.test(url)
}