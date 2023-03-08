import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let res = await fetch('https://api.popcat.xyz/lyrics?song=' + encodeURIComponent(text))
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.lyrics) return m.reply('Letra no encontrada, intenta con otro Titulo.').then(async _ => await m.react('✖️'))
   let txt = `乂  *L Y R I C S  -  S E A R C H*\n\n`
      txt += `	◦  *Titulo* : ${json.title}\n`
      txt += `	◦  *Artista* : ${json.artist}\n\n`
      txt += `${json.lyrics}`
   let img = await (await fetch(json.image)).buffer()
   await conn.sendUrl(m.chat, txt, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: img,
         thumbnailUrl: img,
         title: global.textbot.title,
      }
   })
}

handler.help = ['lyrics']
handler.tags = ['search']
handler.command = ['lyrics', 'lyric']

export default handler