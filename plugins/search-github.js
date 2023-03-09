import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa el nombre de un repositorio de Github.')
   let res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: text }))
   let json = await res.json()
   let result = json.items.map(v => v).filter(v => v)
   let txt = `乂  *G I T H U B  -  S E A R C H*`
   for (let i = 0; i < result.length; i++) {
      txt += `\n\n`
      txt += `	◦  *Nro* : ${1+i}\n`
	  txt += `	◦  *Url* : ${result[i].html_url}\n`
	  txt += `	◦  *Nombre* : ${result[i].name}\n`
	  txt += `	◦  *Creador* : ${result[i].owner.login}\n`
	  txt += `	◦  *Creado* : ${moment(result[i].created_at).format('DD/MM/YY - HH:mm:ss')}\n`
   }
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
}

handler.help = ['githubsearch']
handler.tags = ['search']
handler.command = ['githubsearch']

export default handler