import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa que imagen deseas buscar en Google.')
   await m.react('🕓')
   const res = await googleImage(text)
   await conn.sendButton(m.chat, '*IMAGEN*', 'Click para la siguiente Imagen', res.getRandom(), [['Siguiente ➡️', `${usedPrefix + command} ${text}`]], m)
   await m.react('✅️')
}


handler.help = ['gimage']
handler.tags = ['image']
handler.command = ['gimage', 'image']

export default handler