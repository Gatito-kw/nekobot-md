import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

let limit = 150 // 150 MB

let handler = async (m, { conn, args }) => {
   if (!args[0]) return m.reply('Ingrese el enlace de un archivo de Mediafire.')
   if (!args[0].match(/mediafire/gi)) return m.reply('El enlace deve ser de un archivo de Mediafire.')
   await m.react('🕓')
   let res = await mediafireDl(args[0])
   if (Number(res.size.split('MB')[0]) >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(async _ => await m.react('✖️'))
   if (Number(res.size.split('GB')[0]) >= 0) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(async _ => await m.react('✖️'))
   let txt = `\t\t\t*Mediafire - downloader*\n\n`
      txt += `	◦  *Nombre* : ${res.name}\n`
      txt += `	◦  *Peso* : ${res.size}\n`
      txt += `	◦  *Publicado* : ${res.date}\n`
      txt += `	◦  *MimeType* : ${res.mime}\n\n`
      txt += `El archivo se esta enviando, Espere un momento.`
   let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
   await conn.sendUrl(m.chat, txt, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: img,
         thumbnailUrl: img,
         title: global.textbot.title,
      }
   })
   // await conn.sendFile(m.chat, res.link, res.name, null, m, null, { mimetype: res.mime, asDocument: true })
}

handler.help = ['mediafire']
handler.tags = ['downloader']
handler.command = ['mediafire', 'mdfire']

export default handler

async function mediafireDl(url) {
   const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
   const $ = cheerio.load(res.data)
   const link = $('#downloadButton').attr('href')
   const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
   const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
   const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
   let mime = ''
   let rese = await axios.head(link)
   mime = rese.headers['content-type']
   return { name, size, date, mime, link }
}