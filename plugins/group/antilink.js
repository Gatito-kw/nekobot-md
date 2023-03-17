import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (chat.antiLink) return m.reply('Anti-Link ya esta Activada.')
      chat.antiLink = true
      await m.reply('🚩 Anti-Link activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiLink) return m.reply('AntiLink ya esta Desactivada.')
      chat.antiLink = false
      await m.reply('🚩 Anti-Link desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Anti-Link. 🍟*\n\n	◦  *Estado* : [ ${chat.antiLink ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR ANTI-LINK', rows]], m)
   }
}

handler.help = ['antilink']
handler.tags = ['group']
handler.command = ['antilink']
handler.use = ['on/off']

handler.admin = true

export default handler