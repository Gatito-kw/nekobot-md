import { googleIt } from '@bochilteam/scraper'

let handler = async (m, { conn, text, command, args }) => {
   if (!text) return m.reply('Ingresa lo que deseas buscar en Google.')
   await m.react('🕓')
   let url = 'https://google.com/search?q=' + encodeURIComponent(text)
   let search = await googleIt(text)
   let res = search.articles.map(v => v).filter(v => v)
   let txt = `*乂 Google - Search*`
   for (let i = 0; i < (15 <= res.length ? 15 : res.length); i++) {
      txt += `\n\n`
      txt += `	◦  *Titulo* : ${res[i].title}\n`
      txt += `	◦  *Url* : ${res[i].url}\n`
      txt += `	◦  *Descripcion* : ${res[i].description}\n`
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

export default handler