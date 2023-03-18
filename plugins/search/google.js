import { googleIt } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, command, args }) => {
   if (!text) return m.reply('Ingresa lo que deseas buscar en Google.')
   await m.react('🕓')
   let url = 'https://google.com/search?q=' + encodeURIComponent(text)
   let search = await googleIt(text)
   let res = search.articles.map(v => v).filter(v => v)
   let txt = `*乂  G O O G L E  -  S E A R C H*`
   for (let i = 0; i < (15 <= res.length ? 15 : res.length); i++) {
      txt += `\n\n`
      txt += '*' + (i + 1) + '. ' + res[i].title + '*\n'
      txt += '	◦  *Descripcion* : ' + res[i].description + '\n'
      txt += '	◦  *Url* : ' + res[i].url + '\n'
   }
   let img = await (await fetch('https://i.ibb.co/NNVScnq/logo-google.jpg')).buffer()
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

handler.help = ['google']
handler.tags = ['internet']
handler.command = ['google'] 

handler.react_error = true

export default handler