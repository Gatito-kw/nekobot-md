import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (chat.antiRaid) return m.reply('Anti-Raid ya esta Activada.')
      chat.antiRaid = true
      await m.reply('🚩 Anti-Raid activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.antiRaid) return m.reply('Anti-Raid ya esta Desactivada.')
      chat.antiRaid = false
      await m.reply('🚩 Anti-Raid desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Anti-Raid. 🍟*\n\n	◦  *Estado* : [ ${chat.antiRaid ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR ANTI-RAID', rows]], m)
   }
}

handler.help = ['antiraid']
handler.tags = ['group']
handler.command = ['antiraid']
handler.use = ['on/off']

handler.admin = true

export default handler