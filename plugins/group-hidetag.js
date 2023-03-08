import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, participants }) => {
   let users = participants.map(u => conn.decodeJid(u.id))
   let q = m.quoted ? m.quoted : m
   let c = m.quoted ? m.quoted : m.msg
   const msg = m.quoted ? m.quoted.fakeObj : conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : { text: c || '' } }, { quoted: m, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
   await conn.sendMessage(m.chat, { forward: msg, mentions: users }, { quoted: m })
}

handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['hidetag', 'totag']

handler.group = true
handler.admin = true

export default handler