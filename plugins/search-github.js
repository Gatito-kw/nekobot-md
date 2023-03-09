import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa el nombre de un repositorio de Github.')
   let res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: text }))
   let json = await res.json()
   let result = json.items.map(v => v).filter(v => v)
   let txt = `乂  *G I T H U B  -  S E A R C H*`
   for (let i = 0; i < result.length; i++) {
      txt += `\n\n`
      txt += `	◦  *Nro* : ${1+i}`
	  txt += `	◦  *Url* : ${result.html_url}\n`
	  txt += `	◦  *Creador* : ${result.owner.login}\n`
	  txt += `	◦  *Nombre* : ${result.name}\n`
	  txt += `	◦  *Subido* : ${formatDate(result.created_at)}\n`
	  txt += `	◦  *Actualizado* : ${formatDate(result.updated_at)}\n`
	  txt += `	◦  *Visitas* : ${result.watchers}\n`
	  txt += `	◦  *Bifurcado* : ${result.forks}\n`
	  txt += `	◦  *Estrellas* : ${result.stargazers_count}\n`
	  txt += `	◦  *Issues* : ${result.open_issues}\n`
	  txt += `	◦  *Descripcion* : ${result.description ? result.description : '×'}\n`
	  txt += `	◦  *Clone* : ${result.clone_url}`
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

function formatDate(n, locale = 'es') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
