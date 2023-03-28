import db from '../../lib/database.js'

let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('🚫')
   if (!(who in db.data.users)) return m.reply('El usuario no se encuentra en mi base de Datos.')
   let user = db.data.users[who]
   await m.reply(`*${who == m.sender ? `Tienes ${user.bank} de dinero en el Banco` : `El usuario @${who.split('@')[0]} tiene ${user.bank} de dinero en el Banco`}.* 🍟`, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'banco'] 

export default handler