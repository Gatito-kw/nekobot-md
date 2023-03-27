import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
   let setting = db.data.settings[conn.user.jid]
   if (setting.isBanned) return m.reply('El bot ya esta Baneado.')
   setting.isBanned = true
   await m.reply('🚩 Bot baneado con Exito.')
}

handler.help = ['banbot']
handler.tags = ['owner']
handler.command = ['banbot']

handler.owner = true

export default handler