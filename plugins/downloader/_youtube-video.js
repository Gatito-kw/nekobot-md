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

let limit = 100 // Limite de 100 MB

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!m.quoted) return m.reply('Etiqueta el mensaje que contenga el resultado de YouTube Play.')
   if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) return m.reply('Etiqueta el mensaje que contenga el resultado de YouTube Play.')
   if (!m.quoted.isBaileys) return m.reply('Etiqueta un mensaje mio que contenga el resultado de YouTube Play.')
   let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
   if (!urls) return m.reply('El mensaje que etiquetaste no contiene el resultado de YouTube Play.')
   if (urls.length < text) return m.reply('Resultado no Encontrado.')
   await m.react('🕓')
   let search = await yts(urls[0].replace(' --yes', ''))
   let _res = search.all.map(v => v).filter(v => v.type == "video")
   let info = await ytdl.getInfo('https://youtu.be/' + _res[0].videoId)
   let res = await ytdl.chooseFormat(info.formats, { quality: '18' })
   let size = await format(await ufs(res.url))
   if (Number(size.split(' MB')[0]) >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   if (Number(size.split(' GB')[0]) >= 0) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   await conn.sendFile(m.chat, res.url, _res[0].title + '.mp4', `*${_res[0].title}  ‧  ${res.qualityLabel}*`, m, false, { asDocument: false })
   await m.react('✅')
}

handler.help = ['Video']
handler.tags = ['downloader']
handler.customPrefix = /^(Video|video)/
handler.command = new RegExp

handler.react_error = true

export default handler