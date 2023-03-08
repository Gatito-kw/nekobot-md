const { generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
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

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa la url o título de un video de YouTube.')
   await m.react('🕓')
   let search = await yts(text.replace(' --yes', ''))
   let _res = search.all.map(v => v).filter(v => v.type == "video")
   let info = await ytdl.getInfo('https://youtu.be/' + _res[0].videoId)
   let res = await ytdl.chooseFormat(info.formats, { quality: '18' })
   let size = await format(await ufs(res.url))
   if (Number(size.split(' MB')[0]) >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   if (Number(size.split(' GB')[0]) >= 0) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))
   let img
   if (!text.includes('--yes')) {
	  let img = await (await fetch(_res[0].thumbnail)).buffer()
	  let txt = `乂  *Y O U T U B E  -  M P 4*\n\n`
      txt += `	◦  *Titulo* : ${_res[0].title}\n`
      txt += `	◦  *Calidad* : ${res.qualityLabel}\n`
      txt += `	◦  *Tamaño* : ${size}\n`
      txt += `	◦  *Url* : ${'https://youtu.be/' + _res[0].videoId}\n\n`
      txt += `El video se esta enviando, Espere un momento.`
	  let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: txt, contextInfo: { externalAdReply: { mediaType: 1, renderLargerThumbnail: true, thumbnail: img, thumbnailUrl: img, title: global.textbot.title }}}}, { quoted: m })
      await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
   }
   await conn.sendFile(m.chat, res.url, _res[0].title + '.mp4', `*${_res[0].title}  ‧  ${res.qualityLabel}*`, m, false, { asDocument: false })
   await m.react('✅')
}

handler.help = ['ytmp4']
handler.tags = ['download']
handler.command = ['ytmp4', 'ytv']

handler.react_error = true


export default handler