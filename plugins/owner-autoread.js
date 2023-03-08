import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let setting = db.data.settings[conn.user.jid]
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (setting.autoRead) return m.reply('Auto-leído ya esta Activada.')
      setting.autoRead = true
      await m.reply('🚩 Auto-leído activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!setting.autoRead) return m.reply('Auto-leído ya esta Desactivada.')
      setting.autoRead = false
      await m.reply('🚩 Auto-leído desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Auto-Leído. 🍟*\n\n	◦  *Estado* : [ ${setting.autoRead ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR AUTO-LEIDO', rows]], m)
   }
}

handler.help = ['autoread']
handler.tags = ['owner']
handler.command = ['autoread', 'autoleido']
handler.use = ['on/off']

handler.owner = true

export default handler