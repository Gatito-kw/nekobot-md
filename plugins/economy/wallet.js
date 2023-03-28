import db from '../../lib/database.js'

let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('🚫')
   if (!(who in db.data.users)) return m.reply('El usuario no se encuentra en mi base de Datos.')
   let user = db.data.users[who]
   await m.reply(`*${who == m.sender ? `Tienes ${user.money} de dinero en tu Cartera` : `El usuario @${who.split('@')[0]} tiene ${user.money} de dinero en su Cartera`}.* 🍟`, null, { mentions: [who] })
}

handler.help = ['wallet']
handler.tags = ['economy']
handler.command = ['wallet', 'cartera'] 

export default handler