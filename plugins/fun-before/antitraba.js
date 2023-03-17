import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (chat.antiTraba) return m.reply('Anti-Traba ya esta Activada.')
      chat.antiTraba = true
      await m.reply('🚩 Anti-Traba activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiTraba) return m.reply('Anti-Traba ya esta Desactivada.')
      chat.antiTraba = false
      await m.reply('🚩 Anti-Traba desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Anti-Traba. 🍟*\n\n	◦  *Estado* : [ ${chat.antiTraba ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR ANTI-TRABA', rows]], m)
   }
}

handler.help = ['antitraba']
handler.tags = ['group']
handler.command = ['antitraba']
handler.use = ['on/off']

handler.admin = true

export default handler