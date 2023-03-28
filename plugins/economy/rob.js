import db from '../../lib/database.js'

const cooldown = 43200000 // 12 Horas

let handler = async (m, { conn, usedPrefix, command}) => {
   let user = db.data.users[m.sender]
   let time = user.lastrob + cooldown
   if (new Date - user.lastrob < cooldown) return m.reply(`⏱️ Espera *${(time - new Date()).toTimeString()}* para volver a Robar.`)
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
   if (!m.mentionedJid[0] && !m.quoted) return m.reply('Menciona al usuario que quieres Robar.')
   if (who == conn.user.jid) return m.react('🚫')
   if (!(who in db.data.users)) return m.reply('El usuario no se encuentra en mi base de Datos.')
   let _user = db.data.users[who]
   let amount = Math.floor(Math.random() * (50 - 100) + 100) + 1
   if (_user.money < 100) return m.reply('El usuario no tiene suficiente dinero en su Cartera.')
   user.money += amount * 1
   _user.money -= amount * 1
   user.lastrob = new Date * 1
   await m.reply(`*Robaste ${amount} de dinero a @${who.split`@`[0]}.* 🍟`, null, { mentions: [who] })
}

handler.help = ['rob']
handler.tags = ['economy']
handler.command = ['steal', 'robar', 'rob']
  
export default handler