import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (chat.antiViewOnce) return m.reply('Anti-ViewOnce ya esta Activada.')
      chat.antiViewOnce = true
      await m.reply('🚩 Anti-ViewOnce activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiViewOnce) return m.reply('Anti-ViewOnce ya esta Desactivada.')
      chat.antiViewOnce = false
      await m.reply('🚩 Anti-ViewOnce desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Anti-ViewOnce. 🍟*\n\n	◦  *Estado* : [ ${chat.antiViewOnce ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR ANTI-VIEWONCE', rows]], m)
   }
}

handler.help = ['antiviewonce']
handler.tags = ['group']
handler.command = ['antiviewonce']
handler.use = ['on/off']

handler.admin = true

export default handler