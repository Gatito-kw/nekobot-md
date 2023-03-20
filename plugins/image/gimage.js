import gis from 'g-i-s'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa que imagen deseas buscar en Google.')
   await m.react('🕓')
   let res = await gis(text)
   return console.log(res)
   if (!res.length) return m.reply('Imagen no encontrada, Intenta con otro Nombre.').then(async _ => await m.react('✖️'))
   await conn.sendButton(m.chat, '*IMAGEN*', 'Click para la siguiente Imagen', res.getRandom(), [['Siguiente ➡️', `${usedPrefix + command} ${text}`]], m)
   await m.react('✅️')
}


handler.help = ['gimage']
handler.tags = ['image']
handler.command = ['gimage', 'image']

export default handler