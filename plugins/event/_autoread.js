import db from '../../lib/database.js'

export async function before(m, { conn }) {
   if (m.isBaileys && m.fromMe)
      return !0
   let setting = db.data.settings[conn.user.jid]
   if (setting.autoRead) {
      await conn.readMessages([m.key])
   }
}