import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingrese el titulo de un Anime.')
   await m.react('π')
   let res = await fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(text))
   let json = (await res.json()).data
   let txt = `δΉ  *A N I M E  -  I N F O*\n\n`
      txt += `	β¦  *Titulo* : ${json[0].title}\n`
	  txt += `	β¦  *Id* : ${json[0].mal_id}\n`
	  txt += `	β¦  *Tipo* : ${json[0].type}\n`
	  txt += `	β¦  *Episodios* : ${json[0].episodes}\n`
	  txt += `	β¦  *Estado* : ${json[0].status}\n`
	  txt += `	β¦  *Emitido* : ${json[0].aired.string}`
	  txt += `	β¦  *Clasificacion* : ${json[0].rating}\n`
	  txt += `	β¦  *Duracion* : ${json[0].duration}\n`
	  txt += `	β¦  *Puntaje* : ${json[0].score}\n`
	  txt += `	β¦  *Genero* : ${json[0].genres.map((val) => val.name).join(", ")}\n`
	  txt += `	β¦  *Sinopsis* : ${json[0].synopsis}\n\n`
   let img = await (await fetch(json[0].images.jpg.large_image_url)).buffer()
   await conn.sendUrl(m.chat, txt, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: img,
         thumbnailUrl: img,
         title: global.textbot.title,
      }
   })
   await m.react('β')
}

handler.help = ['anime-info']
handler.tags = ['search']
handler.command = ['anime-info', 'animeinfo', 'infonime']

handler.react_error = true

export default handler