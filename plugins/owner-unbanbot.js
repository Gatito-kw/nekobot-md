import db from '../lib/database.js'

let handler = async (m) => {
   let setting = db.data.settings[conn.user.jid]
   if (setting.isBanned) return m.chat('El bot ya esta Desbaneado.')
   setting.isBanned = false
   await m.reply('🚩 Bot desbaneado con Exito.')
}

handler.help = ['unbanbot']
handler.tags = ['owner']
handler.command = ['unbanbot']

handler.owner = true

export default handler