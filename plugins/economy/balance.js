import db from '../../lib/database.js'

let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (!(who in db.data.users)) return m.reply('El usuario no se encuentra en mi base de Datos.')
   let user = db.data.users[who]
   let txt = `*乂  B A L A N C E*\n\n`
      txt += `	◦  *User* : @${who.split('@')[0]}\n`
      txt += `	◦  *Balance* : $ ${user.money}`
   await m.reply(txt, null, { mentions: [who] })
}

handler.help = ['balance']
handler.tags = ['economy']
handler.command = ['bal', 'balance'] 

export default handler