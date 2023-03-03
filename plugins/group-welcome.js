import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat] || {}
   let rows = [
      ['Activar', `${usedPrefix + command} on`],
      ['Desactivar', `${usedPrefix + command} off`]
   ]
   if (args[0] === 'on') {
      if (chat.welcome) return m.reply('La bienvenida ya esta Activado.')
      chat.welcome = true
      await m.reply('🚩 Bienvenida activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.welcome) return m.reply('La bienvenida ya esta Desactivado.')
      chat.welcome = false
      await m.reply('🚩 Bienvenida desactivada para este Grupo.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Bienvenida. 🍟*\n\n	◦  *Estado* : [ ${chat.welcome ? 'ON' : 'OFF'} ]`, null, 'Tap!', [['CONFIGURAR BIENVENIDA', rows]], m)
   }
}

handler.help = ['welcome']
handler.tags = ['group']
handler.command = ['welcome', 'bienvenida']
handler.use = ['on / off']

handler.admin = true

export default handler