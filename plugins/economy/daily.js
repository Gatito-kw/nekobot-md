import db from '../../lib/database.js'

const cooldown = 86400000 // 24 Horas

let handler = async (m) => {
   let user = db.data.users[m.sender]
   if (new Date - user.lastdaily < cooldown) return m.reply(`🧭 Espera *${((user.lastdaily + cooldown) - new Date()).toTimeString()}* para volver a Reclamar.`)
   let txt = `Felicidades 🎉, reclamaste 300 de Dinero.`
   user.money += 300
   user.lastdaily = new Date * 1
   await m.reply(txt)
}

handler.help = ['daily']
handler.tags = ['economy']
handler.command = ['daily']

handler.cooldown = cooldown

export default handler
