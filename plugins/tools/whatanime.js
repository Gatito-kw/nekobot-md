import uploadImage from '../../lib/uploadImage.js'

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
   let q = m.quoted ? m.quoted : m
   let mime = (q.msg || q).mimetype || ''
   if (!/image\/(jpe?g|png)/.test(mime)) return m.reply('Responde a una Imagen.')
   await m.react('🕓')
   let img = await q.download?.()
   let url = await uploadImage(img)
   let res = await fetch(`https://api.trace.moe/search?cutBorders&url=${url}`)
   let json = await res.json()
   return console.log(json)
   let { is_adult, title, title_chinese, title_romaji, episode, season, similarity, filename, at, tokenthumb, anilist_id } = json.docs[0]
   let link = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
   let txt = `*乂 What - Anime*\n\n`
      txt += `	◦  *Titulo* : ${title}\n`
      txt += `	◦  *Similitud* : ${(similarity * 100).toFixed(1)}%\n`
      txt += `	◦  *Episodio* : ${episode.toString()}\n`
      txt += `	◦  *Ecchi* : ${is_adult ? 'Si' : 'No'}\n`
   await conn.sendFile(m.chat, link, 'srcanime.mp4', txt, m)
   await m.react('✅')
}

handler.help = ['whatanime']
handler.tags = ['tool']
handler.command = ['whatanime']

export default handler 