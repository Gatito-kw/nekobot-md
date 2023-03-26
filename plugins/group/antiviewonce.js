import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   if (args[0] === 'on') {
      if (chat.antiViewOnce) return m.reply('Anti-ViewOnce ya esta Activada.')
      chat.antiViewOnce = true
      await m.reply('🚩 Anti-ViewOnce activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiViewOnce) return m.reply('Anti-ViewOnce ya esta Desactivada.')
      chat.antiViewOnce = false
      await m.reply('🚩 Anti-ViewOnce desactivada para este Grupo.')
   } else {
      await m.reply(`*Configurar Anti-ViewOnce*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['antiviewonce']
handler.tags = ['group']
handler.command = ['antiviewonce']
handler.use = ['on/off']

handler.admin = true

export default handler