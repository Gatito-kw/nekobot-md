import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   if (args[0] === 'on') {
      if (chat.antiRaid) return m.reply('Anti-Raid ya esta Activada.')
      chat.antiRaid = true
      await m.reply('🚩 Anti-Raid activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiRaid) return m.reply('Anti-Raid ya esta Desactivada.')
      chat.antiRaid = false
      await m.reply('🚩 Anti-Raid desactivada para este Grupo.')
   } else {
      await m.reply(`*Configurar Anti-Raid*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['antiraid']
handler.tags = ['group']
handler.command = ['antiraid']
handler.use = ['on/off']

handler.admin = true

export default handler