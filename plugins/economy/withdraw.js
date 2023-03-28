import db from '../../lib/database.js'

let handler = async (m, { args }) => {
   let user = db.data.users[m.sender]
   if (!args[0]) return m.reply('Ingresa la cantidad de dinero que deseas Retirar.')
   if (args[0] == '--all') {
      let count = parseInt(user.bank)
      user.bank -= count * 1
      user.money += count * 1
      await m.reply(`*Retiraste ${count} de dinero del Banco.* 🍟`)
      return !0
   }
   if (!Number(args[0])) return m.reply('La cantidad deve ser un Numero.')
   let count = parseInt(args[0])
   if (!user.bank) return m.reply('No tienes dinero en Banco.')
   if (user.bank < count) return m.reply(`Solo tienes ${user.bank} de dinero en el Banco.`)
   user.bank -= count * 1
   user.money += count * 1
   await m.reply(`*Retiraste ${count} de dinero del Banco.* 🍟`)
}

handler.help = ['withdraw']
handler.tags = ['economy']
handler.command = ['withdraw', 'retirar'] 

export default handler