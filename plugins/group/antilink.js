import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   if (args[0] === 'on') {
      if (chat.antiLink) return m.reply('Anti-Link ya esta Activada.')
      chat.antiLink = true
      await m.reply('🚩 Anti-Link activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiLink) return m.reply('AntiLink ya esta Desactivada.')
      chat.antiLink = false
      await m.reply('🚩 Anti-Link desactivada para este Grupo.')
   } else {
      await m.reply(`*Configurar Anti-Link*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['antilink']
handler.tags = ['group']
handler.command = ['antilink']
handler.use = ['on/off']

handler.admin = true

export default handler