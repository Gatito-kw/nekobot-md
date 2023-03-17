import db from '../../lib/database.js'

export async function before(m, { conn }) {
   if (!m.isGroup)
      return !1
   let chat = db.data.chats[m.chat]
   if (chat.antiViewOnce && m.mtype == 'viewOnceMessageV2') {
      let media = await m.download()
      await conn.sendFile(m.chat, media, 'Anti-View-Once.jpg', m.text, m)
   }
}