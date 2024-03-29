import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   let res = await fetch('https://api.github.com/repos/gatito-kw/nekobot-md')
   let json = await res.json()
   let txt = `*乂  B O T  -  S C R I P T*\n\n`
      txt += `	◦  *Nombre* : ${json.name}\n`
      txt += `	◦  *Visitas* : ${json.watchers_count}\n`
      txt += `	◦  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
      txt += `	◦  *Actualizado* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
      txt += `	◦  *Url* : ${json.html_url}\n\n`
      txt += `	   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n`
      txt += global.textbot.footer
   await conn.sendUrl(m.chat, txt, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: global.imgbot.neko2,
         thumbnailUrl: global.imgbot.neko2,
         title: global.textbot.title,
      }
   })
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler