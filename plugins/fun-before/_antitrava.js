import db from '../../lib/database.js'

export async function before(m, { conn, isAdmin, isBotAdmin }) {
   if (m.isBaileys && m.fromMe)
      return !0
   if (!m.isGroup)
      return !1
   let chat = db.data.chats[m.sender]
   if (chat.antiTraba && isBotAdmin) {
      if (m.text.length > 20000) {
         await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
         await conn.sendMessage(m.chat, { delete: m.key })
         await this.reply(m.chat, '\n'.repeat(200), false, { quoted: global.fakebot.gif('Anti Traba. 🍟', await conn.resize(global.imgbot.neko2, 300, 300)) })
         await this.reply(m.chat, `Se detecto un mensaje que contiene más de 20 mil caracteres de *@${m.sender.split`@`[0]}*, pensamos que es una traba y por seguridad seras eliminado del Grupo.`, false, { mentions: [m.sender], quoted: global.fakebot.gif('Anti Traba. 🍟', await conn.resize(global.imgbot.neko2, 300, 300)) })
      }
   }
}