import db from '../../lib/database.js'

let handler = async (m) => {
   let chat = db.data.chats[m.chat]
   if (chat.isBanned) return m.reply('El chat ya esta Desbaneado.')
   chat.isBanned = false
   await m.reply('🚩 Chat desbaneado con Exito.')
}

handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['unbanchat']

handler.owner = true

export default handler