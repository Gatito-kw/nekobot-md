import db from '../lib/database.js'

export async function before(m, { conn }) {
   let chat = db.data.chats[m.chat]
   if (!m.isGroup)
      return !1
   if (chat.antiViewOnce && m.mtype == 'viewOnceMessageV2') {
      let media = await m.download()
      await conn.sendFile(m.chat, media, 'Anti-View-Once.jpg', m.text, m)
   }
}