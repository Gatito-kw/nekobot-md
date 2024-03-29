import gis from 'async-g-i-s'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa que imagen deseas buscar en Google.')
   await m.react('🕓')
   let res = await gis(text)
   if (!res.length) return m.reply('Imagen no encontrada, Intenta con otro Nombre.').then(async _ => await m.react('✖️'))
   let img = res.getRandom()
   await conn.sendButton(m.chat, '*GOOGLE IMAGEN*', 'Click para la siguiente Imagen', img.url, [['Siguiente ➡️', `${usedPrefix + command} ${text}`]], m)
   await m.react('✅️')
}


handler.help = ['gimage']
handler.tags = ['image']
handler.command = ['gimage', 'image']

handler.react_error = true

export default handler