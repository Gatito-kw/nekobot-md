import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let setting = db.data.settings[conn.user.jid]
   if (args[0] === 'on') {
      if (setting.autoRead) return m.reply('Auto-read ya esta Activada.')
      setting.autoRead = true
      await m.reply('🚩 Auto-read activada para este Bot.')
   } else if (args[0] === 'off') {
      if (!setting.autoRead) return m.reply('Auto-read ya esta Desactivada.')
      setting.autoRead = false
      await m.reply('🚩 Auto-read desactivada para este Bot.')
   } else {
      await m.reply(`*Configurar Auto-read*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['autoread']
handler.tags = ['owner']
handler.command = ['autoread', 'autoleido']
handler.use = ['on/off']

handler.owner = true

export default handler