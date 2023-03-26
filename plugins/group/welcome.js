import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.welcome) return m.reply('La bienvenida ya esta Activada.')
      chat.welcome = true
      await m.reply('🚩 Bienvenida activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.welcome) return m.reply('La bienvenida ya esta Desactivada.')
      chat.welcome = false
      await m.reply('🚩 Bienvenida desactivada para este Grupo.')
   } else {
      await m.reply(`*Configurar Bienvenida*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['welcome']
handler.tags = ['group']
handler.command = ['welcome', 'bienvenida']
handler.use = ['on/off']

handler.admin = true

export default handler