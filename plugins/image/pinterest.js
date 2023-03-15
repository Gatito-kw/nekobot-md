import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa que imagen deseas buscar en Pinterest.')
   await m.react('🕓')
   let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
   let json = await res.json()
   let data = json?.resource_response?.data?.results
   let img = data[~~(Math.random() * (data?.length))]?.images?.orig
   if (!img) return m.reply('Imagen no encontrada, Intenta con otro Nombre.').then(async _ => await m.react('✖️'))
   await conn.sendButton(m.chat, `*PINTEREST*`, 'Click para la siguiente Imagen', img.url, [['Siguiente ➡️', `${usedPrefix + command} ${text}`]], m)
   await m.react('✅')
}

handler.help = ['pinterest']
handler.tags = ['image']
handler.command = ['pinterest'] 

handler.react_error = true

export default handler