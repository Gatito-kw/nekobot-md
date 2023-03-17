import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   let res = await fetch('https://api.github.com/repos/gatito-kw/nekobot-md')
   let json = await res.json()
   let txt = `*乂 Bot - Script*\n\n`
      txt = `	◦  *Name* : ${json.name}\n`
      txt = `	◦  *Forks* : ${json.forks_count}\n`
      txt = `	◦  *Stars* : ${json.stargazers_count}\n`
      txt = `	◦  *Issues* : ${json.open_issues_count}\n`
      txt = `	◦  *Watchers* : ${json.watchers_count}\n`
      txt = `	◦  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
      txt = `	◦  *Actualizado* : ${json.updated_at}\n`
      txt = `	◦  *Url* : ${json.html_url}\n`
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