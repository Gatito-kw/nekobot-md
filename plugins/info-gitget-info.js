import fetch from 'node-fetch'

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa el nro de un resultado de Github Search.')
   if (!m.quoted) return m.reply('Etiqueta el mensaje que contenga el resultado de Github Search.')
   if (!m.quoted.text.includes("乂  *G I T H U B  -  S E A R C H*")) return m.reply('Etiqueta el mensaje que contenga el resultado de YouTube Search.')
   if (!m.quoted.isBaileys) return m.reply('Etiqueta un mensaje mio que contenga el resultado de Github Search.')
   let urls = m.quoted.text.match(new RegExp(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/, 'gi'))
   if (!urls) return m.reply('El mensaje que etiquetaste no contiene el resultado de Github Search.')
   if (urls.length < text) return m.reply('Resultado no Encontrado.')
   await m.react('🕓')
   let res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: urls[text - 1].replace("https://github.com/", "") }))
   let json = await res.json()
   let result = json.items.map(v => v).filter(v => v)
   let txt = `乂  *G I T H U B  -  I N F O*\n\n`
      txt += `${JSON.stringify(result[0], null, 1)}\n\n`
      txt += global.textbot.footer
   let img = await (await fetch(json.items[0].owner.avatar_url)).buffer()
   await conn.sendUrl(m.chat, txt, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: img,
         thumbnailUrl: img,
         title: global.textbot.title,
      }
   })
   await m.react('✅')
}

handler.help = ['gitget-info']
handler.tags = ['download']
handler.command = ['gitget-info', 'githubget-info']

handler.react_error = true

export default handler