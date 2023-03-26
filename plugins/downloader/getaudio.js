import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import ufs from 'url-file-size'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
   std: 'JEDEC',
   decimalPlaces: 2,
   keepTrailingZeroes: false,
   render: (literal, symbol) => `${literal} ${symbol}B`,
})

let limit = 20 // Limite de 20 MB

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa el nro de un resultado de YouTube Search.')
   if (!m.quoted) return m.reply('Etiqueta el mensaje que contenga el resultado de YouTube Search.')
   if (!m.quoted.text.includes("乂  Y T  -  S E A R C H")) return m.reply('Etiqueta el mensaje que contenga el resultado de YouTube Search.')
   if (!m.quoted.isBaileys) return m.reply('Etiqueta un mensaje mio que contenga el resultado de YouTube Search.')
   let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
   if (!urls) return m.reply('El mensaje que etiquetaste no contiene el resultado de YouTube Search.')
   if (urls.length < text) return m.reply('Resultado no Encontrado.')
   await m.react('🕓')
   let search = await yts(urls[text - 1].replace(' --yes', ''))
   let _res = search.all.map(v => v).filter(v => v.type == "video")
   let info = await ytdl.getInfo('https://youtu.be/' + _res[0].videoId)
   let res = await ytdl.chooseFormat(info.formats, { filter: 'audioonly' })
   let size = await format(await ufs(res.url))
   if (Number(size.split(' MB')[0]) >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   if (Number(size.split(' GB')[0]) >= 0) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   let img
   if (!text.includes('--yes')) {
      let img = await (await fetch(_res[0].thumbnail)).buffer()
      let txt = `*乂  Y O U T U B E  -  M P 3*\n\n`
         txt += `	◦  *Titulo* : ${_res[0].title}\n`
         txt += `	◦  *Calidad* : ${res.audioBitrate}kbps\n`
         txt += `	◦  *Tamaño* : ${size}\n`
         txt += `	◦  *Url* : ${'https://youtu.be/' + _res[0].videoId}\n\n`
         txt += `El audio se esta enviando, Espere un momento.`
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
   await conn.sendMessage(m.chat, { audio: { url: res.url }, fileName: _res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
   await m.react('✅')
}

handler.help = ['getaudio']
handler.tags = ['downloader']
handler.command = ['get-audio', 'getaudio']

handler.react_error = true

export default handler