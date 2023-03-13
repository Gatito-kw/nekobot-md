import db from '../lib/database.js'

let handler = async (m) => {
   let chat = db.data.chats[m.chat]
   if (chat.isBanned) return m.reply('El chat ya esta Baneado.')
   chat.isBanned = true
   await m.reply('🚩 Chat baneado con Exito.')
}

handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['banchat']

handler.owner = true

export default handler